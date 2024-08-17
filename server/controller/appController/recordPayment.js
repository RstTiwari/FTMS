import checkDbForEntity from "../../Helper/databaseSelector.js";

const recordPayment = async (req, res, next) => {
    try {
        const { entity, values } = req.body; // Payment values

        let id = values?.customer;

        if (!id || !values) {
            throw new Error("Invalid Payload");
        }
        let tenantId = req.tenantId;
        values.tenantId = tenantId;
        // Create the payment record first
        const PaymentDatabase = checkDbForEntity("payments");
        const payment = new PaymentDatabase(values);
        await payment.save();

        // Fetch the customer's invoices ordered by oldest first and by status
        let InvoiceDatabase = checkDbForEntity("invoices"); // Fixed typo "invocies" to "invoices"
        const invoices = await InvoiceDatabase.find({
            customer: id, // Use the correct customerId
            status: { $in: ["DRAFT", "PARTIALLY_PAID"] },
        }).sort({ createdAt: 1 });

        let remainingAmount = values.amount; // Use payment amount from request

        // Check it Customer i having any Advance Amount
        let CustomerDatabase = checkDbForEntity("customers");

        let customerData = await CustomerDatabase.findOne({
            _id: values.customer,
        });

        // IF Customer is Having Advance take into account then Update account
        if (customerData?.advanceAmount > 0) {
            remainingAmount = customerData?.advanceAmount + remainingAmount;
            await CustomerDatabase.updateOne(
                { _id: values.customer },
                { $set: { advanceAmount: 0 } }
            );
        }

        // Distribute the payment across invoices and update them with the payment ID
        for (const invoice of invoices) {
            if (remainingAmount <= 0) break;

            // Calculate the total amount already paid on this invoice
            let totalPaid = (invoice.payments || []).reduce(
                (sum, payment) => sum + payment.amount,
                0
            );

            // Calculate the amount remaining to be paid on this invoice
            const amountDue = invoice.grandTotal - totalPaid;
            const amountToApply = Math.min(remainingAmount, amountDue);

            // Update invoice status
            if (remainingAmount >= amountDue) {
                invoice.status = "FULL_PAID";
            } else {
                invoice.status = "PARTIALLY_PAID";
            }

            // Add the payment reference to the invoice
            invoice.payments = invoice.payments || [];
            invoice.payments.push({
                paymentId: payment._id,
                amount: amountToApply,
            });

            await invoice.save();
            remainingAmount -= amountToApply;
        }

        // If remaining amount exists, update the customer's advanceAmount
        if (remainingAmount > 0) {
            let CustomerDatabase = checkDbForEntity("customers");
            await CustomerDatabase.updateOne(
                { _id: id },
                {
                    $inc: { advanceAmount: remainingAmount },
                }
            );
        }

        res.status(201).json({ success: true, payment });
    } catch (error) {
        next(error);
    }
};

export default recordPayment;

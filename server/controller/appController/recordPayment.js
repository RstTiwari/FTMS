import checkDbForEntity from "../../Helper/databaseSelector.js";

const recordPayment = async (req, res, next) => {
    try {
        const { values } = req.body; // Payment values
        let { entity, id } = req.query; // Payment values

        if (!values) {
            throw new Error("Invalid Payload");
        }
        let tenantId = req.tenantId;
        values.tenantId = tenantId;
        // Create the payment record first
        const PaymentDatabase = checkDbForEntity(entity);
        const payment = new PaymentDatabase(values);
        await payment.save({ req });

        if (entity === "paymentsreceived") {
            // Fetch the customer's invoices ordered by oldest first and by status
            let InvoiceDatabase = checkDbForEntity("invoices"); // Fixed typo "invocies" to "invoices"
            const invoices = await InvoiceDatabase.find({
                customer: id, // Use the correct customerId
                tenantId: tenantId,
                status: { $in: ["DRAFT", "PARTIALLY_RECEIVED"] },
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
                    { _id: values.customer, tenantId: tenantId },
                    { $set: { advanceAmount: 0 } }
                );
            }

            // Distribute the payment across invoices and update them with the payment ID
            for (const invoice of invoices) {
                if (remainingAmount <= 0) break;
                // Calculate the total amount already paid on this invoice
                let totalPaid = invoice?.paymentReceived || 0;

                // Calculate the amount remaining to be paid on this invoice
                const amountDue = invoice.grandTotal - totalPaid;
                const amountToApply = Math.min(remainingAmount, amountDue);

                // Update invoice status
                if (remainingAmount >= amountDue) {
                    invoice.status = "FULL_RECEIVED";
                } else {
                    invoice.status = "PARTIALLY_RECEIVED";
                }

                // Add the payment reference to the invoice
                invoice.paymentReceived = amountToApply;

                await invoice.save();
                remainingAmount -= amountToApply;
            }

            // If remaining amount exists, update the customer's advanceAmount
            if (remainingAmount > 0) {
                let CustomerDatabase = checkDbForEntity("customers");
                await CustomerDatabase.updateOne(
                    { _id: id, tenantId: tenantId },
                    {
                        $inc: { advanceAmount: remainingAmount },
                    }
                );
            }
        } else if (entity === "paymentsmade") {
            // Fetch the vendor's purchases (invoices) ordered by oldest first and by status
            let PurchaseDatabase = checkDbForEntity("purchases");
            const purchases = await PurchaseDatabase.find({
                vendor: id,
                tenantId: tenantId,
                status: { $in: ["DRAFT", "PARTIALLY_PAID"] },
            }).sort({ createdAt: 1 });
            let remainingAmount = values.amount; // Use payment amount from request

            // Check if the Vendor is having any Advance Amount
            let VendorDatabase = checkDbForEntity("vendors");

            let vendorData = await VendorDatabase.findOne({
                _id: id,
                tenantId: tenantId,
            });

            // If Vendor is having Advance, take it into account and update the account
            if (vendorData?.advanceAmount > 0) {
                remainingAmount = vendorData?.advanceAmount + remainingAmount;
                await VendorDatabase.updateOne(
                    { _id: id, tenantId: tenantId },
                    { $set: { advanceAmount: 0 } }
                );
            }
            // Distribute the payment across purchases and update them with the payment ID
            for (const purchase of purchases) {
                if (remainingAmount <= 0) break;
                // Calculate the total amount already paid on this purchase
                let totalPaid = purchase?.paymentMaded || 0;

                // Calculate the amount remaining to be paid on this purchase
                const amountDue = purchase.grandTotal - totalPaid;
                const amountToApply = Math.min(remainingAmount, amountDue);

                // Update purchase status
                if (remainingAmount >= amountDue) {
                    purchase.status = "FULL_PAID";
                } else {
                    purchase.status = "PARTIALLY_PAID";
                }

                // Add the payment reference to the purchase
                purchase.paymentMaded = amountToApply;
                await purchase.save();
                remainingAmount -= amountToApply;
            }

            // If remaining amount exists, update the vendor's advanceAmount
            if (remainingAmount > 0) {
                await VendorDatabase.updateOne(
                    { _id: id, tenantId: tenantId },
                    {
                        $inc: { advanceAmount: remainingAmount },
                    }
                );
            }
        }

        res.status(201).json({ success: true, payment });
    } catch (error) {
        next(error);
    }
};

export default recordPayment;

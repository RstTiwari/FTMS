import checkDbForEntity from "../../Helper/databaseSelector.js";
const updatePayment = async (req, res, next) => {
    try {
        let tenantId = req.tenantId;
        const { values } = req.body;
        const { entity, id } = req.query;
        const PaymentDatabase = checkDbForEntity(entity);

        // check the existing payement Obj
        let existingPayment = await PaymentDatabase.findOne({
            _id: id,
            tenantId: tenantId,
        });

        if (!existingPayment) {
            throw new Error("No such payment record");
        }
        //now update the old payment\
        let newPaymentObj = Object.assign(existingPayment, values);
        let response = await PaymentDatabase.updateOne(
            { _id: id, tenantId: tenantId },
            { $set: newPaymentObj }
        );

        // const oldAmount = existingPayment?.amount;
        // let newAmount = values?.amount;

        // // Calculate the percentage change
        // const percentageChange = Math.abs((newAmount - oldAmount) / oldAmount);

        // // Check if the change is within the allowed range (10%)
        // if (percentageChange > 0.1) {
        //     throw new Error(
        //         "Payment amount change exceeds the allowed limit of 10%"
        //     );
        // }

        // if (oldAmount !== newAmount) {
        //     const amountDifference = newAmount - oldAmount;
        //     existingPayment.amount = amountDifference;

        //     // Here i m going to redistribute the payment
        //     redistributePayment(existingPayment, amountDifference);

        //     //now update the old payment\
        //     let newPaymentObj = Object.assign(existingPayment, values);
        //     await PaymentDatabase.updateOne(
        //         { _id: id },
        //         { $set: { newPaymentObj } }
        //     );
        // }

        res.status(200).json({ success: 1, result: response });
    } catch (error) {
        next(error);
    }
};

const redistributePayment = async (payment, amountDifference) => {
    const InvoiceDatabase = checkDbForEntity("invoices");

    // Fetch the invoice associated with this payment
    const invoice = await InvoiceDatabase.findOne({
        "paymentsreceived.paymentId": payment._id,
    });

    if (!invoice) {
        throw new Error("Invoice not found");
    }

    const totalPaid = (invoice.paymentsreceived || []).reduce(
        (sum, paymentEntry) => {
            if (paymentEntry.paymentId.equals(payment._id)) {
                return sum + paymentEntry.amount;
            }
            return sum;
        },
        0
    );

    const amountDue = invoice.grandTotal - totalPaid;

    if (amountDifference > 0) {
        // Payment amount increased
        const amountToApply = Math.min(amountDifference, amountDue);

        // Update invoice status
        if (amountToApply >= amountDue) {
            invoice.status = "FULL_PAID";
        } else {
            invoice.status = "PARTIALLY_PAID";
        }

        // Update or add the payment reference to the invoice
        const paymentEntry = invoice.paymentsreceived.find((p) =>
            p.paymentId.equals(payment._id)
        );
        if (paymentEntry) {
            paymentEntry.amount += amountToApply; // Update the existing payment entry
        } else {
            invoice.paymentsreceived.push({
                paymentId: payment._id,
                amount: amountToApply,
            }); // Add a new payment entry
        }

        await invoice.save();
    } else if (amountDifference < 0) {
        // Payment amount decreased
        const decreaseAmount = -amountDifference;
        const paymentEntry = invoice.paymentsreceived.find((p) =>
            p.paymentId.equals(payment._id)
        );

        if (paymentEntry) {
            const amountToReduce = Math.min(
                decreaseAmount,
                paymentEntry.amount
            );
            paymentEntry.amount -= amountToReduce;

            if (
                paymentEntry.amount <= 0 ||
                invoice.grandTotal - totalPaid + amountToReduce > 0
            ) {
                invoice.status = "PARTIALLY_PAID";
            }
            await invoice.save();

            if (decreaseAmount > amountToReduce) {
                const CustomerDatabase = checkDbForEntity("customers");
                const customer = await CustomerDatabase.findById(
                    payment.customer
                );
                customer.advanceAmount =
                    (customer.advanceAmount || 0) +
                    (decreaseAmount - amountToReduce);
                await customer.save();
            }
        } else {
            throw new Error("Payment entry not found in the invoice");
        }
    }
    return;
};

export default updatePayment;

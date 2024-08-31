import checkDbForEntity from "../../Helper/databaseSelector.js";
const updatePayment = async (req, res, next) => {
    try {
        let tenantId = req.tenantId;
        const { values } = req.body;
        const { entity, id } = req.query;
        const PaymentDatabase = checkDbForEntity(entity);
        let Database =
            entity === "paymentsreceived"
                ? checkDbForEntity("invoices")
                : checkDbForEntity("purchases");

        let isReceivedPayment = entity === "paymentsreceived";
        let amountKey = isReceivedPayment ? "receivedAmount" : "amountPaid";

        let filter = isReceivedPayment
            ? {
                  status: "PARTIAL_RECEIVED",
              }
            : {
                  status: "PARTIAL_PAID",
              };

        // check the existing payements Obj
        let existingPayment = await PaymentDatabase.findOne({
            _id: id,
            tenantId: tenantId,
        });

        if (!existingPayment) {
            throw new Error("No such payment record");
        }
        //now update the old payment\
        let oldAmount = existingPayment?.amount;
        let newAmount = values?.amount;
        let amountToSettle = newAmount - oldAmount;

        if (amountToSettle === 0) {
            let newPaymentObj = Object.assign(existingPayment, values);
            let response = await PaymentDatabase.updateOne(
                { _id: id, tenantId: tenantId },
                { $set: newPaymentObj }
            );
            return res.status(200).json({ success: 1, result: response });
        }

        //when new amount decresed
        if (amountToSettle < 0) {
            // First check with only DRAFT,PARTIAL PAID
            let PARTIALDATAS = await Database.find(filter).sort({
                createdAt: -1,
            });
            amountToSettle = Math.abs(amountToSettle);
            for (let item of PARTIALDATAS) {
                let amountToDecrese = Math.min(amountToSettle, item[amountKey]);
                item[amountKey] -= amountToDecrese;
                amountToSettle -= amountToDecrese;

                if (item[amountKey] <= 0) {
                    item.status = "DRAFT"; // or another default status
                } else if (item[amountKey] < item.grandTotal) {
                    item.status = isReceivedPayment
                        ? "PARTIAL_RECEIVED"
                        : "PARTIAL_PAID";
                }

                await item.save();

                if (amountToSettle <= 0) {
                    break;
                }
            }

            // Still there are some amount to settle then need to Deduct from FULLY_PAID
            filter = isReceivedPayment
                ? { status: "FULL_RECEIVED" }
                : { status: "FULL_PAID" };

            let FULLPAIDDATA = await Database.find(filter).sort({
                createdAt: -1,
            });
            amountToSettle = Math.abs(amountToSettle);
            for (let item of FULLPAIDDATA) {
                let amountToDecrese = Math.min(amountToSettle, item[amountKey]);
                item[amountKey] -= amountToDecrese;
                amountToSettle -= amountToDecrese;

                if (item[amountKey] <= 0) {
                    item.status = "DRAFT"; // or another default status
                } else if (item[amountKey] < item.grandTotal) {
                    item.status = isReceivedPayment
                        ? "PARTIAL_RECEIVED"
                        : "PARTIAL_PAID";
                }

                await item.save();

                if (amountToSettle <= 0) {
                    break;
                }
            }
        }

        // when New is Incresed
        if (amountToSettle > 0) {
            let items = await Database.find(filter).sort({ createdAt: 1 });
            for (let item of items) {
                let incrementAmount = Math.min(
                    amountToSettle,
                    item.grandTotal - item[amountKey]
                );
                item[amountKey] += incrementAmount;
                amountToSettle -= incrementAmount;

                if (item[amountKey] >= item.grandTotal) {
                    item.status = isReceivedPayment
                        ? "FULL_RECEIVED"
                        : "FULL_PAID";
                } else {
                    item.status = isReceivedPayment
                        ? "PARTIAL_RECEIVED"
                        : "PARTIAL_PAID";
                }

                await item.save();
                if (amountToSettle <= 0) {
                    break;
                }
            }
        }

        let newPaymentObj = Object.assign(existingPayment, values);
        let response = await PaymentDatabase.updateOne(
            { _id: id, tenantId: tenantId },
            { $set: newPaymentObj },
            { req }
        );

        return res.status(200).json({ success: 1, result: response });
    } catch (error) {
        next(error);
    }
};

export default updatePayment;

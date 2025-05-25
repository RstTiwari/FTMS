import checkDbForEntity from "../../Helper/databaseSelector.js";
import { localDateString } from "../../Helper/timehelper.js";

const getLeadger = async (req, res, next) => {
    try {
        const { id, type, startOfPeriod, endOfPeriod } = req.query;
        let tenantId = req.tenantId;
        if (!tenantId || !id || !type || !startOfPeriod || !endOfPeriod) {
            return res
                .status(400)
                .json({ message: "Missing required query parameters." });
        }

        const start = new Date(startOfPeriod);
        const end = new Date(endOfPeriod);

        const isCustomer = type === "customers";
        const matchKey = isCustomer ? "customer" : "vendor";
        const entityDateMatchKey = isCustomer ? "invoiceDate" : "purchaseDate";
        const paymentDateMatchKey = "paymentDate";
        const customerDb = checkDbForEntity( isCustomer ? "customers":"vendors")
        const customerData = await customerDb.findOne({_id:id});
        let tenantDb = checkDbForEntity("tenant")

        const sourceDb = isCustomer
            ? checkDbForEntity("invoices")
            : checkDbForEntity("purchases");

        const paymentDb = isCustomer
            ? checkDbForEntity("paymentsreceived")
            : checkDbForEntity("paymentsmade");

        const openingEntityData = await sourceDb
            .find(
                {
                    tenantId: tenantId,
                    [matchKey]: id,
                    [entityDateMatchKey]: { $lt: start },
                },
                { grandTotal: 1 }
            )
            .lean();

        const openingPaymentsData = await paymentDb
            .find(
                {
                    tenantId: tenantId,
                    [matchKey]: id,
                    [paymentDateMatchKey]: { $lt: startOfPeriod },
                },
                { amount: 1 }
            )
            .lean();

        let openingEntityAmount = openingEntityData.reduce(
            (cur, acc) => cur + acc.grandTotal,
            0
        );
        let openingPaymentAmount = openingPaymentsData.reduce(
            (cur, acc) => cur + acc.amount,
            0
        );
        const openingBalanceAmount =
            openingEntityAmount > openingPaymentAmount
                ? openingEntityAmount - openingPaymentAmount
                : 0;
        const openingExtraAmount =
            openingPaymentAmount > openingEntityAmount
                ? openingPaymentAmount - openingEntityAmount
                : 0;

        const inRangeEntity = await sourceDb
            .find(
                {
                    tenantId: tenantId,
                    [matchKey]: id,
                    [entityDateMatchKey]: { $gte: start, $lte: end },
                },
                {
                    [entityDateMatchKey]: 1,
                    grandTotal: 1,
                    prefix: 1,
                    no: 1,
                    suffix: 1,
                }
            )
            .sort({ [entityDateMatchKey]: 1 })
            .lean();

        const inRangePayments = await paymentDb
            .find(
                {
                    tenantId: tenantId,
                    [matchKey]: id,
                    [paymentDateMatchKey]: { $gte: start, $lte: end },
                },
                {
                    [paymentDateMatchKey]: 1,
                    amount: 1,
                    prefix: 1,
                    no: 1,
                    suffix: 1,
                }
            )
            .sort({ [paymentDateMatchKey]: 1 })
            .lean();

        let inRangeEntityAmount = inRangeEntity.reduce(
            (cur, acc) => cur + acc.grandTotal,
            0
        );

        let inRangePaymentAmount = inRangePayments.reduce(
            (cur, acc) => cur + acc.amount,
            0
        );
        let totalBalanceDue =  (openingBalanceAmount+inRangeEntityAmount) - inRangePaymentAmount

        const combinedData = [
            ...inRangeEntity.map((item) => ({
                ...item,
                type: type === "customers" ? "Invoice" : "Purchase",
                amount: item?.grandTotal,
                date: new Date(item[entityDateMatchKey]),
                details: ` ${type == "customers" ? "Invoice for No " :"Purchase of No "}${item.prefix ? item.prefix:""}${item.no}${
                    item.suffix ? item.suffix:""
                } `,
            })),
            ...inRangePayments.map((item) => ({
                ...item,
                payment: item?.amount,
                type:
                    type === "customers" ? "Payment Received" : "Payment Made",
                date: new Date(item[paymentDateMatchKey]),
                details: `${item.amount} for payment of ${
                    item.prefix ? item.prefix : ""
                }${item.no}${item.suffix ? item.suffix : ""}`,
            })),
        ].sort((a, b) => a.date - b.date);
        let balance = openingBalanceAmount;
        let updateCombinedData = combinedData.map((item) => {
            if (item.type == "Invoice" || item.type == "Purchase") {
                balance += item.amount;
            } else if (
                item.type === "Payment Received" || item.type === "Payment Made"
            ) {
                balance -= item.amount;
            }
            return { ...item, balance: balance };
        });
        
        updateCombinedData.unshift({
            date:startOfPeriod,
            type:"****Opening Balance****",
            amount:openingBalanceAmount,
            balance:openingBalanceAmount
        })

        let organization = await tenantDb.findOne({ _id: tenantId });
        
        const response = {
            success: 1,
            message: "Fetched Data successfully",
            result: {
                openingBalanceAmount,
                openingExtraAmount,
                totalAmount: inRangeEntityAmount,
                totalReceived: inRangePaymentAmount,
                type: type,
                data: updateCombinedData,
                startOfPeriod: startOfPeriod,
                endOfPeriod: endOfPeriod,
                customerData: customerData,
                totalBalanceDue: totalBalanceDue,
                organization: organization,
            },
        };
        return res.json(response);
    } catch (error) {
        next(error);
    }
};

export default getLeadger;

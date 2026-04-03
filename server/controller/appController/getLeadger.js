import checkDbForEntity from "../../Helper/databaseSelector.js";


const getLeadger = async (req, res, next) => {
    try {
        const { id, type, startOfPeriod, endOfPeriod } = req.query;
        const tenantId = req.tenantId;

        if (!tenantId || !id || !type || !startOfPeriod || !endOfPeriod) {
            return res.status(400).json({
                message: "Missing required query parameters.",
            });
        }

        const start = new Date(startOfPeriod);
        const end = new Date(endOfPeriod);

        const isCustomer = type === "customers";

        const matchKey = isCustomer ? "customer" : "vendor";
        const entityDateKey = isCustomer ? "invoiceDate" : "purchaseDate";
        const paymentDateKey = "paymentDate";

        const sourceDb = isCustomer
            ? checkDbForEntity("invoices")
            : checkDbForEntity("purchases");

        const paymentDb = isCustomer
            ? checkDbForEntity("paymentsreceived")
            : checkDbForEntity("paymentsmade");

        const partyDb = checkDbForEntity(
            isCustomer ? "customers" : "vendors"
        );
        const tenantDb = checkDbForEntity("tenant");

        const partyData = await partyDb.findOne({ _id: id });

        // =========================
        // 🔹 OPENING CALCULATION
        // =========================

        const openingEntities = await sourceDb
            .find({
                tenantId,
                [matchKey]: id,
                [entityDateKey]: { $lt: start },
            })
            .select("grandTotal")
            .lean();

        const openingPayments = await paymentDb
            .find({
                tenantId,
                [matchKey]: id,
                [paymentDateKey]: { $lt: start },
            })
            .select("amount")
            .lean();

        const openingEntityAmount = openingEntities.reduce(
            (sum, item) => sum + (item.grandTotal || 0),
            0
        );

        const openingPaymentAmount = openingPayments.reduce(
            (sum, item) => sum + (item.amount || 0),
            0
        );

        // ✅ Net Opening
        const openingNet = openingEntityAmount - openingPaymentAmount;

        const openingBalanceAmount =
            openingNet > 0 ? openingNet : 0;

        const openingAdvanceAmount =
            openingNet < 0 ? Math.abs(openingNet) : 0;



        const inRangeEntities = await sourceDb
            .find({
                tenantId,
                [matchKey]: id,
                [entityDateKey]: { $gte: start, $lte: end },
            })
            .select(
                `${entityDateKey} grandTotal prefix no suffix`
            )
            .sort({ [entityDateKey]: 1 })
            .lean();

        const inRangePayments = await paymentDb
            .find({
                tenantId,
                [matchKey]: id,
                [paymentDateKey]: { $gte: start, $lte: end },
            })
            .select(
                `${paymentDateKey} amount prefix no suffix`
            )
            .sort({ [paymentDateKey]: 1 })
            .lean();

        const totalEntityAmount = inRangeEntities.reduce(
            (sum, item) => sum + (item.grandTotal || 0),
            0
        );

        const totalPaymentAmount = inRangePayments.reduce(
            (sum, item) => sum + (item.amount || 0),
            0
        );

   
        const combinedData = [
            ...inRangeEntities.map((item) => ({
                date: new Date(item[entityDateKey]),
                type: isCustomer ? "Invoice" : "Purchase",
                nature: "DEBIT",
                amount: item.grandTotal,
                details: `${
                    isCustomer ? "Invoice No " : "Purchase No "
                }${item.prefix || ""}${item.no}${item.suffix || ""}`,
            })),

            ...inRangePayments.map((item) => ({
                date: new Date(item[paymentDateKey]),
                type: isCustomer
                    ? "Payment Received"
                    : "Payment Made",
                nature: "CREDIT",
                amount: item.amount,
                details: `Payment ${item.prefix || ""}${item.no}${
                    item.suffix || ""
                }`,
            })),
        ].sort((a, b) => a.date - b.date);

        let running = openingBalanceAmount - openingAdvanceAmount;

        const ledgerData = combinedData.map((item) => {
            if (item.nature === "DEBIT") {
                running += item.amount;
            } else {
                running -= item.amount;
            }

            return {
                ...item,
                balance: running > 0 ? running : 0,
                advance: running < 0 ? Math.abs(running) : 0,
            };
        });

        ledgerData.unshift({
            date: start,
            type: "**** Opening Balance ****",
            amount: openingBalanceAmount,
            balance: openingBalanceAmount,
            advance: openingAdvanceAmount,
        });

      
        const netFinal =
            openingBalanceAmount +
            totalEntityAmount -
            totalPaymentAmount;

        const totalBalanceDue = netFinal > 0 ? netFinal : 0;
        const totalAdvance = netFinal < 0 ? Math.abs(netFinal) : 0;

        const organization = await tenantDb.findOne({
            _id: tenantId,
        });

        // =========================
        // 🔹 RESPONSE
        // =========================

        return res.json({
            success: 1,
            message: "Fetched Ledger Successfully",
            result: {
                type,
                partyData,
                organization,

                startOfPeriod,
                endOfPeriod,

                openingBalanceAmount,
                openingAdvanceAmount,

                totalAmount: totalEntityAmount,
                totalPayment: totalPaymentAmount,

                totalBalanceDue,
                totalAdvance,

                data: ledgerData,
            },
        });
    } catch (error) {
        next(error);
    }
};

export default getLeadger;


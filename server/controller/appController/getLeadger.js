import checkDbForEntity from "../../Helper/databaseSelector.js";

const getLeadger = async (req, res, next) => {

    try {

        const {
            id,
            type,
            startOfPeriod,
            endOfPeriod,
        } = req.query;

        const tenantId = req.tenantId;

        if (
            !tenantId ||
            !id ||
            !type ||
            !startOfPeriod ||
            !endOfPeriod
        ) {
            return res.status(400).json({
                success: 0,
                message: "Missing required query parameters.",
            });
        }

        const start = new Date(startOfPeriod);
        const end = new Date(endOfPeriod);

        const isCustomer =
            type === "customers";

        // =====================================
        // DATABASES
        // =====================================

        const sourceDb = isCustomer
            ? checkDbForEntity("invoices")
            : checkDbForEntity("purchases");

        const paymentDb = isCustomer
            ? checkDbForEntity("paymentsreceived")
            : checkDbForEntity("paymentsmade");

        const partyDb = checkDbForEntity(
            isCustomer
                ? "customers"
                : "vendors"
        );

        const tenantDb =
            checkDbForEntity("tenant");

        // =====================================
        // DYNAMIC KEYS
        // =====================================

        const matchKey = isCustomer
            ? "customer"
            : "vendor";

        const entityDateKey = isCustomer
            ? "invoiceDate"
            : "purchaseDate";

        const paymentDateKey =
            "paymentDate";

        // =====================================
        // PARTY + ORG
        // =====================================

        const partyData =
            await partyDb.findOne({
                _id: id,
            });

        const organization =
            await tenantDb.findOne({
                _id: tenantId,
            });

        // =====================================
        // OPENING ENTRIES
        // =====================================

        const openingEntities =
            await sourceDb
                .find({
                    tenantId,
                    [matchKey]: id,
                    [entityDateKey]: {
                        $lt: start,
                    },
                })
                .select(
                    `${entityDateKey} grandTotal prefix no suffix`
                )
                .lean();

        const openingPayments =
            await paymentDb
                .find({
                    tenantId,
                    [matchKey]: id,
                    [paymentDateKey]: {
                        $lt: start,
                    },
                })
                .select(
                    `${paymentDateKey} amount prefix no suffix`
                )
                .lean();

        // =====================================
        // OPENING TOTALS
        // =====================================

        const openingDebit =
            openingEntities.reduce(
                (sum, item) => {
                    return (
                        sum +
                        (item.grandTotal || 0)
                    );
                },
                0
            );

        const openingCredit =
            openingPayments.reduce(
                (sum, item) => {
                    return (
                        sum +
                        (item.amount || 0)
                    );
                },
                0
            );

        // =====================================
        // IMPORTANT ACCOUNTING LOGIC
        // =====================================

        // CUSTOMER:
        // Invoice  -> Debit
        // Payment  -> Credit

        // VENDOR:
        // Purchase -> Credit
        // Payment  -> Debit

        let openingNet = 0;

        if (isCustomer) {

            openingNet =
                openingDebit -
                openingCredit;

        } else {

            openingNet =
                openingCredit -
                openingDebit;
        }

        // =====================================
        // CURRENT PERIOD ENTRIES
        // =====================================

        const inRangeEntities =
            await sourceDb
                .find({
                    tenantId,
                    [matchKey]: id,
                    [entityDateKey]: {
                        $gte: start,
                        $lte: end,
                    },
                })
                .select(
                    `${entityDateKey} grandTotal prefix no suffix`
                )
                .sort({
                    [entityDateKey]: 1,
                })
                .lean();

        const inRangePayments =
            await paymentDb
                .find({
                    tenantId,
                    [matchKey]: id,
                    [paymentDateKey]: {
                        $gte: start,
                        $lte: end,
                    },
                })
                .select(
                    `${paymentDateKey} amount prefix no suffix`
                )
                .sort({
                    [paymentDateKey]: 1,
                })
                .lean();

        // =====================================
        // NORMALIZED LEDGER DATA
        // =====================================

        const combinedData = [

            // =================================
            // INVOICE / PURCHASE
            // =================================

            ...inRangeEntities.map(
                (item) => {

                    const amount =
                        item.grandTotal || 0;

                    return {

                        date: new Date(
                            item[
                                entityDateKey
                            ]
                        ),

                        voucherType:
                            isCustomer
                                ? "Sales"
                                : "Purchase",

                        voucherNo:
                            `${item.prefix || ""}${item.no}${item.suffix || ""}`,

                        particulars:
                            isCustomer
                                ? "To SALES"
                                : "By PURCHASE",

                        debit:
                            isCustomer
                                ? amount
                                : 0,

                        credit:
                            isCustomer
                                ? 0
                                : amount,
                    };
                }
            ),

            // =================================
            // PAYMENTS
            // =================================

            ...inRangePayments.map(
                (item) => {

                    const amount =
                        item.amount || 0;

                    return {

                        date: new Date(
                            item[
                                paymentDateKey
                            ]
                        ),

                        voucherType:
                            isCustomer
                                ? "Receipt"
                                : "Payment",

                        voucherNo:
                            `${item.prefix || ""}${item.no}${item.suffix || ""}`,

                        particulars:
                            isCustomer
                                ? "By BANK"
                                : "To BANK",

                        debit:
                            isCustomer
                                ? 0
                                : amount,

                        credit:
                            isCustomer
                                ? amount
                                : 0,
                    };
                }
            ),

        ].sort(
            (a, b) =>
                a.date - b.date
        );

        // =====================================
        // RUNNING BALANCE
        // =====================================

        let runningBalance =
            openingNet;

        const ledgerData = [];

        // =====================================
        // OPENING ROW
        // =====================================

        ledgerData.push({

            date: start,

            voucherType: "",

            voucherNo: "-",

            particulars:
                "Brought Forward",

            debit:
                openingNet > 0
                    ? openingNet
                    : 0,

            credit:
                openingNet < 0
                    ? Math.abs(
                          openingNet
                      )
                    : 0,

            balance: runningBalance,
        });

        // =====================================
        // TRANSACTIONS
        // =====================================

        for (const item of combinedData) {

            runningBalance +=
                item.debit;

            runningBalance -=
                item.credit;

            ledgerData.push({

                ...item,

                balance:
                    runningBalance,
            });
        }

        // =====================================
        // TOTALS
        // =====================================

        const totalDebit =
            combinedData.reduce(
                (sum, item) => {
                    return (
                        sum +
                        item.debit
                    );
                },
                0
            );

        const totalCredit =
            combinedData.reduce(
                (sum, item) => {
                    return (
                        sum +
                        item.credit
                    );
                },
                0
            );

        const closingBalance =
            runningBalance;

        // =====================================
        // RESPONSE
        // =====================================

        return res.json({

            success: 1,

            message:
                "Fetched Ledger Successfully",

            result: {

                type,

                partyData,

                organization,

                startOfPeriod,

                endOfPeriod,

                openingBalance:
                    openingNet,

                totalDebit,

                totalCredit,

                closingBalance,

                data: ledgerData,
            },
        });

    } catch (error) {

        next(error);
    }
};

export default getLeadger;
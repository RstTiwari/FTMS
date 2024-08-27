import checkDbForEntity from "../../Helper/databaseSelector.js";

const totalReciveables = async (req, res, next) => {
    try {
        let { id, entity, period } = req.query;
        let tenantId = req.tenantId;
        let InvoiceDatabase = checkDbForEntity("invoices");
        let PaymentDataBase = checkDbForEntity("paymentsreceived");
        let PaymentMadeDatabase = checkDbForEntity("paymentsmade");
        let CustomerDatabase = checkDbForEntity("customers");
        let VednorDatabase = checkDbForEntity("vendors");
        let PurchaseOrderDatabase = checkDbForEntity("purchases");
        let ExpenseDataBase = checkDbForEntity("expenses");
        let result = [];

        if (entity === "customers") {
            let filter = { customer: id, tenantId: tenantId };

            let invoices = await InvoiceDatabase.find(filter);
            let totalReciveables = invoices.reduce(
                (sum, invocie) => sum + invocie?.grandTotal,
                0
            );
            let paymentsreceived = await PaymentDataBase.find(filter);
            let totalRecived = paymentsreceived.reduce(
                (sum, payment) => sum + payment?.amount,
                0
            );

            let totalPending =
                totalReciveables > totalRecived
                    ? totalReciveables - totalRecived
                    : 0;

            let customers = await CustomerDatabase.findOne({ _id: id });
            let totalAdvanceAmount = customers?.advanceAmount
                ? customers?.advanceAmount
                : 0;

            if (entity === "customers") {
                result.push(
                    { title: "Total Amount", value: totalReciveables, id: "1" },
                    { title: "Total Received", value: totalRecived, id: "2" },
                    { title: "Total Pending", value: totalPending, id: "3" },
                    {
                        title: "Advance Given",
                        value: totalAdvanceAmount,
                        id: "4",
                    }
                );
            }
        } else if (entity === "vendors") {
            let purchases = await PurchaseOrderDatabase.find({
                vendor: id,
                tenantId: tenantId,
            });
            console.log(purchases, "=");
            let totalPaybles = (purchases || []).reduce(
                (sum, purchase) => sum + purchase.grandTotal,
                0
            );

            let paymentsMade = await PaymentMadeDatabase.find({
                vendor: id,
                tenantId: tenantId,
            });
            let totalPaid = (paymentsMade || []).reduce(
                (sum, payment) => sum + payment?.amount,
                0
            );

            let totalToPay =
                totalPaybles > totalPaid ? totalPaybles - totalPaid : 0;

            let vendor = await VednorDatabase.findOne({
                _id: id,
                tenantId: tenantId,
            });
            let advancePaid = vendor?.advanceAmount || 0;
            result.push(
                {
                    title: "Total Payables",
                    value: totalPaybles,
                    id: "1",
                },
                {
                    title: "Total Paid",
                    value: totalPaid,
                    id: "2",
                },
                {
                    title: "Total Pending",
                    value: totalToPay,
                    id: "3",
                },
                {
                    title: "Advance Paid",
                    value: advancePaid,
                    id: "4",
                }
            );
        } else if (entity === "tenant") {
            let filter = {
                tenantId: tenantId,
                status: { $in: ["DRAFT", "PARTIALLY_RECEIVED"] },
            };
            const today = new Date();
            const fifteenDaysAgo = new Date(today);
            fifteenDaysAgo.setDate(today.getDate() - 15);

            const thirtyDaysAgo = new Date(today);
            thirtyDaysAgo.setDate(today.getDate() - 30);

            const fortyFiveDaysAgo = new Date(today);
            fortyFiveDaysAgo.setDate(today.getDate() - 45);

            const categorizedInvoices = {
                last15Days: 0,
                last16To30Days: 0,
                last31To45Days: 0,
                above45Days: 0,
                totalReceivables: 0,
            };

            let invoices = await InvoiceDatabase.find(filter);
            invoices.forEach((invoice) => {
                const dueDate = new Date(invoice.dueDate);
                let pendingAmount = 0;

                if (invoice.status === "DRAFT") {
                    // If the status is DRAFT, the entire grandTotal is pending
                    pendingAmount = invoice.grandTotal;
                } else if (invoice.status === "PARTIALLY_RECEIVED") {
                    // Calculate total received from paymentsreceived array
                    // Calculate pending amount for PARTIALLY_PAID invoices
                    let receivedAmount = invoice?.paymentsReceived || 0;
                    pendingAmount = invoice?.grandTotal - receivedAmount;
                }

                // Categorize the pending amount based on due date
                if (dueDate >= fifteenDaysAgo && dueDate <= today) {
                    categorizedInvoices.last15Days += pendingAmount;
                } else if (
                    dueDate >= thirtyDaysAgo &&
                    dueDate < fifteenDaysAgo
                ) {
                    categorizedInvoices.last16To30Days += pendingAmount;
                } else if (
                    dueDate >= fortyFiveDaysAgo &&
                    dueDate < thirtyDaysAgo
                ) {
                    categorizedInvoices.last31To45Days += pendingAmount;
                } else if (dueDate < fortyFiveDaysAgo) {
                    categorizedInvoices.above45Days += pendingAmount;
                }

                // Add the pending amount to the total receivables
                categorizedInvoices.totalReceivables += pendingAmount;
            });
            result = categorizedInvoices;
        } else if (entity === "purchaseAndExpenses") {
            let startOfYear, endOfYear;
            let currentYear = new Date().getFullYear();

            if (period === "this_fiscal_year") {
                startOfYear = new Date(currentYear, 0, 1); // january Month 1 date
                endOfYear = new Date(currentYear, 11, 31); // 31 of Decemebr of this year
            } else if (period === "last_fiscal_year") {
                startOfYear = new Date(currentYear - 1, 0, 1); // last year Jaunary
                endOfYear = new Date(currentYear - 1, 11, 31);
            } else {
                throw new Error("invlaid Period");
            }
            // Fetch data from the database within the determined date range
            const expenses = await ExpenseDataBase.find({
                expenseDate: { $gte: startOfYear, $lte: endOfYear },
                tenantId: id,
            });

            const purchases = await PurchaseOrderDatabase.find({
                purchaseDate: { $gte: startOfYear, $lte: endOfYear },
                tenantId: id,
            });

            // Initialize the response array with months and 0 values
            const months = Array.from({ length: 12 }, (_, i) => ({
                name: new Date(startOfYear.getFullYear(), i).toLocaleString(
                    "default",
                    { month: "short", year: "numeric" }
                ),
                Purchase: 0,
                Expenses: 0,
            }));

            // Sum up the expenses
            expenses.forEach((expense) => {
                const monthIndex = new Date(expense.expenseDate).getMonth();
                months[monthIndex].Expenses += expense.amount;
            });

            // Sum up the purchases
            purchases.forEach((purchase) => {
                const monthIndex = new Date(purchase.purchaseDate).getMonth();
                months[monthIndex].Purchase += purchase.grandTotal;
            });

            // Calculate totals
            const totalExpenses = expenses.reduce(
                (sum, expense) => sum + expense.amount,
                0
            );
            const totalPurchase = purchases.reduce(
                (sum, purchase) => sum + purchase.grossTotal,
                0
            );
            const total = totalExpenses + totalPurchase;

            let response = {
                purchaseAndExpense: months,
                totalExpenses: totalExpenses ? totalExpenses.toFixed(2) : 0,
                totalPurchase: totalPurchase ? totalPurchase.toFixed(2) : 0,
                total: total ? total.toFixed(2) : 0,
            };
            result = response;
        } else if (entity === "topExpenses") {
            // Determine the date range based on the query parameter
            let startOfYear, endOfYear;
            const currentYear = new Date().getFullYear();

            if (period === "this_fiscal_year") {
                startOfYear = new Date(currentYear, 0, 1); // January 1st of this year
                endOfYear = new Date(currentYear, 11, 31); // December 31st of this year
            } else if (period === "last_fiscal_year") {
                startOfYear = new Date(currentYear - 1, 0, 1); // January 1st of last year
                endOfYear = new Date(currentYear - 1, 11, 31); // December 31st of last year
            } else {
                return res
                    .status(400)
                    .json({ message: "Invalid period specified" });
            }

            // Fetch data from the database within the determined date range
            const expenses = await ExpenseDataBase.aggregate([
                {
                    $match: {
                        expenseDate: {
                            $gte: startOfYear,
                            $lte: endOfYear,
                        },
                        tenantId: id,
                    },
                },
                {
                    $group: {
                        _id: "$categoryName", // Group by the `category` field
                        value: { $sum: "$amount" }, // Sum the `amount` field for each category
                    },
                },
                {
                    $project: {
                        _id: 0, // Exclude the `_id` field
                        name: "$_id", // Rename `_id` to `category`
                        value: 1, // Include `totalAmount`
                    },
                },
            ]);
            result = expenses;
        }

        return res.status(200).json({
            success: 1,
            result: result,
        });
    } catch (error) {
        next(error);
    }
};

export default totalReciveables;

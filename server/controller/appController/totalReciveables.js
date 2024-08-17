import checkDbForEntity from "../../Helper/databaseSelector.js";

const totalReciveables = async (req, res, next) => {
    try {
        let { id, entity } = req.query;
        let tenantId = req.tenantId;
        let InvoiceDatabase = checkDbForEntity("invoices");
        let PaymentDataBase = checkDbForEntity("payments");
        let CustomerDatabase = checkDbForEntity("customers");
        let PurchaseOrderDatabase = checkDbForEntity("purchases");
        let result = [];

        if (entity === "customers") {
            let filter = { customer: id, tenantId: tenantId };

            let invoices = await InvoiceDatabase.find(filter);
            let totalReciveables = invoices.reduce(
                (sum, invocie) => sum + invocie?.grossTotal,
                0
            );
            let payments = await PaymentDataBase.find(filter);
            let totalRecived = payments.reduce(
                (sum, payment) => sum + payment?.amount,
                0
            );

            let totalPending = totalReciveables - totalRecived;

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
                        title: "Total Advance",
                        value: totalAdvanceAmount,
                        id: "4",
                    }
                );
            }
            // if (entity === "vendors") {
            //     let PurchaseDatabase = checkDbForEntity("purchases");
            //     let purchases = await PurchaseDatabase.find({
            //         _id: id,
            //         tenantId: tenantId,
            //     });
            //     let totalPaybles = purchases.reduce(
            //         (sum, purchase) => sum + purchase.grandTotal,
            //         0
            //     );
            //     result.push({
            //         title: "Total Payables",
            //         value: totalPaybles``,
            //         id: "1",
            //     });
            // }
        } else if (entity === "tenant") {
            let filter = {
                tenantId: tenantId,
                status: { $in: ["DRAFT", "PARTIALLY_PAID"] },
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
                } else if (invoice.status === "PARTIALLY_PAID") {
                    // Calculate total received from payments array
                    const totalReceived = invoice.payments.reduce(
                        (acc, payment) => acc + payment.amount,
                        0
                    );
                    // Calculate pending amount for PARTIALLY_PAID invoices
                    pendingAmount = invoice.grandTotal - totalReceived;
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

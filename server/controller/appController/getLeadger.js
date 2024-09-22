import checkDbForEntity from "../../Helper/databaseSelector.js";

const getLeadger = async (req, res, next) => {
    try {
        let { tenantId, id, type, start, end } = req.query;
        start = start.split(" ")[0];
        end = end.split(" ")[0];

        let sourceDb =
            type === "customers"
                ? checkDbForEntity("invoices")
                : checkDbForEntity("purchases");
        let targetDB =
            type === "customers"
                ? checkDbForEntity("paymentsreceived")
                : checkDbForEntity("paymentsmade");

        let addFieldSource = type === "customers" ? "invoices" : "purchases";
        let addFiledTarget =
            type === "customers" ? "paymentsreceived" : "paymentsmade";
        let matchKey = type === "customers" ? "customer" : "vendor";
        // Query invoices for the given customer and date range
        const sourceData = await sourceDb
            .find({
                tenantId: tenantId,
                [matchKey]: id,
                createdAt: { $gte: start, $lte: end },
            })
            .lean();

        // Add a field to differentiate the source (invoices)
        const sourceDataWithKey = sourceData.map((invoice) => ({
            ...invoice,
            collectionType: addFieldSource,
        }));
        // Query payments received for the same customer and date range
        const targetData = await targetDB
            .find({
                [matchKey]: id,
                tenantId: tenantId,
                createdAt: { $gte: start, $lte: end },
            })
            .lean();

        // Add a field to differentiate the source (paymentsreceived)
        const targetDataWithKey = targetData.map((payment) => ({
            ...payment,
            collectionType: addFiledTarget,
        }));
        // Combine the results from both collections
        const combinedData = [...sourceDataWithKey, ...targetDataWithKey];

        // Sort combined data by createdAt field in ascending order
        combinedData.sort(
            (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
        );

        // Send the combined and sorted data
        res.json(combinedData);
    } catch (error) {
        next(error);
    }
};

export default getLeadger;

const { default: checkDbForEntity } = require("../../Helper/databaseSelector");

const getLeadger = async (req, res, next) => {
    try {
        let (id, type, start ,end) = req.query;
        let invoiceDb = checkDbForEntity("invoices")
        let purchaseDb = checkDbForEntity("purchases")
        let aggregationDB = type ==='customers' ? invoiceDb : purchaseDb;
        let lookUpCollection = type ==="customers" ? "paymentsreceived" :"paymentsmade"
        let matchKey = type ==="customers" ? "customer" :"vendor"
        let data = await aggregationDB.aggregate([
            //Matching the data based on the Requirement
            {
                $match:{
                   matchKey:id,
                   createdAt:{$gte:start,$lte:end}
                }
            },
            {
                //
            }
        ])
    } catch (error) {
        next(error);
    }
};

import checkDbForEntity from "../../Helper/databaseSelector.js";
const get = async (req, res, next) => {
    try {
        let { entity, id } = req.query;
        let tenantId = req.tenantId;

        if (!entity || !tenantId || !id) {
            throw new Error(`Invalid Payload for ${entity}`);
        }

        let filter = { tenantId: tenantId, _id: id };
        if (entity === "tenant") {
            // For fetching data from tenant Database
            filter = { _id: tenantId };
        }

        // selecting the Database
        const dataBase = checkDbForEntity(entity);

        let data = await dataBase
            .findOne(filter)
            .populate([
                {
                    path: "customer",
                    select: "name billingAddress shippingAddress",
                    options: { strictPopulate: false },
                },
                {
                    path: "vendor",
                    select: "name",
                    options: { strictPopulate: false },
                },
                {
                    path: "payments", // Populate payment details
                    select: "amount paymentDate no", // Select relevant payment fields
                    options: { strictPopulate: false },
                },
                {
                    path: "components.product",
                    // Selecting all fields, so no need for 'select'
                    options: { strictPopulate: false },
                },
                {
                    path: "parts.product",
                    // Selecting all fields, so no need for 'select'
                    options: { strictPopulate: false },
                },
                {
                    path: "hardwares.product",
                    // Selecting all fields, so no need for 'select'
                    options: { strictPopulate: false },
                },
                {
                    path: "accessories.product",
                    // Selecting all fields, so no need for 'select'
                    options: { strictPopulate: false },
                },
                {
                    path: "product",
                    // Selecting all fields, so no need for 'select'
                    options: { strictPopulate: false },
                },
                {
                    path: "items.product",
                    options: { strictPopulate: false },
                },
            ])
            .lean();
        if (!data) {
            throw new Error("No Data Found");
        }

        res.status(200).json({
            success: 1,
            result: data,
            message: ` ${entity} fetched SuccessFully`,
        });
    } catch (error) {
        next(error);
    }
};
export default get;

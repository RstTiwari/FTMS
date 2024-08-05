import checkDbForEntity from "../../Helper/databaseSelector.js";
const get = async (req, res, next) => {
    try {
        let { entity, id } = req.query;
         let tenantId = req.tenantId

        if (!entity || !tenantId || !id) {
            throw new Error(`Invalid Payload for ${entity}`);
        }

        let filter = { tenantId: tenantId, _id: id };

        // selecting the Database
        const dataBase = checkDbForEntity(entity);

        let data = await dataBase
            .findOne(filter)
            .populate([
                {
                    path: "customer",
                    select: "name",
                    options: { strictPopulate: false },
                },
                {
                    path: "vendor",
                    select: "name",
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

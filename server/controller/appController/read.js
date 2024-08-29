import checkDbForEntity from "../../Helper/databaseSelector.js";
const read = async (req, res, next) => {
    try {
        let { entity, pageNo, pageSize, select } = req.body;
        let tenantId = req.tenantId;

        if (!entity || !pageNo || !pageSize || !tenantId) {
            throw new Error(`Invalid Payload for ${entity} List`);
        }

        // selecting the Database
        const dataBase = checkDbForEntity(entity);

        let skip = (pageNo - 1) * pageSize;
        let data = await dataBase
            .find({ tenantId: tenantId })
            .select(select)
            .sort({ _id: -1 })
            .skip(skip)
            .limit(pageSize)
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

        let total = await dataBase.countDocuments({ tenantId: tenantId })
        res.status(200).json({
            success: 1,
            result: data,
            total:total,
            message: ` ${entity} fetched SuccessFully`,
        });
    } catch (error) {
        next(error);
    }
};
export default read;

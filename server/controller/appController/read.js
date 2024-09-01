import checkDbForEntity from "../../Helper/databaseSelector.js";
const read = async (req, res, next) => {
    try {
        let { entity, pageNo, pageSize, select } = req.body;
        let { id } = req.query;
        let tenantId = req.tenantId;

        if (!entity || !pageNo || !pageSize || !tenantId) {
            throw new Error(`Invalid Payload for ${entity} List`);
        }
        let filter = { tenantId: tenantId };
        let keyToFilter =
            entity === "purchases" || entity === "paymentsmade"
                ? "vendor"
                : "customer";

        if (id) {
            filter[keyToFilter] = id;
        }

        // selecting the Database
        const dataBase = checkDbForEntity(entity);
        let skip = (pageNo - 1) * pageSize;
        let data = await dataBase
            .find(filter)
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

        let total = await dataBase.countDocuments(filter);
        res.status(200).json({
            success: 1,
            result: data,
            total: total,
            message: ` ${entity} fetched SuccessFully`,
        });
    } catch (error) {
        next(error);
    }
};
export default read;

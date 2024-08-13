import checkDbForEntity from "../../Helper/databaseSelector.js";

const read = async (req, res, next) => {
    try {
        const { entity,tenantId} = req.query;
        const { userId, role,email } = req;
        let filter = { _id: userId, tenantId: tenantId };

        if (entity === "tenant") {
            filter = { _id: tenantId };
        }
        const dataBase = checkDbForEntity(entity)
        const data = await dataBase.findOne(filter);
        if (!data) {
            return res.status(400).json({
                success: 0,
                result: null,
                message: "Failed to Find Organization Data",
            });
        }
        res.status(200).json({
            success: 1,
            result: data,
            message: "Data Fetched SuccessFully",
        });
    } catch (error) {
        return res.status(400).json({
            success: 0,
            result: null,
            message: error.message,
        });
    }
};

export default read;

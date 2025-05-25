import checkDbForEntity from "../../Helper/databaseSelector.js";

const fetchCustomModalData = async (req, res, next) => {
    const { entity, fieldName, char } = req.query;
    let tenantId = req.tenantId;

    if (!entity || !fieldName || !tenantId) {
        throw new Error("invalid Payload");
    }
    const dataBase = checkDbForEntity(entity);
    try {
        let query = { tenantId: tenantId };
        let data = await dataBase.find(query).sort({ _id: -1 })
        const modifiedData = data
        .filter((item) => item[fieldName] !== undefined && item[fieldName] !== null) // Filter objects with the specific field
        .map((item) => {
            return {
                label: item[fieldName],
                value: item._id,
                item,
            };
        });

        return res.status(200).json({
            success: 1,
            result: modifiedData,
            message: `${req.body.entity} Data Fetched Succefully`,
        });
    } catch (error) {
        next(error);
    }
};

export default fetchCustomModalData;

import checkDbForEntity from "../../Helper/databaseSelector.js";

const fetchCustomModalData = async (req, res, next) => {
    const { entity, fieldName, char } = req.query;
    let tenantId = req.tenantId;
    console.log(fieldName, entity, tenantId);

    if (!entity || !fieldName || !tenantId) {
        throw new Error("invalid Payload");
    }
    const dataBase = checkDbForEntity(entity);
    try {
        let query = { tenantId: tenantId };
        if (char) {
            const regexPattern = new RegExp(char, "i"); // for case insensitive
            query[fieldName] = {
                $exists: true,
                $regex: regexPattern,
            };
        }
        let data = await dataBase.find(query).sort({ _id: -1 }).limit(20);
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

import checkDbForEntity from "../../Helper/databaseSelector.js";

const fetchCustomModalData = async (req, res, next) => {
    const { entity, fieldName, char } = req.query;
    let tenantId = req.tenantId;

    if (!entity || !fieldName || !tenantId) {
        throw new Error("invalid Payload");
    }
    const dataBase = checkDbForEntity(entity);
    let select = {}
    let limit = 50
    if(entity === "products"){
        select ={name:1,rate:1,image:1}
        limit = 20
    }
    try {
        let query = { tenantId: tenantId };
        if(char){
            query = {
                fieldName: { $regex: char, $options: "i" },
                tenantId: tenantId,
            };
        }
        let data = await dataBase
            .find(query)
            .select(select)
            .sort({ _id: -1 })
            .limit(limit);
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

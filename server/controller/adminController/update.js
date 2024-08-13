import checkDbForEntity from "../../Helper/databaseSelector.js";

const update = async (req, res, next) => {
    try {
        const { entity,tenantId,userId } = req.query;
        const { values } = req.body;
        let filter = { tenantId: tenantId, _id: userId };
        const updateObj = {};

        if (entity === "tenant") {
            filter = { _id: tenantId };
        }
        const dataBase = checkDbForEntity(entity)
        // get the Data of same entity before update it
        let existingObj = await dataBase.findOne(filter)
        let modified = Object.assign(existingObj,values)
        updateObj["$set"] = modified
        const updateData = await dataBase.updateOne(filter, updateObj);

        if (!updateData.acknowledged) {
            return res.status(400).json({
                success: 0,
                result: {},
                message: `Failed To Update ${entity} `,
            });
        }

        if ((updateData.modifiedCount <= 0)) {
            return res.status(200).json({
                success: 1,
                result: {},
                message: "Nothing to Update",
            });
        }

        const response = {
            success: 1,
            result: {},
            message: `${entity} Data updated SuccessFully`,
        };
        res.status(200).json(response);
    } catch (error) {
        return res.status(400).json({
            success: 0,
            result: null,
            message: error.message,
        });
    }
};

export default update;

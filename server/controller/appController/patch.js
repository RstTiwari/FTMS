import checkDbForEntity from "../../Helper/databaseSelector.js";

const patch = async (req, res, next) => {
    try {
        const { action, keyName, values, id } = req.body;
        let {entity} = req.query;
        let tenantId = req.tenantId;
        if (!action || !keyName || !values || !id || !entity || !tenantId) {
            throw new Error("Invalid Payload");
        }
        let filter = { _id: id, tenantId: tenantId };
        
        if (entity === "tenant") {
            filter = { _id: id };
        }
        let updateObj = {};

        if (action == "set") {
            updateObj = { $set: { [keyName]: values } };
        } else if (action == "push") {
            updateObj = { $push: { [keyName]: values } };
        }
        let database = checkDbForEntity(entity);
        let updatedData = await database.updateOne(filter, updateObj);
        if (updatedData.modifiedCount === 0) {
            throw new Error(`Failed to Update ${entity}`);
        }
        res.status(200).json({
            success: 1,
            result: [],
            message: `Successfully updated the ${entity}`,
        });
    } catch (error) {
        next(error);
    }
};

export default patch;

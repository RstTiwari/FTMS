import checkDbForEntity from "../../Helper/databaseSelector.js";

const update = async (req, res, next) => {
    try {
        let tenantId = req.tenantId;
        const { values } = req.body;
        const { entity, id } = req.query;
        let filter = { _id: id, tenantId: tenantId };
        const database = checkDbForEntity(entity);

        //Fist find the Document You want to update .
        let existingObj = await database.findOne(filter);
        if (!existingObj) {
            throw new Error(`No ${entity} data against this ${id}`);
        }

        // Now let compare the data in both coming existing
        let modifiedObj = Object.assign(existingObj, values);
        console.log(values,"===modified====")
        let updatedData = await database.updateOne(
            filter,
            { $set: values },
            { req }
        );
        if (updatedData.modifiedCount === 0) {
            throw new Error(`Nothing to Update ${entity}`);
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

export default update;

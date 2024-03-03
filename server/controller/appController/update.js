const update = async (req, res, next, database) => {
    try {
        let tenantId = req.tenantId;
        const { entity, value } = req.body;
        let filter = { _id: value._id, tenantId: tenantId };
        console.log(filter);
        let updatedData = await database.updateOne(filter, {$set:value});
        if (updatedData.modifiedCount === 0) {
            throw new Error(`Failed to Update ${entity}`);
        }
        res.status(200).json({
            success: 1,
            result: [],
            message: `Successfully updated the ${entity}`,
        });
    } catch (error) {
        res.status(403).json({
            success: 0,
            result: [],
            message: error.message,
        });
    }
};

export default update;

const patch = async (req, res, next, database) => {
    try {
        let tenantId = req.tenantId;
        const { entity, value ,_id} = req.body;
        console.log(value);
        let filter = { _id: _id, tenantId: tenantId };
        let updatedData = await database.updateOne(filter, { $push: value });
        console.log(updatedData);
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

export default patch;

const update = async (req, res, next, database) => {
    try {
        const { entity, value } = req.body;
        const { email, tenantId, role, userId } = req;
        let filter = { tenantId: tenantId, _id: userId };
        const updateObj = { $set: value };
        if (entity === "orgnizationprofile") {
            filter = { tenantId: tenantId };
        }
        console.log(filter,updateObj);
        const updateData = await database.updateOne(filter, updateObj);
        console.log(updateData);

        if (!updateData.acknowledged) {
            return res.status(400).json({
                success: 0,
                result: {},
                message: `Failed To Update ${entity} `,
            });
        }

        if ((updateData.modifiedCount <= 0) && (updateData.acknowledged === true)) {
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

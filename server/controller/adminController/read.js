const read = async (req, res, next, database) => {
    try {
        const { entity } = req.query;
        const { userId, role, tenantId,email } = req;
        let filter = { _id: userId, tenantId: tenantId };
        if (entity === "orgnizationprofile") {
            filter = { tenantId: tenantId };
        }
        const data = await database.findOne(filter);
        data["email"] = email
        if (!data) {
            return res.status(400).json({
                success: 0,
                result: null,
                message: "Failed to Find Orgnization Data",
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

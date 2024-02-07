const create = async (req, res, next, dataBase) => {
    try {
        let { entity, value } = req.body;
        let tenantId = req.tenantId;
        value["tenantId"] = tenantId;
        let newData = new dataBase(value);
        let savedata = await newData.save();
        if (!savedata) {
            throw new Error(`Failed to Create new ${req.entity} data`);
        }
        res.status(200).json({
            success: 1,
            result: [],
            message: `New ${entity} data is saved`,
        });
    } catch (error) {
        console.error(error.message);
        res.status.json({
            success: 0,
            result: [],
            message:error.message
        });
    }
};

export default create;

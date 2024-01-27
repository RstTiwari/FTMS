const create = async (req, res, next, dataBase) => {
    try {
        let {entity,value} = req.body;
        let newData = new dataBase(value);
        let savedata = await newData.save();
        if (!savedata) {
            throw new Error(`Failed to Create new ${req.entity} data`);
        }
        res.send({
            success: 1,
            result: [],
            message: `New ${entity} data is saved`,
        });
    } catch (error) {
        console.error(error.message);
        res.send({
            success: 0,
            result: [],
            message:error.message
        });
    }
};

export default create;

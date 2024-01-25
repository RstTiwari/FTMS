const create = async (req, res, next, dataBase) => {
    try {
        let {entity,value} = req.body;
        let newData = new dataBase();
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
    }
};

export default create;

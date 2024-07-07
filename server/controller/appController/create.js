import checkDbForEntity from "../../Helper/databaseSelector.js";

const create = async (req, res, next) => {
    try {
        let { entity, value } = req.body;
        let tenantId = req.tenantId;

        // Finding the DataBase for the Entity
        let dataBase = checkDbForEntity(entity);

        value["tenantId"] = tenantId;
        let newData = new dataBase(value);
        let savedata = await newData.save();

        if (!savedata) {
            throw new Error(`Failed to Create new ${req.entity} data`);
        }
        res.status(200).json({
            success: 1,
            result: savedata,
            message: `New ${entity} data is saved`,
        });
    } catch (error) {
        next(error);
    }
};

export default create;

import checkDbForEntity from "../../Helper/databaseSelector.js";

const create = async (req, res, next) => {
    try {
        let { values } = req.body;
        let {entity} = req.query
        let tenantId = req.tenantId;

        if(!entity || !values){
            throw new Error("invalid payload")
        }

        // Finding the DataBase for the Entity
        let dataBase = checkDbForEntity(entity);

        values["tenantId"] = tenantId;
        let newData = new dataBase(values);
        let savedata = await newData.save({req});

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

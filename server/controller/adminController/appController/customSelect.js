import checkDbForEntity from "../../../Helper/databaseSelector.js";

export const addSelectData = async (req, res, next) => {
    try {

        const {entityName,data} = req.body;
        const tenantId = req.tenantId;
        if(!entityName || !data || !tenantId){
            throw new Error("Invalid payload")
        }

        // selecting database dynamically
        const database = checkDbForEntity("customSelect");

        // check if the Same entity exist
        const existData = await database.findOne({
            entityName: entityName,
            tenantId: tenantId,
        });

        if (existData) {
            const newData = data[0];
            //Before updating check if same value exist
            const findIndex = existData.data.findIndex(
                (item) =>
                    item.value.trim().replaceAll(" ", "").toLowerCase() ===
                    newData.value.trim().replaceAll(" ", "").toLowerCase()
            );

            if (findIndex >= 0) {
                return res.status(200).json({
                    success: 0,
                    result: [],
                    message: "same value exist",
                });
            }

            const updateObj = {
                $push: { data: newData },
            };

            const updateData = await database.updateOne(
                { entityName: entityName, tenantId: tenantId },
                updateObj
            );

            if (updateData.nModified <= 0) {
                throw new Error("Failed to add Data");
            }
            res.status(200).json({
                success: 1,
                result: [],
                message: "Data added successfully",
            });
        } else {
            let payload = {
                tenantId:tenantId,
                entityName:entityName,
                data:data
            }
    
            const newData = new database(payload);
            await newData.save();
            res.status(200).json({
                success: 1,
                result: [],
                message: "Data added successfully",
            });
        }
    } catch (error) {
        next(error);
    }
};

export const fetchSelectData = async (req, res, next) => {
    try {
        const { entityName } = req.query;
        const tenantId = req.tenantId;
        if (!entityName || !tenantId) {
            throw new Error("Invalid Payload");
        }
        const database = checkDbForEntity("customSelect");
        const data = await database
            .findOne({ entityName: entityName ,tenantId:tenantId})
            .select({ data: 1 })
            .lean()
            .exec();
        res.status(200).json({
            success: 1,
            result: data ? data.data : [],
            message: "Data Fetched Successfully",
        });
    } catch (error) {
        next(error);
    }
};

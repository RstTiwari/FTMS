export const addDropDownData = async (req, res, next) => {
    try {

        const payload = req.body;
        const entity = payload.entity;
        const tenantId = req.tenantId;

        // selecting database dynamically
        const database = databaseSelector("dropDownData");

        // check if the Same entity exist
        const existData = await database.findOne({
            entity: entity,
            tenantId: tenantId,
        });

        if (existData) {
            const newData = payload.data[0];
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
                { entity: entity },
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
            payload['tenantId'] = tenantId
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

export const fetchDropDownData = async (req, res, next) => {
    try {
        const { entityName } = req.query;
        const tenantId = req.tenantId;
        if (!entityName || !tenantId) {
            throw new Error("Invalid Payload");
        }
        const database = databaseSelector("dropDownData");
        const data = await database
            .findOne({ entityName: entityName })
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

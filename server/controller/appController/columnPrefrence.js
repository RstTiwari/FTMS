import checkDbForEntity from "../../Helper/databaseSelector.js";
import tenantSpecificData from "../../data/tenantData.js";

export const getOrCreateColumnPreferences = async (req, res, next) => {
    try {
        const { tenantId, entity } = req.query; // Assuming you're passing tenantId and entity in the request body
        let columnPrefDb = checkDbForEntity("columnPreference");
        let preferences = await columnPrefDb.findOne({ tenantId, entity });

        // If no preferences found, create default ones
        if (!preferences) {
            const defaultPreferences = tenantSpecificData.columns.map(
                (col) => ({
                    label: col.label,
                    value: col.value,
                    status: false, // default to false
                    id: col._id,
                })
            );
            preferences = new columnPrefDb({
                tenantId,
                entity,
                preferences: defaultPreferences,
            });
            await preferences.save();
        } else {
            // If preferences are found, check for any new columns
            const existingColumns = preferences.preferences.map(
                (pref) => pref.value
            );

            // Find any new columns from the current column options (tenantSpecificData)
            const newColumns = tenantSpecificData.columns.filter(
                (col) => !existingColumns.includes(col.value)
            );

            // If there are new columns, add them to the preferences
            if (newColumns.length > 0) {
                newColumns.forEach((col) => {
                    preferences.preferences.push({
                        column: col.value,
                        status: false, // default new columns to false
                    });
                });

                // Save the updated preferences with new columns
                await preferences.save();
            }
        }

        res.status(200).json({
            success: 1,
            result: preferences.preferences,
        });
    } catch (error) {
        next(error); // Pass any error to the error handler middleware
    }
};

export const updateColumnPreferences = async (req, res, next) => {
    try {
        let { entity, tenantId } = req.query;
        let { value, status } = req.body;
        let columnPrefDb = checkDbForEntity("columnPreference");

        const preferences = await columnPrefDb.updateOne(
            {
                tenantId: tenantId, // Convert tenantId to ObjectId
                entity: entity,
                "preferences.value": value, // Find the specific preference by its value
            },
            { $set: { "preferences.$.status": status } }
        );
        console.log(preferences, "==");

        res.status(200).json({
            success: 1,
            result: [],
        });
    } catch (error) {
        next(error);
    }
};

import checkDbForEntity from "../../Helper/databaseSelector.js";
import tenantSpecificData from "../../data/tenantData.js";

export const getOrCreateColumnPreferences = async (req, res, next) => {
    try {
        const { tenantId, entity } = req.body; // Assuming you're passing tenantId and entity in the request body
        let columnPrefDb = checkDbForEntity("columnPreference");
        let preferences = await columnPrefDb.findOne({ tenantId, entity });

        // If no preferences found, create default ones
        if (!preferences) {
            const defaultPreferences = tenantSpecificData.columnPrefrence.map(
                (col) => ({
                    column: col.value,
                    status: false, // default to false
                })
            );
            preferences = new ColumnPreference({
                tenantId,
                entity,
                preferences: defaultPreferences,
            });
            await preferences.save();
        } else {
            // If preferences are found, check for any new columns
            const existingColumns = preferences.preferences.map(
                (pref) => pref.column
            );

            // Find any new columns from the current column options (tenantSpecificData)
            const newColumns = tenantSpecificData.columnPrefrence.filter(
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
            result: updatedColumns,
        });
    } catch (error) {
        next(error); // Pass any error to the error handler middleware
    }
};

export const updateColumnPreferences = async (req, res, next) => {
    let { entity } = req.query;
    let updatedColumns = req.body;
    let columnPrefDb = checkDbForEntity("columnPreference");

    const preferences = await columnPrefDb.findOne({ tenantId, entity });

    if (!preferences) throw new Error("Preferences not found");

    updatedColumns.forEach((col) => {
        const preference = preferences.preferences.find(
            (pref) => pref.column === col.column
        );
        if (preference) {
            preference.status = col.status; // Update status (true/false)
        }
    });

    await preferences.save();
    res.status(200).json({
        success: 1,
        result: updatedColumns,
    });
};

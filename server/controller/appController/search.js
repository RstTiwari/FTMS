import checkDbForEntity from "../../Helper/databaseSelector.js";

const search = async (req, res) => {
    try {
        const { entity, search } = req.query;
        let tenantId = req.tenantId;

        const searchText = search.trim().toLowerCase();
        console.log(searchText);
        if (!entity) {
            return res.status(400).json({ message: "Entity is required." });
        }

        const regexQuery = new RegExp(searchText, "i");
        const Model = checkDbForEntity(entity);
        let data = [];

        const searchableFields = {
            invoice: ["no", "type", "status"],
            quotation: ["no", "type", "status"],
            challan: ["no", "type"],
            purchase: ["no", "status"],
            products: ["name", "category", "brand"],
            workorders: ["type", "no"],
        };

        const fieldsToSearch = searchableFields[entity] || [];

        // Load data with population if needed
        data = await Model.find({ tenantId })
            .populate([
                {
                    path: "customer",
                    select: "name",
                    options: { strictPopulate: false },
                },
                {
                    path: "vendor",
                    select: "name",
                    options: { strictPopulate: false },
                },
            ])
            .lean();

        // In-memory filter on any field + customer/vendor name
        console.log(data);
        data = data.filter((item) => {
            const customerName = item.customer?.name?.toLowerCase() || "";
            const vendorName = item.vendor?.name?.toLowerCase() || "";

            if (
                customerName.includes(searchText) ||
                vendorName.includes(searchText)
            ) {
                return true;
            }

            for (const field of fieldsToSearch) {
                const value = item[field];
                console.log(`Checking field: ${field} =`, value);

                if (
                    typeof value === "string" &&
                    value.toLowerCase().includes(searchText)
                ) {
                    return true;
                }

                if (
                    typeof value === "number" &&
                    value.toString().includes(searchText)
                ) {
                    return true;
                }
            }

            return false;
        });

        res.json({
            success:1,
            data: data,
        });
    } catch (error) {
        console.error("Search API error:", error);
        res.status(500).json({ success:0,message: "Internal Server Error" });
    }
};

export default search;

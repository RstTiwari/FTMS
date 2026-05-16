import checkDbForEntity from "../../Helper/databaseSelector.js";
import { getFinancialYearRange } from "../../Helper/timehelper.js";

const search = async (req, res) => {

    try {

        const {
            entity,
            search,
            date,
            status,
        } = req.query;

        const tenantId = req.tenantId;

        if (!entity) {
            return res.status(400).json({
                message: "Entity is required.",
            });
        }

        const searchText =
            search?.trim().toLowerCase() || "";

        const extractedNumber =
            searchText.match(/\d+/)?.[0];

        const isNumberSearch =
            extractedNumber &&
            !isNaN(Number(extractedNumber));

        const Model =
            checkDbForEntity(entity);


        const searchableFields = {

            invoice: [
                "no",
                "type",
                "status",
            ],

            quotation: [
                "no",
                "type",
                "status",
            ],

            challan: [
                "no",
                "type",
            ],

            purchase: [
                "no",
                "status",
            ],

            products: [
                "name",
                "category",
                "brand",
            ],

            workorders: [
                "type",
                "no",
            ],

        };

        const fieldsToSearch =
            searchableFields[entity] || [];

        let query = {
            tenantId,
        };


        if (date) {

            const range =
                getFinancialYearRange(date);

            if (range) {

                query.createdAt = {
                    $gte: range.startDate,
                    $lte: range.endDate,
                };
            }
        }

        if (status) {
            query.status = status;
        }

        let data = await Model.find(query)

            .populate([
                {
                    path: "customer",
                    select: "name",
                    options: {
                        strictPopulate: false,
                    },
                },
                {
                    path: "vendor",
                    select: "name",
                    options: {
                        strictPopulate: false,
                    },
                },
            ])

            .sort({
                _id: -1,
            })

            .lean();

        if (searchText) {

            data = data.filter((item) => {

                if (isNumberSearch) {

                    const itemNo =
                        item?.no?.toString() || "";

                    return itemNo.includes(
                        extractedNumber
                    );
                }


                let data1 = "";
                let data2 = "";

                if (
                    entity === "customers" ||
                    entity === "vendors"
                ) {

                    data1 =
                        item?.name?.toLowerCase() || "";

                    data2 =
                        item?.name?.toLowerCase() || "";

                } else {

                    data1 =
                        item?.customer?.name?.toLowerCase() || "";

                    data2 =
                        item?.vendor?.name?.toLowerCase() || "";
                }


                if (
                    data1.includes(searchText) ||
                    data2.includes(searchText)
                ) {
                    return true;
                }

                for (const field of fieldsToSearch) {

                    const value = item[field];


                    if (
                        typeof value === "string" &&
                        value
                            .toLowerCase()
                            .includes(searchText)
                    ) {
                        return true;
                    }


                    if (
                        typeof value === "number" &&
                        value
                            .toString()
                            .includes(searchText)
                    ) {
                        return true;
                    }
                }

                return false;
            });
        }

        return res.json({

            success: 1,

            data,

        });

    } catch (error) {

        console.error(
            "Search API error:",
            error
        );

        return res.status(500).json({

            success: 0,

            message:
                "Internal Server Error",

        });
    }
};

export default search;
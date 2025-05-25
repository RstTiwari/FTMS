import checkDbForEntity from "../../Helper/databaseSelector.js";
import mongoose from "mongoose";

const fetchComments = async (req, res, next) => {
    try {
        const { entity, id } = req.query;

        // Check if entity and id are provided
        if (!entity || !id) {
            return res.status(400).send({
                success: 0,
                message:
                    "Please provide both entity and id in query parameters.",
            });
        }

        // Check if entity is one of the expected values
        const validEntities = ["customers", "users", "vendors"];

        let result = [];
        let DataBase = checkDbForEntity("comments");
        let select = {
            text: 1,
            entity: 1,
            userName: 1,
            "additionalInfo.no": 1,
            createdAt: 1,
        };

        if (entity === "customers") {
            // Fetch document by customer id
            result = await DataBase.find(
                {
                    $or: [
                        {
                            "additionalInfo.customer":
                                new mongoose.Types.ObjectId(id),
                        },
                        {
                            "additionalInfo._id": new mongoose.Types.ObjectId(
                                id
                            ),
                        },
                    ],
                },
                select
            );
        } else if (entity === "user") {
            // Fetch document by userId
            result = await DataBase.find(
                { userId: new mongoose.Types.ObjectId(id) },
                select
            );
        } else if (entity === "vendors") {
            // Fetch document by vendor id
            result = await DataBase.find(
                {
                    $or: [
                        {
                            "additionalInfo.vendor":
                                new mongoose.Types.ObjectId(id),
                        },
                        {
                            "additionalInfo._id": new mongoose.Types.ObjectId(
                                id
                            ),
                        },
                    ],
                },

                select
            );
        }

        res.status(200).send({
            success: 1,
            result: result,
            message: "Fetched successfully",
        });
    } catch (error) {
        console.error("Error fetching comments:", error);
        next(error);
    }
};

export default fetchComments;

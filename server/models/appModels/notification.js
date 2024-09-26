import mongoose from "mongoose";
import mongooseAutoPopulate from "mongoose-autopopulate";

const notificationSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", // Reference to the User model
            required: true,
        },
        message: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            enum: ["info", "warning", "error", "success"], // You can add other types here
            default: "info",
        },
        isRead: {
            type: Boolean,
            default: false,
        },
        link: {
            type: String, // Optional link the notification redirects to (e.g., "/dashboard/alerts")
            required: false,
        },
        data: {
            // Optional field to store any extra data associated with the notification (e.g., payload)
            type: Map,
            of: String,
            required: false,
        },
    },
    { timestamps: true }
);

export default mongoose.model("notification", notificationSchema,"notification")

// models/commentModel.js
import mongoose from "mongoose";
const { Schema } = mongoose;

const commentSchema = new Schema(
    {
        text: {
            type: String,
            required: true,
        },

        entity: {
            type: String, // e.g., 'Customer', 'Invoice', 'Payment'
            required: true,
        },
        userName: {
            type: String,
        },
        userId: {
            type: Schema.Types.ObjectId,
            required: true,
        },
        entityId: {
            type: Schema.Types.ObjectId,
            required: true,
        },
        additionalInfo: {
            type: Object,
            of: Schema.Types.Mixed, // To store additional details
        },
        tenantId: {
            type: mongoose.Schema.ObjectId,
            required: true,
        },
    },
    { timestamps: true }
);

const Comment = mongoose.model("comments", commentSchema);

export default Comment;

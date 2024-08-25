import mongoose from "mongoose";
import mongooseAutoPopulate from "mongoose-autopopulate";
const workOrderSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
    },
    no: {
        type: Number,
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    dueDate: {
        type: Date,
        required: true,
    },
    incharge: {
        type: String,
    },
    status: {
        type: String,
        enum: [
            "DRAFT",
            "SEND",
            "CANCELLED",
            "ON_HOLD",
            "COMPLETED",
            "IN_PROGRESS",
        ],
        default: "DRAFT",
    },
    items: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "product", // Reference to another Product
                autopopulate: true,
            },

            qty: {
                type: Number,
            },
        },
    ],

    tenantId: {
        type: String,
        required: true,
    },
});

workOrderSchema.plugin(mongooseAutoPopulate);
workOrderSchema.index({ no: 1, type: 1 }, { unique: true });
export default mongoose.model("workorders", workOrderSchema, "workorders");

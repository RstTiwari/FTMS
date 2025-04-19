import mongoose from "mongoose";
import mongooseAutoPopulate from "mongoose-autopopulate";
import { commentSaveHandler } from "../../Helper/CommentHelper.js";

const expenseSchema = new mongoose.Schema(
    {
        customer: {
            type: mongoose.Schema.ObjectId,
            ref: "customer",
        },
        categoryName: {
            type: String,
            required: true,
        },
        amount: {
            type: Number,
            required: true,
        },
        note: {
            type: String,
        },
        expenseDate: {
            type: Date,
            required: true,
        },
        image: {
            type: String,
        },
        prefix: { type: String, required: true, default: "EXP" },
        no: { type: Number, required: true },
        suffix: { type: String, default: "" },
        tenantId: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);


expenseSchema.index(
    { tenantId: 1, no: 1, prefix: 1, suffix: 1 },
    { unique: true }
);

expenseSchema.plugin(mongooseAutoPopulate);

export default mongoose.model("expenses", expenseSchema);

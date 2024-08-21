import mongoose from "mongoose";
import mongooseAutoPopulate from "mongoose-autopopulate";

const paymentsSchema = new mongoose.Schema(
    {
        vendor: {
            type: mongoose.Schema.ObjectId,
            ref: "vendors",
            required: true,
            autopopulate: true,
        },
        removed: {
            type: Boolean,
            default: false,
        },
        paymentDate: {
            type: Date,
            required: true,
        },
        amount: {
            type: Number,
            required: true,
        },
        paymentMode: {
            type: String,
        },
        ref: {
            type: String,
        },
        note: {
            type: String,
        },
        tenantId: {
            type: String,
            required: true,
        },
        no: {
            type: Number,
            unique: true, // Ensure the incremented field is unique
            sparse: true,
        },
    },
    { timestamps: true }
);

paymentsSchema.plugin(mongooseAutoPopulate);

// Pre-save middleware to count documents and set incrementField

export default mongoose.model("paymentsmade", paymentsSchema, "paymentsmade");

import mongoose from "mongoose";
import mongooseAutoPopulate from "mongoose-autopopulate";

const paymentsSchema = new mongoose.Schema(
    {
        customer: {
            type: mongoose.Schema.ObjectId,
            ref: "customer",
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
        },
    },
    { timestamps: true }
);

paymentsSchema.plugin(mongooseAutoPopulate);

// Pre-save middleware to count documents and set incrementField
paymentsSchema.pre("save", async function (next) {
   
});

export default mongoose.model("paymentsreceived", paymentsSchema,"paymentsreceived");

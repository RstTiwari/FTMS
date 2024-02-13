import mongoose from "mongoose";
import mongooseAutoPopulate from "mongoose-autopopulate";

const paymentsSchema = new mongoose.Schema({
    removed: {
        type: Boolean,
        default: false,
    },
    customer: {
        type: mongoose.Schema.ObjectId,
        ref: "customer",
        autopopulate: true,
        required: true,
    },
    invoice: {
        type: mongoose.Schema.ObjectId,
        ref: "invoice",
        required: true,
        autopopulate: true,
    },
    createdDate: {
        type: Number,
        default: Math.floor(Date.now() / 1000),
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    paymentMode: {
        type: String,
        required: true,
    },
    ref: {
        type: String,
    },
    description: {
        type: String,
    },
    updated: {
        type: Date,
        default: Math.floor(Date.now() / 1000),
    },
});

paymentsSchema.plugin(mongooseAutoPopulate);
export default mongoose.model("payments", paymentsSchema);

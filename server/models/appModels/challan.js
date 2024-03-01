import mongoose from "mongoose";
import mongooseAutoPopulate from "mongoose-autopopulate";

const challanSchema = new mongoose.Schema({
    customer: {
        type: mongoose.Schema.ObjectId,
        ref: "customer",
        required: true,
    },
    invoice: {
        type: mongoose.Schema.ObjectId,
        ref: "invoice",
    },
    challanNumber: {
        type: Number,
        required: true,
    },
    challanDate: {
        type: Number,
        required: true,
    },
    items: [
        {
            description: {
                type: String,
                require: true,
            },
            rate: {
                type: Number,
            },
            qty: {
                type: Number,
            },
            taxPercent: {
                type: Number,
            },

            finalAmount: {
                type: Number,
            },
        },
    ],
    totalQuantity: {
        type: Number,
        required: true,
    },
    tenantId: {
        type: String,
        required: true,
    },
});

export default mongoose.model("deliverychallan");

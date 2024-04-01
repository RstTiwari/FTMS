import mongoose from "mongoose";
import mongooseAutoPopulate from "mongoose-autopopulate";

const challanSchema = new mongoose.Schema({
    customer: {
        type: mongoose.Schema.ObjectId,
        ref: "customer",
        required: true,
        autopopulate: true,
        },
    invoice: {
        type: mongoose.Schema.ObjectId,
        ref: "invoice",
    },
    challanNumber: {
        type: Number,
        required: true,
        unique:true
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
            hsnCode: {
                type: String,
            },
            qty: {
                type: Number,
            },
            unit: {
                type: String,
            },

        },
    ],
    totalQuantity: {
        type: Number,
        default:0
    },
    tenantId: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
        default:"DRAFT"
    },
});
challanSchema.plugin(mongooseAutoPopulate);
export default mongoose.model("deliverychallan", challanSchema);

import mongoose from "mongoose";
import mongooseAutoPopulate from "mongoose-autopopulate";
const purchaseOrderSchema = new mongoose.Schema({
    vendor: {
        type: mongoose.Schema.ObjectId,
        ref: "vendors",
        autopopulate: true,
        required: true,
    },
    purchaseNo: {
        type: String,
        required: true,
        unique: true,
    },
    purchaseDate: {
        type: Date,
        required: true,
    },
    status: { type: String, default: "DRAFT", required: true },
    items: [
        {
            description: {
                type: String,
            },
            rate: {
                type: Number,
                required: true,
                
            },
            qty: {
                type: Number,
            },
            gstPercent: {
                type: Number,
            },
            finalAmount: {
                type: Number,
            },
        },
    ],
    deliveryAddress:{
        street1: String,
        street2: String,
        city: String,
        state: String,
        pincode: Number,
    },
    grossTotal: {
        type: Number,
    },
    taxPercent: {
        type: Number,
    },
    taxAmount: {
        type: Number,
    },
    transPortAmount: {
        type: Number,
    },
    grandTotal: {
        type: Number,
    },
    tenantId: {
        type: String,
        required: true,
    },
});

purchaseOrderSchema.plugin(mongooseAutoPopulate);
export default mongoose.model("purchaseOrder", purchaseOrderSchema);

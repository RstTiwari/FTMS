import mongoose from "mongoose";
import mongooseAutoPopulate from "mongoose-autopopulate";
const purchaseOrderSchema = new mongoose.Schema({
    vendor: {
        type: mongoose.Schema.ObjectId,
        ref: "vendors",
        autopopulate: true,
        required: true,
    },
    no: {
        type: Number,
        required: true,
        unique: true,
        sparse: true,
    },
    purchaseDate: {
        type: Date,
        required: true,
    },
    deliveryDate: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        enum: [
            "DRAFT",
            "SEND",
            "CANCELLED",
            "ON_HOLD",
            "PARTIALLY_PAID",
            "FULL_PAID",
        ],
        default: "DRAFT",
    },
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
    payments: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "paymentsMade",
            autopopulate: true,
        },
    ],

    delivery: {
        type: { type: String },
        to: { type: String },
        address: {
            street1: String,
            street2: String,
            city: String,
            state: String,
            pincode: Number,
        },
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
    paymentCondition: {
        type: String,
    },
    cancellationCondition: {
        type: String,
    },
});

purchaseOrderSchema.plugin(mongooseAutoPopulate);
export default mongoose.model("purchaseOrder", purchaseOrderSchema);

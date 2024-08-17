import mongoose from "mongoose";
import mongooseAutoPopulate from "mongoose-autopopulate";

const invoiceSchema = new mongoose.Schema(
    {
        customer: {
            type: mongoose.Schema.ObjectId,
            ref: "customer",
            autopopulate: true,
            required: true,
        },
        no: {
            type: Number,
            required: true,
            unique: true,
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
        payments: [
            {
                paymentId: {
                    type: mongoose.Schema.ObjectId,
                    ref: "payments",
                    autopopulate: true,
                },
                amount: {
                    type: Number,
                    required: true,
                },
            },
        ],
        invoiceDate: {
            type: Date,
            required: true,
        },
        dueDate: {
            type: Date,
            required: true,
        },
        items: [
            {
                description: {
                    type: String,
                    required: true,
                },
                hsnCode: {
                    type: String,
                },
                rate: {
                    type: Number,
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
        grossTotal: {
            type: Number,
        },
        taxAmount: {
            type: Number,
        },
        grandTotal: {
            type: Number,
        },
        tenantId: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

invoiceSchema.plugin(mongooseAutoPopulate);

export default mongoose.model("invoice", invoiceSchema);

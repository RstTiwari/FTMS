import mongoose from "mongoose";
import mongooseAutoPopulate from "mongoose-autopopulate";
const invoiceSchema = new mongoose.Schema(
    {
        customer: {
            type: mongoose.Schema.ObjectId,
            ref: "customer",
            autopopulate: true,
            require: true,
        },
        no: {
            type: Number,
            require: true,
            unique: true,
        },
        status: {
            type: String,
            enum: ["DRAFT", "SEND", "CANCELLED", "ON_HOLD"],
            default: "DRAFT",
        },

        payment: [
            {
                type: mongoose.Schema.ObjectId,
                autopopulate: true,
                ref: "payments",
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
                    require: true,
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

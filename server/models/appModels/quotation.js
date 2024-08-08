import mongoose from "mongoose";
import mongooseAutoPopulate from "mongoose-autopopulate";

const quotationSchema = new mongoose.Schema(
    {
        customer: {
            type: mongoose.Schema.ObjectId,
            ref: "customer",
            autopopulate: {
                select: "name", // Specify fields to populate
                strictPopulate: false,
            },
            required: true,
        },
        status: {
            type: String,
            enum: ["DRAFT", "SEND", "CANCELLED", "ON HOLD"],
            default: "DRAFT",
        },
        no: {
            type: Number,
            required: true,
            unique: true,
        },
        quoteDate: {
            type: Date,
            required: true,
        },
        expiryDate: {
            type: Date,
            required: true,
        },
        status: {
            type: String,
            enum: ["DRAFT", "SEND", "CANCELLED", "ON_HOLD"],
            default: "DRAFT",
        },
        salesPerson: {
            type: String,
        },
        sub: {
            type: String,
        },

        items: [
            {
                description: {
                    type: String,
                    required: true,
                },
                rate: {
                    type: Number,
                },
                percentDiscount: {
                    type: Number,
                },
                bestOffer: {
                    type: Number,
                },
                qty: {
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
        gstPercent: {
            type: Number,
        },
        taxAmount: {
            type: Number,
        },
        transportAmount: {
            type: Number,
        },
        grandTotal: {
            type: Number,
        },
        deliveryCondition: {
            type: String,
        },
        validityCondition: {
            type: String,
        },
        paymentsCondition: {
            type: String,
        },
        cancellationCondition: {
            type: String,
        },
        tenantId: {
            type: String,
            required: true,
        },
    },
    { timestamps: true, strictQuery: false }
);

// Apply the autopopulate plugin to the schema
quotationSchema.plugin(mongooseAutoPopulate);

export default mongoose.model("quotation", quotationSchema);

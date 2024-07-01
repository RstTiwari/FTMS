import mongoose from "mongoose";
import mongooseAutoPopulate from "mongoose-autopopulate";
const invoiceSchema = new mongoose.Schema({
    customer: {
        type: mongoose.Schema.ObjectId,
        ref: "customer",
        autopopulate: true,
        require: true,
    },
    invoiceNo: {
        type: String,
        require: true,
        unique: true,
    },
    status: {
        type: String,
        enum: ['draft', 'pending', 'sent', 'refunded', 'cancelled', 'on hold'],
        default: 'draft',
      },
      
    payment: [
        {    
            type: mongoose.Schema.ObjectId,
            autopopulate: true,
            ref: "payments",
        },
    ],
    invoiceDate: {
        type: Number,
        require: true,
    },
    dueDate: {
        type: Number,
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
            taxableAmount: {
                type: Number,
            },
            sgstPercent: {
                type: Number,
            },
            cgstPercent: {
                type: Number,
            },
            igstPercent: {
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
    totalTaxAmount: {
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

invoiceSchema.plugin(mongooseAutoPopulate);
export default mongoose.model("invoice", invoiceSchema);

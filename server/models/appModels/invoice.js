import mongoose from "mongoose";
import mongooseAutoPopulate from "mongoose-autopopulate";
const quotationSchema = new mongoose.Schema({
    customer: {
        type: mongoose.Schema.ObjectId,
        ref: "customer",
        require: true,
        autopopulate: true,
    },
    invoiceNo: {
        type: String,
        require: true,
        unique: true,
    },
    orderNo: {
        type: String,
        require: true,
        unique: true,
    },
    invoiceDate: {
        type: Number,
        require: true,
    },
    invoiceExpiredDate: {
        type: Number,
    },
    salesPerson: {
        type: String,
    },
    items: [
        {
            description: {
                type: mongoose.Schema.ObjectId,
                ref: "product",
                require: true,
            },
            hsnCode:{
                type:String
            },
            rate: {
                type: Number,
            },
            qty: {
                type: Number,
            },
            taxableAmount:{
                type:Number
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
            }
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
});

quotationSchema.plugin(mongooseAutoPopulate);
export default mongoose.model("invoice", quotationSchema);

import mongoose from "mongoose";
import mongooseAutoPopulate from "mongoose-autopopulate";
const quotationSchema = new mongoose.Schema({
    customer: {
        type: String,
        require: true,
    },
    quoteNo: {
        type: String,
        require: true,
        unique: true,
    },
    quoteDate: {
        type: Number,
        require: true,
    },
    quoteExpiryDate: {
        type: Number,
    },
    attenPerson: {
        type: String,
    },
    subject: {
        type: String,
    },
    message: {
        type: String,
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
    taxPercent: {
        type: Number,
    },
    transPortAmount: {
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
    installationCondition: {
        type: String,
    },
    facilityCondition: {
        type: String,
    },
    tenantId:{
        type:String,
        required:true
    }
});

quotationSchema.plugin(mongooseAutoPopulate);
export default mongoose.model("quotation", quotationSchema);

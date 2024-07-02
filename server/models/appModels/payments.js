import mongoose from "mongoose";
import mongooseAutoPopulate from "mongoose-autopopulate";

const paymentsSchema = new mongoose.Schema({
    customer :{
        type: mongoose.Schema.ObjectId,
        ref: "customer",
        required: true,
        autopopulate: true,
    },
    removed: {
        type: Boolean,
        default: false,
    },

    invoice: {
        type: mongoose.Schema.ObjectId,
        ref: "invoice",
        required: true,
        autopopulate: true,
    },
    paymentDate:{
         type:Number,
         required:true

    },
    createdDate: {
        type: Number,
        default: Math.floor(Date.now() / 1000),
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    paymentMode: {
        type: String,
        required: true,
    },
    ref: {
        type: String,
    },
    note: {
        type: String,
    },
    tenantId: {
        type: String,
        required: true,
    },
});

paymentsSchema.plugin(mongooseAutoPopulate);
export default mongoose.model("payments", paymentsSchema);

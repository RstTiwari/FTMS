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

    paymentDate:{
         type:Date,
         required:true

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
},{timestamps:true});

paymentsSchema.plugin(mongooseAutoPopulate);
export default mongoose.model("payments", paymentsSchema);

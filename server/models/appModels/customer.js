import mongoose, { Mongoose } from "mongoose";
const coustomerSchema = new mongoose.Schema({
    customerName: {
        type: String,
        required: true,
        sparse:true
    },
    contactPerson: {
        type: String,
    },
    customerPhone: {
        type: Number,
        required: true,
        unique: true,
        sparse:true
    },
    customerEmail: {
        type: String,
        required: true,
        sparse:true,
        unique: true,
    },
    panNo: {
        type: String,
        unique: true,
        sparse:true
    },
    gstNo: {
        type: String,
        unique: true,
        sparse:true
    },
    billingAddress: {
        street1: String,
        street2: String,
        city: String,
        state: String,
        pinCode: Number,
    },
    shippingAddress: {
        street1: String,
        street2: String,
        city: String,
        state: String,
        pinCode: Number,
    },
    tenantId: {
        type: mongoose.Types.ObjectId,
        ref:"tenant",
        required: true,
    },
},{timestamps:true});

export default mongoose.model("customer", coustomerSchema,);

import mongoose, { Mongoose } from "mongoose";
const coustomerSchema = new mongoose.Schema({
    customerName: {
        type: String,
        require: true,
    },
    contactPerson: {
        type: String,
    },
    customerPhone: {
        type: Number,
        require: true,
        unique:true
    },
    customerEmail: {
        type: String,
        require: true,
        unique:true

    },
    panNo: {
        type: String,
        unique:true

    },
    gstNo: {
        type: String,
        require: true,
        unique:true

    },
    billingAddress: {
        street: String,
        city: String,
        state: String,
        pinCode: Number,
    },
    shippingAddress: {
        street: String,
        city: String,
        state: String,
        pinCode: Number,
    },
    tenantId:{
        type:String,
        required:true
    }
});

export default mongoose.model("customer",coustomerSchema)
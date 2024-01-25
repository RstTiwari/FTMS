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
    },
    customerEmail: {
        type: String,
        require: true,
    },
    panNo: {
        type: String,
    },
    gstNo: {
        type: String,
        require: true
    },
    billingAddress: {
        address: String,
        city: String,
        state: String,
        pinCode: Number,
    },
    shippingAddress: {
        address: String,
        city: String,
        state: String,
        pinCode: Number,
    },
});

export default mongoose.model("customer",coustomerSchema)
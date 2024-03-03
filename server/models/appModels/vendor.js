import mongoose from "mongoose";
const vendorSchema = new mongoose.Schema({
    vendorName: {
        type: String,
        require: true,
    },
    contactPerson: {
        type: String,
    },
    vendorPhone: {
        type: Number,
        require: true,
        unique:true
    },
    vendorEmail: {
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

export default mongoose.model("vendors",vendorSchema)
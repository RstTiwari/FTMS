import mongoose from "mongoose";

const tenantSchema = new mongoose.Schema({
    removed: {
        type: Boolean,
        default: false,
    },
    enabled: {
        type: Boolean,
        default: false,
    },
    tenanId: {
        type: String,
        require: true,
        unique: true,
    },
    companyName: {
        type: String,
    },
    panNo: {
        type: String,
        unique: true,
    },
    gstNo: {
        type: String,
        unique: true,
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


export default mongoose.model("tenant",tenantSchema)
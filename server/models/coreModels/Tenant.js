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
    tenantId: {
        type: String,
        require: true,
        unique: true,
    },
    companyName: {
        type: String,
    },
    logo: {
        type: String,
    },
    industry: {
        type: String,
    },
    address: {
        street: {
            type: String,
        },
        city: {
            type: String,
        },
        state: {
            type: String,
        },
        pinCode: {
            type: String,
        },
    },
    email: {
        type: String,
    },
    phone: {
        type: Number,
    },
});

export default mongoose.model("tenant", tenantSchema);

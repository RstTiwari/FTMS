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
});


export default mongoose.model("tenant",tenantSchema)
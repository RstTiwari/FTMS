import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    removed: {
        type: Boolean,
        default: false,
    },
    enabled: {
        type: Boolean,
        default: false,
    },
    name: {
        type: "String",
        required: true,
    },
    tenantId: { type: String, ref: 'tenant', required: true },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    photo: {
        type: String,
        trim: true,
    },
    created: {
        type: Number,
        default: Math.floor(Date.now() / 1000),
    },
    role: {
        type: String,
        default: "superadmin",
        enum: ["superadmin", "admin", "staffAdmin", "staff"],
    },
},{timestamps:true});

export default mongoose.model("User", UserSchema);

import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
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
            index: true,
            sparse: true,
        },
        tenantId: { type: String, ref: "tenant", required: true },
        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
            unique:true,
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
            enum: ["superadmin", "admin", "user", "custom"],
        },
        permissions: [],
    },
    { timestamps: true }
);

export default mongoose.model("User", UserSchema);

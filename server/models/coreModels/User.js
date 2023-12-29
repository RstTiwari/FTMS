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
        lowercase: true,
    },
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
        default: Date.now() / 1000,
    },
    role: {
        type: String,
        default: "staff",
        enum: [
            "superadmin",
            "admin",
            "staffAdmin",
            "staff",
            "createOnly",
            "readOnly",
        ],
    },
});

export default mongoose.model("User", UserSchema);

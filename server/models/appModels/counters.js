import mongoose from "mongoose";

const counterSchema = new mongoose.Schema(
    {
        tenantId: {
            type: String,
            required: true,
        },
        entityName: { type: String },
        prefix: { type: String },
        nextNumber: { type: String },
    },
    { timestamps: true }
);

export default mongoose.model("counters", counterSchema);

import mongoose from "mongoose";

const counterSchema = new mongoose.Schema(
    {
        tenantId: {
            type: String,
            required: true,
        },
        entityName: { type: String },
        prefix: { type: String ,required:true},
        nextNumber: { type: Number,required:true },
    },
    { timestamps: true }
);

export default mongoose.model("counters", counterSchema);

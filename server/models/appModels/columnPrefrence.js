import mongoose from "mongoose";

const columnPreferenceSchema = new mongoose.Schema({
    tenantId: { type: mongoose.Schema.Types.ObjectId, required: true },
    entity: { type: String, required: true },
    preferences: [
        {
            label: { type: String },
            value: { type: String }, // e.g., 'code', 'image', etc.
            status: { type: Boolean, default: false }, // true if selected, false otherwise
        },
    ],
});

export default mongoose.model(
    "columnPreference",
    columnPreferenceSchema,
    "columnPreference"
);

import mongoose from "mongoose";

// Define schema for navigation items
const navItemSchema = new mongoose.Schema({
    // Array of child items
    tenantId: {
        type: String,
        required: true,
        unique: true,
    },
    data: [
        {
            key: { type: String, required: true },
            label: { type: String, required: true },
            icon: { type: String }, // Storing icon as string reference, update based on how you handle icons
            children: [
                {
                    key: { type: String, required: true },
                    label: { type: String, required: true },
                },
            ],
        },
    ],
});

export default mongoose.model("sidebar", navItemSchema, "sidebar");

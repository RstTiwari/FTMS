import mongoose from "mongoose";
import mongooseAutoPopulate from "mongoose-autopopulate";

// Define schema for navigation items
const tenantData = new mongoose.Schema(
    {
        // Array of child items
        tenantId: {
            type: String,
            ref: "tenant",
            autopopulate: true,
            required: true,
            unique: true,
        },
        quoteNo:{
            preFix:String,
            nextNumber:Number,         
        },
        
        sidebar: [
            {
                key: { type: String, required: true },
                label: { type: String, required: true },
                icon: { type: String, required: true }, // Storing icon as string reference, update based on how you handle icons
                children: [
                    {
                        key: { type: String },
                        label: { type: String },
                    },
                ], // Embeidng the Document
            },
        ],
    },
    { timestamps: true }
);
tenantData.plugin(mongooseAutoPopulate);
export default mongoose.model("tenantData", tenantData, "tenantData");

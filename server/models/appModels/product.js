import mongoose from "mongoose";

// Subschema for references with quantity
const referenceWithQuantitySchema = new mongoose.Schema(
    {
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "product", // Reference to another Product
            autopopulate: true,
        },
        qty: {
            type: Number,
            required: true, // Quantity of the referenced product
        },
    },
    { _id: false }
);

// Main Product schema
const productSchema = new mongoose.Schema(
    {
        code: String,
        name: String,
        rate: Number,
        purchaseRate: Number,
        description: String,
        image: String,
        itemType: String,
        hsnCode: String,
        dimension: String, // Directly on the product
        vendor: {
            type: mongoose.Schema.ObjectId,
            ref: "vendors",
            autopopulate: true,
            required: true,
        },
        components: [referenceWithQuantitySchema], // Array of product references with quantity
        parts: [referenceWithQuantitySchema], // Array of product references with quantity
        hardwares: [referenceWithQuantitySchema], // Array of product references with quantity
        tenantId: String, // Optional field for multi-tenancy
    },
    {
        timestamps: true, // Adds createdAt and updatedAt fields automatically
    }
);

export default mongoose.model("product", productSchema);

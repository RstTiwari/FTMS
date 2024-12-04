import mongoose from "mongoose";
import autopopulate from "mongoose-autopopulate";
import { commentSaveHandler } from "../../Helper/CommentHelper.js";

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
        code: {
            type: String,
            unique: true,
            sparse: true,
        },
        name: {
            type: String,
            unique: true,
            required: true,
        },
        rate: Number,
        purchaseRate: Number,
        description: String,
        image: String,
        itemType:{type:String,default:"product"},
        hsnCode: String,
        dimension: String, // Directly on the product
        vendor: {
            type: mongoose.Schema.ObjectId,
            ref: "vendors",
            autopopulate: true,
        },
        components: [referenceWithQuantitySchema], // Array of product references with quantity
        parts: [referenceWithQuantitySchema], // Array of product references with quantity
        hardwares: [referenceWithQuantitySchema], // Array of product references with quantity
        accessories: [referenceWithQuantitySchema], // Array of product references with quantity

        tenantId: String, // Optional field for multi-tenancy
    },
    {
        timestamps: true, // Adds createdAt and updatedAt fields automatically
    }
);

// Compound index to ensure uniqueness of code and name combination
productSchema.index({ code: 1, name: 1 }, { unique: true, sparse: true });

// Ensure unique code and name across existing documents
productSchema.pre("save", async function (next) {
    if (this.isNew) {
        // Check if a product with the same code or name already exists
        const existingProduct = await mongoose.model("product").findOne({
            $and: [{ code: this.code }, { name: this.name }],
        });

        if (existingProduct) {
            const errorMsg =
                existingProduct.code === this.code
                    ? `Product with code ${this.code} already exists.`
                    : `Product with name ${this.name} already exists.`;
            return next(new Error(errorMsg));
        }
    }
    next();
});

productSchema.plugin(autopopulate);
//Attching the req body to save this
productSchema.pre("save", function (next, options) {
    if (options && options.req) {
        this._req = options.req; // Attach req to the document
    }
    next();
});
productSchema.pre("updateOne", function (next) {
    if (this.options && this.options.req) {
        this._req = this.options.req; // Attach req to the document
    }
    next();
});

// Apply the common post-save middleware
productSchema.post("save", async function (doc, next) {
    try {
        if (this._req) {
            await commentSaveHandler(doc, {
                req: this._req,
                text: "prodcut created",
                entity: "products",
            });
        }
        next(); // procceding to the next middleware
    } catch (error) {
        next(error); // Calling the Error middleware
    }
});

productSchema.post("updateOne", async function (doc, next) {
    try {
        if (this._req) {
            let doc = await this.model.findOne(this.getQuery());
            await commentSaveHandler(doc, {
                req: this._req,
                text: "prodcut updated",
                entity: "products",
            });
        }
        next(); // procceding to the next middleware
    } catch (error) {
        next(error); // Calling the Error middleware
    }
});

export default mongoose.model("product", productSchema);

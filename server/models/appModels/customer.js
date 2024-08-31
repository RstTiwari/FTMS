import mongoose from "mongoose";
import { commentSaveHandler } from "../../Helper/CommentHelper.js";
const coustomerSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            sparse: true,
        },
        contactPerson: {
            type: String,
        },
        phone: {
            type: Number,
            required: true,
            unique: true,
            sparse: true,
        },
        email: {
            type: String,
            required: true,
            sparse: true,
            unique: true,
        },
        panNo: {
            type: String,
            unique: true,
            sparse: true,
        },
        gstNo: {
            type: String,
            unique: true,
            sparse: true,
        },
        billingAddress: {
            street1: String,
            street2: String,
            city: String,
            state: String,
            pincode: Number,
        },
        shippingAddress: {
            street1: String,
            street2: String,
            city: String,
            state: String,
            pincode: Number,
        },
        tenantId: {
            type: mongoose.Types.ObjectId,
            ref: "tenant",
            required: true,
        },
        advanceAmount: {
            type: Number,
            deafult: 0,
        },
    },
    { timestamps: true }
);
//Attching the req body to save this
coustomerSchema.pre("save", function (next, options) {
    if (options && options.req) {
        this._req = options.req; // Attach req to the document
    }
    next();
});

coustomerSchema.pre("updateOne", function (next) {
    if (this.options && this.options.req) {
        this._req = this.options.req; // Attach req to the document
    }
    next();
});

// Apply the common post-save middleware
coustomerSchema.post("save", async function (doc, next) {
    try {
        if (this._req) {
            await commentSaveHandler(doc, {
                req: this._req,
                text: "customer created",
                entity: "customer",
            });
        }
        next(); // procceding to the next middleware
    } catch (error) {
        next(error); // Calling the Error middleware
    }
});
coustomerSchema.post("updateOne", async function (result, next) {
    try {
        if (this._req) {
            // Manually retrieve the updated document
            const doc = await this.model.findOne(this.getQuery());

            if (doc) {
                await commentSaveHandler(doc, {
                    req: this._req,
                    text: `Customers updated `,
                    entity: "customer",
                });
            }
        }
        next(); // Proceed to the next middleware
    } catch (error) {
        next(error); // Call the Error middleware
    }
});

export default mongoose.model("customer", coustomerSchema);

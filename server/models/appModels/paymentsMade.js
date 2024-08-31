import mongoose from "mongoose";
import mongooseAutoPopulate from "mongoose-autopopulate";
import { commentSaveHandler } from "../../Helper/CommentHelper.js";

const paymentsSchema = new mongoose.Schema(
    {
        vendor: {
            type: mongoose.Schema.ObjectId,
            ref: "vendors",
            required: true,
            autopopulate: true,
        },
        removed: {
            type: Boolean,
            default: false,
        },
        paymentDate: {
            type: Date,
            required: true,
        },
        amount: {
            type: Number,
            required: true,
        },
        paymentMode: {
            type: String,
        },
        ref: {
            type: String,
        },
        note: {
            type: String,
        },
        tenantId: {
            type: String,
            required: true,
        },
        no: {
            type: Number,
            unique: true, // Ensure the incremented field is unique
            sparse: true,
        },
    },
    { timestamps: true }
);

paymentsSchema.plugin(mongooseAutoPopulate);

// Pre-save middleware to count documents and set incrementField
//Attching the req body to save this
paymentsSchema.pre("save", function (next, options) {
    if (options && options.req) {
        this._req = options.req; // Attach req to the document
    }
    next();
});
//Attching the req body to save this
paymentsSchema.pre("updateOne", function (next) {
    if (this.options && this.options.req) {
        this._req = options.req; // Attach req to the document
    }
    next();
});

// Apply the common post-save middleware
paymentsSchema.post("save", async function (doc, next) {
    try {
        if (this._req) {
            await commentSaveHandler(doc, {
                req: this._req,
                text: "payment created",
                entity: "paymentsmade",
            });
        }
        next(); // procceding to the next middleware
    } catch (error) {
        next(error); // Calling the Error middleware
    }
});

paymentsSchema.post("updateOne", async function (doc, next) {
    try {
        if (this._req) {
            const doc = await this.model.findOne(this.getQuery());
            if (doc) {
                await commentSaveHandler(doc, {
                    req: this._req,
                    text: "payment updated",
                    entity: "paymentsmade",
                });
            }
        }
        next(); // procceding to the next middleware
    } catch (error) {
        next(error); // Calling the Error middleware
    }
});

export default mongoose.model("paymentsmade", paymentsSchema, "paymentsmade");

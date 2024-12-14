import mongoose from "mongoose";
import mongooseAutoPopulate from "mongoose-autopopulate";
import { commentSaveHandler } from "../../Helper/CommentHelper.js";

const purchaseOrderSchema = new mongoose.Schema({
    vendor: {
        type: mongoose.Schema.ObjectId,
        ref: "vendors",
        autopopulate: true,
        required: true,
    },
    no: {
        type: Number,
        required: true,
        sparse: true,
    },
    purchaseDate: {
        type: Date,
        required: true,
    },
    deliveryDate: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        enum: [
            "DRAFT",
            "SEND",
            "CANCELLED",
            "ON_HOLD",
            "PARTIALLY_PAID",
            "FULL_PAID",
        ],
        default: "DRAFT",
    },
    items: [
        {
            code: {
                type: String,
            },
            description: {
                type: String,
                required: true,
            },
            image: {
                type: String,
            },
            hsnCode: {
                type: String,
            },
            rate: {
                type: Number,
            },
            discountPercent: {
                type: Number,
            },
            discountAmount: {
                type: Number,
            },

            gstPercent: {
                type: Number,
            },
            qty: {
                type: Number,
            },
            taxAmount: {
                type: Number,
            },
            finalAmount: {
                type: Number,
            },
        },
    ],
    paymentMaded: {
        type: Number,
        default: 0,
    },

    delivery: {
        type: { type: String },
        to: { type: String },
        address: {
            street1: String,
            street2: String,
            city: String,
            state: String,
            pincode: Number,
        },
    },
    grossTotal: {
        type: Number,
    },
    taxPercent: {
        type: Number,
    },
    taxAmount: {
        type: Number,
    },
    totalWithTax: {
        type: Number,
    },
    notes: [],
    terms: [],
    otherCharges: [],
    grandTotal: {
        type: Number,
    },
    tenantId: {
        type: String,
        required: true,
    },
});


purchaseOrderSchema.index({ tenantId: 1, no: 1 }, { unique: true });
purchaseOrderSchema.plugin(mongooseAutoPopulate);


//Attching the req body to save this
purchaseOrderSchema.pre("save", function (next, options) {
    if (options && options.req) {
        this._req = options.req; // Attach req to the document
    }
    next();
});

purchaseOrderSchema.pre("updateOne", function (next, options) {
    if (this.options && this.options.req) {
        this._req = this.options.req; // Attach req to the document
    }
    next();
});

// Apply the common post-save middleware
purchaseOrderSchema.post("save", async function (doc, next) {
    try {
        if (this._req) {
            await commentSaveHandler(doc, {
                req: this._req,
                text: "purchase order created",
                entity: "purchase",
            });
        }
        next(); // procceding to the next middleware
    } catch (error) {
        next(error); // Calling the Error middleware
    }
});

purchaseOrderSchema.post("updateOne", async function (doc, next) {
    try {
        if (this._req) {
            let doc = await this.model.findOne(this.getQuery());
            if (doc) {
                await commentSaveHandler(doc, {
                    req: this._req,
                    text: "purchase order updated",
                    entity: "purchase",
                });
            }
        }
        next(); // procceding to the next middleware
    } catch (error) {
        next(error); // Calling the Error middleware
    }
});
export default mongoose.model("purchaseOrder", purchaseOrderSchema);

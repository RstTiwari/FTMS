import mongoose from "mongoose";
import mongooseAutoPopulate from "mongoose-autopopulate";
import { commentSaveHandler } from "../../Helper/CommentHelper.js";

const quotationSchema = new mongoose.Schema(
    {
        customer: {
            type: mongoose.Schema.ObjectId,
            ref: "customer",
            autopopulate: {
                select: "name", // Specify fields to populate
                strictPopulate: false,
            },
        },
        status: {
            type: String,
            enum: ["DRAFT", "SEND", "CANCELLED", "ON HOLD"],
            default: "DRAFT",
        },
        prefix:{
            type:String,
            default:"QOU",
        },
        no: {
            type: Number,
            required: true,
        },
        suffix: {
            type: String,
            default:""
        },
        quoteDate: {
            type: Date,
            required: true,
        },
        attn:{
            type: String,  
        },
        message:{
            type: String,  
        },
        expiryDate: {
            type: Date,
        },
        status: {
            type: String,
            enum: ["DRAFT", "SEND", "CANCELLED", "ON_HOLD"],
            default: "DRAFT",
        },
        salesPerson: {
            type: String,
        },
        sub: {
            type: String,
        },

        items: [
            {
                code: {
                    type: String,
                },
                description: {
                    type: String,
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
        grossTotal: {
            type: Number,
        },
        taxAmount: {
            type: Number,
        },
        totalWithTax: {
            type: Number,
        },
        otherCharges: [],
        grandTotal: {
            type: Number,
        },
        terms: [],
        notes: [],
        tenantId: {
            type: String,
            required: true,
        },
    },
    { timestamps: true, strictQuery: false }
);


quotationSchema.index(
    { tenantId: 1, no: 1, prefix: 1, suffix: 1 },
    { unique: true }
);

// Apply the autopopulate plugin to the schema
quotationSchema.plugin(mongooseAutoPopulate);

//Attaching the req body to save this
quotationSchema.pre("save", function (next, options) {
    if (options && options.req) {
        this._req = options.req; // Attach req to the document
    }
    next();
});

quotationSchema.pre("updateOne", function (next, options) {
    if (this.options && this.options.req) {
        this._req = this.options.req; // Attach req to the document
    }
    next();
});

// Apply the common post-save middleware
quotationSchema.post("save", async function (doc, next) {
    try {
        if (this._req) {
            await commentSaveHandler(doc, {
                req: this._req,
                text: "quotation created",
                entity: "quotation",
            });
        }
        next(); // procceding to the next middleware
    } catch (error) {
        next(error); // Calling the Error middleware
    }
});

quotationSchema.post("updateOne", async function (result, next) {
    try {
        if (this._req) {
            let doc = await this.model.findOne(this.getQuery());
            if (doc) {
                await commentSaveHandler(doc, {
                    req: this._req,
                    text: "quotation updated",
                    entity: "quotation",
                });
            }
        }
        next(); // procceding to the next middleware
    } catch (error) {
        next(error); // Calling the Error middleware
    }
});
export default mongoose.model("quotation", quotationSchema);

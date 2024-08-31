import mongoose from "mongoose";
import mongooseAutoPopulate from "mongoose-autopopulate";
import { commentSaveHandler } from "../../Helper/CommentHelper.js";

const workOrderSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
    },
    no: {
        type: Number,
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    dueDate: {
        type: Date,
        required: true,
    },
    incharge: {
        type: String,
    },
    status: {
        type: String,
        enum: [
            "DRAFT",
            "SEND",
            "CANCELLED",
            "ON_HOLD",
            "COMPLETED",
            "IN_PROGRESS",
        ],
        default: "DRAFT",
    },
    items: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "product", // Reference to another Product
                autopopulate: true,
            },

            qty: {
                type: Number,
            },
        },
    ],

    tenantId: {
        type: String,
        required: true,
    },
});

workOrderSchema.plugin(mongooseAutoPopulate);
workOrderSchema.index({ no: 1, type: 1 }, { unique: true });
//Attching the req body to save this
workOrderSchema.pre("save", function (next, options) {
    if (options && options.req) {
        this._req = options.req; // Attach req to the document
    }
    next();
});

workOrderSchema.pre("updateOne", function (next) {
    if (this.options && this.options.req) {
        this._req = this.options.req; // Attach req to the document
    }
    next();
});

// Apply the common post-save middleware
workOrderSchema.post("save", async function (doc, next) {
    try {
        if (this._req) {
            await commentSaveHandler(doc, {
                req: this._req,
                text: "workorder created",
                entity: "workorder",
            });
        }
        next(); // procceding to the next middleware
    } catch (error) {
        next(error); // Calling the Error middleware
    }
});

workOrderSchema.post("updateOne", async function (doc, next) {
    try {
        if (this._req) {
            let doc = await this.model.findOne(this.getQuery());
            if (doc) {
                await commentSaveHandler(doc, {
                    req: this._req,
                    text: "workorder updated",
                    entity: "workorder",
                });
            }
        }
        next(); // procceding to the next middleware
    } catch (error) {
        next(error); // Calling the Error middleware
    }
});
export default mongoose.model("workorders", workOrderSchema, "workorders");

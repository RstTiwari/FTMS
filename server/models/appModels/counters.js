import mongoose from "mongoose";
import { commentSaveHandler } from "../../Helper/CommentHelper.js";

const counterSchema = new mongoose.Schema(
    {
        tenantId: {
            type: String,
            required: true,
        },
        entityName: { type: String },
        prefix: { type: String, required: true },
        nextNumber: { type: Number, required: true },
    },
    { timestamps: true }
);

//Attaching the req body to save this
counterSchema.pre("save", function (next, options) {
    if (options && options.req) {
        this._req = options.req; // Attach req to the document
    }
    next();
});
//Attaching the req body to save this
counterSchema.pre("updateOne", function (next) {
    if (this.options && this.options.req) {
        this._req = this.options.req; // Attach req to the document
    }
    next();
});

// Apply the common post-save middleware
counterSchema.post("save", async function (doc, next) {
    try {
        if (this._req) {
            await commentSaveHandler(doc, {
                req: this._req,
                text: "counter created",
                entity: "counters",
            });
        }
        next(); // procceding to the next middleware
    } catch (error) {
        next(error); // Calling the Error middleware
    }
});

counterSchema.post("updateOne", async function (result, next) {
    try {
        if (this._req) {
            // Manually retrieve the updated document
            const doc = await this.model.findOne(this.getQuery());

            if (doc) {
                await commentSaveHandler(doc, {
                    req: this._req,
                    text: `Counters updated with changes`,
                    entity: "counters",
                });
            }
        }
        next(); // Proceed to the next middleware
    } catch (error) {
        next(error); // Call the Error middleware
    }
});

export default mongoose.model("counters", counterSchema);

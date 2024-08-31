import mongoose from "mongoose";
import mongooseAutoPopulate from "mongoose-autopopulate";
import { commentSaveHandler } from "../../Helper/CommentHelper.js";

const expenseSchema = new mongoose.Schema(
    {
        customer: {
            type: mongoose.Schema.ObjectId,
            ref: "customer",
        },
        categoryName: {
            type: String,
            required: true,
        },
        amount: {
            type: Number,
            required: true,
        },
        note: {
            type: String,
        },
        expenseDate: {
            type: Date,
            required: true,
        },
        image: {
            type: String,
        },
        no: { type: Number, unique: true },
        tenantId: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

expenseSchema.plugin(mongooseAutoPopulate);

// Pre-save middleware to count documents and set incrementField
expenseSchema.pre("save", async function (next) {
    if (this.isNew) {
        try {
            const count = await mongoose.model("expenses").countDocuments();
            this.no = count + 1;
            next();
        } catch (error) {
            next(error);
        }
    } else {
        next();
    }
});

//Attching the req body to save this
expenseSchema.pre("save", function (next, options) {
    if (options && options.req) {
        this._req = options.req; // Attach req to the document
    }
    next();
});
//Attching the req body to save this
expenseSchema.pre("updateOne", function (next) {
    if (this.options && this.options.req) {
        this._req = this.options.req; // Attach req to the document
    }
    next();
});

// Apply the common post-save middleware
expenseSchema.post("save", async function (doc, next) {
    try {
        if (this._req) {
            await commentSaveHandler(doc, {
                req: this._req,
                text: "expesnes created",
                entity: "expesnes",
            });
        }
        next(); // procceding to the next middleware
    } catch (error) {
        next(error); // Calling the Error middleware
    }
});

// Apply the common post-save middleware
expenseSchema.post("save", async function (doc, next) {
    try {
        if (this._req) {
            const doc = await this.model.findOne(this.getQuery());
            if (doc) {
                await commentSaveHandler(doc, {
                    req: this._req,
                    text: "expesnes updated",
                    entity: "expesnes",
                });
            }
        }
        next(); // procceding to the next middleware
    } catch (error) {
        next(error); // Calling the Error middleware
    }
});
export default mongoose.model("expenses", expenseSchema);

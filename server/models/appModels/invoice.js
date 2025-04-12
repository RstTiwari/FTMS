import mongoose from "mongoose";
import mongooseAutoPopulate from "mongoose-autopopulate";
import { commentSaveHandler } from "../../Helper/CommentHelper.js";

const invoiceSchema = new mongoose.Schema(
    {
        customer: {
            type: mongoose.Schema.ObjectId,
            ref: "customer",
            autopopulate: true,
            required: true,
        },
        no: {
            type: Number,
            required: true,
        },
        prefix: {
            type: String,
            required: true,
            default: "INV",
        },
        status: {
            type: String,
            enum: [
                "DRAFT",
                "SEND",
                "CANCELLED",
                "ON_HOLD",
                "PARTIALLY_RECEIVED",
                "FULL_RECEIVED",
            ],
            default: "DRAFT",
        },
        paymentReceived: {
            type: Number,
            default: 0,
        },
        invoiceDate: {
            type: Date,
            required: true,
        },
        dueDate: {
            type: Date,
            required: true,
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
        notes: [],
        terms: [],
        tenantId: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

invoiceSchema.index({ tenantId: 1, no: 1 }, { unique: true });
invoiceSchema.plugin(mongooseAutoPopulate);

//Attching the req body to save this
invoiceSchema.pre("save", function (next, options) {
  if (options && options.req) {
    this._req = options.req; // Attach req to the document
  }
  next();
});

invoiceSchema.pre("updateOne", function (next) {
  if (this.options && this.options.req) {
    this._req = this.options.req; // Attach req to the query context
  }
  next();
});

// Apply the common post-save create middleware
invoiceSchema.post("save", async function (doc, next) {
  try {
    if (this._req) {
      const text = this.op === "updateOne" ? "updated" : "created";
      console.log("called ", this.op, text);

      await commentSaveHandler(doc, {
        req: this._req,
        text: `Invoice  ${text}`,
        entity: "invoice",
      });
    }
    next(); // procceding to the next middleware
  } catch (error) {
    next(error); // Calling the Error middleware
  }
});

invoiceSchema.post("updateOne", async function (result, next) {
  try {
    if (this._req) {
      // Manually retrieve the updated document
      const doc = await this.model.findOne(this.getQuery());

      if (doc) {
        await commentSaveHandler(doc, {
          req: this._req,
          text: `Invoice updated`,
          entity: "invoice",
        });
      }
    }
    next(); // Proceed to the next middleware
  } catch (error) {
    next(error); // Call the Error middleware
  }
});

export default mongoose.model("invoice", invoiceSchema);

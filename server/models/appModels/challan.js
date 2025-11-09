import mongoose from "mongoose";
import mongooseAutoPopulate from "mongoose-autopopulate";
import { commentSaveHandler } from "../../Helper/CommentHelper.js";

const challanSchema = new mongoose.Schema(
  {
    delivery: {
      to: { type: String },
      street1: String,
      street2: String,
      city: String,
      state: String,
      pincode: Number,
    },
    prefix: {
      type: String,
      required: true,
      default:"CH"
    },
    no: {
      type: Number,
      required: true,
    },
    suffix: {
      type: String,
      default:""
    },
    challanDate: {
      type: Date,
      required: true,
    },
    challanType: {
      type: String,
      required: true,
    },
    vehicleNo: {
      type: String,
    },
    contactNo: {
      type: String,
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
    grossTotal: {
      type: Number,
      default: 0,
    },
    taxAmount: {
      type: Number,
      default: 0,
    },
    totalWithTax: {
      type: Number,
    },
    otherCharges: [],
    grandTotal: {
      type: Number,
      default: 0,
    },
    notes: [],
    terms: [],
    tenantId: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: "DRAFT",
    },
  },
  { timestamps: true }
);

challanSchema.index(
    { tenantId: 1, no: 1, prefix: 1, suffix: 1 },
    { unique: true }
);

challanSchema.plugin(mongooseAutoPopulate);

//Attching the req body to save this
challanSchema.pre("save", function (next, options) {
    if (options && options.req) {
        this._req = options.req; // Attach req to the document
    }
    next();
});

challanSchema.pre("updateOne", function (next) {
    if (this.options && this.options.req) {
        this._req = this.options.req; // Attach req to the query context
    }
    next();
});

// Apply the common post-save middleware
challanSchema.post("save", async function (doc, next) {
    try {
        if (this._req) {
            await commentSaveHandler(doc, {
                req: this._req,
                text: "challan created",
                entity: "challans",
            });
        }
        next(); // procceding to the next middleware
    } catch (error) {
        next(error); // Calling the Error middleware
    }
});

challanSchema.post("updateOne", async function (result, next) {
    try {
        console.log("called ", this._req);

        if (this._req) {
            // Manually retrieve the updated document
            const doc = await this.model.findOne(this.getQuery());

            if (doc) {
                await commentSaveHandler(doc, {
                    req: this._req,
                    text: `Challan updated`,
                    entity: "challan",
                });
            }
        }
        next(); // Proceed to the next middleware
    } catch (error) {
        next(error); // Call the Error middleware
    }
});

export default mongoose.model("deliverychallan", challanSchema);

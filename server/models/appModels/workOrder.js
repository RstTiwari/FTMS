import mongoose from "mongoose";
import mongooseAutoPopulate from "mongoose-autopopulate";
import { commentSaveHandler } from "../../Helper/CommentHelper.js";

const workOrderSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  prefix: {
    type: String,
    required: true,
    default:"WO"
  },
  no: {
    type: Number,
    required: true,
  },
  suffix:{
    type: String,
    default:""
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
    enum: ["DRAFT", "SEND", "CANCELLED", "ON_HOLD", "COMPLETED", "IN_PROGRESS"],
    default: "DRAFT",
  },
  items: [
    {
      code: { type: String },
      description: { type: String, required: true },

      image: { type: String },
      qty: {
        type: Number,
        required: true,
      },
    },
  ],
  tenantId: {
    type: String,
    required: true,
  },
});


workOrderSchema.index(
    { tenantId: 1, no: 1, prefix: 1, suffix: 1 },
    { unique: true }
);
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

export default mongoose.model("workorders", workOrderSchema, "workorders");

import mongoose from "mongoose";
import { commentSaveHandler } from "../../Helper/CommentHelper.js";

const vendorSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  contactPerson: {
    type: String,
  },
  phone: {
    type: Number,
    require: true,
    unique: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  alternateEmail: {
    type: String,
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
  mfgNo: {
    type: String,
  },
  msmebNo: {
    type: String,
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
  advanceAmount: {
    type: Number,
  },
  tenantId: {
    type: String,
    required: true,
  },
});

//Attching the req body to save this
vendorSchema.pre("save", function (next, options) {
  if (options && options.req) {
    this._req = options.req; // Attach req to the document
  }
  next();
});
vendorSchema.pre("updateOne", function (next, options) {
  if (this.options && this.options.req) {
    this._req = this.options.req; // Attach req to the document
  }
  next();
});
// Apply the common post-save middleware
vendorSchema.post("save", async function (doc, next) {
  try {
    if (this._req) {
      await commentSaveHandler(doc, {
        req: this._req,
        text: "vendor created",
        entity: "vendor",
      });
    }
    next(); // procceding to the next middleware
  } catch (error) {
    next(error); // Calling the Error middleware
  }
});

vendorSchema.post("updateOne", async function (doc, next) {
  try {
    if (this._req) {
      let doc = await this.model.findOne(this.getQuery());
      if (doc) {
        await commentSaveHandler(doc, {
          req: this._req,
          text: "vendor created",
          entity: "vendor",
        });
      }
    }
    next(); // procceding to the next middleware
  } catch (error) {
    next(error); // Calling the Error middleware
  }
});
export default mongoose.model("vendors", vendorSchema);

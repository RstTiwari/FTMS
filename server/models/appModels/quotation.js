import mongoose from 'mongoose';
import mongooseAutoPopulate from 'mongoose-autopopulate';

const quotationSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.ObjectId,
    ref: 'customer',
    autopopulate: {
        select: 'customerName',  // Specify fields to populate
        strictPopulate: false,
      },
    required: true,
  },
  quoteNo: {
    type: String,
    required: true,
    unique: true,
  },
  quoteDate: {
    type: Date,
    required: true,
  },
  expiryDate: {
    type: Date,
    required: true,
  },
  attenPerson: {
    type: String,
  },
  subject: {
    type: String,
  },
  message: {
    type: String,
  },
  items: [
    {
      description: {
        type: String,
        required: true,
      },
      rate: {
        type: Number,
      },
      percentDiscount: {
        type: Number,
      },
      bestOffer: {
        type: Number,
      },
      qty: {
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
  taxPercent: {
    type: Number,
  },
  transPortAmount: {
    type: Number,
  },
  grandTotal: {
    type: Number,
  },
  deliveryCondition: {
    type: String,
  },
  validityCondition: {
    type: String,
  },
  paymentsCondition: {
    type: String,
  },
  cancellationCondition: {
    type: String,
  },
  installationCondition: {
    type: String,
  },
  facilityCondition: {
    type: String,
  },
  tenantId: {
    type: String,
    required: true,
  },
}, { timestamps: true,strictQuery:false });

// Apply the autopopulate plugin to the schema
quotationSchema.plugin(mongooseAutoPopulate);

export default mongoose.model('quotation', quotationSchema);

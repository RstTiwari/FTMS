import mongoose from "mongoose";
import mongooseAutoPopulate from "mongoose-autopopulate";

const enquirySchema = new mongoose.Schema(
    {
        customer: {
            type: mongoose.Schema.ObjectId,
            ref: "tenant",
            autopopulate: true,
        },
        vendor: {
            type: mongoose.Schema.ObjectId,
            ref: "tenant",
            autopopulate: true,
            validate: {
                validator: function (value) {
                    // Ensure the vendor is not the same as the customer
                    return value.toString() !== this.customer.toString();
                },
                message: "Vendor and customer cannot be the same.",
            },
        },
        process: {
            type: String,
        },
        expectedDate: {
            type: Date,
        },
        deliveryDate: {
            type: Date,
        },
        vendorComments: [],
        customerComments: [],
        files: [],
        cost: {
            type: Number,
        },
        status: {
            type: String,
            default: "DRAFT",
        },

    },
    { timestamps: true }
);

// Apply autopopulate plugin
enquirySchema.plugin(mongooseAutoPopulate);

export default mongoose.model("enquiry", enquirySchema);

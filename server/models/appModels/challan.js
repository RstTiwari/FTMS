import mongoose from "mongoose";
import mongooseAutoPopulate from "mongoose-autopopulate";

const challanSchema = new mongoose.Schema(
    {
        customer: {
            type: mongoose.Schema.ObjectId,
            ref: "customer",
            required: true,
            autopopulate: true,
        },
        invoice: {
            type: mongoose.Schema.ObjectId,
            ref: "invoice",
        },
        no: {
            type: Number,
            required: true,
            unique: true,
        },
        challanDate: {
            type: Date,
            required: true,
        },
        challanType: {
            type: String,
            required: true,
        },
        vehicleNo:{
            type:String
        },
        contactNo:{
            type:String
        },
        items: [
            {
                description: {
                    type: String,
                    require: true,
                },
                rate:{
                    type:Number
                },
                qty: {
                    type: Number,
                },
                gstPercent: {
                    type: String,
                },
                finalAmount: {
                    type: String,
                },
            },
        ],
        grossTotal: {
            type: Number,
            default: 0,
        },
        transportAmount: {
            type: Number,
            default: 0,
        },
        taxAmount:{
            type: Number,
            default: 0,
        },
        grandTotal:{
            type:Number,
            default: 0,
        },
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
challanSchema.plugin(mongooseAutoPopulate);
export default mongoose.model("deliverychallan", challanSchema);

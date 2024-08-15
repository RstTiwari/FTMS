import mongoose from "mongoose";
const coustomerSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            sparse: true,
        },
        contactPerson: {
            type: String,
        },
        phone: {
            type: Number,
            required: true,
            unique: true,
            sparse: true,
        },
        email: {
            type: String,
            required: true,
            sparse: true,
            unique: true,
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
        tenantId: {
            type: mongoose.Types.ObjectId,
            ref: "tenant",
            required: true,
        },
        advanceAmount: {
            type: Number,
            deafult: 0,
        },
    },
    { timestamps: true }
);

export default mongoose.model("customer", coustomerSchema);

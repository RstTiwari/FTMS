import mongoose from "mongoose";

const tenantSchema = new mongoose.Schema(
    {
        removed: {
            type: Boolean,
            default: false,
        },
        enabled: {
            type: Boolean,
            default: false,
        },
        companyName: {
            type: String,
        },
        logo: {
            type: String,
        },
        panNo: {
            type: String,
            unique: true,
            index: true,
            sparse: true,
            validate: {
                validator: isValidPanNo,
                message: "Invalid panNo",
            },
        },
        gstNo: {
            type: String,
            unique: true,
            sparse: true,
            validate: {
                validator: isValidGstNo,
                message: "Invalid gstNo",
            },
        },
        industry: {
            type: String,
        },
        billingAddress: {
            street1: {
                type: String,
            },
            street2: {
                type: String,
            },
            city: {
                type: String,
            },
            state: {
                type: String,
            },
            pinCode: {
                type: String,
            },
        },
        deliveryAddress: {
            street1: {
                type: String,
            },
            street2: {
                type: String,
            },
            city: {
                type: String,
            },
            state: {
                type: String,
            },
            pinCode: {
                type: String,
            },
        },
        bankDetails: [
            {
                bankName: {
                    type: String,
                },
                isPrimary: {
                    type: Boolean,
                },
                accountNo: {
                    type: String,
                },
                ifscCode: {
                    type: String,
                },
            },
        ],
        email: {
            type: String,
            unique: true,
        },
        website:{
            type:String
        },

        phone: {
            type: Number,
            unique: true,
            sparse: true,
        },
    },
    { timestamps: true }
);

// Custom validator functions for panNo and gstNo
function isValidPanNo(value) {
    // Implement your validation logic for panNo
    return true; // Return true if valid, false if not
}

function isValidGstNo(value) {
    // Implement your validation logic for gstNo
    return true; // Return true if valid, false if not
}
export default mongoose.model("tenant", tenantSchema, "tenant");

import mongoose from "mongoose";
import mongooseAutoPopulate from "mongoose-autopopulate";

const paymentsSchema = new mongoose.Schema({
    customer: {
        type: mongoose.Schema.ObjectId,
        ref: "customer",
        required: true,
        autopopulate: true,
    },
    removed: {
        type: Boolean,
        default: false,
    },
    paymentDate: {
        type: Date,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    paymentMode: {
        type: String,
        required: true,
    },
    ref: {
        type: String,
    },
    note: {
        type: String,
    },
    tenantId: {
        type: String,
        required: true,
    },
    paymentNo: {
        type: Number,
        unique: true, // Ensure the incremented field is unique
    },
}, { timestamps: true });

paymentsSchema.plugin(mongooseAutoPopulate);


// Pre-save middleware to count documents and set incrementField
paymentsSchema.pre("save", async function (next) {
    if (this.isNew) {
        try {
            const count = await mongoose.model("payments").countDocuments();
            this.paymentNo = count + 1;
            next();
        } catch (error) {
            next(error);
        }
    } else {
        next();
    }
});

export default mongoose.model("payments", paymentsSchema);

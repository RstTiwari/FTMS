import mongoose from "mongoose";
import mongooseAutoPopulate from "mongoose-autopopulate";

const expenseSchema = new mongoose.Schema(
    {
        customer: {
            type: mongoose.Schema.ObjectId,
            ref: "customer",
        },
        categoryName: {
            type: String,
            required: true,
        },
        amount: {
            type: Number,
            required: true,
        },
        note: {
            type: String,
        },
        expenseDate: {
            type: Date,
            required: true,
        },
        image: {
            type: String,
        },
        no: { type: Number, unique: true },
        tenantId: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

expenseSchema.plugin(mongooseAutoPopulate);

// Pre-save middleware to count documents and set incrementField
expenseSchema.pre("save", async function (next) {
    if (this.isNew) {
        try {
            const count = await mongoose.model("expenses").countDocuments();
            this.no = count + 1;
            next();
        } catch (error) {
            next(error);
        }
    } else {
        next();
    }
});
export default mongoose.model("expenses", expenseSchema);

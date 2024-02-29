import mongoose from "mongoose";
import mongooseAutoPopulate from "mongoose-autopopulate";

const expenseSchema = new mongoose.Schema({
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
    invoice: {
        type: mongoose.Schema.ObjectId,
        ref: "invoice",
    },
    note: {
        type: String,
    },
    expenseDate: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
    },
});

expenseSchema.plugin(mongooseAutoPopulate);
export default mongoose.modal("expesnses", expenseSchema);

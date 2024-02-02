import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    productName:String,
    rate:Number,
    description:String,
    category:String,
    rating:Number,
    supply:Number,
    tenantId:String
});

export default mongoose.model("product", productSchema);

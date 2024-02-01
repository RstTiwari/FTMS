import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name:String,
    price:Number,
    description:String,
    category:String,
    rating:Number,
    supply:Number,
    tenantId:String
});

export default mongoose.model("product", productSchema);

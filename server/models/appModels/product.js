import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    productCode:String,
    productName:String,
    rate:Number,
    description:String,
    image:String,
    category:String,
    rating:Number,
    supply:Number,
    hsnCode:String,
    tenantId:String
});

export default mongoose.model("product", productSchema);

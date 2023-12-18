import Product from "../models/Product.js";
import ProductStats from "../models/ProductStats.js";
import User from "../models/User.js"

export const getProduct = async (req, res) => {
    try {
        const products = await Product.find();
        const productStats = await Promise.all(
            products.map(async (product) => {
                const productStats = await ProductStats.find({
                    productId:product._id,
                });
                return { ...product._doc, productStats };
            })
        );
        res.status(200).json(productStats);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const getCoustomers = async(req,res)=>{
    try {
        
        const coustomers = await User.find({role:"user"}).select("-password")
        res.status(200).json(coustomers);

    } catch (error) {
        res.status(404).json({ message: error.message });
        
    }

}
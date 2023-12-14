import Product from "../models/Product.js";
import ProductStats from "../models/ProductStats.js";

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
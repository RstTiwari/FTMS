import Product from "../models/Product.js";
import ProductStats from "../models/ProductStats.js";
import User from "../models/coreModels/User.js"
import Transaction from "../models/Transaction.js";

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

export const getTransaction = async (req,res)=>{
    try {
        //sort shoild look like this  {filed:userId, sort:"desc"}
        const {page = 1,pageSize = 20, sort  = null ,search = ""} = req.query;
        console.log(sort,search,"---");

        // formatted sort should look like this  {userId:-1};

        const genrateSort  = ()=>{
            let parsedSort = JSON.parse(sort);
            const formattedSort = {
                [parsedSort.feild]:parsedSort.sort =  "asc"  ? 1:0
            }
            return formattedSort
        }
        const sortFormatted = Boolean(sort) ? genrateSort():{} ;

        let filteFormatted = {
            $or: [
                { cost: { $regex: new RegExp(search, "i") } },
                { userId: { $regex: new RegExp(search, "i") } },
            ],
        }
        const transaction = await Transaction.find(filteFormatted)
            .sort(sortFormatted)
            .skip(page * pageSize)
            .limit(pageSize);

        const total = await Transaction.countDocuments({
            cost: { $regex: search, $options: "i" },
        });
          
        res.status(200).json({ transaction, total });
        
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}
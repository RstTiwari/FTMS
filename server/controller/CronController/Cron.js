import productDb from "../../models/appModels/product.js";
import { dataProduct } from "../../data/index.js";

const cron = async () => {
    let productData = await productDb.find({});
    productData.map(async (item) => {
        await productDb.updateOne(
            { _id: item._id },
            { $set: { hsnCode: "12345" } }
        );
    });
};
export default cron;
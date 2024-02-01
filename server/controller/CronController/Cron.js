import productDb from "../../models/appModels/product.js";
import { dataProduct } from "../../data/index.js";

const cron = async () => {
    dataProduct.map(async (item) => {
        item.tenantId = "TrL_PhLoH"
       let data = await productDb.create(item);
        console.log(data);
    });
};
export default cron;
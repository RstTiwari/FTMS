import data from "../Script/vipplaymyfac8ry.customer.json" assert { type: "json" };
import productData from "../Script/vipplaymyfac8ry.product.json" assert { type: "json" };
import invoiceData from "../Script/vipplaymyfac8ry.invoice.json" assert { type: "json" };
import quoteData from "../Script/vipplaymyfac8ry.quotation.json" assert { type: "json" };

import checkDbForEntity from "../Helper/databaseSelector.js";
import Fuse from "fuse.js";

let tenantId = "677a720181717de4d8000efe";
if (process.env.NODE_ENV == "production") {
    tenantId = "67f6345437354c900745041d";
}

const script = {
    customer: async () => {
        let dataBase = checkDbForEntity("customers");
        let states = [
            { label: "Andhra Pradesh", value: "Andhra Pradesh" },
            { label: "Arunachal Pradesh", value: "Arunachal Pradesh" },
            { label: "Assam", value: "Assam" },
            { label: "Bihar", value: "Bihar" },
            { label: "Chhattisgarh", value: "Chhattisgarh" },
            { label: "Goa", value: "Goa" },
            { label: "Gujarat", value: "Gujarat" },
            { label: "Haryana", value: "Haryana" },
            { label: "Himachal Pradesh", value: "Himachal Pradesh" },
            { label: "Jharkhand", value: "Jharkhand" },
            { label: "Karnataka", value: "Karnataka" },
            { label: "Kerala", value: "Kerala" },
            { label: "Madhya Pradesh", value: "Madhya Pradesh" },
            { label: "Maharashtra", value: "Maharashtra" },
            { label: "Manipur", value: "Manipur" },
            { label: "Meghalaya", value: "Meghalaya" },
            { label: "Mizoram", value: "Mizoram" },
            { label: "Nagaland", value: "Nagaland" },
            { label: "Odisha", value: "Odisha" },
            { label: "Punjab", value: "Punjab" },
            { label: "Rajasthan", value: "Rajasthan" },
            { label: "Sikkim", value: "Sikkim" },
            { label: "Tamil Nadu", value: "Tamil Nadu" },
            { label: "Telangana", value: "Telangana" },
            { label: "Tripura", value: "Tripura" },
            { label: "Uttar Pradesh", value: "Uttar Pradesh" },
            { label: "Uttarakhand", value: "Uttarakhand" },
            { label: "West Bengal", value: "West Bengal" },
            {
                label: "Andaman and Nicobar Islands",
                value: "Andaman and Nicobar Islands",
            },
            { label: "Chandigarh", value: "Chandigarh" },
            {
                label: "Dadra and Nagar Haveli and Daman and Diu",
                value: "Dadra and Nagar Haveli and Daman and Diu",
            },
            { label: "Lakshadweep", value: "Lakshadweep" },
            { label: "Delhi", value: "Delhi" },
            { label: "Puducherry", value: "Puducherry" },
            { label: "Ladakh", value: "Ladakh" },
            { label: "Jammu and Kashmir", value: "Jammu and Kashmir" },
        ];
        const fuse = new Fuse(states, {
            includeScore: true,
            threshold: 0.4,
        });

        function normalizeStateName(input) {
            const search = fuse.search(input.toUpperCase());
            return search.length > 0 ? search[0].item : input;
        }

        for (let i = 0; i < data.length; i++) {
            let item = data[i];
            let temObj = {
                name: item.companyName,
                phone: item.phoneNumber,
                email: item.email,
                gstNo: item.gstNo,
                panNo: item.panNo,
                tenantId: tenantId,
                billingAddress: {
                    street1: item.address,
                    stree2: "",
                    city: item.city,
                    state: normalizeStateName(item.state),
                    pincode: item.zipcode,
                },
                shippingAddress: {
                    street1: item.address,
                    city: item.city,
                    street2: "",
                    state: normalizeStateName(item.state),
                    pincode: item.zipcode,
                },
                _id: item._id.$oid,
            };
            try {
            } catch (error) {
                console.log(error);
            }
            await dataBase.create(temObj);
            console.log(`the following data are updated ${i + 1}`);
        }
    },
    product: async () => {
        let database = checkDbForEntity("products");
        for (let i = 0; i < productData.length; i++) {
            let item = productData[i];
            let temObj = {
                name: item.productName,
                image: item.image,
                rate: item.rate,
                itemType: "product",
                tenantId: tenantId,
            };
            try {
                await database.create(temObj);
            } catch (error) {
                console.log(error);
                continue;
            }
            console.log(`the following data are updated ${i + 1}`);
        }
    },
    invoice: async () => {
        let database = checkDbForEntity("invoices");
        for (let i = 0; i < invoiceData.length; i++) {
            let item = invoiceData[i];

            let productItem = item.products?.map((product) => {
                return {
                    description: product.itemDescription,
                    qty: product.qty,
                    hsnCode: product.hsnCode,
                    rate: product.rate,
                    gstPercent:
                        (product.sGstDiscountPercent || 0) +
                        (product.cGstDiscountPercent || 0) +
                        (product.iGstDiscountPercent || 0),
                    taxAmount:
                        (product.sGstDiscountAmt || 0) +
                        (product.cGstDiscountAmt || 0) +
                        (product.iGstDiscountAmt || 0),
                    finalAmount: product.taxableValue,
                };
            });
            let customerData = null;

            if (!item.customer) {
                customerData = await checkDbForEntity("customers").findOne({
                    name: item.billing.companyName,
                });
            }

            let temObj = {
                customer: item?.customer
                    ? item?.customer?.$oid
                    : customerData?._id,
                no: item?.invoiceNo,
                invoiceDate: getMongoDbDate(item?.invoiceDate),
                dueDate: getDueDate(item?.invoiceDate),
                items: productItem,
                grossTotal: item.grossTotal,
                grandTotal: item.grandTotal,
                taxAmount: item.grandTotal - item.grossTotal,
                totalWithTax:
                    item.grossTotal + (item.grandTotal - item.grossTotal),
                tenantId: tenantId,
            };

            try {
                await database.create(temObj);
            } catch (error) {
                console.log(error);
                continue;
            }
            console.log(`the following data are updated ${i + 1}`);
        }
    },
    quotation: async () => {
        let database = checkDbForEntity("quotations");
        for (let i = 0; i < quoteData.length; i++) {
            let item = quoteData[i];
            let terms = [];
           
            let productItems = item.products.map((products) => {
                return {
                    description: item.description,
                    rate: item.rate,
                    image: item.image || "",
                    hsnCode: item.hsnCode,
                    discountPercent: item.discount,
                    discountAmount: item.bestOffer,
                    taxAmount: item.amount - item.bestOffer,
                    finalAmount: item.amount,
                };
            });

            let temObj = {
                no: item.quotationNo,
                sub: item.sub,
                quoteDate: item.createdAt.$date,
                expiryDate: item.createdAt.$date,
                products: productItems,
                grossTotal: item.grossTotal,
                taxAmount: item.grandTotal - item.grossTotal,
                totalWithTax:item.grandTotal,
                grandTotal: item.grandTotal,
                tenantId:tenantId
            };

                try {
                    await database.create(temObj);
                } catch (error) {
                    console.log(error);
                    continue;
                }
        }
    },
};

function getMongoDbDate(dateStr) {
    console.log(dateStr);
    const [day, month, year] = dateStr.split("-");
    const mongoDate = new Date(`${year}-${month}-${day}T00:00:00.000Z`);
    return mongoDate;
}
console.l;

function getDueDate(dateStr) {
    const [day, month, year] = dateStr.split("-");
    const originalDate = new Date(`${year}-${month}-${day}T00:00:00.000Z`);
    const addedDays = 45;
    const resultDate = new Date(
        originalDate.getTime() + addedDays * 24 * 60 * 60 * 1000
    );
    return resultDate;
}

export default script;

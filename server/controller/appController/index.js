import leadDb from "../../models/appModels/lead.js";
import customerDb from "../../models/appModels/customer.js";
import productDb from "../../models/appModels/product.js";
import quoteDb from "../../models/appModels/quotation.js";
import invoiceDb from "../../models/appModels/invoice.js";
import paymentDb from "../../models/appModels/payments.js";
import expensesDb from "../../models/appModels/expenses.js";
import deliveryChallanDb from "../../models/appModels/challan.js";
import vednorDb from "../../models/appModels/vendor.js";
import purchaseDb from "../..//models/appModels/purchase.js";
import tenantDb from "../../models/coreModels/Tenant.js";
import create from "./create.js";
import fetchSelectData from "./fetchSelectData.js";
import read from "./read.js";
import update from "./update.js";
import patch from "./patch.js";
import genratePdf from "./genratePdf.js";
import upload from "./upload.js";
import tenantData from "../../models/coreModels/tenantData.js";

const appRoutes = {
    create: async (req, res, next) => {
        create(req, res, next);
    },
    fetchSelectData: async (req, res, next) => {
        fetchSelectData(req, res, next);
    },
    read: async (req, res, next) => {
        read(req, res, next);
    },
    update: async (req, res, next) => {
        update(req, res, next);
    },
    patch: async (req, res, next) => {
        patch(req, res, next);
    },
    genratePdf: async (req, res, next) => {
        genratePdf(req, res, next);
    },
    upload: async (req, res, next) => {
        upload(req, res, next);
    },
    // challan: async (req, res, next) => {
    //     try {
    //         const { action, value } = req.body;
    //         if (action === "list") {
    //             const challanData = await deliveryChallanDb.find();
    //             res.status(200).json({
    //                 success: 1,
    //                 result: challanData,
    //                 message: "Data Fetched Successfully",
    //             });
    //         } else if (action === "update") {
    //             if (!value) throw new Error("Please give update object");
    //             const { challanNo, items } = value;
    //             const updateData = await deliveryChallanDb.updateOne(
    //                 { challanNumber: challanNo },
    //                 { $set: { items } }
    //             );
    //             if (updateData.modifiedCount >= 1) {
    //                 res.status(200).json({
    //                     success: 1,
    //                     result: updateData,
    //                     message: "Data Fetched Successfully",
    //                 });
    //             } else {
    //                 throw new Error("Failed to Update the Data");
    //             }
    //         }
    //     } catch (error) {
    //         const response = {
    //             success: 0,
    //             result: null,
    //             message: error.message,
    //         };
    //         res.status(400).json(response);
    //     }
    // },
};

export default appRoutes;

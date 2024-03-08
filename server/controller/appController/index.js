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
import tenantDb from "../../models/coreModels/Tenant.js"
import create from "./create.js";
import getList from "./getList.js";
import read from "./read.js";
import update from "./update.js";
import patch from "./patch.js";
import genratePdf from "./genratePdf.js";
import upload from "./upload.js"

const appRoutes = {
    create: async (req, res, next) => {
        // will update the Data Model based on entity here only
        let db = checkDbForEntity(req.body.entity);
        if (!db)
            return res.status(404).json({
                success: 0,
                data: null,
                message: "Something went Wrong",
            }); // manage Error here
        create(req, res, next, db);
    },
    getList: async (req, res, next) => {
        let db = checkDbForEntity(req.body.entity);
        if (!db)
            return res.status(404).json({
                success: 0,
                data: null,
                message: "Something went Wrong",
            }); // manage Error here
        getList(req, res, next, db);
    },
    read: async (req, res, next) => {
        let db = checkDbForEntity(req.query.entity);
        if (!db)
            return res.status(404).json({
                success: 0,
                data: null,
                message: "Something went Wrong",
            }); // manage Error here
        read(req, res, next, db);
    },
    update: async (req, res, next) => {
        let db = checkDbForEntity(req.body.entity);
        if (!db)
            return res.status(404).json({
                success: 0,
                data: null,
                message: "Something went Wrong",
            }); // manage Error here
        update(req, res, next, db);
    },
    patch: async (req, res, next) => {
        let db = checkDbForEntity(req.body.entity);
        if (!db)
            return res.status(404).json({
                success: 0,
                data: null,
                message: "Something went Wrong",
            }); // manage Error here
        patch(req, res, next, db);
    },
    genratePdf: async (req, res, next) => {
        let db = checkDbForEntity(req.query.entity);
        if (!db)
            return res.status(404).json({
                success: 0,
                data: null,
                message: "Something went Wrong",
            }); // manage Error here
        genratePdf(req, res, next, db);
    },
    upload: async (req, res, next) => {
        let db = checkDbForEntity("orgnizationprofile");
        if (!db)
            return res.status(404).json({
                success: 0,
                data: null,
                message: "Something went Wrong",
            }); // manage Error here
        upload(req, res, next, db);
    },
};

const checkDbForEntity = (entity) => {
    if (entity === "customer") {
        return customerDb;
    } else if (entity === "lead") {
        return leadDb;
    } else if (entity === "product") {
        return productDb;
    } else if (entity === "quote") {
        return quoteDb;
    } else if (entity === "invoice") {
        return invoiceDb;
    } else if (entity === "product") {
        return invoiceDb;
    } else if (entity === "payments") {
        return paymentDb;
    } else if (entity === "expenses") {
        return expensesDb;
    } else if (entity === "deliverychallan") {
        return deliveryChallanDb;
    } else if (entity === "vendors") {
        return vednorDb;
    } else if (entity === "purchaseorder") {
        return purchaseDb;
    } else if (entity === "orgnizationprofile") {
        return tenantDb;
    } else {
        return false;
    }
};

export default appRoutes;

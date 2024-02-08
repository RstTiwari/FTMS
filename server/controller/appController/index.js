import leadDb from "../../models/appModels/lead.js";
import customerDb from "../../models/appModels/customer.js";
import productDb from "../../models/appModels/product.js";
import quoteDb from "../../models/appModels/quotation.js";
import invoiceDb from "../../models/appModels/invoice.js";
import create from "./create.js";
import getList from "./getList.js";
import read from "./read.js";
import update from "./update.js"
import genratePdf  from "./genratePdf.js"

const appRoutes = {
    create: async (req, res, next) => {
        // will update the Data Model based on entity here only
        let db = checkDbForEntity(req.body.entity);
        if (!db) return res.send("failed"); // manage Error here
        create(req, res, next, db);
    },
    getList: async (req, res, next) => {
        let db = checkDbForEntity(req.body.entity);
        if (!db) return res.send("failed"); // manage Error here
        getList(req, res, next, db);
    },
    read: async (req, res, next) => {
        let db = checkDbForEntity(req.query.entity);
        if (!db) return res.send("failed"); // manage Error here
        read(req, res, next, db);
    },
    update: async (req, res, next) => {
        let db = checkDbForEntity(req.body.entity);
        if (!db) return res.send("failed");
        update(req, res, next, db);
    },
    genratePdf :async (req,res,next)=>{
        genratePdf(req,res,next)
    }
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
    } else {
        return false;
    }
};

export default appRoutes;

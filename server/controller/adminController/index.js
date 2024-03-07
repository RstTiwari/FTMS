import userDb from "../../models/coreModels/User.js";
import userPasswordDb from "../../models/coreModels/UserPassword.js";
import tenantDb from "../../models/coreModels/Tenant.js";
import create from "../adminController/create.js";
import update from "../adminController/update.js";
import read from "../adminController/read.js"

const adminRoutes = {
    create: async (req, res,next) => {
        const db = checkDbForEntity(req.entity);
        if (!db)
            return res.status(404).json({
                success: 0,
                data: null,
                message: "Something went Wrong",
            }); // manage Error here

        create(req, res, next, db);
    },
    update: async (req, res,next) => {
        const db = checkDbForEntity(req.body.entity);
        if (!db)
            return res.status(404).json({
                success: 0,
                data: null,
                message: "Something went Wrong",
            }); // manage Error here
            
        update(req, res, next, db);
    },
    read: async (req, res,next) => {
        const db = checkDbForEntity(req.query.entity);
        if (!db)
            return res.status(404).json({
                success: 0,
                data: null,
                message: "Failed To Find the Backend Entity",
            }); // manage Error here
            
        read(req, res, next, db);
    },
};

const checkDbForEntity = (entity) => {
    if (entity === "orgnizationprofile") {
        return tenantDb;
    } else {
        return false;
    }
};

export default adminRoutes;

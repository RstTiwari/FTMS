import userDb from "../../models/coreModels/User.js";
import userPasswordDb from "../../models/coreModels/UserPassword.js";
import tenantDb from "../../models/coreModels/Tenant.js";
import create from "../adminController/create.js";
import update from "../adminController/update.js";
import read from "../adminController/read.js"

const adminRoutes = {
    create: async (req, res,next) => {
        create(req, res, next);
    },
    update: async (req, res,next) => {    
        update(req, res, next);
    },
    read: async (req, res,next) => {        
        read(req, res, next);
    },
};

export default adminRoutes;

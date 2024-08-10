import verify from "./verify.js";
import register from "./register.js";
import login from "./login.js";
import userPasswordDb from "../../models/coreModels/UserPassword.js";
import userDb from "../../models/coreModels/User.js";
import isValidAuthtoken from './isValidAuthtoken.js';
import tenantDb from "../../models/coreModels/Tenant.js"
import forgetpassword from "./forgetPassword.js";
import updatePassword from "./updatePassword.js"
import tenantData from "../../models/coreModels/tenantData.js";

const authRoutes = {
    verify: (req, res, next) => {
        verify(req, res, next, userDb, userPasswordDb, tenantDb);
    },
    register: (req, res, next) => {
        register(req, res, next, userDb, userPasswordDb, tenantDb);
    },
    login: (req, res, next) => {
        login(req, res, next, userDb, userPasswordDb, tenantDb, tenantData);
    },
    isValidAuthtoken: (req, res, next) => {
        isValidAuthtoken(req, res, next, userDb, userPasswordDb, tenantDb);
    },
    forgetPassword: (req, res, next) => {
        forgetpassword(req, res, next, userDb, userPasswordDb, tenantDb);
    },
    updatePassword:(req,res,next)=>{
        updatePassword(req,res,next,userDb,userPasswordDb,tenantDb)
    }
};

export default authRoutes;

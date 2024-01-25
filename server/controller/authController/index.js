import verify from "./verify.js";
import register from "./register.js";
import login from "./login.js";
import userPasswordDb from "../../models/coreModels/UserPassword.js";
import userDb from "../../models/coreModels/User.js";
import isValidAuthtoken from './isValidAuthtoken.js';


const authRoutes = {
    verify: (req, res, next) => {
        verify(req, res, next, userDb, userPasswordDb);
    },
    register: (req, res, next) => {
        register(req, res, next, userDb, userPasswordDb);
    },
    login: (req, res, next) => {
        login(req, res, next, userDb, userPasswordDb);
    },
    isValidAuthtoken: (req, res, next) => {
        isValidAuthtoken(req, res, next, userDb, userPasswordDb);
    },
};

export default authRoutes;

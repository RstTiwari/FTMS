import verify from "../../controller/authController/verify.js";
import register from "../../controller/authController/register.js";
import login from "../../controller/authController/login.js";
import userPassword from "../../models/coreModels/UserPassword.js";
import user from "../../models/coreModels/User.js";

const createAuthmiddleware = () => {
    let authMethods = {};
    authMethods.verify = (req, res, next) => {
        verify(req, res, next, user, userPassword);
    };
    authMethods.register = (req, res, next) => {
        register(req, res, next, user, userPassword);
    };
    authMethods.login  = (req, res, next) => {
        login(req, res, user, userPassword);
    };
    return authMethods;
};

export default createAuthmiddleware;

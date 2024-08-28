import create from "../adminController/create.js";
import update from "../adminController/update.js";
import read from "../adminController/read.js";
import { permissionsData } from "./permissions.js";

const adminRoutes = {
    create: async (req, res, next) => {
        create(req, res, next);
    },
    update: async (req, res, next) => {
        update(req, res, next);
    },
    read: async (req, res, next) => {
        read(req, res, next);
    },
    permissionsData: async (req, res, next) => {
        permissionsData(req, res, next);
    },
};

export default adminRoutes;

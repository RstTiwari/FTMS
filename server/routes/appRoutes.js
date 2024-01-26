import express from "express";
import appRoutes from "../controller/appController/index.js";
import authMethod from "../controller/authController/index.js";

const router = express.Router();

router.post("/create", authMethod.isValidAuthtoken, appRoutes.create);
router.post("/getList", authMethod.isValidAuthtoken, appRoutes.getList);


export default router;
    
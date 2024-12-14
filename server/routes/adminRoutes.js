import express from "express";
import adminRoutes from "../controller/adminController/index.js";
import autherization from "../middleware/autherization.js";

const router = express.Router();

/**
 * @ Neet to  have autherization check before accesing anyof this apis
 */

router.get("/read", autherization, adminRoutes.read);
router.post("/update", autherization, adminRoutes.update);
router.get("/permissionData", autherization, adminRoutes.permissionsData);
router.post("/create", autherization, adminRoutes.create);
router.post("/delete", autherization, adminRoutes.delete);

export default router;

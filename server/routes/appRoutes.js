import express from "express";
import multer from "multer";
import fs from "fs";
import appRoutes from "../controller/appController/index.js";
import authMethod from "../controller/authController/index.js";

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "upload");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
    limits: {
        fileSize: 5 * 1024 * 1024,
    },
});
const upload = multer({ storage: storage });
const type = upload.single("file");

router.post("/create", authMethod.isValidAuthtoken, appRoutes.create);
router.post("/getList", authMethod.isValidAuthtoken, appRoutes.getList);
router.get("/read", authMethod.isValidAuthtoken, appRoutes.read);
router.post("/update", authMethod.isValidAuthtoken, appRoutes.update);
router.patch("/patch", authMethod.isValidAuthtoken, appRoutes.patch);
router.get("/pdf", authMethod.isValidAuthtoken, appRoutes.genratePdf);
router.post("/upload", type, appRoutes.upload);

export default router;

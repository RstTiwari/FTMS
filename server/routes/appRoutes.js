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
const attachmentsUpload = upload.array("attachments");

router.post("/create", authMethod.isValidAuthtoken, appRoutes.create);
router.post("/read", authMethod.isValidAuthtoken, appRoutes.read);
router.get("/get", authMethod.isValidAuthtoken, appRoutes.get);
router.post("/update", authMethod.isValidAuthtoken, appRoutes.update);
router.patch("/patch", authMethod.isValidAuthtoken, appRoutes.patch);
router.get("/pdf", appRoutes.genratePdf);
router.post("/upload", type, authMethod.isValidAuthtoken, appRoutes.upload);
router.get(
    "/fetchCountersNumber",
    authMethod.isValidAuthtoken,
    appRoutes.fetchCountersNumber
);
router.post(
    "/updateCountersNumber",
    authMethod.isValidAuthtoken,
    appRoutes.updateCountersNumber
);
router.post(
    "/fetchCustomModalData",
    authMethod.isValidAuthtoken,
    appRoutes.fetchCustomModalData
);
router.post(
    "/addSelectData",
    authMethod.isValidAuthtoken,
    appRoutes.addSelectData
);
router.get(
    "/fetchSelectData",
    authMethod.isValidAuthtoken,
    appRoutes.fetchSelectData
);
router.post(
    "/recordPayment",
    authMethod.isValidAuthtoken,
    appRoutes.recordPayment
);
router.post(
    "/updatePayment",
    authMethod.isValidAuthtoken,
    appRoutes.updatePayment
);
router.get(
    "/totalReciveables",
    authMethod.isValidAuthtoken,
    appRoutes.totalReciveables
);
router.get("/emailData", authMethod.isValidAuthtoken, appRoutes.emailData);
router.post(
    "/sendEmail",
    attachmentsUpload,
    authMethod.isValidAuthtoken,
    appRoutes.sendEmail
);
router.get(
    "/fetchComments",
    authMethod.isValidAuthtoken,
    appRoutes.fetchComments
);

router.post(
    "/getOrCreateColumnPreferences",
    authMethod.isValidAuthtoken,
    appRoutes.getOrCreateColumnPreferences
);
router.post(
    "/updateColumnPreferences",
    authMethod.isValidAuthtoken,
    appRoutes.updateColumnPreferences
);
router.get("/getleadger", authMethod.isValidAuthtoken, appRoutes.getLeadger);

// //just for app Data
// router.post("/challan", appRoutes.challan);

export default router;

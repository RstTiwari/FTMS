import express from "express";
import script from "../Script/Script.js";

const router = express.Router();

router.post("/customer", script.customer);
router.post("/product",script.product)
router.post("/invoice",script.invoice)


export default router;

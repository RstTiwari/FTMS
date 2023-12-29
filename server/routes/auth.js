import express from "express"
import register from "../controller/authController/register.js"
import verify from "../controller/authController/verify.js"

const router = express.Router()

router.post("/register",register)
router.post("/verify",verify)





export default router;
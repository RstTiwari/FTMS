import express from "express"
import authMethod from "../controller/authController/index.js"

const router = express.Router()

router.post("/register",authMethod.register)
router.post("/verify",authMethod.verify)
router.post("/login" , authMethod.login)






export default router;
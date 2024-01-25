import express from "express"
import authRoutes from "../controller/authController/index.js"

const router = express.Router()

router.post("/register",authRoutes.register)
router.get("/verify'",authRoutes.verify)
router.post("/login" , authRoutes.login)
router.post("/isValidAuthtoken" , authRoutes.isValidAuthtoken)




export default router;
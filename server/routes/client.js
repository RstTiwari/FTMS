import express from "express"
import {getProduct,getCoustomers,getTransaction} from "../controller/client.js"
import authMethod from "../controller/authController/index.js"
const router = express.Router()

router.get("/products", authMethod.isValidAuthtoken ,getProduct)
router.get("/coustomers",getCoustomers)
router.post("/transaction",getTransaction)



export default router;
import express from "express"
import {getProduct,getCoustomers,getTransaction} from "../controller/client.js"

const router = express.Router()

router.get("/products",getProduct)
router.get("/coustomers",getCoustomers)
router.post("/transaction",getTransaction)



export default router;
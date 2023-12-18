import express from "express"
import {getProduct,getCoustomers} from "../controller/client.js"

const router = express.Router()

router.get("/products",getProduct)
router.get("/coustomers",getCoustomers)


export default router;
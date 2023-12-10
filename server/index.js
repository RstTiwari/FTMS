import express from "express"
import cors from "cors"
import bodyParser from "body-parser"
import helmet from "helmet"
import morgan from "morgan"
import mongoose from "mongoose"
import dotenv from "dotenv"

import clientRoutes from  "./routes/client.js"
import salesRoutes from  "./routes/sales.js"
import generalRoutes from  "./routes/general.js"
import managmentRoutes from  "./routes/managment.js"

const Port =  process.env.PORT || 5001



/**
 * Configration
 */
dotenv.config()
const app = express()
app.use(express.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({policy:"cross-origin"}));
app.use(morgan("common"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(cors())

/**
 * Configratrions of Routes
 */

app.use("/client", clientRoutes);
app.use("/sales", salesRoutes);
app.use("/mangament", managmentRoutes);
app.use("/genral", generalRoutes);

/**
 * Mongoose Connection to Data base
 */

mongoose
    .connect(process.env.MDURl, {
        useUnifiedTopology: true,
    })
    .then(() => {
        app.listen(Port, () => {
            console.log(` Server is running on the port ${Port}`);
        });
    })
    .catch((e) => {
        console.log("Data base connection failed" + e);
    });

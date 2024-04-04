import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import helmet from "helmet";
import morgan from "morgan";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import https from "https";
import http from "http"
import fs from "fs";
import {v2 as cloudinary} from "cloudinary"

import clientRoutes from "./routes/client.js";
import salesRoutes from "./routes/sales.js";
import generalRoutes from "./routes/general.js";
import managmentRoutes from "./routes/managment.js";
import auth from "./routes/auth.js";
import appRoutes from "./routes/appRoutes.js";

import cron from "./controller/CronController/Cron.js";
import adminRoutes from "./routes/adminRoutes.js";

/**
 * Configuration
 */


dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());
app.use(cookieParser());

/**
 * Configuration of Routes
 */

app.use("/auth", auth);
app.use("/app", appRoutes);
app.use("/admin",adminRoutes)
app.use("/client", clientRoutes);
app.use("/sales", salesRoutes);
app.use("/mangament", managmentRoutes);
app.use("/general", generalRoutes);

const Port = process.env.PORT || 5001;

/**
 * Lets Conncet to Cloudinary with this Datas 
 */
cloudinary.config({
    cloud_name: process.env.cloudinaryName,
    api_key: process.env.apiKey,
    api_secret: process.env.apiSecret,
});
const MDURLSTRING = process.env.MDURL
console.log(MDURLSTRING,typeof MDURLSTRING);
mongoose
  .connect(MDURLSTRING, {
    useUnifiedTopology: true,
  })
  .then(() => {
    // Create HTTP or HTTPS server based on environment
    if (process.env.NODE_ENV === "production") {
      // Read SSL certificates for production
      const options = {
        key: fs.readFileSync(process.env.KEY_PATH),
        cert: fs.readFileSync(process.env.CERT_PATH),
      };

      // Create HTTPS server in production
      https.createServer(options, app).listen(Port, () => {
        console.log(`Server is running on the port ${Port} (production)`);
      });
    } else {
      // Create HTTP server in development
      http.createServer(app).listen(Port, () => {
        console.log(`Server is running on the port ${Port} (development)`);
      });
    }
  })
  .catch((e) => {
    console.log("Database connection failed" + e);
  });

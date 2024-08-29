import userDb from "../models/coreModels/User.js";
import jwt from "jsonwebtoken";

const autherization = async (req, res, next) => {
    /**
     * Checking if the  user is having the role acces or not
     */
    try {
        const token = req.headers["token"];

        if (!token) {
            throw new Error("Autherization failed");
        }
        const verfied = jwt.verify(token, process.env.JWT_SECRET);

        if (!verfied) {
            throw new Error("Failed To Authenticate the User");
        }

        const userId = verfied.userId;
        // now let find the Users Data form the userDatabse
        const userData = await userDb.findOne({ _id: userId, removed: false });

        if (!userData) {
            throw new Error("Cant access  Autherization Failed");
        }

        const role = userData.role;

        if (role !== "superadmin" && role !== "admin") {
            throw new Error("You are not Authorized");
        }

        req["tenantId"] = userData.tenantId;
        (req["role"] = userData.role), (req["userId"] = userData._id);
        (req["email"] = userData.email), (req["name"] = userData.name);
        next();
    } catch (error) {
        return res.status(401).json({
            success: 0,
            result: null,
            message: error.message,
        });
    }
};

export default autherization;

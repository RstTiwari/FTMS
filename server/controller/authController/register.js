import bcrypt from "bcryptjs";
import Joi from "joi";
import { generate as uniqueId } from "shortid";
import User from "../../models/coreModels/User.js";
import UserPassword from "../../models/coreModels/UserPassword.js";
import sendEmail from "../authController/sendEmail.js";

const register = async (req, res, next, userDb, userPasswordDb, tenantDb) => {
    const { companyName, name, email, password } = req.body;

    //validate input parameters
    const ObjectSchema = Joi.object({
        companyName: Joi.string().required(),
        name: Joi.string().required(),
        email: Joi.string()
            .email({ tlds: { allow: true } })
            .required(),
        password: Joi.string().required(),
    });
    const { error, value } = ObjectSchema.validate({
        companyName,
        name,
        email,
        password,
    });

    if (error) {
        return res.status(409).json({
            success: 0,
            result: null,
            message: "Invalid/Missing credentials",
        });
    }
    const existingUser = await userDb.findOne({ email: email, removed: false });
    if (existingUser) {
        return res.status(409).json({
            success: 0,
            result: null,
            message: "An account with this email has already been registered.",
        });
    }

    /**
     *Creating a new Tenant
     */
    const tenantId = uniqueId();
    const tenantData = await tenantDb.create({ tenantId, companyName });
    if (!tenantData) {
        return res.status(403).json({
            success: 0,
            result: null,
            message: "Failed To Register",
        });
    }
    console.log(tenantData);
    /**
     * Creating a New User
     */
    const salt = uniqueId();
    const hashedPassword = bcrypt.hashSync(salt + password);
    const emailOtp = Math.floor(100000 + Math.random() * 900000);
    const emailOtpExpireTime = Math.floor(Date.now() / 1000) + 900;

    const savedUser = await User.create({ email, name, tenantId });
    const registrationDone = await userPasswordDb.create({
        user: savedUser._id,
        password: hashedPassword,
        salt: salt,
        emailOtp: emailOtp,
        emailOtpExpireTime: emailOtpExpireTime,
    });

    if (!registrationDone) {
        await User.deleteOne({ _id: savedUser._id }).exec();
        return res.status(403).json({
            success: 0,
            result: null,
            message: "document couldn't save correctly",
        });
    }

    const myfac8ryEmail = process.env.email;
    await sendEmail({ email, name, emailOtp });

    return res.status(200).json({
        success: 1,
        result: {
            userId: savedUser._id,
            name: savedUser.name,
            email: savedUser.email,
        },
        message:
            "Account registered successfully. Please check mail and verify.",
    });
};

export default register;

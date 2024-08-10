import bcrypt from "bcryptjs";
import Joi from "joi";
import { generate as uniqueId } from "shortid";
import User from "../../models/coreModels/User.js";
import sendEmail from "../authController/sendEmail.js";
import tenantSpecificData from "../../data/tenantData.js";
import tenantDataModal from "../../models/coreModels/tenantData.js";

const register = async (req, res, next, userDb, userPasswordDb, tenantDb) => {
  try {
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
    const existingUser = await userDb.findOne({
      email: email,
      removed: false,
    });
    if (existingUser) {
      return res.status(409).json({
        success: 0,
        result: null,
        message: "An account with this email exist.",
      });
    }

    /**
     *Creating a new Tenant
     */

    const tenantData = await tenantDb.create({ companyName, email });
    if (!tenantData) {
      return res.status(403).json({
        success: 0,
        result: null,
        message: "Failed To Register",
      });
    }
    /**
     * Creating a New User
     */

    const salt = uniqueId();
    const hashedPassword = bcrypt.hashSync(salt + password);
    const emailOtp = Math.floor(100000 + Math.random() * 900000);
    const emailOtpExpireTime = Math.floor(Date.now() / 1000) + 900;

    //Creating New User For
    const tenantId = tenantData._id;
    const savedUser = await User.create({ email, name, tenantId });

    const registrationDone = await userPasswordDb.create({
      userId: savedUser.id,
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

    //Creating basic  tenantData  //Side bar columns and all
    await tenantDataModal.create({
      tenantId: tenantData._id,
      ...tenantSpecificData,
    });

    const type = "emailVerification";
    await sendEmail({ email, name, emailOtp, type });

    return res.status(200).json({
      success: 1,
      result: {
        user: {
          userId: savedUser._id,
          name: savedUser.name,
          email: savedUser.email,
        },
        tenant: {
          tenantId: tenantData._id,
        },
      },
      message: "Account registered successfully. Please check mail and verify.",
    });
  } catch (error) {
    next(error);
  }
};

export default register;

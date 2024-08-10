import tenantDataDb from "../../models/coreModels/tenantData.js";
import Joi from "joi";
import Jwt from "jsonwebtoken";

const verify = async (req, res, next, userDb, userPasswordDb, tenantDb) => {
    try {
        const { userId, emailOtp, tenantId } = req.body;
        const ObjectSchema = Joi.object({
            userId: Joi.string().required(),
            emailOtp: Joi.number().required(),
            tenantId: Joi.string().required(),
        });

        const { error, value } = ObjectSchema.validate({
            userId,
            emailOtp,
            tenantId,
        });

        if (error) {
          return res.status(409).json({
            success: 0,
            result: null,
            message: "Invalid/Missing credentials ",
          });
        }

        const userPasswordResult = await userPasswordDb.findOne({
          userId: userId,
          removed: false,
        });

        if (!userPasswordResult)
          return res.status(404).json({
            success: 0,
            result: null,
            message: "No account with this email has been registered.",
          });

        if (userPasswordResult.emailVerified) {
          return res.status(404).json({
            success: 0,
            result: null,
            message: "Email is Verified Pls Login to Access",
          });
        }
       
        console.log(emailOtp, typeof emailOtp)
        const isMatch = Number(emailOtp) == userPasswordResult?.emailOtp ? true : false;
        console.log(isMatch, "==", userPasswordResult);


        if (
            !isMatch
        )
            return res.status(403).json({
                success: 0,
                result: null,
                message: "Invalid verify OTP",
            });

        const token = Jwt.sign({ userId: userId }, process.env.JWT_SECRET, {
            expiresIn: "24h",
        });

        await userPasswordDb
            .updateOne(
                { userId: userId },
                {
                    $set: { loggedSession: token, emailVerified: true },
                },
                { new: true }
            )
            .exec();

        await userDb
            .findOneAndUpdate({ _id: userId }, { enabled: true }, { new: true })
            .exec();

        await tenantDb
            .findOneAndUpdate(
                { tenantId: tenantId },
                { enabled: true },
                { new: true }
            )
            .exec();

        const user = await userDb.findOne({ _id: userId, removed: false });

        const tenantData = await tenantDataDb.findOne({ tenantId: tenantId });

        // Destructure another tenant Specify data in future if needed
        const sidebar = tenantData?.sidebar;

        res.status(200).json({
            success: 1,
            result: {
                user: {
                    _id: user._id,
                    name: user.name,
                    surname: user.surname,
                    role: user.role,
                    email: user.email,
                    photo: user.photo,
                    companyName: tenantData?.tenantId?.companyName,
                },
                tenant: {
                    tenantId: tenantId,
                    sidebar: sidebar,
                },
                token: token,
                expiresIn: req.body.remember ? 365 * 86400 : 86400,
            },
            message: "Successfully login user",
        });
    } catch (error) {
        return res.status(404).json({
            success: 0,
            result: null,
            message: error.message,
        });
    }
};

export default verify;

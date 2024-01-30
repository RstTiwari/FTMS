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
                message: "email of your Account has been Verified",
            });
        }
        /***
         * Checking OTP time
         */

        // let nowTime = Math.floor(Date.now() / 1000);
        // const isOtpTimeValid = userPasswordResult.emailOtpExpireTime > nowTime;

        // if (!isOtpTimeValid) {
        //     return res.status(403).json({
        //         success: 0,
        //         result: null,
        //         message: "OTP  Expired",
        //     });
        // }

        const isMatch = emailOtp === userPasswordResult.emailOtp;
        if (
            !isMatch ||
            userPasswordResult.emailOtp === undefined ||
            userPasswordResult.emailOtp === null
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
            .findOneAndUpdate(
                { user: userId },
                {
                    $push: { loggedSessions: { token: token } },
                    emailVerified: true,
                },
                { new: true }
            )
            .exec();

        const user = await userDb
            .findOneAndUpdate({ _id: userId }, { enabled: true }, { new: true })
            .exec();

        const tenant = await tenantDb
            .findOneAndUpdate(
                { tenantId: tenantId },
                { enabled: true },
                { new: true }
            )
            .exec();

        const userData = await userDb.findOne({ _id: userId, removed: false });
        console.log(userDb);

        res.status(200).json({
            success: 1,
            result: {
                _id: userData._id,
                name: userData.name,
                surname: userData.surname,
                role: userData.role,
                email: userData.email,
                photo: userData.photo,
                token: token,
            },

            message: "Login Successfull",
        });
    } catch (error) {
        return res.status(404).json({
            success: 0,
            result: null,
            message: error,
        });
    }
};

export default verify;

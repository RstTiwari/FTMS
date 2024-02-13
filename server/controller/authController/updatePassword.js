import joi from "joi";
import bcrypt from "bcryptjs";
import { generate as uniqueId } from "shortid";

const updatePassword = async (
    req,
    res,
    next,
    userDb,
    userPasswordDb,
    tenantDb
) => {
    try {
        const { userId, tenantId, otp, password } = req.body;
        const ObjectSchema = joi.object({
            userId: joi.string().required(),
            password: joi.string().required(),
            otp: joi.number().required(),
            tenantId: joi.string().required(),
        });

        const { error, value } = ObjectSchema.validate({
            userId,
            tenantId,
            otp,
            password,
        });
        if (error) {
            return res.status(409).json({
                sucess: 0,
                result: null,
                message: "Invalid/Missing credentials",
                errorMessage: error.message,
            });
        }

        // check if userId and otp matches
        let userPasswordData = await userPasswordDb.findOne({
            userId: userId,
        });
        if (!userPasswordData) {
            return res.status(404).json({
                success: 0,
                result: null,
                message: "Failed to Update the Dataa",
            });
        }
        const match = userPasswordData.resetOtp === Number(otp) ? true : false;
        if (!match) {
            return res.status(404).json({
                success: 0,
                result: null,
                message: "Invalid Otp Please Check OTP",
            });
        }

        //now updating the userPassword
        const salt = uniqueId();
        const hashedPassword = bcrypt.hashSync(salt + password);
        let updateFilter = { userId: userId};
        const updateObj = { $set: { salt: salt, password: hashedPassword } };
        let updateUserPassword = await userPasswordDb.updateOne(
            updateFilter,
            updateObj
        );
        if (updateUserPassword.modifiedCount <= 0) {
            return res.status(404).json({
                success: 0,
                result: null,
                message: "Failed to update password Try again",
            });
        }
        return res.status(200).json({
            success: 1,
            result: null,
            message: "Password update Succefull Please Login",
        });
    } catch (error) {
        res.status(400).json({
            success: 0,
            result: null,
            message: error.message,
        });
    }
};

export default updatePassword;

import Joi from "joi";
import User from "../../models/coreModels/User.js";
import Jwt from "jsonwebtoken";
import UserPassword from "../../models/coreModels/UserPassword.js";

const verify = async (req, res) => {
   try {
       const { userId, otp } = req.body;
       const ObjectSchema = Joi.object({
           userId: Joi.string().required(),
           otp: Joi.number().required(),
       });

       const { error, value } = ObjectSchema.validate({userId,otp});

       if (error) {
           return res.status(409).json({
               success: 0,
               result: null,
               message: "Invalid/Missing credentials ",
           });
       }

       const userPasswordResult = await UserPassword.findOne({
           user: userId,
           removed: false,
       });

       if (!userPasswordResult)
           return res.status(404).json({
               success: 0,
               result: null,
               message: "No account with this email has been registered.",
           })
           
        if (userPasswordResult.emailVerified) {
            return res.status(404).json({
                success: 0,
                result: null,
                message: "email of your Account has been Verified",
            });
        }

       const isMatch = otp === userPasswordResult.emailOtp;

       if (!isMatch || !userPasswordResult.emailOtp) {
           return res.status(403).json({
               success: 0,
               result: null,
               message: "Invalid Otp ",
           });
       }

       const token = Jwt.sign({ userId: userId }, process.env.JWT_SECRET, {
           expiresIn: "24h",
       });

       await UserPassword.findOneAndUpdate(
           { user: userId },
           { $push: { loggedSessions: token }, emailVerified: true, },
           { new: true }
       );

       const user = await User.findOneAndUpdate(
           { _id: userId },
           { enabled: true },
           { new: true }
       ).exec();
       
       res.status(200)
           .cookie(token, {
               maxAge: 24 * 60 * 60 * 1000,
               sameSite: "Lax",
               httpOnly: true,
               secure: false,
               domain: req.hostname,
               path: "/",
               Partitioned: true,
           })
           .json({
               success: 1,
               result: {
                   userId: user._id,
                   name: user.name,
                   role: user.role,
                   email: user.email,
                   photo: user.photo,
               },
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

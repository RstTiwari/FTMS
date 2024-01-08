import Joi from "joi";
import Jwt from "jsonwebtoken";

const verify = async (req, res,userDb,userPasswordDb) => {
   try {
    const { userId, emailToken } = req.params;
          console.log(userId,emailToken,"called");
          debugger;
       const ObjectSchema = Joi.object({
           userId: Joi.string().required(),
           emailToken: Joi.number().required(),
       });

       const { error, value } = ObjectSchema.validate({userId,emailToken});

       if (error) {
           return res.status(409).json({
               success: 0,
               result: null,
               message: "Invalid/Missing credentials ",
           });
       }

       const userPasswordResult = await userPassword.findOne({
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

        const isMatch = emailToken === userPasswordResult.emailToken;
        if (
          !isMatch ||
          userPasswordResult.emailToken === undefined ||
          userPasswordResult.emailToken === null
        )
          return res.status(403).json({
            success: 0,
            result: null,
            message: 'Invalid verify token',
          });
      
 

       const token = Jwt.sign({ userId: userId }, process.env.JWT_SECRET, {
           expiresIn: "24h",
       });

       await userPasswordDb.findOneAndUpdate(
           { user: userId },
           { $push: { loggedSessions: token }, emailVerified: true, },
           { new: true }
       ).exec();

       const user = await userDb.findOneAndUpdate(
           { _id: userId },
           { enabled: true },
           { new: true }
       ).exec();
       
       res.status(200).json({
               success: 1,
               message:"Email Verified Please Login to Dashbord",
             
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

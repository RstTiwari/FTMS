import { emailVerification, passwordVerification } from "../../template/emaillTemplate/emailTemplate.js";
import sendEmail from "../authController/sendEmail.js";
import { resendEmailController } from "../EmailController/emailController.js";

const forgetpassword = async (
  req,
  res,
  next,
  userDb,
  userPasswordDb,
  tenantDb
) => {
  try {
    let { email } = req.body;
    //find the user
    let checkUserExist = await userDb.findOne({
      email: email,
      removed: false,
    });
    if (!checkUserExist) {
      return res.status(409).json({
        success: 0,
        result: null,
        message: "An account with this email has already been registered.",
      });
    }

    const emailOtp = Math.floor(100000 + Math.random() * 900000);
    const emailOtpExpireTime = Math.floor(Date.now() / 1000) + 900;
    let updatePasswordData = {
      $set: {
        resetOtp: emailOtp,
        resetOtpExpireTime: emailOtpExpireTime,
      },
    };

    let updateUserPassword = await userPasswordDb.updateOne(
      { userId: checkUserExist._id },
      updatePasswordData
    );
    if (updateUserPassword.modifiedCount !== 1) {
      return res.status(409).json({
        success: 0,
        result: null,
        message: "Failed to update Password Try Again.",
      });
    }

    let name = checkUserExist.name;
    //verifying email
    const sub  = "Forgot Password"
     const content = passwordVerification(name, emailOtp);
     let sendEmail = await resendEmailController(
         "info.myfac8ry@gmail.com",
         email,
         sub,
         content,
         []
     );
     if (!sendEmail) {
         return res.status(403).json({
             success: 0,
             result: null,
             message: "Invalid email Id Pls try again",
         });
     }
    
    return res.status(200).json({
      success: 1,
      result: {
        user: {
          userId: checkUserExist._id,
          name: checkUserExist.name,
          email: checkUserExist.email,
        },
        tenant: {
          tenantId: checkUserExist.tenantId,
        },
      },

      message: "Please Check your m mail and verify OTP",
    });
  } catch (error) {
    console.log(error);
  }
};

export default forgetpassword;

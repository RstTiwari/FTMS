import { trusted } from "mongoose";
import { emailVerification,passwordVerification } from "../../template/emaillTemplate/emailTemplate.js"
import nodemailer from "nodemailer"
import dotenv from "dotenv"
import { token } from "morgan";
dotenv.config()


//lets crete email Transpoter 
const tranporter =  nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.GMID,
    pass: process.env.GPASS,
  },
})

  const sendEmail = async ({
      email,
      name,
      link,
      type = "emailVerification",
  }) => {
      try {
          let text = (type  = "emailVerification") ? emailVerification({name,link}):passwordVerification({name,link})
          let info = await tranporter.sendMail({
              from: process.env.myfac8ryEmail,
              to: email,
              subject: "Verify your email | Myfac8ry",
              text: text
          });
      } catch (error) {
          console.error(error);
      }
  };

export default sendEmail
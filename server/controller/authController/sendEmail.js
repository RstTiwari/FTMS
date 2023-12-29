import { emailVerification,passwordVerification } from "../../template/emaillTemplate/emailTemplate.js"
import { Resend } from "resend"


  const sendEmail = async ({
      email,
      name,
      link,
      myfac8ryEmail,
      type = "emailVerification",
  }) => {
      const resend = new Resend(process.env.ResendApi);
      const { data,error } = await resend.emails.send({
        from: myfac8ryEmail,
        to: [email],
        subject: 'Verify your email | Myfac8ry',
        html:
          type === 'emailVerification'
            ? emailVerification({ name, link })
            : passwordVerification({ name, link }),
      });
      return data;
  };

export default sendEmail
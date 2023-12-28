
const {Resend} = require("resend")
const sendEmail =  async ({email,name,link,myfac8ryEmail,type ="emailVerification"})=>{
  const resend  = new Resend(process.env.ResendApi)
  const { data } = await resend.emails.send({
      from: myfac8ryEmail,
      to: email,
      subject: "Verify your email | myfac8ry",
      html: (type = "emailVerification"
          ? emailVerfication({ name, link })
          : passwordVerfication({ name, link })),
  });
}
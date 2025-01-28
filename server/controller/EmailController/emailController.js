
import dotenv from "dotenv";
import nodemailer from "nodemailer";
dotenv.config();

// Create email transporter
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.GMID,
        pass: process.env.GPASS,
    },
});

export const resendEmailController = async (
    from,
    to,
    bccEmails,
    sub,
    content,
    attachment
) => {
    try {
        // Set up the email options
        let mailOptions = {
            from: from,
            to: to,
            bcc: bccEmails.join(", "),
            subject: sub,
            text: content,
            attachments: attachment || [], // Attach the file if provided
        };
        let info = await transporter.sendMail(mailOptions);
        return true;

        // const resend = new Resend(process.env.RESEND_API_KEY); // Ensure you use the correct environment variable name
        // // Split the email at the "@" character and take the first part (username)
        // const partMail = from.split("@")[0];
        // const newForm = partMail + "@ftms.myfac8ry.com";
        // const { data, error } = await resend.emails.send({
        //     from: newForm,
        //     to: to,
        //     subject: sub,
        //     html: content,
        //     attachments: attachment, // Include attachments if provided
        // });

        // if (error) {
        //     // Log or handle the response as needed
        //     console.error("Email sent successfully:", error);
        //     return false;
        // } else {
        //     return true;
        // }
    } catch (error) {
        console.error("Error sending email:", error);
    }
};

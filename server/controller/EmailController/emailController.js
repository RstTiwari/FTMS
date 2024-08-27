import { Resend } from "resend";

export const resendEmailController = async (
    from,
    to,
    sub,
    content,
    attachment
) => {
    try {
        const resend = new Resend(process.env.RESEND_API_KEY); // Ensure you use the correct environment variable name
        from.split("@")[0] + "@ftms.myfac8ry.com";

        const { data, error } = await resend.emails.send({
            from: from,
            to: to,
            subject: sub,
            html: content,
            attachments: attachment, // Include attachments if provided
        });
        console.log(data, error);

        if (error) {
            // Log or handle the response as needed
            console.error("Email sent successfully:", error);
            return false;
        } else {
            return true;
        }
    } catch (error) {
        console.error("Error sending email:", error);
    }
};

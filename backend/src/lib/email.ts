import FormData from "form-data";
import Mailgun from "mailgun.js";
import { getMailgunAPIKey, getMailgunDomain } from "@utils/email";

type SendEmailParams = Record<"to" | "subject" | "text", string>;

export const sendEmail = async ({ to, subject, text }: SendEmailParams) => {
    const mailgunDomain = getMailgunDomain();

    const mailgun = new Mailgun(FormData)
    const mgClient = mailgun.client({
        username: "api",
        key: getMailgunAPIKey()
    })

    const messageData = {
        from: `SkillWave <no-reply@${mailgunDomain}>`,
        to,
        subject,
        text,
    }

    try {
        const data = await mgClient.messages.create(mailgunDomain, messageData)
        console.log(`🚀 ~ email.ts:25 ~ sendEmail ~ data: `, data);
    } catch (error) {
        console.error("Error sending email:", error);
    }
}
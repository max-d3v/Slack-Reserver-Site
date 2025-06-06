"use server"
import emailer from "./emailerServices";
import logger from "../utils/logger";

export const emailContact = async (FormData: FormData, flavor: string | string[] | undefined, sessionData: any, inputHighlight: string | undefined) => {
    try {
        await emailer.ensureInitialized();
        
        const subject = FormData.get("subject") as string;
        const message = FormData.get("message") as string;
        const email = FormData.get("email") as string;

        if (!subject || !message || !email) {
            throw new Error("Subject and message are required");
        }
        const body = `
            Message from: ${email} \n
            message: ${message} \n
        `

        emailer.sendEmail({
            subject,
            text: body,
            metadata: {
                sessionData,
                flavor,
                inputHighlight
            }
        });

        logger.info("contact", "Contact email sent successfully", {
            flavor,
            sessionData,
            inputHighlight
        });

        return [true, "Successfully sent your message! We'll get back to you soon."];
    } catch (error: any) {
        logger.critical("contact", "Error sending contact email", {
            error: error.message,
            flavor,
            sessionData,
            inputHighlight
        });
        return [false, error.message];
    }
}
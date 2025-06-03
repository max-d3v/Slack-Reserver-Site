"use server"
import emailer from "./emailerServices"
import loggerService from "../utils/logger"

export const emailContact = async (FormData: FormData, flavor: string | string[] | undefined, sessionData: any, inputHighlight: string | undefined) => {
    try {
        console.log(FormData);
        const subject = FormData.get("subject") as string;
        const message = FormData.get("message") as string;
        const email = FormData.get("email") as string;

        if (!subject || !message || !email) {
            throw new Error("Subject and message are required");
        }

        emailer.contactEmail({
            subject,
            message,
            email,
            flavor: flavor as string,
            sessionData,
            inputHighlight
        });

        loggerService.info("contact", "Contact email sent successfully", {
            flavor,
            sessionData,
            inputHighlight
        });

        return [true, "Successfully sent your message! We'll get back to you soon."];
    } catch (error: any) {
        loggerService.critical("contact", "Error sending contact email", {
            error: error.message,
            flavor,
            sessionData,
            inputHighlight
        });
        return [false, error.message];
    }
}
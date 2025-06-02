import SMTPTransport from 'nodemailer/lib/smtp-transport';
import logger from '@/lib/utils/logger';
import nodemailer from 'nodemailer';
import { transporter } from './emailerServices';
import { CONSTANTS } from '../constants';

class Emailer {
    private targetEmail = CONSTANTS.CONTACT_EMAIL;
    constructor(private transporter: nodemailer.Transporter<SMTPTransport.SentMessageInfo, SMTPTransport.Options>) { }

    sendMail(subject: string, text: string) {
        try {
            const options = {
                to: this.targetEmail,
                subject: subject,
                text: text,
            }

            this.transporter.sendMail(options, (err, info) => {
                if (err) throw err
                else logger.info("Email sent: ", info.response);
            })
        } catch (error: any) {
            logger.error("EMAILER ERROR: ", error.message);
        }
    }


    errorEmail({ subject, message, timestamp, metadata }: { subject: string, message: string, timestamp: Date, metadata?: any }) {
        const emailBody = `
        An error occurred in the application: 
        \n\n**Error Message:** ${message}
        \n\n**Metadata:** ${JSON.stringify(metadata, null, 2)}
        \n\n**Timestamp:** ${timestamp.toLocaleString("pt-BR", {
            timeZone: "America/Sao_Paulo",
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
        })}
        `
        this.sendMail(subject, emailBody);
    }
}

const emailer = new Emailer(transporter);
export default emailer;
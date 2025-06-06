import { CONSTANTS } from '../constants';
import Mailgun from 'mailgun.js';
import FormData from 'form-data';

export type EmailOptions = {
    subject: string;
    text: string;
    metadata?: any;
}
export type ErrorEmailOptions = EmailOptions & {
    errorMessage: string;
}

export class EmailerService {
    private static instance: EmailerService | null = null;
    private initPromise: Promise<void> | null = null;

    private readonly targetEmail: string;
    private mailgun: any | null = null;
    public isInitialized = false;
    private mailgunDomain: string | null = null;

    constructor(targetEmail?: string) {
        this.targetEmail = targetEmail || CONSTANTS.CONTACT_EMAIL;
    }

    public static getInstance(): EmailerService {
        if (!EmailerService.instance) {
            EmailerService.instance = new EmailerService();
        }
        return EmailerService.instance;
    }

    public async ensureInitialized(): Promise<void> {
        if (!this.initPromise) {
            this.initPromise = this.initialize();
        }
        await this.initPromise;
    }

    public async initialize(): Promise<void> {
        if (this.isInitialized) return;

        try {
            await this.buildTransporter();
            this.isInitialized = true;
            console.log('Email service initialized successfully');
        } catch (error: any) {
            console.error('Failed to initialize email service:', error.message);
            throw new Error('Email service initialization failed');
        }
    }

    private async buildTransporter(): Promise<void> {
        try {
            const mailGunApiKey = process.env.MAILGUN_API_KEY;
            const mailgunDomain = process.env.MAILGUN_DOMAIN;

            if (!mailGunApiKey) {
                throw new Error('MAILGUN_API_KEY environment variable is required');
            }

            if (!mailgunDomain) {
                throw new Error('MAILGUN_DOMAIN environment variable is required');
            }

            if (!CONSTANTS.CONTACT_EMAIL) {
                throw new Error('Contact email is not configured');
            }


            const mailgun = new Mailgun(FormData);
            const mg = mailgun.client({
                username: "api",
                key: mailGunApiKey,
            });

            await mg.messages.create(mailgunDomain, {
                from: `Mailgun Sandbox <postmaster@${mailgunDomain}>`,
                to: ["Max Buzzarello Maul <slackreserver@gmail.com>"],
                subject: "Email initialization test",
                text: "Test completed successfully",
            });
            this.mailgunDomain = mailgunDomain;
            this.mailgun = mg;
        } catch (error: any) {
            console.error('Error building email transporter:', error.message);
            throw new Error('Failed to build email transporter');
        }
    }

    public async sendEmail(data: EmailOptions): Promise<void> {
        if (!this.isInitialized || !this.mailgun || !this.mailgunDomain) {
            throw new Error('Email service not initialized. Call initialize() first.');
        }

        const { subject, text, metadata } = data;
        const body = `${text} \n\n Metadata: ${JSON.stringify(metadata, null, 2)}`;

        const mailOptions = {
            from: `Mailgun Sandbox <postmaster@${process.env.MAILGUN_DOMAIN}>`,
            to: [this.targetEmail],
            subject: subject,
            text: body,
        };

        try {
            const info = await this.mailgun.messages.create(this.mailgunDomain, mailOptions);

            console.log('Email sent successfully:', info);
        } catch (error: any) {
            console.error('Failed to send email:', error);
            throw new Error('Email sending failed');
        }
    }

    public async sendErrorEmail(options: ErrorEmailOptions): Promise<void> {
        const { subject, errorMessage, metadata } = options;

        const formattedTimestamp = new Date().toLocaleString('pt-BR', {
            timeZone: 'America/Sao_Paulo',
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });

        const emailBody = `
An error occurred in the application:

Error Message: ${errorMessage}

Metadata: ${JSON.stringify(metadata, null, 2)}

Timestamp: ${formattedTimestamp}
    `.trim();

        await this.sendEmail({
            subject: `[ERROR] ${subject}`,
            text: emailBody,
        });
    }

}

const emailerService = EmailerService.getInstance();
export default emailerService;
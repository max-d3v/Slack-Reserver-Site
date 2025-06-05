import nodemailer from 'nodemailer';
import { CONSTANTS } from '../constants';


export const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,           // SSL port
    secure: true,        // true for SSL
    auth: {
        user: CONSTANTS.CONTACT_EMAIL,
        pass: process.env.GMAIL_APP_PASSWORD
    },
});
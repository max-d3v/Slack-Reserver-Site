import nodemailer from 'nodemailer';
import { CONSTANTS } from '../constants';


export const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: CONSTANTS.CONTACT_EMAIL,
        pass: process.env.GMAIL_APP_PASSWORD
    },
});
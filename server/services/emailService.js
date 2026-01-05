const nodemailer = require('nodemailer'); // Ideally use this later
require('dotenv').config();

const ENABLE_EMAIL = process.env.ENABLE_EMAIL_SERVICE === 'true';

const sendWelcomeEmail = async (email, username) => {
    if (!ENABLE_EMAIL) {
        console.log(`[EMAIL MOCK] Welcome Email to ${email} (username: ${username})`);
        return;
    }
    // Implementation for real email provider would go here
    console.warn('Real email sending not implemented yet, but flag is TRUE.');
};

const sendPasswordResetEmail = async (email, resetToken) => {
    if (!ENABLE_EMAIL) {
        console.log(`[EMAIL MOCK] Password Reset Email to ${email} (token: ${resetToken})`);
        return;
    }
    // Implementation for real email provider
    console.warn('Real email sending not implemented yet, but flag is TRUE.');
};

module.exports = {
    sendWelcomeEmail,
    sendPasswordResetEmail
};

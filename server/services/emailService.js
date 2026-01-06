const nodemailer = require('nodemailer');
require('dotenv').config();

const ENABLE_EMAIL = process.env.ENABLE_EMAIL_SERVICE === 'true';

// Create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: process.env.SMTP_PORT === '465', // true for 465, false for other ports
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

const sendEmail = async (to, subject, html) => {
    if (!ENABLE_EMAIL) {
        console.log(`[EMAIL MOCK] Sending email to ${to}`);
        console.log(`Subject: ${subject}`);
        // console.log(`Body: ${html}`);
        return;
    }

    try {
        const info = await transporter.sendMail({
            from: `"${process.env.SMTP_FROM_NAME || 'Niyat App'}" <${process.env.SMTP_FROM_EMAIL}>`,
            to,
            subject,
            html,
        });

        console.log(`Message sent: ${info.messageId}`);
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

const sendWelcomeEmail = async (email, username) => {
    const subject = 'Welcome to Niyat!';
    const html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #4F46E5;">Welcome to Niyat, ${username}!</h2>
            <p>We are thrilled to have you on board. Start tracking your daily prayers and stay consistent with your goals.</p>
            <p>If you have any questions, feel free to reply to this email.</p>
            <br>
            <p>Best regards,<br>The Niyat Team</p>
        </div>
    `;
    await sendEmail(email, subject, html);
};

const sendPasswordResetEmail = async (email, resetToken) => {
    // Assuming we have a frontend route for resetting password, e.g., /reset-password?token=...
    // For now, based on current UI, we might not have a dedicated reset page yet, but let's assume one or just send the token.
    const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;

    const subject = 'Password Reset Request';
    const html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #4F46E5;">Password Reset</h2>
            <p>You requested a password reset. Please click the link below to reset your password:</p>
            <p><a href="${resetLink}" style="background-color: #4F46E5; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Reset Password</a></p>
            <p>If you did not request this, please ignore this email.</p>
            <p>Link: ${resetLink}</p>
        </div>
    `;
    await sendEmail(email, subject, html);
};

module.exports = {
    sendWelcomeEmail,
    sendPasswordResetEmail
};

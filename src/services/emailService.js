const nodemailer = require('nodemailer');
const config = require('../config');
const logger = require('../utils/logger');

class EmailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: config.email.from,
                pass: config.email.password
            }
        });
    }

    async sendAlert(ip, failedAttempts, timeWindow) {
        const mailOptions = {
            from: config.email.from,
            to: config.email.to,
            subject: `Alert: Multiple Failed Requests from IP: ${ip}`,
            html: `
                <h2>Security Alert: Multiple Failed Requests Detected</h2>
                <p><strong>IP Address:</strong> ${ip}</p>
                <p><strong>Failed Attempts:</strong> ${failedAttempts}</p>
                <p><strong>Time Window:</strong> ${timeWindow} minutes</p>
                <p><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
                <p><strong>Environment:</strong> ${config.app.env}</p>
            `
        };

        try {
            await this.transporter.sendMail(mailOptions);
            console.log(`Alert email sent for IP: ${ip}`);
        } catch (error) {
            console.error('Error sending email:', error);
            throw error;
        }
    }
}

module.exports = new EmailService();
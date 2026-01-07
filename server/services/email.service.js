const nodemailer = require('nodemailer');


class EmailService {
    constructor() {
        this.transporter = null;
        this.initializeTransporter();
    }

    initializeTransporter() {
        
        if (!process.env.EMAIL_HOST || !process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
            console.warn('⚠️  Email service not configured. Password reset emails will not be sent.');
            console.warn('Please configure EMAIL_HOST, EMAIL_USER, and EMAIL_PASS in .env file');
            return;
        }

        try {
            this.transporter = nodemailer.createTransport({
                host: process.env.EMAIL_HOST,
                port: parseInt(process.env.EMAIL_PORT) || 587,
                secure: process.env.EMAIL_SECURE === 'true', 
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS
                }
            });

            console.log('✅ Email service initialized successfully');
        } catch (error) {
            console.error('❌ Failed to initialize email service:', error.message);
        }
    }

    
    async sendPasswordResetEmail(toEmail, resetToken, adminName = 'Admin') {
        if (!this.transporter) {
            throw new Error('Email service is not configured. Please set up email credentials in .env file.');
        }

        const resetUrl = `${process.env.CLIENT_URL || 'http://localhost:5173'}/admin/reset-password/${resetToken}`;

        const mailOptions = {
            from: `"${process.env.EMAIL_FROM_NAME || 'Blitz India Engineering'}" <${process.env.EMAIL_USER}>`,
            to: toEmail,
            subject: 'Password Reset Request - Admin Panel',
            html: `
                <!DOCTYPE html>
                <html>
                <head>
                    <style>
                        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                        .header { background: linear-gradient(135deg, #f97316 0%, #ea580c 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
                        .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
                        .button { display: inline-block; padding: 15px 30px; background: linear-gradient(135deg, #f97316 0%, #ea580c 100%); color: white; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 20px 0; }
                        .button:hover { background: linear-gradient(135deg, #ea580c 0%, #c2410c 100%); }
                        .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
                        .warning { background: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; margin: 20px 0; border-radius: 4px; }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <h1>Password Reset Request</h1>
                        </div>
                        <div class="content">
                            <p>Hello ${adminName},</p>
                            
                            <p>We received a request to reset your admin panel password. If you didn't make this request, you can safely ignore this email.</p>
                            
                            <p>To reset your password, click the button below:</p>
                            
                            <div style="text-align: center;">
                                <a href="${resetUrl}" class="button">Reset Password</a>
                            </div>
                            
                            <p>Or copy and paste this link into your browser:</p>
                            <p style="word-break: break-all; color: #f97316;">${resetUrl}</p>
                            
                            <div class="warning">
                                ⚠️ <strong>Security Notice:</strong> This password reset link will expire in 1 hour for security reasons.
                            </div>
                            
                            <p>If you didn't request this password reset, please contact your system administrator immediately.</p>
                            
                            <p>Best regards,<br>Blitz India Engineering Team</p>
                        </div>
                        <div class="footer">
                            <p>This is an automated email. Please do not reply to this message.</p>
                            <p>&copy; ${new Date().getFullYear()} Blitz India Engineering. All rights reserved.</p>
                        </div>
                    </div>
                </body>
                </html>
            `,
            
            text: `
                Hello ${adminName},
                
                We received a request to reset your admin panel password.
                
                To reset your password, visit this link:
                ${resetUrl}
                
                This link will expire in 1 hour.
                
                If you didn't request this password reset, please ignore this email.
                
                Best regards,
                Blitz India Engineering Team
            `
        };

        try {
            const info = await this.transporter.sendMail(mailOptions);
            console.log('✅ Password reset email sent:', info.messageId);
            return info;
        } catch (error) {
            console.error('❌ Failed to send password reset email:', error);
            throw new Error('Failed to send password reset email. Please try again later.');
        }
    }

    
    async verifyConnection() {
        if (!this.transporter) {
            return false;
        }

        try {
            await this.transporter.verify();
            console.log('✅ Email service is ready to send emails');
            return true;
        } catch (error) {
            console.error('❌ Email service verification failed:', error.message);
            return false;
        }
    }
}


module.exports = new EmailService();

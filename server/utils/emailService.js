const nodemailer = require('nodemailer');
const logger = require('./logger');

/**
 * Create email transporter
 */
const createTransporter = () => {
    // Check if email credentials are configured
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        logger.warn('Email credentials not configured. Emails will not be sent.');
        return null;
    }

    return nodemailer.createTransport({
        service: process.env.EMAIL_SERVICE || 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });
};

/**
 * Send contact form submission email
 * @param {Object} formData - Contact form data
 * @param {File} attachment - Optional file attachment
 */
const sendContactFormEmail = async (formData, attachment = null) => {
    try {
        const transporter = createTransporter();

        if (!transporter) {
            logger.warn('Email transporter not configured. Skipping email send.');
            return { success: false, message: 'Email service not configured' };
        }

        const { name, email, phone, company, service, message, consent } = formData;

        // Build email HTML content
        const htmlContent = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #333; border-bottom: 2px solid #4a5568; padding-bottom: 10px;">
                    New Contact Form Submission
                </h2>
                
                <div style="background-color: #f7fafc; padding: 20px; border-radius: 5px; margin: 20px 0;">
                    <h3 style="color: #2d3748; margin-top: 0;">Contact Information</h3>
                    <table style="width: 100%; border-collapse: collapse;">
                        <tr>
                            <td style="padding: 8px 0; font-weight: bold; color: #4a5568;">Name:</td>
                            <td style="padding: 8px 0;">${name}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px 0; font-weight: bold; color: #4a5568;">Email:</td>
                            <td style="padding: 8px 0;"><a href="mailto:${email}">${email}</a></td>
                        </tr>
                        ${phone ? `
                        <tr>
                            <td style="padding: 8px 0; font-weight: bold; color: #4a5568;">Phone:</td>
                            <td style="padding: 8px 0;">${phone}</td>
                        </tr>
                        ` : ''}
                        ${company ? `
                        <tr>
                            <td style="padding: 8px 0; font-weight: bold; color: #4a5568;">Company:</td>
                            <td style="padding: 8px 0;">${company}</td>
                        </tr>
                        ` : ''}
                        <tr>
                            <td style="padding: 8px 0; font-weight: bold; color: #4a5568;">Service:</td>
                            <td style="padding: 8px 0;">${service}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px 0; font-weight: bold; color: #4a5568;">Consent:</td>
                            <td style="padding: 8px 0;">${consent ? 'Yes' : 'No'}</td>
                        </tr>
                    </table>
                </div>

                <div style="background-color: #fff; padding: 20px; border: 1px solid #e2e8f0; border-radius: 5px; margin: 20px 0;">
                    <h3 style="color: #2d3748; margin-top: 0;">Message</h3>
                    <p style="color: #4a5568; line-height: 1.6; white-space: pre-wrap;">${message}</p>
                </div>

                ${attachment ? `
                <div style="background-color: #edf2f7; padding: 15px; border-radius: 5px; margin: 20px 0;">
                    <p style="margin: 0; color: #4a5568;">
                        <strong>📎 Attachment:</strong> ${attachment.originalname} (${(attachment.size / 1024).toFixed(2)} KB)
                    </p>
                </div>
                ` : ''}

                <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0; color: #718096; font-size: 12px;">
                    <p>This email was sent from the Blitz India Engineering contact form.</p>
                    <p>Submitted at: ${new Date().toLocaleString()}</p>
                </div>
            </div>
        `;

        // Email options
        const mailOptions = {
            from: `"${name} (via Blitz Contact Form)" <${process.env.EMAIL_USER}>`,
            to: process.env.CONTACT_EMAIL || 'info@blitzindiaengineering.com',
            replyTo: email,
            subject: `Contact Form: ${name} <${email}>`,
            html: htmlContent,
            text: `
New Contact Form Submission

Name: ${name}
Email: ${email}
${phone ? `Phone: ${phone}` : ''}
${company ? `Company: ${company}` : ''}
Service: ${service}
Consent: ${consent ? 'Yes' : 'No'}

Message:
${message}

${attachment ? `Attachment: ${attachment.originalname} (${(attachment.size / 1024).toFixed(2)} KB)` : ''}

Submitted at: ${new Date().toLocaleString()}
            `.trim()
        };

        // Add attachment if present
        if (attachment) {
            mailOptions.attachments = [{
                filename: attachment.originalname,
                content: attachment.buffer,
                contentType: attachment.mimetype
            }];
        }

        // Send email
        const info = await transporter.sendMail(mailOptions);
        logger.info(`Contact form email sent: ${info.messageId}`);

        return { success: true, messageId: info.messageId };
    } catch (error) {
        logger.error('Error sending contact form email:', error);
        return { success: false, error: error.message };
    }
};

/**
 * Send auto-reply email to the user
 * @param {string} userEmail - User's email address
 * @param {string} userName - User's name
 */
const sendAutoReplyEmail = async (userEmail, userName) => {
    try {
        const transporter = createTransporter();

        if (!transporter) {
            return { success: false, message: 'Email service not configured' };
        }

        const htmlContent = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #333; border-bottom: 2px solid #4a5568; padding-bottom: 10px;">
                    Thank you for contacting us!
                </h2>
                
                <div style="padding: 20px 0;">
                    <p style="color: #4a5568; font-size: 16px;">Dear ${userName},</p>
                    
                    <p style="color: #4a5568; line-height: 1.6;">
                        We have received your message and appreciate you reaching out to Blitz India Engineering.
                    </p>
                    
                    <p style="color: #4a5568; line-height: 1.6;">
                        Our team will review your inquiry and get back to you as soon as possible, usually within 24 hours.
                    </p>
                    
                    <div style="background-color: #f7fafc; padding: 15px; border-radius: 5px; margin: 20px 0; border-left: 4px solid #4a5568;">
                        <p style="margin: 0; color: #718096; font-style: italic;">
                            This is an automated confirmation. Please do not reply to this email.
                        </p>
                    </div>
                </div>

                <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0; color: #718096; font-size: 12px;">
                    <p>Best regards,</p>
                    <p><strong>Blitz India Engineering Team</strong></p>
                    <p><a href="https://blitzindia.in" style="color: #4a5568; text-decoration: none;">www.blitzindia.in</a></p>
                </div>
            </div>
        `;

        const mailOptions = {
            from: `"Blitz India Engineering" <${process.env.EMAIL_USER}>`,
            to: userEmail,
            subject: `We received your message - Blitz India Engineering`,
            html: htmlContent,
            text: `Dear ${userName},\n\nThank you for contacting Blitz India Engineering. We have received your message and will get back to you shortly.\n\nBest regards,\nBlitz India Engineering Team`
        };

        const info = await transporter.sendMail(mailOptions);
        logger.info(`Auto-reply email sent to ${userEmail}: ${info.messageId}`);

        return { success: true, messageId: info.messageId };
    } catch (error) {
        logger.error('Error sending auto-reply email:', error);
        // Don't fail the request if auto-reply fails
        return { success: false, error: error.message };
    }
};

module.exports = {
    sendContactFormEmail,
    sendAutoReplyEmail
};

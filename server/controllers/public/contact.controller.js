const ContactSubmission = require('../../models/ContactSubmission');
const logger = require('../../utils/logger');
const { sendContactFormEmail, sendAutoReplyEmail } = require('../../utils/emailService');


const submitContactForm = async (req, res, next) => {
    try {
        const { name, email, phone, company, serviceCategory, serviceSubcategory, message, consent } = req.body;
        const attachment = req.file; 

        
        const consentBool = consent === true || consent === 'true';

        
        const attachmentPath = attachment ? attachment.filename : null;

        
        const submission = await ContactSubmission.create({
            name,
            email,
            phone,
            company,
            serviceCategory,
            serviceSubcategory,
            message,
            consent: consentBool,
            attachment: attachmentPath,
            status: 'new'
        });

        logger.info(`Contact form submitted by ${email}`);

        
        const emailResult = await sendContactFormEmail({
            name,
            email,
            phone,
            company,
            serviceCategory,
            serviceSubcategory,
            message,
            consent: consentBool
        }, attachment);

        if (!emailResult.success) {
            logger.warn(`Email notification failed: ${emailResult.error || emailResult.message}`);
        }

        
        
        
        sendAutoReplyEmail(email, name).catch(err =>
            logger.error('Failed to send auto-reply:', err)
        );

        res.status(201).json({
            success: true,
            message: 'Your message has been sent successfully. We will get back to you shortly.',
            data: {
                id: submission._id,
                submittedAt: submission.submittedAt
            }
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    submitContactForm
};

const Admin = require('../../models/Admin');
const crypto = require('crypto');
const emailService = require('../../services/email.service');


exports.forgotPassword = async (req, res) => {
    try {
        
        const adminEmail = process.env.ADMIN_EMAIL || 'info@blitzindiaengineering.com';

        
        const admin = await Admin.findOne({ email: adminEmail.toLowerCase() });

        if (!admin) {
            return res.status(404).json({
                success: false,
                message: 'Admin account not found. Please contact system administrator.'
            });
        }

        
        const resetToken = crypto.randomBytes(32).toString('hex');

        
        admin.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
        admin.resetPasswordExpires = Date.now() + 60 * 60 * 1000; 

        await admin.save();

        
        try {
            await emailService.sendPasswordResetEmail(
                admin.email,
                resetToken,
                admin.name
            );

            res.status(200).json({
                success: true,
                message: `Password reset link sent to ${adminEmail}. Please check your inbox.`
            });
        } catch (emailError) {
            
            admin.resetPasswordToken = undefined;
            admin.resetPasswordExpires = undefined;
            await admin.save();

            console.error('Email sending failed:', emailError);
            return res.status(500).json({
                success: false,
                message: 'Failed to send password reset email. Please configure email settings in .env file.'
            });
        }

    } catch (error) {
        console.error('Forgot password error:', error);
        res.status(500).json({
            success: false,
            message: 'An error occurred while processing your request'
        });
    }
};


exports.resetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { password, confirmPassword } = req.body;

        
        if (!password || !confirmPassword) {
            return res.status(400).json({
                success: false,
                message: 'Please provide both password and confirm password'
            });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: 'Passwords do not match'
            });
        }

        if (password.length < 8) {
            return res.status(400).json({
                success: false,
                message: 'Password must be at least 8 characters long'
            });
        }

        
        const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

        
        const admin = await Admin.findOne({
            resetPasswordToken: hashedToken,
            resetPasswordExpires: { $gt: Date.now() }
        }).select('+resetPasswordToken +resetPasswordExpires');

        if (!admin) {
            return res.status(400).json({
                success: false,
                message: 'Invalid or expired reset token'
            });
        }

        
        admin.password = password;
        admin.resetPasswordToken = undefined;
        admin.resetPasswordExpires = undefined;

        await admin.save();

        res.status(200).json({
            success: true,
            message: 'Password has been reset successfully. You can now login with your new password.'
        });

    } catch (error) {
        console.error('Reset password error:', error);
        res.status(500).json({
            success: false,
            message: 'An error occurred while resetting your password'
        });
    }
};


exports.verifyResetToken = async (req, res) => {
    try {
        const { token } = req.params;

        
        const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

        
        const admin = await Admin.findOne({
            resetPasswordToken: hashedToken,
            resetPasswordExpires: { $gt: Date.now() }
        });

        if (!admin) {
            return res.status(400).json({
                success: false,
                message: 'Invalid or expired reset token'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Token is valid'
        });

    } catch (error) {
        console.error('Verify token error:', error);
        res.status(500).json({
            success: false,
            message: 'An error occurred while verifying the token'
        });
    }
};

const speakeasy = require('speakeasy');
const QRCode = require('qrcode');

/**
 * Generate a new TOTP secret for an admin user
 * @returns {Object} Secret object with base32 encoding
 */
const generateSecret = () => {
    return speakeasy.generateSecret({
        name: process.env.TOTP_ISSUER || 'Blitz India Engineering',
        length: 32
    });
};

/**
 * Generate QR code data URL for TOTP setup
 * @param {string} secret - The TOTP secret
 * @param {string} email - Admin email for identification
 * @returns {Promise<string>} QR code data URL
 */
const generateQRCode = async (secret, email) => {
    const otpauthUrl = speakeasy.otpauthURL({
        secret: secret,
        label: email,
        issuer: process.env.TOTP_ISSUER || 'Blitz India Engineering',
        encoding: 'base32'
    });

    return await QRCode.toDataURL(otpauthUrl);
};

/**
 * Verify a TOTP token against a secret
 * @param {string} secret - The TOTP secret (base32)
 * @param {string} token - The 6-digit token to verify
 * @returns {boolean} True if token is valid
 */
const verifyToken = (secret, token) => {
    return speakeasy.totp.verify({
        secret: secret,
        encoding: 'base32',
        token: token,
        window: 2 // Allow 2 time steps before and after (60 seconds total window)
    });
};

module.exports = {
    generateSecret,
    generateQRCode,
    verifyToken
};

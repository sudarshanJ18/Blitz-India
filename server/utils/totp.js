const speakeasy = require('speakeasy');
const QRCode = require('qrcode');


const generateSecret = () => {
    return speakeasy.generateSecret({
        name: process.env.TOTP_ISSUER || 'Blitz India Engineering',
        length: 32
    });
};


const generateQRCode = async (secret, email) => {
    const otpauthUrl = speakeasy.otpauthURL({
        secret: secret,
        label: email,
        issuer: process.env.TOTP_ISSUER || 'Blitz India Engineering',
        encoding: 'base32'
    });

    return await QRCode.toDataURL(otpauthUrl);
};


const verifyToken = (secret, token) => {
    return speakeasy.totp.verify({
        secret: secret,
        encoding: 'base32',
        token: token,
        window: 2 
    });
};

module.exports = {
    generateSecret,
    generateQRCode,
    verifyToken
};

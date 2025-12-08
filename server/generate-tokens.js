const speakeasy = require('speakeasy');

const secret = 'KRVXGVZVKVZWCT3C';

// Generate tokens for current time and next few minutes
const tokens = [];
for (let i = 0; i < 5; i++) {
    tokens.push(speakeasy.totp({
        secret: secret,
        encoding: 'base32',
        time: Date.now() / 1000 + (i * 30) // 0s, 30s, 60s, 90s, 120s
    }));
}

console.log(tokens.join('\n'));

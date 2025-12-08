const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '.env');

try {
    let envContent = fs.readFileSync(envPath, 'utf8');

    // 1. Fix MONGODB_URI to use blitz_india
    if (envContent.includes('MONGODB_URI=')) {
        envContent = envContent.replace(
            /MONGODB_URI=(.+)/,
            (match, uri) => {
                let newUri = uri.trim();
                // Remove existing db name if present (assuming it might be 'test' or empty)
                // This is a simple heuristic: if it ends with mongodb.net/something?
                if (newUri.includes('mongodb.net/')) {
                    if (newUri.includes('?')) {
                        newUri = newUri.replace(/mongodb\.net\/([^?]*)\?/, 'mongodb.net/blitz_india?');
                    } else {
                        // If it ends with /test or just /, replace or append
                        const parts = newUri.split('mongodb.net/');
                        if (parts[1] && parts[1].length > 0) {
                            newUri = parts[0] + 'mongodb.net/blitz_india';
                        } else {
                            newUri = newUri + 'blitz_india';
                        }
                    }
                } else if (!newUri.includes('blitz_india')) {
                    // If it's a local url or other format
                    if (newUri.includes('?')) {
                        const [base, query] = newUri.split('?');
                        if (base.endsWith('/')) {
                            newUri = base + 'blitz_india?' + query;
                        } else {
                            // Check if there is already a db name
                            const lastSlash = base.lastIndexOf('/');
                            if (lastSlash > 10) { // arbitrary check to avoid protocol slashes
                                newUri = base.substring(0, lastSlash + 1) + 'blitz_india?' + query;
                            } else {
                                newUri = base + '/blitz_india?' + query;
                            }
                        }
                    } else {
                        if (newUri.endsWith('/')) {
                            newUri += 'blitz_india';
                        } else {
                            // Check if there is already a db name
                            const lastSlash = newUri.lastIndexOf('/');
                            if (lastSlash > 10) {
                                newUri = newUri.substring(0, lastSlash + 1) + 'blitz_india';
                            } else {
                                newUri += '/blitz_india';
                            }
                        }
                    }
                }
                return `MONGODB_URI=${newUri}`;
            }
        );
    }

    // 2. Fix EMAIL_PASS to remove spaces
    if (envContent.includes('EMAIL_PASS=')) {
        envContent = envContent.replace(
            /EMAIL_PASS=(.+)/,
            (match, pass) => `EMAIL_PASS=${pass.replace(/\s/g, '')}`
        );
    }

    fs.writeFileSync(envPath, envContent);
    console.log('Successfully updated .env file');
    console.log('Updated MONGODB_URI to use blitz_india');
    console.log('Removed spaces from EMAIL_PASS');

} catch (error) {
    console.error('Error updating .env:', error);
}

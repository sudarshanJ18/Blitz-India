const multer = require('multer');
const path = require('path');
const fs = require('fs');


const uploadsDir = path.join(__dirname, '../uploads/admin');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadsDir);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        
        const sanitizedName = file.originalname.replace(/[^a-zA-Z0-9.]/g, '-');
        cb(null, 'admin-' + uniqueSuffix + '-' + sanitizedName);
    }
});


const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpg|jpeg|png|gif|webp|svg/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb(new Error('Only image files (JPG, PNG, GIF, WEBP, SVG) are allowed'));
    }
};


const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024 
    },
    fileFilter: fileFilter
});

module.exports = upload;

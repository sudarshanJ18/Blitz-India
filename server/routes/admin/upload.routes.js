const express = require('express');
const router = express.Router();
const { verifyToken, requireAdmin } = require('../../middleware/auth');
const upload = require('../../middleware/adminUpload');
const { uploadFile } = require('../../controllers/admin/upload.controller');


router.use(verifyToken, requireAdmin);


router.post('/', upload.single('file'), uploadFile);

module.exports = router;

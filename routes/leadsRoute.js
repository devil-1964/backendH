const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const leadsController = require('../controllers/leadsController');

// Setup multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, path.join(__dirname, '../../uploads')),
    filename: (req, file, cb) => cb(null, 'leads-' + Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

router.post('/upload', upload.single('file'), leadsController.uploadLeads);

module.exports = router;

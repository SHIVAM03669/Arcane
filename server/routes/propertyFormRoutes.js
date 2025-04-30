const express = require('express');
const router = express.Router();
const { createPropertyRecord } = require('../controllers/propertyFormController');
const upload = require('../middleware/uploadMiddleware');

// POST /api/property-records - Create a new property record
// Option 1: Without file upload
router.post('/', createPropertyRecord);

// Option 2: With file upload for DSC verification
router.post('/with-dsc', upload.single('dscFile'), createPropertyRecord);

module.exports = router; 
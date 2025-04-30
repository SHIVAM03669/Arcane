const PropertyRecord = require('../models/PropertyRecord');

// @desc    Create a new property record
// @route   POST /api/property-records
// @access  Public
exports.createPropertyRecord = async (req, res) => {
  try {
    // Set default searchType if not provided
    if (!req.body.searchType) {
      req.body.searchType = 'person'; // Default value
    }
    
    // Validate required fields
    const requiredFields = [
      'propertyId', 'ownerName', 'addressLine1', 'pinCode', 'stateUT', 
      'districtCity', 'surveyNumber', 'plotNo', 'sro', 'deedType', 
      'subDeedType', 'assetCategory', 'natureOfProperty'
    ];

    const missingFields = requiredFields.filter(field => !req.body[field]);
    
    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        error: `Missing required fields: ${missingFields.join(', ')}`
      });
    }

    // Validate PIN code format
    if (!/^\d{6}$/.test(req.body.pinCode)) {
      return res.status(400).json({
        success: false,
        error: 'PIN code must be exactly 6 digits'
      });
    }

    // Handle DSC verification file if uploaded
    if (req.file) {
      req.body.dscVerification = {
        filePath: req.file.path,
        fileName: req.file.filename,
        fileType: req.file.mimetype
      };
    }

    // Create new property record
    const propertyRecord = new PropertyRecord(req.body);
    
    // Save to database
    await propertyRecord.save();

    res.status(201).json({
      success: true,
      message: 'Property record created successfully',
      data: propertyRecord
    });
  } catch (error) {
    console.error('Error creating property record:', error);
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        error: validationErrors
      });
    }
    
    res.status(500).json({
      success: false,
      error: 'Server error while creating property record'
    });
  }
}; 
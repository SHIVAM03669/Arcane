const mongoose = require('mongoose');

const PropertyRecordSchema = new mongoose.Schema({
  // Section A
  propertyId: {
    type: String,
    required: [true, 'Property ID is required'],
    trim: true
  },
  ownerName: {
    type: String,
    required: [true, 'Owner name is required'],
    trim: true
  },
  addressLine1: {
    type: String,
    required: [true, 'Address line 1 is required'],
    trim: true
  },
  addressLine2: {
    type: String,
    trim: true
  },
  pinCode: {
    type: String,
    required: [true, 'PIN code is required'],
    trim: true,
    validate: {
      validator: function(v) {
        return /^\d{6}$/.test(v);
      },
      message: 'PIN code must be exactly 6 digits'
    }
  },
  stateUT: {
    type: String,
    required: [true, 'State/UT is required'],
    trim: true
  },
  districtCity: {
    type: String,
    required: [true, 'District/City is required'],
    trim: true
  },
  villageTown: {
    type: String,
    trim: true
  },
  surveyNumber: {
    type: String,
    required: [true, 'Survey number is required'],
    trim: true
  },
  plotNo: {
    type: String,
    required: [true, 'Plot number is required'],
    trim: true
  },
  sro: {
    type: String,
    required: [true, 'SRO is required'],
    trim: true
  },
  registrationYear: {
    type: Number,
    trim: true
  },
  bookNumber: {
    type: String,
    trim: true
  },
  deedType: {
    type: String,
    required: [true, 'Deed type is required'],
    trim: true
  },
  subDeedType: {
    type: String,
    required: [true, 'Sub deed type is required'],
    trim: true
  },
  
  // Section B
  assetCategory: {
    type: String,
    required: [true, 'Asset category is required'],
    trim: true
  },
  natureOfProperty: {
    type: String,
    required: [true, 'Nature of property is required'],
    trim: true
  },
  searchType: {
    type: String,
    default: 'person',
    trim: true
  },
  encumbranceId: {
    type: String,
    trim: true
  },
  
  // Section C
  companyName: {
    type: String,
    trim: true
  },
  cinLlpin: {
    type: String,
    trim: true
  },
  formType: {
    type: String,
    trim: true
  },
  srn: {
    type: String,
    trim: true
  },
  filingYear: {
    type: Number,
    trim: true
  },
  documentType: {
    type: String,
    trim: true
  },
  documentNo: {
    type: String,
    trim: true
  },
  dscVerification: {
    type: mongoose.Schema.Types.Mixed, // Can be boolean or file reference
    default: null
  },
  
  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('PropertyRecord', PropertyRecordSchema); 
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useLanguage } from '../context/LanguageContext';
import { languages } from '../translations/translations';
import { FaUser, FaBuilding, FaArrowLeft, FaCheck } from 'react-icons/fa';

const Form = () => {
  const navigate = useNavigate();
  const { currentLang } = useLanguage();
  const t = languages[currentLang].form;
  
  const [currentSection, setCurrentSection] = useState(0);
  const [formType, setFormType] = useState(null);
  const [errors, setErrors] = useState({});
  const totalSections = 3;
  const [formData, setFormData] = useState({
    // Section A
    propertyId: '',
    ownerName: '',
    addressLine1: '',
    addressLine2: '',
    pinCode: '',
    stateUT: '',
    districtCity: '',
    villageTown: '',
    surveyNumber: '',
    plotNo: '',
    sro: '',
    registrationYear: '',
    bookNumber: '',
    deedType: '',
    subDeedType: '',
    
    // Section B
    assetCategory: '',
    natureOfProperty: '',
    searchType: 'person',
    encumbranceId: '',
    
    // Section C
    companyName: '',
    cinLlpin: '',
    formType: '',
    srn: '',
    filingYear: '',
    documentType: '',
    documentNo: '',
    dscVerification: null
  });

  const states = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat',
    'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh',
    'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan',
    'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
    'Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu',
    'Delhi', 'Jammu and Kashmir', 'Ladakh', 'Lakshadweep', 'Puducherry'
  ];

  const deedTypes = ['Sale Deed', 'Gift Deed', 'Lease Deed', 'Mortgage Deed', 'Partition Deed', 'Release Deed', 'Other'];
  const subDeedTypes = ['Absolute', 'Conditional', 'Exchange', 'Settlement', 'Will', 'Power of Attorney', 'Other'];
  const assetCategories = ['Immovable', 'Movable', 'Intangible'];
  const natureOfProperties = ['Dwelling Unit', 'Plot', 'Commercial Property', 'Industrial Property', 'Agricultural Land', 'Other'];
  const formTypes = ['INC-22', 'MGT-7', 'CHG-1', 'AOC-4', 'DIR-12', 'Other'];
  const documentTypes = ['MoA', 'AoA', 'Charge Document', 'Annual Return', 'Financial Statements', 'Other'];

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setErrors(prev => ({ ...prev, [name]: '' }));
    
    if (files) {
      setFormData({
        ...formData,
        [name]: files[0]
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const validateSectionA = () => {
    const newErrors = {};
    const requiredFields = [
      'propertyId',
      'ownerName',
      'surveyNumber',
      'plotNo',
      'sro',
      'deedType',
      'subDeedType'
    ];
    
    requiredFields.forEach(field => {
      if (!formData[field] || formData[field].trim() === '') {
        newErrors[field] = 'This field is required';
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateSectionB = () => {
    const newErrors = {};
    const requiredFields = [
      'addressLine1',
      'pinCode',
      'stateUT',
      'districtCity'
    ];
    
    requiredFields.forEach(field => {
      if (!formData[field] || formData[field].trim() === '') {
        newErrors[field] = 'This field is required';
      }
    });

    if (formData.pinCode && !/^\d{6}$/.test(formData.pinCode)) {
      newErrors.pinCode = 'PIN Code must be exactly 6 digits';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateSectionC = () => {
    const newErrors = {};
    const requiredFields = [
      'companyName',
      'cinLlpin',
      'formType',
      'srn',
      'filingYear',
      'documentType',
      'documentNo',
      'dscVerification'
    ];
    
    requiredFields.forEach(field => {
      if (!formData[field] || formData[field].toString().trim() === '') {
        newErrors[field] = 'This field is required';
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFormTypeSelect = (type) => {
    setFormType(type);
    setCurrentSection(1);
  };

  const handleNext = () => {
    if (currentSection === 0) {
      return;
    }
    
    if (formType === 'personal') {
      if (currentSection === 1 && validateSectionA()) {
        setCurrentSection(2);
      } else if (currentSection === 2 && validateSectionB()) {
        handleSubmit();
      }
    } else {
      if (currentSection === 1 && validateSectionA()) {
        setCurrentSection(2);
      } else if (currentSection === 2 && validateSectionB()) {
        setCurrentSection(3);
      }
    }
  };

  const handlePrevious = () => {
    setErrors({});
    if (currentSection === 1) {
      setCurrentSection(0);
    } else if (currentSection === 2) {
      setCurrentSection(1);
    } else if (currentSection === 3) {
      setCurrentSection(2);
    }
  };

  const handleSubmit = (e) => {
    if (e) {
      e.preventDefault();
    }
    
    if (formType === 'personal') {
      if (!validateSectionA() || !validateSectionB()) {
        return;
      }
    } else {
      if (!validateSectionA() || !validateSectionB() || !validateSectionC()) {
        return;
      }
    }
    
    console.log('Form submitted:', formData);
    alert('Form submitted successfully!');
    navigate('/');
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  const renderProgressBar = () => {
    if (currentSection === 0) return null;
    
    const totalSteps = formType === 'personal' ? 2 : 3;
    const progress = ((currentSection - 1) / totalSteps) * 100;
    
    return (
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          <span className="text-sm font-medium text-gray-600">Progress</span>
          <span className="text-sm font-medium text-blue-600">{Math.round(progress)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-blue-600 h-2.5 rounded-full transition-all duration-300 ease-in-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    );
  };

  const renderFormTypeSelection = () => (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-xl shadow-lg">
      <div className="flex items-center mb-8">
        <button
          onClick={handleBackToHome}
          className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
        >
          <FaArrowLeft className="h-5 w-5 mr-2" />
          {t.buttons.back || 'Back'}
        </button>
      </div>

      <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">{t.title || 'Select Form Type'}</h2>
      <p className="text-gray-600 text-center mb-12">{t.subtitle || 'Choose the type of form you want to fill'}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <button
          onClick={() => handleFormTypeSelect('personal')}
          className="group relative p-8 bg-white border-2 border-gray-200 rounded-xl hover:border-blue-500 transition-all duration-300"
        >
          <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-blue-50 group-hover:bg-blue-500 transition-colors">
            <FaUser className="w-4 h-4 text-blue-500 group-hover:text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
          </div>
          <h3 className="text-xl font-semibold mb-3 text-gray-900">{t.personal?.title || 'Personal Form'}</h3>
          <p className="text-gray-600 text-sm">{t.personal?.description || 'For individual property verification'}</p>
        </button>

        <button
          onClick={() => handleFormTypeSelect('corporate')}
          className="group relative p-8 bg-white border-2 border-gray-200 rounded-xl hover:border-blue-500 transition-all duration-300"
        >
          <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-blue-50 group-hover:bg-blue-500 transition-colors">
            <FaBuilding className="w-4 h-4 text-blue-500 group-hover:text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
          </div>
          <h3 className="text-xl font-semibold mb-3 text-gray-900">{t.corporate?.title || 'Corporate Form'}</h3>
          <p className="text-gray-600 text-sm">{t.corporate?.description || 'For business property verification'}</p>
        </button>
      </div>
    </div>
  );

  const getPlaceholder = (name) => {
    const placeholders = {
      propertyId: 'Enter property identification number',
      ownerName: 'Enter full name as per documents',
      addressLine1: 'Enter street address',
      addressLine2: 'Enter apartment, suite, or floor (optional)',
      pinCode: 'Enter 6-digit PIN code',
      districtCity: 'Enter district or city name',
      villageTown: 'Enter village or town name',
      surveyNumber: 'Enter survey/khata number',
      plotNo: 'Enter plot/site number',
      sro: 'Enter Sub-Registrar Office details',
      registrationYear: 'YYYY',
      bookNumber: 'Enter book number',
      companyName: 'Enter registered company name',
      cinLlpin: 'Enter CIN or LLPIN number',
      srn: 'Enter SRN number',
      filingYear: 'YYYY',
      documentNo: 'Enter document number'
    };
    return placeholders[name] || `Enter ${label}`;
  };

  const isFieldRequired = (name, section) => {
    const requiredFieldsBySection = {
      1: [ // Section A
        'propertyId',
        'ownerName',
        'surveyNumber',
        'plotNo',
        'sro',
        'deedType',
        'subDeedType'
      ],
      2: [ // Section B
        'addressLine1',
        'pinCode',
        'stateUT',
        'districtCity'
      ],
      3: [ // Section C
        'companyName',
        'cinLlpin',
        'formType',
        'srn',
        'filingYear',
        'documentType',
        'documentNo',
        'dscVerification'
      ]
    };

    return requiredFieldsBySection[section]?.includes(name) || false;
  };

  const renderInput = (name, label, type = 'text', options = null) => (
    <div className="mb-6">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-2">
        {label}
        {isFieldRequired(name, currentSection) && (
          <span className="text-red-500 ml-1" title="Required field">*</span>
        )}
      </label>
      {options ? (
        <select
          id={name}
          name={name}
          value={formData[name]}
          onChange={handleChange}
          className={`w-full px-4 py-2.5 rounded-lg border-2 bg-white transition-all duration-200
            ${errors[name] 
              ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200' 
              : 'border-gray-300 hover:border-blue-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200'
            }
            text-gray-900 placeholder-gray-400 text-base focus:outline-none`}
          required={isFieldRequired(name, currentSection)}
        >
          <option value="">{`Select ${label}`}</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          id={name}
          name={name}
          value={formData[name]}
          onChange={handleChange}
          placeholder={getPlaceholder(name)}
          className={`w-full px-4 py-2.5 rounded-lg border-2 transition-all duration-200
            ${errors[name] 
              ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200' 
              : 'border-gray-300 hover:border-blue-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200'
            }
            text-gray-900 placeholder-gray-400 text-base focus:outline-none`}
          required={isFieldRequired(name, currentSection)}
        />
      )}
      {errors[name] && (
        <p className="mt-2 text-sm text-red-600 flex items-center">
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {errors[name]}
        </p>
      )}
    </div>
  );

  const renderFormSection = () => {
    let sectionContent;
    let sectionTitle;
    let sectionDescription;

    switch (currentSection) {
      case 1:
        sectionTitle = 'Property Details';
        sectionDescription = 'Enter the basic details of the property for verification. Fields marked with * are required.';
        sectionContent = (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            {renderInput('propertyId', 'Property ID')}
            {renderInput('ownerName', 'Owner Name')}
            {renderInput('surveyNumber', 'Survey Number')}
            {renderInput('plotNo', 'Plot Number')}
            {renderInput('sro', 'SRO')}
            {renderInput('deedType', 'Deed Type', 'text', deedTypes)}
            {renderInput('subDeedType', 'Sub Deed Type', 'text', subDeedTypes)}
          </div>
        );
        break;
      case 2:
        sectionTitle = 'Location Details';
        sectionDescription = 'Provide the complete address and location information. Fields marked with * are required.';
        sectionContent = (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            {renderInput('addressLine1', 'Address Line 1')}
            {renderInput('addressLine2', 'Address Line 2')}
            {renderInput('pinCode', 'PIN Code', 'number')}
            {renderInput('stateUT', 'State/UT', 'text', states)}
            {renderInput('districtCity', 'District/City')}
            {renderInput('villageTown', 'Village/Town')}
          </div>
        );
        break;
      case 3:
        sectionTitle = 'Company Details';
        sectionDescription = 'Enter the corporate entity information for verification. Fields marked with * are required.';
        sectionContent = (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            {renderInput('companyName', 'Company Name')}
            {renderInput('cinLlpin', 'CIN/LLPIN')}
            {renderInput('formType', 'Form Type', 'text', formTypes)}
            {renderInput('srn', 'SRN')}
            {renderInput('filingYear', 'Filing Year')}
            {renderInput('documentType', 'Document Type', 'text', documentTypes)}
            {renderInput('documentNo', 'Document Number')}
          </div>
        );
        break;
      default:
        return null;
    }

    return (
      <div className="max-w-4xl mx-auto p-8 bg-white rounded-xl shadow-lg">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={handlePrevious}
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <FaArrowLeft className="h-5 w-5 mr-2" />
            Back
          </button>
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900">{sectionTitle}</h2>
            <p className="mt-1 text-sm text-gray-500">{sectionDescription}</p>
          </div>
          <div className="w-20"></div>
        </div>

        {renderProgressBar()}
        
        <form onSubmit={(e) => e.preventDefault()} className="space-y-8">
          {sectionContent}
          
          <div className="flex justify-end space-x-4 mt-8 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={currentSection === (formType === 'personal' ? 2 : 3) ? handleSubmit : handleNext}
              className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 flex items-center"
            >
              {currentSection === (formType === 'personal' ? 2 : 3) ? (
                <>
                  Submit <FaCheck className="ml-2 h-4 w-4" />
                </>
              ) : (
                'Next'
              )}
            </button>
          </div>
        </form>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="py-12 px-4 sm:px-6 lg:px-8">
        {currentSection === 0 ? renderFormTypeSelection() : renderFormSection()}
      </div>
    </div>
  );
};

export default Form;
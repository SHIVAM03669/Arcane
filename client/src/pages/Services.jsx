import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { 
  FaArrowLeft, 
  FaSearch, 
  FaFileAlt, 
  FaShieldAlt, 
  FaHistory, 
  FaHome, 
  FaCalculator, 
  FaMapMarked, 
  FaFileInvoiceDollar,
  FaChevronDown,
  FaChevronUp,
  FaCheckCircle,
  FaInfoCircle,
  FaFileContract,
  FaTimes
} from 'react-icons/fa';

const ServiceForm = ({ service, onClose }) => {
  const [formData, setFormData] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setSubmitted(true);
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value
    });
  };

  const getFormFields = () => {
    let fields = [];

    if (service.title === 'Document Verification') {
      fields = [
        {
          name: 'verificationType',
          label: 'Verification Method',
          type: 'select',
          options: ['Aadhaar eKYC', 'DigiLocker'],
          required: true
        },
        {
          name: 'aadhaarNumber',
          label: 'Aadhaar Number',
          type: 'text',
          required: true,
          showIf: (data) => data.verificationType === 'Aadhaar eKYC'
        },
        {
          name: 'mobileNumber',
          label: 'Mobile Number',
          type: 'tel',
          required: true
        },
        {
          name: 'documentType',
          label: 'Document Type',
          type: 'select',
          options: ['Property Deed', 'Sale Agreement', 'Tax Receipt', 'NOC', 'Other'],
          required: true
        },
        {
          name: 'documentUpload',
          label: 'Upload Document',
          type: 'file',
          required: true
        }
      ];
    } else {
      switch (service.title) {
        case 'Property Registration':
          fields = [
            { name: 'propertyAddress', label: 'Property Address', type: 'text', required: true },
            { name: 'propertyType', label: 'Property Type', type: 'select', 
              options: ['Residential', 'Commercial', 'Industrial', 'Agricultural'], required: true },
            { name: 'ownerName', label: 'Current Owner Name', type: 'text', required: true },
            { name: 'propertyValue', label: 'Property Value (INR)', type: 'number', required: true },
            { name: 'documentUpload', label: 'Upload Sale Deed', type: 'file', required: true },
            { name: 'preferredDate', label: 'Preferred Registration Date', type: 'date', required: true }
          ];
          break;

        case 'Encumbrance Certificate':
          fields = [
            { name: 'propertyId', label: 'Property ID/Survey Number', type: 'text', required: true },
            { name: 'district', label: 'District', type: 'text', required: true },
            { name: 'periodFrom', label: 'Period From', type: 'date', required: true },
            { name: 'periodTo', label: 'Period To', type: 'date', required: true },
            { name: 'ownerDetails', label: 'Owner Details', type: 'text', required: true }
          ];
          break;

        case 'Property Valuation':
          fields = [
            { name: 'propertyAddress', label: 'Property Address', type: 'text', required: true },
            { name: 'propertyType', label: 'Property Type', type: 'select',
              options: ['Apartment', 'Independent House', 'Commercial Space', 'Land'], required: true },
            { name: 'propertyArea', label: 'Property Area (sq ft)', type: 'number', required: true },
            { name: 'yearBuilt', label: 'Year Built', type: 'number', required: false },
            { name: 'documentUpload', label: 'Upload Property Photos', type: 'file', required: true }
          ];
          break;

        case 'Land Records':
          fields = [
            { name: 'surveyNumber', label: 'Survey Number', type: 'text', required: true },
            { name: 'district', label: 'District', type: 'text', required: true },
            { name: 'taluka', label: 'Taluka', type: 'text', required: true },
            { name: 'village', label: 'Village', type: 'text', required: true },
            { name: 'ownerName', label: 'Owner Name', type: 'text', required: true }
          ];
          break;

        case 'Property Tax Assessment':
          fields = [
            { name: 'propertyId', label: 'Property ID', type: 'text', required: true },
            { name: 'assessmentYear', label: 'Assessment Year', type: 'select',
              options: ['2024-25', '2023-24', '2022-23'], required: true },
            { name: 'propertyType', label: 'Property Type', type: 'select',
              options: ['Residential', 'Commercial', 'Industrial'], required: true },
            { name: 'builtUpArea', label: 'Built-up Area (sq ft)', type: 'number', required: true },
            { name: 'documentUpload', label: 'Upload Previous Tax Receipt', type: 'file', required: true }
          ];
          break;

        default:
          fields = [];
      }
    }

    return fields.filter(field => !field.showIf || field.showIf(formData));
  };

  const inputStyles = "mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200";
  const selectStyles = "mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200";
  const fileInputStyles = "mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100";

  if (submitted) {
    return (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full relative">
          <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
            <FaTimes className="h-6 w-6" />
          </button>
          <div className="text-center">
            <FaCheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {service.title === 'Document Verification' 
                ? 'Verification Initiated Successfully!'
                : 'Application Submitted Successfully!'}
            </h3>
            <p className="text-gray-600 mb-4">
              {service.title === 'Document Verification'
                ? 'We will verify your documents and send you the verification certificate.'
                : 'We will process your request and contact you soon.'}
            </p>
            <button
              onClick={onClose}
              className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-2xl w-full relative max-h-[90vh] overflow-y-auto">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
          <FaTimes className="h-6 w-6" />
        </button>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">{service.title}</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {getFormFields().map((field, index) => (
            <div key={index} className="space-y-2">
              <label htmlFor={field.name} className="block text-sm font-medium text-gray-700">
                {field.label} {field.required && <span className="text-red-500">*</span>}
              </label>
              <div className="relative">
                {field.type === 'select' ? (
                  <select
                    id={field.name}
                    name={field.name}
                    required={field.required}
                    onChange={handleInputChange}
                    className={selectStyles}
                    value={formData[field.name] || ''}
                  >
                    <option value="">Select {field.label}</option>
                    {field.options.map((option, idx) => (
                      <option key={idx} value={option}>{option}</option>
                    ))}
                  </select>
                ) : field.type === 'file' ? (
                  <input
                    type={field.type}
                    id={field.name}
                    name={field.name}
                    required={field.required}
                    onChange={handleInputChange}
                    className={fileInputStyles}
                    accept={field.type === 'file' ? '.pdf,.doc,.docx,.jpg,.jpeg,.png' : undefined}
                  />
                ) : (
                  <input
                    type={field.type}
                    id={field.name}
                    name={field.name}
                    required={field.required}
                    onChange={handleInputChange}
                    className={inputStyles}
                    placeholder={`Enter ${field.label.toLowerCase()}`}
                    value={formData[field.name] || ''}
                  />
                )}
              </div>
              {field.type === 'file' && (
                <p className="mt-1 text-sm text-gray-500">
                  Accepted formats: PDF, DOC, DOCX, JPG, JPEG, PNG
                </p>
              )}
            </div>
          ))}
          <div className="flex justify-end space-x-4 mt-8">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors duration-200 font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 font-medium"
            >
              {service.title === 'Document Verification' ? 'Verify Documents' : 'Submit Application'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const Services = () => {
  const navigate = useNavigate();
  const [activeService, setActiveService] = useState(null);
  const [selectedService, setSelectedService] = useState(null);

  const services = [
    {
      title: 'Property Registration',
      description: 'Complete end-to-end property registration services with legal assistance and documentation support.',
      icon: <FaHome className="h-6 w-6" />,
      details: [
        'Document preparation and verification',
        'Registration process guidance',
        'Legal compliance check',
        'Stamp duty calculation',
        'Registration appointment scheduling'
      ],
      fullDetails: {
        requirements: [
          'Property sale deed or agreement',
          'Identity proof (Aadhaar/PAN)',
          'Property tax receipts',
          'NOC from housing society',
          'Previous ownership documents'
        ],
        process: [
          'Initial document verification',
          'Market value assessment',
          'Stamp duty calculation',
          'Document drafting',
          'Registration scheduling',
          'Sub-registrar office visit',
          'Biometric verification',
          'Registration completion'
        ],
        timeline: '15-30 working days',
        fees: [
          'Registration charges: 1% of property value',
          'Stamp duty: 5-7% (varies by state)',
          'Processing fees'
        ]
      }
    },
    {
      title: 'Encumbrance Certificate',
      description: 'Quick and reliable encumbrance certificate verification and processing, ensuring property is free from legal obligations.',
      icon: <FaFileAlt className="h-6 w-6" />,
      details: [
        'Online EC application',
        'Historical transaction verification',
        'Property liability check',
        'Digital certificate delivery',
        'Real-time status tracking'
      ],
      fullDetails: {
        requirements: [
          'Property details with survey number',
          'Address proof',
          'Identity documents',
          'Previous EC (if any)',
          'Property tax documents'
        ],
        process: [
          'Application submission',
          'Document verification',
          'Property record check',
          'Transaction history analysis',
          'Certificate generation',
          'Digital delivery'
        ],
        timeline: '3-7 working days',
        fees: [
          'Basic EC charges',
          'Fast track processing (optional)',
          'Digital delivery charges',
          'Government fees'
        ]
      },
      action: () => navigate('/encumbrance')
    },
    {
      title: 'Property Valuation',
      description: 'Professional property valuation services using advanced market analysis and location-based assessment.',
      icon: <FaCalculator className="h-6 w-6" />,
      details: [
        'Market value assessment',
        'Location-based pricing',
        'Amenity consideration',
        'Comparative market analysis',
        'Detailed valuation report'
      ],
      fullDetails: {
        requirements: [
          'Property documents',
          'Recent photographs',
          'Floor plan/layout',
          'Previous valuation reports',
          'Area details and measurements'
        ],
        process: [
          'Document review',
          'Site inspection',
          'Area analysis',
          'Market research',
          'Comparative study',
          'Report preparation'
        ],
        timeline: '5-7 working days',
        fees: [
          'Basic valuation charges',
          'Site visit fees',
          'Report preparation charges',
          'Express service (optional)'
        ]
      },
      action: () => navigate('/form')
    },
    {
      title: 'Land Records',
      description: 'Comprehensive land record verification and documentation services for complete property history.',
      icon: <FaMapMarked className="h-6 w-6" />,
      details: [
        'Land title verification',
        'Survey number validation',
        'Ownership history check',
        'Land use classification',
        'Boundary verification'
      ],
      fullDetails: {
        requirements: [
          'Survey number',
          'Location details',
          'Owner information',
          'Previous land records',
          'Tax documents'
        ],
        process: [
          'Record search initiation',
          'Document verification',
          'Historical data analysis',
          'Ownership chain verification',
          'Land use verification',
          'Report generation'
        ],
        timeline: '7-10 working days',
        fees: [
          'Search charges',
          'Record extraction fees',
          'Processing charges',
          'Government fees'
        ]
      },
      action: () => navigate('/property-search')
    },
    {
      title: 'Document Verification',
      description: 'Secure identity verification and document management system for property-related transactions.',
      icon: <FaShieldAlt className="h-6 w-6" />,
      details: [
        'Aadhaar eKYC verification',
        'DigiLocker integration',
        'Document authenticity check',
        'Digital signature verification',
        'Secure document storage'
      ],
      fullDetails: {
        requirements: [
          'Valid Aadhaar card',
          'DigiLocker account (optional)',
          'Original documents for verification',
          'Digital copies of documents',
          'Valid mobile number'
        ],
        process: [
          'Identity verification through Aadhaar',
          'Document upload',
          'Authenticity verification',
          'Digital signature validation',
          'Verification certificate generation'
        ],
        timeline: 'Instant to 24 hours',
        fees: [
          'Basic verification: Free',
          'Advanced verification: ₹500 per document',
          'Digital certificate: ₹200'
        ]
      }
    },
    {
      title: 'Property Tax Assessment',
      description: 'Detailed property tax calculation and assessment services with payment facilitation.',
      icon: <FaFileInvoiceDollar className="h-6 w-6" />,
      details: [
        'Tax calculation',
        'Payment history check',
        'Due date tracking',
        'Online payment facility',
        'Tax certificate generation'
      ],
      fullDetails: {
        requirements: [
          'Property details',
          'Previous tax receipts',
          'Area documents',
          'Usage classification',
          'Ownership proof'
        ],
        process: [
          'Property assessment',
          'Tax calculation',
          'Payment history review',
          'Due amount verification',
          'Payment processing',
          'Receipt generation'
        ],
        timeline: '2-3 working days',
        fees: [
          'Assessment charges',
          'Processing fees',
          'Payment gateway charges',
          'Certificate charges'
        ]
      },
      action: () => navigate('/form')
    }
  ];

  const howItWorks = [
    {
      step: 1,
      title: 'Select a Service',
      description: 'Choose from our comprehensive range of property-related services.'
    },
    {
      step: 2,
      title: 'Submit Required Documents',
      description: 'Upload or submit the necessary documents for verification and processing.'
    },
    {
      step: 3,
      title: 'Expert Review',
      description: 'Our team of experts reviews your case and documentation thoroughly.'
    },
    {
      step: 4,
      title: 'Processing',
      description: 'Your request is processed through our secure digital platform.'
    },
    {
      step: 5,
      title: 'Delivery',
      description: 'Receive your verified documents and certificates digitally or physically.'
    }
  ];

  const handleServiceClick = (service) => {
    if (service.isNavigable) {
      navigate(service.path);
    } else {
      setSelectedService(service);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Navbar />
      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <button
              onClick={() => navigate('/')}
              className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
            >
              <FaArrowLeft className="mr-2" />
              <span>Back to Home</span>
            </button>
          </div>
          
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
              Our Property Services
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-600 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Comprehensive property solutions for all your real estate needs
            </p>
          </div>

          <div className="mt-16">
            <div className="grid grid-cols-1 gap-8">
              {services.map((service, index) => (
                <div
                  key={index}
                  onClick={() => handleServiceClick(service)}
                  className="relative bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow duration-300 border border-gray-100 cursor-pointer group"
                >
                  <div className="flex flex-col">
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white group-hover:bg-blue-600 transition-colors">
                          {service.icon}
                        </div>
                      </div>
                      <div className="ml-4 flex-grow">
                        <div className="flex justify-between items-center">
                          <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">{service.title}</h3>
                          <div className="text-blue-500 group-hover:text-blue-600 transition-colors">
                            {activeService === index ? <FaChevronUp /> : <FaChevronDown />}
                          </div>
                        </div>
                        <p className="mt-2 text-gray-600">{service.description}</p>
                      </div>
                    </div>
                    
                    {activeService === index && (
                      <div className="mt-6 pl-16" onClick={(e) => e.stopPropagation()}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                              <FaCheckCircle className="mr-2 text-green-500" />
                              Requirements
                            </h4>
                            <ul className="list-disc space-y-2 text-gray-600 ml-5">
                              {service.fullDetails.requirements.map((req, idx) => (
                                <li key={idx}>{req}</li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                              <FaInfoCircle className="mr-2 text-blue-500" />
                              Process
                            </h4>
                            <ul className="list-disc space-y-2 text-gray-600 ml-5">
                              {service.fullDetails.process.map((step, idx) => (
                                <li key={idx}>{step}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                        
                        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                              <FaFileContract className="mr-2 text-purple-500" />
                              Fees
                            </h4>
                            <ul className="list-disc space-y-2 text-gray-600 ml-5">
                              {service.fullDetails.fees.map((fee, idx) => (
                                <li key={idx}>{fee}</li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 className="text-lg font-semibold text-gray-900 mb-4">Timeline</h4>
                            <p className="text-gray-600">{service.fullDetails.timeline}</p>
                          </div>
                        </div>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedService(service);
                          }}
                          className="mt-8 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
                        >
                          Get Started
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* How It Works Section */}
          <div className="mt-20">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
              {howItWorks.map((step, index) => (
                <div key={index} className="relative">
                  <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-100 h-full">
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                        {step.step}
                      </div>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mt-4 text-center">{step.title}</h3>
                    <p className="mt-2 text-gray-600 text-center">{step.description}</p>
                  </div>
                  {index < howItWorks.length - 1 && (
                    <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                      <FaArrowLeft className="rotate-180 text-blue-600 w-8" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Call to Action Section */}
          <div className="mt-16 bg-blue-600 rounded-lg shadow-lg p-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Ready to Get Started?</h2>
            <p className="text-white mb-6">Contact us today to learn more about our services</p>
            <button
              onClick={() => navigate('/contact')}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50 transition-colors"
            >
              Contact Us Now
            </button>
          </div>
        </div>
      </div>

      {selectedService && (
        <ServiceForm 
          service={selectedService} 
          onClose={() => setSelectedService(null)} 
        />
      )}
    </div>
  );
};

export default Services; 
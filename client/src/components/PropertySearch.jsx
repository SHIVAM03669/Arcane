import React, { useState, useEffect } from 'react';
import mockProperties from '../data/mockProperties';
import jsPDF from 'jspdf';
import PropertyMap from './PropertyMap';
import { useLanguage } from '../context/LanguageContext';
import { languages } from '../translations/translations';
import { FaSearch, FaFilter, FaDownload, FaMapMarkerAlt, FaEye } from 'react-icons/fa';

const PropertySearch = ({ initialQuery = '' }) => {
  const { currentLang } = useLanguage();
  const t = languages[currentLang].propertySearch;

  // Search states
  const [searchType, setSearchType] = useState('id');
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(!!initialQuery);
  
  // Filter states
  const [propertyType, setPropertyType] = useState('all');
  const [status, setStatus] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  
  // View states
  const [viewMode, setViewMode] = useState('grid');
  
  // Data states
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  // Initialize properties on component mount
  useEffect(() => {
    setProperties(mockProperties);
  }, []);

  // Handle initial query from URL
  useEffect(() => {
    if (initialQuery) {
      console.log("Initial query detected:", initialQuery);
      setSearchQuery(initialQuery);
      setHasSearched(true);
      setIsLoading(true);
      
      setTimeout(() => {
        setIsLoading(false);
      }, 300);
    }
  }, [initialQuery]);

  // Filter properties based on search query and filters
  useEffect(() => {
    if (!hasSearched) return;
    
    let result = [...properties];
    
    if (searchQuery) {
      result = result.filter(property => {
        const searchLower = searchQuery.toLowerCase();
        return (
          (searchType === 'id' && property.id.toLowerCase().includes(searchLower)) ||
          (searchType === 'address' && property.address.toLowerCase().includes(searchLower)) ||
          (searchType === 'owner' && property.ownerDetails?.name?.toLowerCase().includes(searchLower)) ||
          (searchType === 'registry' && property.registryReference?.toLowerCase().includes(searchLower))
        );
      });
    }
    
    if (propertyType !== 'all') {
      result = result.filter(property => property.propertyType === propertyType);
    }
    
    if (status !== 'all') {
      result = result.filter(property => property.status === status);
    }
    
    setFilteredProperties(result);
  }, [searchQuery, searchType, propertyType, status, properties, hasSearched]);

  const handleSearch = (e) => {
    e.preventDefault();
    setHasSearched(true);
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
    }, 300);
  };

  // Handle property type filter change
  const handlePropertyTypeChange = (e) => {
    setPropertyType(e.target.value);
    if (hasSearched) {
      setHasSearched(true);
    }
  };

  // Handle status filter change
  const handleStatusChange = (e) => {
    setStatus(e.target.value);
    if (hasSearched) {
      setHasSearched(true);
    }
  };

  // Toggle view mode (grid or list)
  const toggleViewMode = () => {
    setViewMode(viewMode === 'grid' ? 'list' : 'grid');
  };

  // Handle property selection
  const handlePropertySelect = (property) => {
    setSelectedProperty(property);
    setShowDetails(true);
  };

  // Locate property on map
  const locateOnMap = (property) => {
    if (!property?.address) return;
    
    // Encode the address for the URL
    const encodedAddress = encodeURIComponent(property.address);
    
    // Create Google Maps URL and open it
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
    window.open(googleMapsUrl, '_blank', 'noopener,noreferrer');
  };

  // Close property details modal
  const closeDetails = () => {
    setShowDetails(false);
  };

  // Generate PDF for property details
  const generatePDF = (property) => {
    const doc = new jsPDF();
    
    // Set initial y position
    let y = 20;
    
    // Add title
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.text('Property Details Report', 105, y, { align: 'center' });
    y += 20;

    // Add property ID and status
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text(`Property ID: ${property.id}`, 20, y);
    doc.setFont('helvetica', 'normal');
    doc.text(`Status: ${property.status === 'mortgaged' ? 'Mortgaged' : 'Clear Title'}`, 120, y);
    y += 15;

    // Add horizontal line
    doc.setLineWidth(0.5);
    doc.line(20, y, 190, y);
    y += 15;

    // Basic Information Section
    doc.setFont('helvetica', 'bold');
    doc.text('Basic Information', 20, y);
    y += 10;
    doc.setFont('helvetica', 'normal');
    doc.text(`Address: ${property.address}`, 20, y);
    y += 8;
    doc.text(`Property Type: ${property.propertyType}`, 20, y);
    y += 8;
    doc.text(`Registry Reference: ${property.registryReference}`, 20, y);
    y += 8;
    
    // Add location information if available
    if (property.latitude && property.longitude) {
      doc.text(`Location: ${property.latitude}, ${property.longitude}`, 20, y);
    }
    y += 15;

    // Owner Details Section
    if (property.ownerDetails) {
      doc.setFont('helvetica', 'bold');
      doc.text('Owner Details', 20, y);
      y += 10;
      doc.setFont('helvetica', 'normal');
      doc.text(`Name: ${property.ownerDetails.name || 'N/A'}`, 20, y);
      y += 8;
      doc.text(`ID: ${property.ownerDetails.id || 'N/A'}`, 20, y);
      y += 8;
      doc.text(`Contact: ${property.ownerDetails.contact || 'N/A'}`, 20, y);
      y += 15;
    }

    // Encumbrance Information Section
    doc.setFont('helvetica', 'bold');
    doc.text('Encumbrance Information', 20, y);
    y += 10;
    doc.setFont('helvetica', 'normal');
    
    if (property.encumbrance && property.encumbrance.hasEncumbrance) {
      doc.text(`Bank: ${property.encumbrance.bank}`, 20, y);
      y += 8;
      doc.text(`Loan Amount: ${property.encumbrance.loanAmount}`, 20, y);
      y += 8;
      doc.text(`Duration: ${property.encumbrance.duration}`, 20, y);
      y += 8;
      doc.text(`Start Date: ${property.encumbrance.startDate}`, 20, y);
    } else {
      doc.text('No encumbrances found. This property has a clear title.', 20, y);
    }
    
    // Add footer
    y = 280;
    doc.setFontSize(10);
    doc.setTextColor(128);
    doc.text('Generated by Property Management System', 105, y, { align: 'center' });
    doc.text(new Date().toLocaleString(), 105, y + 5, { align: 'center' });

    // Save the PDF
    doc.save(`property-details-${property.id}.pdf`);
  };

  return (
    <div className="space-y-8">
      {/* Search Form */}
      <div className="max-w-4xl mx-auto bg-white/95 backdrop-blur-sm rounded-lg shadow-xl border border-gray-200/50">
        <div className="bg-gradient-to-r from-blue-900/90 to-blue-800/80 px-6 py-4 rounded-t-lg">
          <h2 className="text-xl font-semibold text-white text-center">
            {t.title}
          </h2>
        </div>
        
        <form onSubmit={handleSearch} className="p-6">
          <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-6">
            <div className="w-full md:w-56">
              <label className="block text-sm font-medium text-gray-700 mb-2 text-center md:text-left">
                {t.searchBy || 'Search By'}
              </label>
              <select
                value={searchType}
                onChange={(e) => setSearchType(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white transition-all"
              >
                <option value="id">{t.propertyId || 'Property ID'}</option>
                <option value="address">{t.address || 'Address'}</option>
                <option value="owner">{t.ownerName || 'Owner Name'}</option>
                <option value="registry">{t.registryReference || 'Registry Reference'}</option>
              </select>
            </div>

            <div className="w-full md:w-96">
              <label className="block text-sm font-medium text-gray-700 mb-2 text-center md:text-left">
                {searchType === 'id' ? t.propertyId :
                 searchType === 'address' ? t.address :
                 searchType === 'owner' ? t.ownerName :
                 t.registryReference}
              </label>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.searchPlaceholder || `Enter ${searchType} to search...`}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              />
            </div>

            <div className="flex space-x-4 mt-6 md:mt-0">
              <button
                type="submit"
                className="inline-flex items-center px-6 py-2.5 bg-blue-900 text-white rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 transition-colors"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="animate-spin mr-2">
                    <FaSearch className="h-5 w-5" />
                  </div>
                ) : (
                  <FaSearch className="h-5 w-5 mr-2" />
                )}
                {t.search || 'Search'}
              </button>

              <button
                type="button"
                onClick={() => setShowFilters(!showFilters)}
                className="inline-flex items-center px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 focus:ring-4 focus:ring-blue-300 transition-colors"
              >
                <FaFilter className="h-5 w-5 mr-2" />
                {t.filters || 'Filters'}
              </button>
            </div>
          </div>

          {/* Filters Section */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.propertyType || 'Property Type'}
                  </label>
                  <select
                    value={propertyType}
                    onChange={handlePropertyTypeChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white transition-all"
                  >
                    <option value="all">{t.all || 'All Types'}</option>
                    <option value="residential">{t.residential || 'Residential'}</option>
                    <option value="commercial">{t.commercial || 'Commercial'}</option>
                    <option value="industrial">{t.industrial || 'Industrial'}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.status || 'Status'}
                  </label>
                  <select
                    value={status}
                    onChange={handleStatusChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white transition-all"
                  >
                    <option value="all">{t.allStatus || 'All Status'}</option>
                    <option value="clear">{t.clear || 'Clear Title'}</option>
                    <option value="mortgaged">{t.mortgaged || 'Mortgaged'}</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </form>
      </div>

      {/* Initial Search State */}
      {!hasSearched && !isLoading && (
        <div className="text-center py-16">
          <div className="inline-block p-4 rounded-full bg-blue-100 mb-4">
            <FaSearch className="w-8 h-8 text-blue-900" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Search for Properties</h3>
          <p className="text-gray-600 max-w-md mx-auto">
            Enter a search term and click the search button to find properties. You can search by Property ID, Address, Owner Name, or Registry Reference.
          </p>
        </div>
      )}

      {/* Results */}
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-900"></div>
        </div>
      ) : hasSearched && filteredProperties.length === 0 ? (
        <div className="text-center py-12 bg-white/95 backdrop-blur-sm rounded-lg shadow-lg">
          <div className="inline-block p-4 rounded-full bg-gray-100 mb-4">
            <FaSearch className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No Results Found</h3>
          <p className="text-gray-600">
            {t.noResults}
          </p>
        </div>
      ) : hasSearched && (
        <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'} gap-6`}>
          {filteredProperties.map((property) => (
            <div
              key={property.id}
              className="bg-white/95 backdrop-blur-sm rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200/50"
            >
              <div className="border-l-4 border-blue-900 p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold text-gray-900">{property.id}</h3>
                    <p className="text-sm text-gray-600 mt-1">{property.address}</p>
                  </div>
                  <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                    property.status === 'mortgaged' 
                      ? 'bg-yellow-100 text-yellow-800' 
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {property.status === 'mortgaged' ? t.mortgaged : t.clearTitle}
                  </span>
                </div>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>
                    <span className="font-medium text-gray-700">{t.type}:</span> {property.propertyType}
                  </p>
                  <p>
                    <span className="font-medium text-gray-700">{t.registryRef}:</span> {property.registryReference}
                  </p>
                  <p>
                    <span className="font-medium text-gray-700">{t.owner}:</span> {property.ownerDetails?.name}
                  </p>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between">
                  <button
                    onClick={() => handlePropertySelect(property)}
                    className="text-blue-900 hover:text-blue-700 transition-colors flex items-center gap-1 text-sm font-medium"
                  >
                    <FaEye className="w-4 h-4" />
                    <span>{t.viewDetails}</span>
                  </button>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => generatePDF(property)}
                      className="text-blue-900 hover:text-blue-700 transition-colors"
                      title={t.downloadPDF}
                    >
                      <FaDownload className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => locateOnMap(property)}
                      className="text-blue-900 hover:text-blue-700 transition-colors"
                      title={t.locateOnMap}
                    >
                      <FaMapMarkerAlt className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Property Details Modal */}
      {showDetails && selectedProperty && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="border-l-4 border-blue-900">
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">{selectedProperty.id}</h2>
                  <button
                    onClick={closeDetails}
                    className="text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    {t.back}
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-gray-800">Basic Information</h3>
                    <div className="space-y-2">
                      <p className="text-gray-700"><span className="font-medium text-gray-800">Property ID:</span> {selectedProperty.id}</p>
                      <p className="text-gray-700"><span className="font-medium text-gray-800">Address:</span> {selectedProperty.address}</p>
                      <p className="text-gray-700"><span className="font-medium text-gray-800">Property Type:</span> {selectedProperty.propertyType}</p>
                      <p className="text-gray-700"><span className="font-medium text-gray-800">Registry Reference:</span> {selectedProperty.registryReference}</p>
                      {selectedProperty.latitude && selectedProperty.longitude && (
                        <p className="text-gray-700">
                          <span className="font-medium text-gray-800">Location:</span> {selectedProperty.latitude}, {selectedProperty.longitude}
                        </p>
                      )}
                      <p className="text-gray-700">
                        <span className="font-medium text-gray-800">Status:</span> 
                        <span className={`ml-2 px-2 py-1 text-xs font-medium rounded-full ${
                          selectedProperty.status === 'mortgaged' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                        }`}>
                          {selectedProperty.status === 'mortgaged' ? 'Mortgaged' : 'Clear Title'}
                        </span>
                      </p>
                    </div>
                  </div>
                  {selectedProperty.ownerDetails && (
                    <div>
                      <h3 className="text-lg font-semibold mb-3 text-gray-800">Owner Details</h3>
                      <div className="space-y-2">
                        <p className="text-gray-700"><span className="font-medium text-gray-800">Name:</span> {selectedProperty.ownerDetails.name}</p>
                        <p className="text-gray-700"><span className="font-medium text-gray-800">ID:</span> {selectedProperty.ownerDetails.id}</p>
                        <p className="text-gray-700"><span className="font-medium text-gray-800">Contact:</span> {selectedProperty.ownerDetails.contact}</p>
                      </div>
                    </div>
                  )}
                  <div className={selectedProperty.ownerDetails ? "md:col-span-2" : ""}>
                    <h3 className="text-lg font-semibold mb-3 text-gray-800">Encumbrance Information</h3>
                    {selectedProperty.encumbrance?.hasEncumbrance ? (
                      <div className="space-y-2">
                        <p className="text-gray-700"><span className="font-medium text-gray-800">Bank:</span> {selectedProperty.encumbrance.bank}</p>
                        <p className="text-gray-700"><span className="font-medium text-gray-800">Loan Amount:</span> {selectedProperty.encumbrance.loanAmount}</p>
                        <p className="text-gray-700"><span className="font-medium text-gray-800">Duration:</span> {selectedProperty.encumbrance.duration}</p>
                        <p className="text-gray-700"><span className="font-medium text-gray-800">Start Date:</span> {selectedProperty.encumbrance.startDate}</p>
                      </div>
                    ) : (
                      <p className="text-green-600 font-medium">No encumbrances found. This property has a clear title.</p>
                    )}
                  </div>
                </div>
                <div className="mt-6 flex flex-wrap gap-3">
                  {selectedProperty.latitude && selectedProperty.longitude && (
                    <button
                      onClick={() => {
                        locateOnMap(selectedProperty);
                        closeDetails();
                      }}
                      className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 font-medium flex items-center gap-2"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                      Locate on Map
                    </button>
                  )}
                  <button
                    onClick={() => generatePDF(selectedProperty)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium flex items-center gap-2"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z" clipRule="evenodd" />
                    </svg>
                    Download PDF
                  </button>
                  <button
                    onClick={closeDetails}
                    className="px-5 py-2 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 font-semibold"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Error Message */}
      {hasSearched && !isLoading && filteredProperties.length === 0 && (
        <div className="text-center text-red-600 mt-4 bg-red-50 p-4 rounded-lg">
          {t.error}
        </div>
      )}
    </div>
  );
};

export default PropertySearch; 
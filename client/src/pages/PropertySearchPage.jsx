import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PropertySearch from '../components/PropertySearch';
import Navbar from '../components/Navbar';
import { useLanguage } from '../context/LanguageContext';
import { languages } from '../translations/translations';

const PropertySearchPage = () => {
  const { currentLang } = useLanguage();
  const translations = languages[currentLang];
  const location = useLocation();
  
  // Get the query parameter from the URL
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get('query');
  
  console.log("PropertySearchPage loaded with query:", searchQuery);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-center mb-2 text-black">
            {translations.propertySearch.title}
          </h1>
          <p className="text-center text-gray-700 max-w-3xl mx-auto">
            {translations.search.placeholder}
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-6">
          <p className="text-gray-500 text-center mb-4">
            {translations.propertySearch.enterPropertyId}
          </p>
          <PropertySearch initialQuery={searchQuery} />
        </div>
      </div>
    </div>
  );
};

export default PropertySearchPage; 
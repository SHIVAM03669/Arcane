import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import EncumbranceCard from '../components/EncumbranceCard';
import mockProperties from '../data/mockProperties';
import Navbar from '../components/Navbar';
import { useLanguage } from '../context/LanguageContext';
import { languages } from '../translations/translations';
import { FaArrowLeft, FaSpinner } from 'react-icons/fa';

const EncumbrancePage = () => {
  const { propertyId } = useParams();
  const navigate = useNavigate();
  const { currentLang } = useLanguage();
  const t = languages[currentLang].encumbrancePage;
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProperty = () => {
      setLoading(true);
      try {
        // If propertyId is provided, find that specific property
        // Otherwise, use the first mortgaged property as default
        let foundProperty;
        if (propertyId) {
          foundProperty = mockProperties.find(p => p.id === propertyId);
        } else {
          foundProperty = mockProperties.find(p => p.status === 'mortgaged');
        }
        
        if (foundProperty) {
          setProperty(foundProperty);
          setError(null);
        } else {
          setError('Property not found');
        }
      } catch (err) {
        setError('Failed to load property data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [propertyId]);

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen relative bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Background Image with Overlay */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/40 to-blue-900/60 mix-blend-multiply"></div>
        <img 
          src="/bg.png" 
          alt="Background" 
          className="w-full h-full object-cover"
          onError={(e) => {
            console.error('Image failed to load');
            e.target.style.display = 'none';
          }}
        />
      </div>

      <Navbar />

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-4 py-6 md:py-12">
        <div className="max-w-6xl mx-auto">
          {/* Back Button */}
          <button 
            onClick={handleBack}
            className="mb-8 inline-flex items-center px-4 py-2 text-white bg-blue-900/90 backdrop-blur-sm rounded-lg hover:bg-blue-800 transition-colors shadow-lg"
          >
            <FaArrowLeft className="h-4 w-4 mr-2" />
            <span>{t.back}</span>
          </button>

          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
              {t.title}
            </h1>
            <p className="text-lg md:text-xl text-gray-100 max-w-3xl mx-auto drop-shadow">
              {t.subtitle}
            </p>
          </div>

          {/* Content Section */}
          <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-xl border border-white/20 overflow-hidden">
            {loading ? (
              <div className="flex flex-col items-center justify-center h-64">
                <FaSpinner className="w-8 h-8 text-blue-900 animate-spin mb-4" />
                <p className="text-gray-600">Loading property details...</p>
              </div>
            ) : error ? (
              <div className="p-8">
                <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg">
                  <div className="flex items-center">
                    <svg className="w-8 h-8 text-red-500 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <h3 className="text-lg font-semibold text-red-800 mb-1">Error Loading Property</h3>
                      <p className="text-red-700">{error}</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : property ? (
              <div className="p-8">
                <EncumbranceCard property={property} />
              </div>
            ) : null}
          </div>
        </div>
      </main>
    </div>
  );
};

export default EncumbrancePage; 
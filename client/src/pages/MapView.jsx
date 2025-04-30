import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

const MapView = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const address = location.state?.address || '';

  useEffect(() => {
    if (!address) {
      setError('No address provided');
      setIsLoading(false);
      return;
    }

    // Create the Google Maps URL with the encoded address
    const encodedAddress = encodeURIComponent(address);
    const mapUrl = `https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_MAPS_API_KEY&q=${encodedAddress}`;

    // Update the iframe source
    const iframe = document.getElementById('google-map');
    if (iframe) {
      iframe.src = mapUrl;
      iframe.onload = () => setIsLoading(false);
      iframe.onerror = () => {
        setError('Failed to load the map');
        setIsLoading(false);
      };
    }
  }, [address]);

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center">
            <button
              onClick={handleBack}
              className="mr-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <FaArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <h1 className="text-xl font-semibold text-gray-800">Property Location</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {/* Address Display */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
          <h2 className="text-sm font-medium text-gray-500 mb-1">Address</h2>
          <p className="text-gray-800">{address || 'No address provided'}</p>
        </div>

        {/* Map Container */}
        <div className="bg-white rounded-lg shadow-sm p-4 h-[600px] relative">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900"></div>
            </div>
          )}

          {error && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
              <div className="text-red-500 text-center">
                <p className="font-medium mb-2">Error loading map</p>
                <p className="text-sm text-gray-600">{error}</p>
              </div>
            </div>
          )}

          <iframe
            id="google-map"
            className="w-full h-full rounded-lg"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

        {/* Open in Google Maps Button */}
        <div className="mt-4 text-center">
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors"
          >
            Open in Google Maps
          </a>
        </div>
      </main>
    </div>
  );
};

export default MapView; 
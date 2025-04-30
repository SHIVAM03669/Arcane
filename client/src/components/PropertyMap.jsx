import React from 'react';

function PropertyMap({ address }) {
  if (!address) return null;
  
  // Encode the address for the URL
  const encodedAddress = encodeURIComponent(address);
  
  // Create Google Maps URL and open it
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
  window.open(googleMapsUrl, '_blank', 'noopener,noreferrer');
  
  return null;
}

export default PropertyMap;
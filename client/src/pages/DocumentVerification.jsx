import React from 'react';
import { FaFingerprint, FaShieldAlt, FaFileUpload } from 'react-icons/fa';

const DocumentVerification = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Identity Verification Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center gap-3 mb-2">
          <FaShieldAlt className="text-blue-900 text-2xl" />
          <h2 className="text-2xl font-semibold text-gray-800">Identity Verification</h2>
        </div>
        <p className="text-gray-600 mb-6">
          Verify your identity to access all document management features
        </p>

        {/* Warning Banner */}
        <div className="bg-amber-50 border-l-4 border-amber-400 p-4 mb-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-amber-800">
                Identity Not Verified
              </h3>
              <p className="text-sm text-amber-700 mt-1">
                Please verify your identity using one of the methods below
              </p>
            </div>
          </div>
        </div>

        {/* Verification Options */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Aadhaar eKYC Option */}
          <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <FaFingerprint className="text-blue-900 text-xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800">Aadhaar eKYC</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Verify your identity using Aadhaar-based authentication
            </p>
            <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-md transition-colors">
              Verify with Aadhaar
            </button>
          </div>

          {/* DigiLocker Option */}
          <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <FaShieldAlt className="text-blue-900 text-xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800">DigiLocker</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Connect your DigiLocker account for seamless verification
            </p>
            <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-md transition-colors">
              Connect DigiLocker
            </button>
          </div>
        </div>
      </div>

      {/* Upload Documents Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center gap-3 mb-2">
          <FaFileUpload className="text-blue-900 text-2xl" />
          <h2 className="text-2xl font-semibold text-gray-800">Upload Documents</h2>
        </div>
        <p className="text-gray-600">
          Upload and manage your property-related documents
        </p>
      </div>
    </div>
  );
};

export default DocumentVerification; 
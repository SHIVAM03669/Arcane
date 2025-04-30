import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { languages } from '../translations/translations';

const EncumbranceCard = () => {
  const navigate = useNavigate();
  const { currentLang } = useLanguage();
  const t = languages[currentLang].encumbrancePage;

  // Example property data
  const exampleProperty = {
    address: "34, Park Street, Kolkata",
    status: "mortgaged",
    ownerDetails: {
      name: "Aarav Das",
      id: "AADHAAR012345"
    },
    encumbrance: {
      hasEncumbrance: true,
      bank: "UCO Bank",
      loanAmount: "₹75,00,000"
    }
  };

  const requiredDocuments = [
    "Original Registry Papers",
    "Encumbrance Certificate",
    "Owner's Aadhaar ID",
    "Loan Sanction Letter from UCO Bank",
    "Recent Property Tax Receipt",
    "Previous Sale Deeds (if applicable)"
  ];

  return (
    <div className="space-y-6">
      {/* Example Property Summary */}
      <div className="bg-white/95 backdrop-blur-sm p-6 rounded-lg shadow-lg border-t-4 border-blue-900">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-800 text-xl">{t.exampleProperty}</h3>
          <span className="px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
            {t.status.mortgaged}
          </span>
        </div>
        <div className="text-gray-600">
          <p className="mb-2"><span className="font-medium">{t.fields.address}:</span> {exampleProperty.address}</p>
          <p className="mb-2"><span className="font-medium">{t.fields.owner}:</span> {exampleProperty.ownerDetails.name}</p>
          <p><span className="font-medium">{t.fields.bank}:</span> {exampleProperty.encumbrance.bank}</p>
        </div>
      </div>

      {/* Verification Notice Card */}
      <div className="bg-white/95 backdrop-blur-sm p-6 rounded-lg shadow-lg border-l-4 border-yellow-400">
        <div className="mb-6">
          <div className="flex items-center mb-4">
            <svg className="w-6 h-6 text-yellow-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <h3 className="text-xl font-semibold text-gray-800">{t.notice.title}</h3>
          </div>
          <p className="text-gray-700 text-lg mb-6 leading-relaxed">
            {t.notice.message}
          </p>
        </div>

        <div className="bg-yellow-50 rounded-lg p-6">
          <ul className="space-y-3">
            {t.notice.requiredDocuments.map((doc, index) => (
              <li key={index} className="flex items-start">
                <svg className="w-5 h-5 text-yellow-600 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-gray-700">{doc}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default EncumbranceCard; 
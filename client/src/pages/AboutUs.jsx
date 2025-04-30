import React from 'react';
import Navbar from '../components/Navbar';
import { useLanguage } from '../context/LanguageContext';
import { languages } from '../translations/translations';
import { FaBuilding, FaUserShield, FaHistory, FaUsers } from 'react-icons/fa';

const AboutUs = () => {
  const { currentLang } = useLanguage();
  const t = languages[currentLang].aboutUs;

  const features = [
    {
      icon: <FaBuilding className="w-8 h-8" />,
      title: t?.propertyExpertise || "Property Verification Excellence",
      description: t?.propertyExpertiseDesc || "With our advanced digital platform, we provide instant property verification and encumbrance checks, ensuring transparent and reliable property information for all stakeholders."
    },
    {
      icon: <FaUserShield className="w-8 h-8" />,
      title: t?.security || "Secure Documentation",
      description: t?.securityDesc || "Our platform ensures the highest level of security for property documents, encumbrance certificates, and personal information using advanced encryption and secure storage systems."
    },
    {
      icon: <FaHistory className="w-8 h-8" />,
      title: t?.history || "Digital Transformation",
      description: t?.historyDesc || "Leading the digital revolution in property management, we've transformed traditional paper-based processes into efficient digital workflows, serving thousands of property owners and institutions."
    },
    {
      icon: <FaUsers className="w-8 h-8" />,
      title: t?.team || "Expert Support",
      description: t?.teamDesc || "Our team includes property experts, legal professionals, and technical specialists who ensure accurate verification and smooth property management services."
    }
  ];

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

      <main className="relative z-10 container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 drop-shadow-lg">
              {t?.title || "About Us"}
            </h1>
            <p className="text-xl text-gray-100 max-w-2xl mx-auto drop-shadow">
              {t?.subtitle || "Your trusted partner in property management and verification"}
            </p>
          </div>

          {/* Main Content */}
          <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-xl border border-white/20 p-8 mb-12">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                {t?.mission || "Our Mission"}
              </h2>
              <p className="text-gray-700 mb-6">
                {t?.missionText || "Our mission is to revolutionize property management and verification through digital innovation. We strive to provide instant, accurate, and secure property information, making property transactions and management seamless and transparent for all stakeholders."}
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                {t?.vision || "Our Vision"}
              </h2>
              <p className="text-gray-700 mb-6">
                {t?.visionText || "To be India's leading digital platform for property verification and management, creating a future where property-related processes are efficient, transparent, and accessible to all through technological innovation."}
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                {t?.whatWeDo || "What We Do"}
              </h2>
              <p className="text-gray-700 mb-6">
                {t?.whatWeDoText || "We provide comprehensive property management solutions with a focus on encumbrance verification. Our platform enables instant property searches, detailed verification reports, and secure document management. We serve property owners, buyers, banks, and government institutions with reliable and efficient services."}
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                {t?.whyChooseUs || "Why Choose Us"}
              </h2>
              <ul className="list-disc pl-6 text-gray-700 mb-6">
                <li className="mb-2">{t?.whyChooseUs1 || "Instant digital verification of property encumbrances"}</li>
                <li className="mb-2">{t?.whyChooseUs2 || "Comprehensive property history and documentation"}</li>
                <li className="mb-2">{t?.whyChooseUs3 || "Secure and confidential information handling"}</li>
                <li className="mb-2">{t?.whyChooseUs4 || "Expert support from property professionals"}</li>
                <li>{t?.whyChooseUs5 || "Modern digital platform with user-friendly interface"}</li>
              </ul>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bg-white/95 backdrop-blur-sm rounded-lg shadow-lg border border-white/20 p-6 hover:shadow-xl transition-shadow"
              >
                <div className="text-blue-900 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-700">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AboutUs; 
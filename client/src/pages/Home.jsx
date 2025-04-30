import React, { useState } from 'react';
import { FaSearch, FaHome, FaFileAlt, FaBuilding, FaPhone, FaChevronUp, FaBell } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { languages } from '../translations/translations';
import { useLanguage } from '../context/LanguageContext';
import Navbar from '../components/Navbar';
import ChatbotWidget from '../components/ChatbotWidget';

const Home = () => {
  const navigate = useNavigate();
  const { currentLang } = useLanguage();
  const [isFooterOpen, setIsFooterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleFooter = () => {
    setIsFooterOpen(!isFooterOpen);
  };

  const handleSearch = () => {
    console.log("Search triggered with query:", searchQuery);
    if (searchQuery.trim()) {
      const url = `/property-search?query=${encodeURIComponent(searchQuery.trim())}`;
      console.log("Navigating to:", url);
      navigate(url, { replace: true }); // Added replace: true for better navigation
    } else {
      console.log("Empty search query, navigating to property-search");
      navigate('/property-search', { replace: true });
    }
  };

  const handleKeyPress = (e) => {
    console.log("Key pressed:", e.key);
    if (e.key === 'Enter') {
      console.log("Enter key pressed, triggering search");
      handleSearch();
    }
  };

  const handleFormSubmit = (e) => {
    console.log("Form submitted");
    e.preventDefault();
    handleSearch();
  };

  const services = [
    {
      icon: <FaHome className="w-6 h-6 text-blue-700" />,
      title: languages[currentLang].serviceLinks.propertyRecords.title,
      description: languages[currentLang].serviceLinks.propertyRecords.description,
      link: "/property-search"
    },
    {
      icon: <FaFileAlt className="w-6 h-6 text-blue-700" />,
      title: languages[currentLang].serviceLinks.encumbrance.title,
      description: languages[currentLang].serviceLinks.encumbrance.description,
      link: "/encumbrance"
    },
    {
      icon: <FaBuilding className="w-6 h-6 text-blue-700" />,
      title: "Add Property",
      description: "Add and manage your property details with our comprehensive property management system",
      link: "/formdata"
    }
  ];

  const notices = languages[currentLang].notices.items;

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

      {/* Use the Navbar component */}
      <Navbar />

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-4 py-6 md:py-12 min-h-screen">
        {/* Hero Section */}
        <section className="mb-12 text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
            {languages[currentLang].propertyPortal}
          </h1>
          <p className="text-lg md:text-xl text-gray-100 mb-8 max-w-2xl mx-auto drop-shadow">
            Easily search and access property records across India
          </p>
          
          {/* Search Section */}
          <div className="max-w-3xl mx-auto bg-white/95 backdrop-blur-sm p-6 rounded-lg shadow-xl mb-12">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-6">
              {languages[currentLang].search.title}
            </h2>
            <form 
              className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-4"
              onSubmit={handleFormSubmit}
            >
              <input
                type="text"
                placeholder={languages[currentLang].search.placeholder}
                className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyPress}
              />
              <button 
                type="submit"
                className="bg-blue-900 text-white px-6 py-3 rounded-lg hover:bg-blue-800 transition-all flex items-center justify-center space-x-2 shadow-lg"
                onClick={handleSearch}  // Added onClick handler
              >
                <FaSearch className="w-5 h-5" />
                <span>{languages[currentLang].search.button}</span>
              </button>
            </form>
          </div>
        </section>

        {/* Services Grid */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center drop-shadow-lg">
            {languages[currentLang].importantLinks}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white/95 backdrop-blur-sm p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 border-t-4 border-blue-900"
              >
                <div className="flex items-start h-full">
                  <div className="p-3 bg-blue-900/10 rounded-lg mr-4">
                    {React.cloneElement(service.icon, { className: "w-6 h-6 text-blue-900" })}
                  </div>
                  <div className="flex flex-col justify-between flex-1">
                    <div>
                      <h3 className="font-semibold text-gray-800 text-lg mb-2">{service.title}</h3>
                      <p className="text-gray-600 mb-4 text-sm leading-relaxed">{service.description}</p>
                    </div>
                    <button
                      onClick={() => navigate(service.link)}
                      className="text-blue-900 text-sm font-medium hover:text-blue-700 transition-colors flex items-center space-x-1 mt-auto"
                    >
                      <span>{languages[currentLang].serviceLinks.accessNow}</span>
                      <span className="text-lg">→</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* News Ticker */}
        <section className="mb-12">
          <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden">
            <div className="relative flex items-center h-14 bg-gradient-to-r from-blue-900/90 to-blue-900/80">
              <div className="flex items-center px-4 py-2 border-r border-blue-800/50">
                <FaBell className="text-yellow-400 w-5 h-5 animate-pulse" />
                <span className="text-white font-semibold ml-3 text-sm md:text-base">
                  {languages[currentLang].notices.label}
                </span>
              </div>
              
              <div className="flex-1 overflow-hidden">
                <div className="flex whitespace-nowrap animate-scroll">
                  {[...notices, ...notices].map((notice, index) => (
                    <div
                      key={index}
                      className="inline-flex items-center px-4 text-white text-sm md:text-base"
                    >
                      <span className="mr-4">•</span>
                      {notice}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Chatbot Widget */}
      <ChatbotWidget />

      {/* Footer Toggle Button */}
      <div 
        className={`fixed left-1/2 transform -translate-x-1/2 z-20 transition-all duration-300 ${
          isFooterOpen ? 'translate-y-[-1px]' : 'bottom-0'
        }`}
        style={{
          bottom: isFooterOpen ? 'var(--footer-height, 0px)' : '0px'
        }}
      >
        <button
          onClick={toggleFooter}
          className="bg-blue-900 text-white px-6 py-1 rounded-t shadow-lg hover:bg-blue-800 transition-colors"
        >
          <FaChevronUp className={`w-4 h-4 transition-transform duration-300 ${isFooterOpen ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {/* Footer */}
      <footer 
        ref={(el) => {
          if (el) {
            document.documentElement.style.setProperty('--footer-height', `${el.offsetHeight}px`);
          }
        }}
        className={`fixed bottom-0 left-0 right-0 z-10 bg-blue-900/90 text-white transition-all duration-300 ease-in-out ${
          isFooterOpen 
            ? 'translate-y-0 opacity-100' 
            : 'translate-y-full opacity-0 pointer-events-none'
        }`}
      >
        <div className="container mx-auto px-4 py-6 md:py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            <div>
              <h3 className="font-semibold mb-3 md:mb-4">{languages[currentLang].footer.contactUs.title}</h3>
              <p className="text-sm text-gray-200 whitespace-pre-line">
                {languages[currentLang].footer.contactUs.address}
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-3 md:mb-4">{languages[currentLang].footer.quickLinks.title}</h3>
              <ul className="text-sm text-gray-200 space-y-2">
                {languages[currentLang].footer.quickLinks.items.map((item, index) => (
                  <li key={index}><a href="#" className="hover:text-white">{item}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3 md:mb-4">{languages[currentLang].footer.help.title}</h3>
              <ul className="text-sm text-gray-200 space-y-2">
                {languages[currentLang].footer.help.items.map((item, index) => (
                  <li key={index}><a href="#" className="hover:text-white">{item}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3 md:mb-4">{languages[currentLang].footer.connect.title}</h3>
              <p className="text-sm text-gray-200">
                {languages[currentLang].footer.connect.phone}<br />
                {languages[currentLang].footer.connect.email}
              </p>
            </div>
          </div>
          <div className="border-t border-white/20 mt-6 md:mt-8 pt-6 md:pt-8 text-sm text-gray-200 text-center">
            <p>{languages[currentLang].footer.copyright}</p>
            <p className="mt-2">
              {languages[currentLang].footer.legal.map((item, index) => (
                <React.Fragment key={index}>
                  {index > 0 && ' | '}
                  <a href="#" className="hover:text-white">{item}</a>
                </React.Fragment>
              ))}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;

// Add these styles to your CSS
const styles = `
@keyframes scroll {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

.animate-scroll {
  animation: scroll 30s linear infinite;
}

@media (prefers-reduced-motion: reduce) {
  .animate-scroll {
    animation: none;
  }
}
`;
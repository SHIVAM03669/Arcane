import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaHome, FaFileAlt, FaBuilding, FaPhone, FaGlobe, FaBars, FaTimes, FaUser, FaSignOutAlt } from 'react-icons/fa';
import { languages } from '../translations/translations';
import { useLanguage } from '../context/LanguageContext';
import { auth } from '../firebaseconfig';
import { onAuthStateChanged, signOut } from 'firebase/auth';

const Navbar = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const { currentLang, changeLanguage } = useLanguage();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLanguageChange = (langCode) => {
    changeLanguage(langCode);
    setIsLangMenuOpen(false);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isLangMenuOpen && !event.target.closest('.language-menu')) {
        setIsLangMenuOpen(false);
      }
      if (isProfileMenuOpen && !event.target.closest('.profile-menu')) {
        setIsProfileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isLangMenuOpen, isProfileMenuOpen]);

  return (
    <header className="relative z-50 bg-white shadow-sm">
      <div className="container mx-auto px-2 sm:px-4 py-2 sm:py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-6 flex-shrink-0">
            <img src="/emblem.png" alt="Government Emblem" className="h-10 sm:h-12 md:h-16 w-auto" />
            <div className="min-w-0">
              <h1 className="text-sm sm:text-lg md:text-2xl font-bold text-gray-800 truncate">
                {languages[currentLang].propertyPortal}
              </h1>
              <p className="text-xs sm:text-sm text-gray-600 truncate">
                {languages[currentLang].government}
              </p>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-2 md:hidden">
            <button 
              onClick={toggleMobileMenu}
              className="p-2 text-gray-700 hover:text-blue-900"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <FaTimes className="w-6 h-6" />
              ) : (
                <FaBars className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <nav className="flex space-x-8 text-sm">
              <Link to="/" className="text-gray-700 hover:text-blue-900 font-medium whitespace-nowrap">
                {languages[currentLang].home}
              </Link>
              <Link to="/about" className="text-gray-700 hover:text-blue-900 font-medium whitespace-nowrap">
                {languages[currentLang].about}
              </Link>
              <Link to="/services" className="text-gray-700 hover:text-blue-900 font-medium whitespace-nowrap">
                {languages[currentLang].services}
              </Link>
              <Link to="/contact" className="text-gray-700 hover:text-blue-900 font-medium whitespace-nowrap">
                {languages[currentLang].contact}
              </Link>
            </nav>
            
            <div className="flex items-center space-x-4">
              <div className="relative language-menu">
                <button
                  onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                  className="flex items-center space-x-1 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <FaGlobe className="w-4 h-4" />
                  <span>{languages[currentLang].nativeName}</span>
                  <svg className={`w-4 h-4 transition-transform ${isLangMenuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {isLangMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                    {Object.entries(languages).map(([code, lang]) => (
                      <button
                        key={code}
                        onClick={() => handleLanguageChange(code)}
                        className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 flex items-center space-x-2
                          ${currentLang === code ? 'bg-blue-50 text-blue-600' : 'text-gray-700'}`}
                      >
                        <span>{lang.nativeName}</span>
                        <span className="text-gray-400 text-xs">({lang.name})</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <div className="h-5 w-px bg-gray-300"></div>
              
              {user ? (
                <div className="relative profile-menu">
                  <button
                    onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                    className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <FaUser className="w-4 h-4 text-blue-900" />
                    </div>
                    <span className="hidden sm:inline">{user.displayName || user.email}</span>
                    <svg className={`w-4 h-4 transition-transform ${isProfileMenuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  {isProfileMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900">{user.displayName || 'User'}</p>
                        <p className="text-xs text-gray-500 truncate">{user.email}</p>
                      </div>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <FaSignOutAlt className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <button 
                    onClick={() => navigate('/login')}
                    className="px-4 py-2 text-blue-900 font-medium hover:text-blue-700 transition-colors whitespace-nowrap"
                  >
                    {languages[currentLang].login}
                  </button>
                  <button 
                    onClick={() => navigate('/signup')}
                    className="px-4 py-2 bg-blue-900 text-white rounded hover:bg-blue-800 transition-colors font-medium whitespace-nowrap"
                  >
                    {languages[currentLang].signup}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden fixed inset-x-0 top-[64px] sm:top-[72px] bg-white shadow-lg transition-all duration-300 ease-in-out ${
            isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full'
          }`}
        >
          <nav className="flex flex-col py-2 max-h-[calc(100vh-80px)] overflow-y-auto">
            <div className="px-4 py-2 border-b border-gray-100">
              <span className="text-sm font-medium text-gray-500">Menu</span>
            </div>
            
            {/* Navigation Links */}
            <div className="py-2 border-b border-gray-100">
              <Link to="/" className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 text-sm">
                <FaHome className="w-5 h-5 mr-3" />
                {languages[currentLang].home}
              </Link>
              <Link to="/about" className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 text-sm">
                <FaFileAlt className="w-5 h-5 mr-3" />
                {languages[currentLang].about}
              </Link>
              <Link to="/services" className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 text-sm">
                <FaBuilding className="w-5 h-5 mr-3" />
                {languages[currentLang].services}
              </Link>
              <Link to="/contact" className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 text-sm">
                <FaPhone className="w-5 h-5 mr-3" />
                {languages[currentLang].contact}
              </Link>
            </div>

            {/* Language Selection */}
            <div className="py-2 border-b border-gray-100">
              <div className="px-4 py-2">
                <span className="text-sm font-medium text-gray-500">Language</span>
              </div>
              <div className="relative language-menu">
                <button
                  onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                  className="flex items-center space-x-1 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <FaGlobe className="w-4 h-4" />
                  <span>{languages[currentLang].nativeName}</span>
                  <svg className={`w-4 h-4 transition-transform ${isLangMenuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {isLangMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                    {Object.entries(languages).map(([code, lang]) => (
                      <button
                        key={code}
                        onClick={() => handleLanguageChange(code)}
                        className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 flex items-center space-x-2
                          ${currentLang === code ? 'bg-blue-50 text-blue-600' : 'text-gray-700'}`}
                      >
                        <span>{lang.nativeName}</span>
                        <span className="text-gray-400 text-xs">({lang.name})</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Auth Buttons */}
            <div className="p-4 space-y-2">
              {user ? (
                <>
                  <div className="flex items-center space-x-3 px-4 py-2 border-b border-gray-100">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <FaUser className="w-5 h-5 text-blue-900" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{user.displayName || 'User'}</p>
                      <p className="text-xs text-gray-500 truncate">{user.email}</p>
                    </div>
                  </div>
                  <button 
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center space-x-2 py-2 px-4 text-blue-900 border border-blue-900 rounded hover:bg-blue-50 transition-colors text-sm font-medium"
                  >
                    <FaSignOutAlt className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </>
              ) : (
                <>
                  <button 
                    onClick={() => navigate('/login')}
                    className="w-full py-2 px-4 text-blue-900 border border-blue-900 rounded hover:bg-blue-50 transition-colors text-sm font-medium"
                  >
                    {languages[currentLang].login}
                  </button>
                  <button 
                    onClick={() => navigate('/signup')}
                    className="w-full py-2 px-4 bg-blue-900 text-white rounded hover:bg-blue-800 transition-colors text-sm font-medium"
                  >
                    {languages[currentLang].signup}
                  </button>
                </>
              )}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar; 
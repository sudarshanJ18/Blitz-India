import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { assets, serviceCategories } from '../../assets/assets.js';

const THEME_COLORS = {
  primary: '#FF6B35',
  secondary: '#FFA07A',
  backgroundLight: '#F5F5F5',
  textDark: '#2D3436',
  overlayDark: 'rgba(45, 52, 54, 0.98)',
  numbering: '#9C9C9C'
};

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [atTop, setAtTop] = useState(true);
  const [hoveredService, setHoveredService] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileServiceAccordion, setMobileServiceAccordion] = useState(false);
  const [mobileCategoryOpen, setMobileCategoryOpen] = useState(null);
  const location = useLocation();
  
  // Refs for dropdown elements
  const servicesDropdownRef = useRef(null);
  const categoryTimeoutRef = useRef(null);
  const serviceTimeoutRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      setScrolled(isScrolled);
      setAtTop(window.scrollY < 10);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      if (categoryTimeoutRef.current) clearTimeout(categoryTimeoutRef.current);
      if (serviceTimeoutRef.current) clearTimeout(serviceTimeoutRef.current);
    };
  }, []);

  // Handle mouse enter for services dropdown
  const handleServicesMouseEnter = () => {
    if (serviceTimeoutRef.current) {
      clearTimeout(serviceTimeoutRef.current);
    }
    setHoveredService(true);
  };

  // Handle mouse leave for services dropdown
  const handleServicesMouseLeave = () => {
    serviceTimeoutRef.current = setTimeout(() => {
      setHoveredService(false);
      setHoveredCategory(null);
    }, 200);
  };

  // Handle mouse enter for category
  const handleCategoryMouseEnter = (categoryId) => {
    if (categoryTimeoutRef.current) {
      clearTimeout(categoryTimeoutRef.current);
    }
    setHoveredCategory(categoryId);
  };

  // Handle mouse leave for category
  const handleCategoryMouseLeave = () => {
    categoryTimeoutRef.current = setTimeout(() => {
      setHoveredCategory(null);
    }, 200);
  };

  // Cancel timeout when entering subcategory dropdown
  const handleSubcategoryMouseEnter = () => {
    if (categoryTimeoutRef.current) {
      clearTimeout(categoryTimeoutRef.current);
    }
  };

  const handleNavClick = (e) => {
    // For menu toggle button
    if (e && e.currentTarget && e.currentTarget.getAttribute('type') === 'button') {
      setMobileMenuOpen(!mobileMenuOpen);
      return;
    }
    
    // For navigation links
    if (e && e.preventDefault) {
      e.preventDefault();
      const targetId = e.currentTarget.getAttribute('href');
      if (targetId) {
        setMobileMenuOpen(false);
        setMobileServiceAccordion(false);
        setMobileCategoryOpen(null);
        
        // Small delay to allow menu to close before navigation
        setTimeout(() => {
          if (targetId.startsWith('#')) {
            const element = document.querySelector(targetId);
            if (element) {
              element.scrollIntoView({ behavior: 'smooth' });
            }
          } else if (targetId.startsWith('/')) {
            window.location.href = targetId;
          }
        }, 200);
      }
    }
  };

  // Build menu items with nested services for mobile menu
  const menuItems = [
    { label: 'Home', ariaLabel: 'Go to home page', link: '/', number: '01' },
    { 
      label: 'Services', 
      ariaLabel: 'View our services', 
      link: '/services', 
      number: '02',
      subItems: serviceCategories.map(category => ({
        label: `${category.id}. ${category.title}`,
        link: `/services/${category.id}`,
        subItems: category.services.map(service => ({
          label: `${category.id}.${service.subId} ${service.title}`,
          link: `/services/${category.id}/${service.subId}`
        }))
      }))
    },
    { label: 'Portfolio', ariaLabel: 'See our signature projects', link: '/portfolio', number: '03' },
    { label: 'About Us', ariaLabel: 'Learn about our mission and team', link: '/about', number: '04' },
    { label: 'Contact', ariaLabel: 'Get in touch with our team', link: '/contact', number: '05' },
    { label: 'Blog', ariaLabel: 'Read our latest articles', link: '/blogs', number: '06' }
  ];

  return (
    <>
      {/* Desktop Navigation Bar */}
      <nav 
        className={`hidden lg:block fixed top-0 left-0 right-0 z-50 w-full transition-all duration-500 ease-in-out ${
          scrolled 
            ? 'bg-white shadow-2xl' 
            : 'bg-transparent'
        }`}
        role="navigation"
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
          <div className="flex items-center justify-between h-28">
            {/* Logo */}
            <Link to="/" className="flex items-center group">
              <img
                src={assets.logo}
                alt="Blitz India Engineering"
                className="h-24 w-auto transition-transform duration-300 group-hover:scale-105"
                draggable={false}
              />
            </Link>

            {/* Desktop Menu */}
            <div className="flex items-center space-x-10">
              <Link
                to="/"
                className={`text-base font-bold tracking-wide transition-all duration-300 relative group ${
                  location.pathname === '/' 
                    ? 'text-orange-600' 
                    : 'text-gray-800 hover:text-orange-600'
                }`}
              >
                Home
                <span className={`absolute bottom-0 left-0 w-full h-0.5 transform origin-left transition-transform duration-300 ${
                  location.pathname === '/' ? 'scale-x-100 bg-orange-600' : 'scale-x-0 group-hover:scale-x-100 bg-orange-600'
                }`}></span>
              </Link>

              {/* Services Dropdown */}
              <div
                className="relative"
                onMouseEnter={handleServicesMouseEnter}
                onMouseLeave={handleServicesMouseLeave}
                ref={servicesDropdownRef}
              >
                <Link
                  to="/services"
                  className={`text-base font-bold tracking-wide transition-all duration-300 flex items-center relative group ${
                    location.pathname.startsWith('/services')
                      ? 'text-orange-600' 
                      : 'text-gray-800 hover:text-orange-600'
                  }`}
                >
                  Services
                  <svg 
                    className={`ml-2 w-5 h-5 transition-transform duration-300 ${hoveredService ? 'rotate-180' : ''}`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                  </svg>
                  <span className={`absolute bottom-0 left-0 w-full h-0.5 transform origin-left transition-transform duration-300 ${
                    location.pathname.startsWith('/services') ? 'scale-x-100 bg-orange-600' : 'scale-x-0 group-hover:scale-x-100 bg-orange-600'
                  }`}></span>
                </Link>

                {/* Categories Dropdown */}
                {hoveredService && (
                  <div className="absolute top-full left-0 mt-4 w-72 bg-white rounded-2xl shadow-2xl border border-gray-100 py-3 z-50 animate-dropdown">
                    {serviceCategories.map((category, idx) => (
                      <div
                        key={category.id}
                        className="relative group"
                        onMouseEnter={() => handleCategoryMouseEnter(category.id)}
                        onMouseLeave={handleCategoryMouseLeave}
                        style={{
                          animation: `slideInStagger 0.3s ease-out ${idx * 0.05}s both`
                        }}
                      >
                        <Link
                          to={`/services/${category.id}`}
                          className="flex items-center justify-between px-5 py-4 text-base font-semibold text-gray-800 hover:bg-gradient-to-r hover:from-orange-50 hover:to-orange-100 hover:text-orange-600 transition-all duration-300 rounded-xl mx-2 group"
                        >
                          <div className="flex items-center">
                            <span className="text-orange-600 mr-3 font-bold text-lg">{category.id}.</span>
                            <span className="transition-transform duration-300 group-hover:translate-x-1">{category.title}</span>
                          </div>
                          <svg 
                            className="w-5 h-5 text-gray-400 group-hover:text-orange-600 transition-all duration-300 group-hover:translate-x-1"
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>

                        {/* Sub-categories Dropdown */}
                        {hoveredCategory === category.id && (
                          <div 
                            className="absolute left-full top-0 ml-2 w-96 bg-white rounded-2xl shadow-2xl border border-gray-100 py-3 z-[60] animate-dropdown max-h-[600px] overflow-y-auto custom-scrollbar"
                            onMouseEnter={handleSubcategoryMouseEnter}
                            onMouseLeave={handleCategoryMouseLeave}
                          >
                            <div className="px-4 py-2 border-b border-gray-100 mb-2 bg-gradient-to-r from-orange-50 to-transparent">
                              <div className="text-sm font-bold text-orange-600 uppercase tracking-wider">
                                {category.title}
                              </div>
                            </div>
                            {category.services.map((service, sIdx) => (
                              <Link
                                key={service.id}
                                to={`/services/${category.id}/${service.subId}`}
                                className="block px-5 py-3 text-base text-gray-700 hover:bg-gradient-to-r hover:from-orange-50 hover:to-orange-100 hover:text-orange-600 transition-all duration-300 rounded-xl mx-2 group"
                                style={{
                                  animation: `slideInStagger 0.3s ease-out ${sIdx * 0.03}s both`
                                }}
                              >
                                <div className="flex items-start">
                                  <span className="text-orange-600 mr-3 font-bold text-sm mt-0.5 flex-shrink-0">
                                    {category.id}.{service.subId}
                                  </span>
                                  <span className="flex-1 leading-relaxed transition-transform duration-300 group-hover:translate-x-1">{service.title}</span>
                                </div>
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <Link
                to="/portfolio"
                className={`text-base font-bold tracking-wide transition-all duration-300 relative group ${
                  location.pathname.startsWith('/portfolio')
                    ? 'text-orange-600' 
                    : 'text-gray-800 hover:text-orange-600'
                }`}
              >
                Portfolio
                <span className={`absolute bottom-0 left-0 w-full h-0.5 transform origin-left transition-transform duration-300 ${
                  location.pathname.startsWith('/portfolio') ? 'scale-x-100 bg-orange-600' : 'scale-x-0 group-hover:scale-x-100 bg-orange-600'
                }`}></span>
              </Link>

              <Link
                to="/about"
                className={`text-base font-bold tracking-wide transition-all duration-300 relative group ${
                  location.pathname.startsWith('/about')
                    ? 'text-orange-600' 
                    : 'text-gray-800 hover:text-orange-600'
                }`}
              >
                About Us
                <span className={`absolute bottom-0 left-0 w-full h-0.5 transform origin-left transition-transform duration-300 ${
                  location.pathname.startsWith('/about') ? 'scale-x-100 bg-orange-600' : 'scale-x-0 group-hover:scale-x-100 bg-orange-600'
                }`}></span>
              </Link>

              <Link
                to="/contact"
                className={`text-base font-bold tracking-wide transition-all duration-300 relative group ${
                  location.pathname.startsWith('/contact')
                    ? 'text-orange-600' 
                    : 'text-gray-800 hover:text-orange-600'
                }`}
              >
                Contact
                <span className={`absolute bottom-0 left-0 w-full h-0.5 transform origin-left transition-transform duration-300 ${
                  location.pathname.startsWith('/contact') ? 'scale-x-100 bg-orange-600' : 'scale-x-0 group-hover:scale-x-100 bg-orange-600'
                }`}></span>
              </Link>

              <Link
                to="/blogs"
                className={`text-base font-bold tracking-wide transition-all duration-300 relative group ${
                  location.pathname.startsWith('/blogs')
                    ? 'text-orange-600' 
                    : 'text-gray-800 hover:text-orange-600'
                }`}
              >
                Blog
                <span className={`absolute bottom-0 left-0 w-full h-0.5 transform origin-left transition-transform duration-300 ${
                  location.pathname.startsWith('/blogs') ? 'scale-x-100 bg-orange-600' : 'scale-x-0 group-hover:scale-x-100 bg-orange-600'
                }`}></span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Menu - Fixed button visibility */}
      <div
        className={`lg:hidden fixed top-0 left-0 right-0 z-50 w-full transition-all duration-500 ${
          scrolled ? 'bg-white shadow-md' : 'bg-transparent'
        }`}
        role="navigation"
        style={{
          backdropFilter: scrolled ? 'blur(10px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(10px)' : 'none',
          backgroundColor: scrolled ? 'rgba(255, 255, 255, 0.98)' : 'transparent',
          transition: 'background-color 0.3s ease, backdrop-filter 0.3s ease'
        }}
      >
        <div className="flex items-center justify-between h-20 px-4">
          <Link to="/" className={`flex items-center transition-opacity duration-300 ${atTop ? 'opacity-0' : 'opacity-100'}`} onClick={handleNavClick}>
            <img
              src={assets.logo}
              alt="Blitz India Engineering"
              className="h-14 w-auto transition-all duration-300 hover:scale-105"
              draggable={false}
            />
          </Link>

          <button
            type="button"
            className={`relative w-12 h-12 flex items-center justify-center rounded-xl border-2 ${
              atTop ? 'border-orange-500 bg-white hover:bg-orange-50' : 'border-orange-500 bg-white shadow-lg hover:bg-orange-50 hover:shadow-xl'
            } transition-all duration-300 focus:outline-none active:scale-95`}
            style={{
              boxShadow: atTop ? '0 2px 10px rgba(0,0,0,0.1)' : 'none'
            }}
            onClick={handleNavClick}
            aria-label="Toggle navigation menu"
          >
            <span
              className={`absolute block h-0.5 w-6 bg-orange-600 transition-all duration-300 ${
                mobileMenuOpen ? 'rotate-45 translate-y-0' : '-translate-y-2'
              }`}
            />
            <span
              className={`absolute block h-0.5 w-6 bg-orange-600 transition-all duration-300 ${
                mobileMenuOpen ? 'opacity-0 scale-0' : 'opacity-100 scale-100'
              }`}
            />
            <span
              className={`absolute block h-0.5 w-6 bg-orange-600 transition-all duration-300 ${
                mobileMenuOpen ? '-rotate-45 translate-y-0' : 'translate-y-2'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`lg:hidden fixed inset-0 z-40 transition-all duration-500 ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        style={{
          position: 'fixed',
          top: '80px',
          bottom: 0,
          left: 0,
          right: 0,
          overflowY: 'auto',
          WebkitOverflowScrolling: 'touch'
        }}
      >
        <div
          className={`w-full h-full bg-white transition-transform duration-500 ${
            mobileMenuOpen ? 'translate-y-0' : '-translate-y-full'
          }`}
        >
          <div className="pt-6 pb-12 px-6 h-full overflow-y-auto">
            <div className="space-y-6">
              {menuItems.map(item => {
                if (item.label !== 'Services') {
                  return (
                    <Link
                      key={item.label}
                      to={item.link}
                      className={`flex items-center justify-between text-2xl font-semibold tracking-wide transition-all duration-300 ${
                        location.pathname === item.link
                          ? 'text-orange-600'
                          : 'text-gray-800 hover:text-orange-600'
                      }`}
                      onClick={handleNavClick}
                    >
                      <span>{item.label}</span>
                      <span className="text-sm font-bold text-gray-400">{item.number}</span>
                    </Link>
                  );
                }

                // Services item with inline accordion, keeping order consistent with desktop
                return (
                  <div key={item.label} className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Link
                        to={item.link}
                        className={`flex-1 text-2xl font-semibold tracking-wide transition-all duration-300 ${
                          location.pathname.startsWith('/services')
                            ? 'text-orange-600'
                            : 'text-gray-800 hover:text-orange-600'
                        }`}
                        onClick={handleNavClick}
                      >
                        <span>{item.label}</span>
                        <span className="ml-3 text-sm font-bold text-gray-400">{item.number}</span>
                      </Link>

                      <button
                        type="button"
                        className="ml-3 p-2 rounded-full border-2 border-orange-500 bg-white shadow-md text-orange-600 hover:bg-orange-50 hover:shadow-lg active:scale-95 transition-all duration-300"
                        onClick={() => setMobileServiceAccordion(prev => !prev)}
                        aria-label="Toggle services menu"
                      >
                        <svg
                          className={`w-5 h-5 transition-transform duration-300 ${
                            mobileServiceAccordion ? 'rotate-180' : ''
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                    </div>

                    <div
                      className={`grid transition-all duration-500 overflow-hidden ${
                        mobileServiceAccordion ? 'max-h-[1000px] mt-2' : 'max-h-0'
                      }`}
                    >
                      {serviceCategories.map(category => (
                        <div
                          key={category.id}
                          className="mb-4 rounded-2xl border border-gray-100 bg-white shadow-sm"
                        >
                          <button
                            type="button"
                            className="w-full flex items-center justify-between px-4 py-4 text-lg font-semibold text-gray-800"
                            onClick={() =>
                              setMobileCategoryOpen(prev => (prev === category.id ? null : category.id))
                            }
                          >
                            <div className="flex items-center gap-3">
                              <span className="text-orange-600 font-bold text-xl">{category.id}.</span>
                              <span>{category.title}</span>
                            </div>
                            <svg
                              className={`w-5 h-5 transition-transform duration-300 ${
                                mobileCategoryOpen === category.id
                                  ? 'rotate-90 text-orange-600'
                                  : 'text-gray-400'
                              }`}
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M9 5l7 7-7 7" />
                            </svg>
                          </button>

                          <div
                            className={`grid transition-all duration-500 overflow-hidden ${
                              mobileCategoryOpen === category.id
                                ? 'max-h-[800px] border-t border-gray-50'
                                : 'max-h-0'
                            }`}
                          >
                            <Link
                              to={`/services/${category.id}`}
                              className="px-6 py-3 text-base font-semibold text-gray-700 bg-orange-50/40 hover:text-orange-600 transition-colors duration-300"
                              onClick={handleNavClick}
                            >
                              View {category.title}
                            </Link>
                            {category.services.map(service => (
                              <Link
                                key={service.id}
                                to={`/services/${category.id}/${service.subId}`}
                                className="flex items-start gap-3 px-6 py-3 text-base text-gray-600 hover:text-orange-600 hover:bg-orange-50 transition-colors duration-300"
                                onClick={handleNavClick}
                              >
                                <span className="text-sm font-bold text-orange-600 mt-1">
                                  {category.id}.{service.subId}
                                </span>
                                <span className="leading-relaxed">{service.title}</span>
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Custom Styles */}
      <style>{`
        /* Dropdown Animation */
        @keyframes dropdownSlide {
          from {
            opacity: 0;
            transform: translateY(-15px) scale(0.96);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        .animate-dropdown {
          animation: dropdownSlide 0.25s cubic-bezier(0.16, 1, 0.3, 1);
          transform-origin: top;
        }
        
        /* Stagger Animation for Menu Items */
        @keyframes slideInStagger {
          from {
            opacity: 0;
            transform: translateX(-10px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        /* Custom Scrollbar for Dropdown */
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #FF6B35;
          border-radius: 10px;
          transition: background 0.3s ease;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #ff5722;
        }
        
        /* Smooth transitions */
        * {
          -webkit-tap-highlight-color: transparent;
        }
        
        /* Enhanced focus states for accessibility */
        a:focus-visible,
        button:focus-visible {
          outline: 2px solid #FF6B35;
          outline-offset: 4px;
          border-radius: 4px;
        }
        
        /* Smooth scroll behavior */
        html {
          scroll-behavior: smooth;
        }
        
        /* Prevent navbar overlap with content */
        body {
          padding-top: 0;
        }
      `}</style>
    </>
  );
};

export default Navbar;
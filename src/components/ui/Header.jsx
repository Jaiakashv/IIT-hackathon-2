import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navigationItems = [
    { label: 'Home', path: '/home-dashboard', icon: 'Home' },
    { label: 'Programs', path: '/programs-catalog', icon: 'BookOpen' },
    { label: 'Assessments', path: '/assessments', icon: 'ClipboardCheck' },
    { label: 'About', path: '/about-us', icon: 'Users' },
    { label: 'Verify', path: '/certificate-verification', icon: 'Shield' },
    { label: 'Contact', path: '/contact-faq', icon: 'MessageCircle' },
  ];

  const isActivePath = (path) => location.pathname === path;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 bg-surface border-b border-border-light z-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/home-dashboard" className="flex items-center space-x-3 py-2">
              <div className="h-10 w-auto">
                <img 
                  src="/assets/images/inlighn-tech-logo.png" 
                  alt="Inlighn Tech Logo" 
                  className="h-full w-auto object-contain"
                />
              </div>
              <span className="text-xl font-bold text-text-primary">Inlighn Tech</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navigationItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150 ease-out ${
                    isActivePath(item.path)
                      ? 'text-primary bg-primary-50' :'text-text-primary hover:text-primary hover:bg-primary-50'
                  }`}
                >
                  <Icon name={item.icon} size={16} />
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>

            {/* Desktop Auth Button */}
            <div className="hidden md:flex items-center">
              <Link
                to="/user-authentication"
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-150 ease-out hover:scale-102 ${
                  isActivePath('/user-authentication')
                    ? 'bg-primary text-white' :'bg-primary text-white hover:shadow-interactive'
                }`}
              >
                <Icon name="LogIn" size={16} />
                <span>Login</span>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 rounded-md text-text-primary hover:text-primary hover:bg-primary-50 transition-colors duration-150 ease-out"
              aria-label="Toggle mobile menu"
            >
              <Icon name={isMobileMenuOpen ? 'X' : 'Menu'} size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-200 md:hidden">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={closeMobileMenu}></div>
          <div className="fixed top-0 right-0 w-80 h-full bg-surface shadow-modal transform transition-transform duration-300 ease-out">
            <div className="flex items-center justify-between p-4 border-b border-border-light">
              <div className="flex items-center space-x-2">
              <div className="h-10 w-auto">
                <img 
                  src="/assets/images/inlighn-tech-logo.png" 
                  alt="Inlighn Tech Logo" 
                  className="h-full w-auto object-contain"
                />
              </div>
              <span className="text-xl font-bold text-text-primary">Inlighn Tech</span>
              </div>
              <button
                onClick={closeMobileMenu}
                className="p-2 rounded-md text-text-primary hover:text-primary hover:bg-primary-50 transition-colors duration-150 ease-out"
                aria-label="Close mobile menu"
              >
                <Icon name="X" size={24} />
              </button>
            </div>
            
            <nav className="p-4 space-y-2">
              {navigationItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={closeMobileMenu}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-base font-medium transition-colors duration-150 ease-out ${
                    isActivePath(item.path)
                      ? 'text-primary bg-primary-50' :'text-text-primary hover:text-primary hover:bg-primary-50'
                  }`}
                >
                  <Icon name={item.icon} size={20} />
                  <span>{item.label}</span>
                </Link>
              ))}
              
              <div className="pt-4 border-t border-border-light">
                <Link
                  to="/user-authentication"
                  onClick={closeMobileMenu}
                  className={`flex items-center justify-center space-x-2 w-full px-4 py-3 rounded-lg font-medium transition-all duration-150 ease-out ${
                    isActivePath('/user-authentication')
                      ? 'bg-primary text-white' :'bg-primary text-white hover:shadow-interactive'
                  }`}
                >
                  <Icon name="LogIn" size={20} />
                  <span>Login</span>
                </Link>
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
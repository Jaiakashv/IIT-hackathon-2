import React from 'react';
import { Link } from 'react-router-dom';
import Icon from 'components/AppIcon';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <div className="w-24 h-24 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <Icon name="AlertTriangle" size={48} color="var(--color-primary)" />
          </div>
          <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-text-primary mb-4">Page Not Found</h2>
          <p className="text-text-secondary mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>
        
        <div className="space-y-4">
          <Link
            to="/home-dashboard"
            className="btn-primary inline-flex items-center space-x-2"
          >
            <Icon name="Home" size={20} />
            <span>Back to Home</span>
          </Link>
          
          <div className="text-sm text-text-secondary">
            <p>Need help? <Link to="/contact-faq" className="text-primary hover:underline">Contact us</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
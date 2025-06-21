import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const Breadcrumb = () => {
  const location = useLocation();
  
  const pathMap = {
    '/home-dashboard': 'Home',
    '/about-us': 'About Us',
    '/programs-catalog': 'Programs',
    '/certificate-verification': 'Certificate Verification',
    '/contact-faq': 'Contact & FAQ',
    '/user-authentication': 'Login',
  };

  const generateBreadcrumbs = () => {
    const pathSegments = location.pathname.split('/').filter(segment => segment);
    const breadcrumbs = [{ label: 'Home', path: '/home-dashboard' }];

    if (location.pathname !== '/home-dashboard') {
      const currentPath = location.pathname;
      const currentLabel = pathMap[currentPath] || 'Page';
      breadcrumbs.push({ label: currentLabel, path: currentPath });
    }

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  if (breadcrumbs.length <= 1) {
    return null;
  }

  return (
    <nav className="flex items-center space-x-2 text-sm text-text-secondary mb-6" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        {breadcrumbs.map((crumb, index) => (
          <li key={crumb.path} className="flex items-center">
            {index > 0 && (
              <Icon 
                name="ChevronRight" 
                size={16} 
                className="mx-2 text-text-secondary" 
              />
            )}
            {index === breadcrumbs.length - 1 ? (
              <span className="text-text-primary font-medium" aria-current="page">
                {crumb.label}
              </span>
            ) : (
              <Link
                to={crumb.path}
                className="text-text-secondary hover:text-primary transition-colors duration-150 ease-out"
              >
                {crumb.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
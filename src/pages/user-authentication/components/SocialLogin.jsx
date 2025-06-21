import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const SocialLogin = ({ onSuccess }) => {
  const [loadingProvider, setLoadingProvider] = useState(null);

  const socialProviders = [
    {
      id: 'google',
      name: 'Google',
      icon: 'Chrome',
      bgColor: 'bg-white',
      textColor: 'text-gray-700',
      borderColor: 'border-gray-300',
      hoverBg: 'hover:bg-gray-50'
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      icon: 'Linkedin',
      bgColor: 'bg-blue-600',
      textColor: 'text-white',
      borderColor: 'border-blue-600',
      hoverBg: 'hover:bg-blue-700'
    }
  ];

  const handleSocialLogin = async (provider) => {
    setLoadingProvider(provider.id);

    // Simulate social login API call
    setTimeout(() => {
      onSuccess();
      setLoadingProvider(null);
    }, 1500);
  };

  return (
    <div className="mt-6">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border-light"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-surface text-text-secondary">Or continue with</span>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-3">
        {socialProviders.map((provider) => (
          <button
            key={provider.id}
            onClick={() => handleSocialLogin(provider)}
            disabled={loadingProvider !== null}
            className={`w-full flex items-center justify-center px-4 py-3 border rounded-lg font-medium transition-all duration-150 ease-out hover:scale-102 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed ${provider.bgColor} ${provider.textColor} ${provider.borderColor} ${provider.hoverBg}`}
          >
            {loadingProvider === provider.id ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-current mr-2"></div>
                <span>Connecting...</span>
              </>
            ) : (
              <>
                <Icon name={provider.icon} size={20} className="mr-2" />
                <span>Continue with {provider.name}</span>
              </>
            )}
          </button>
        ))}
      </div>

      <div className="mt-4 text-center">
        <p className="text-xs text-text-secondary">
          By signing in, you agree to our{' '}
          <button className="text-primary hover:underline font-medium">
            Terms of Service
          </button>{' '}
          and{' '}
          <button className="text-primary hover:underline font-medium">
            Privacy Policy
          </button>
        </p>
      </div>
    </div>
  );
};

export default SocialLogin;
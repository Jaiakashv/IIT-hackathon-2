import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const ForgotPasswordModal = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) {
      setError('Email is required');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    setError('');

    // Simulate API call
    setTimeout(() => {
      setIsSuccess(true);
      setIsLoading(false);
    }, 1500);
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 z-200 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={handleClose}></div>
      
      <div className="relative bg-surface rounded-lg shadow-modal w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border-light">
          <h2 className="text-xl font-semibold text-text-primary">
            Reset Password
          </h2>
          <button
            onClick={handleClose}
            className="p-2 rounded-md text-text-secondary hover:text-text-primary hover:bg-primary-50 transition-colors duration-150 ease-out"
          >
            <Icon name="X" size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {!isSuccess ? (
            <>
              <div className="text-center mb-6">
                <div className="w-12 h-12 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Mail" size={24} color="var(--color-primary)" />
                </div>
                <p className="text-text-secondary">
                  Enter your email address and we'll send you a link to reset your password.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="resetEmail" className="block text-sm font-medium text-text-primary mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Icon name="Mail" size={20} color="var(--color-text-secondary)" />
                    </div>
                    <input
                      type="email"
                      id="resetEmail"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setError('');
                      }}
                      className={`input-field pl-10 ${error ? 'border-error focus:ring-error' : ''}`}
                      placeholder="Enter your email"
                      disabled={isLoading}
                    />
                  </div>
                  {error && (
                    <p className="mt-1 text-sm text-error flex items-center">
                      <Icon name="AlertCircle" size={16} className="mr-1" />
                      {error}
                    </p>
                  )}
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="flex-1 px-4 py-2 border border-border rounded-lg text-text-secondary hover:text-text-primary hover:bg-primary-50 transition-colors duration-150 ease-out"
                    disabled={isLoading}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 btn-primary flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Icon name="Send" size={16} />
                        <span>Send Reset Link</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </>
          ) : (
            <div className="text-center">
              <div className="w-16 h-16 bg-success-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="CheckCircle" size={32} color="var(--color-success)" />
              </div>
              <h3 className="text-lg font-semibold text-text-primary mb-2">
                Reset Link Sent!
              </h3>
              <p className="text-text-secondary mb-6">
                We've sent a password reset link to <strong>{email}</strong>. 
                Please check your email and follow the instructions to reset your password.
              </p>
              <div className="space-y-3">
                <button
                  onClick={handleClose}
                  className="w-full btn-primary"
                >
                  Got it, thanks!
                </button>
                <p className="text-xs text-text-secondary">
                  Didn't receive the email? Check your spam folder or try again in a few minutes.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordModal;
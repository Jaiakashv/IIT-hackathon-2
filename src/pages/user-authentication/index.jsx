import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';

import Breadcrumb from 'components/ui/Breadcrumb';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import ForgotPasswordModal from './components/ForgotPasswordModal';
import SocialLogin from './components/SocialLogin';

const UserAuthentication = () => {
  const [activeTab, setActiveTab] = useState('login');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const navigate = useNavigate();

  const handleSuccessfulAuth = () => {
    navigate('/home-dashboard');
  };

  return (
    <div className="min-h-screen bg-background pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb />
        
        <div className="min-h-[calc(100vh-200px)] flex items-center justify-center">
          <div className="w-full max-w-md">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="GraduationCap" size={32} color="white" />
              </div>
              <h1 className="text-3xl font-bold text-text-primary mb-2">
                Welcome to Inlighn Tech
              </h1>
              <p className="text-text-secondary">
                {activeTab === 'login' ?'Sign in to access your learning dashboard' :'Create your account to start your journey'
                }
              </p>
            </div>

            {/* Tab Navigation */}
            <div className="card mb-0 rounded-b-none border-b-0">
              <div className="flex border-b border-border-light -mx-6 -mt-6 mb-6">
                <button
                  onClick={() => setActiveTab('login')}
                  className={`flex-1 px-6 py-4 text-sm font-medium transition-colors duration-150 ease-out ${
                    activeTab === 'login' ?'text-primary border-b-2 border-primary bg-primary-50' :'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  Sign In
                </button>
                <button
                  onClick={() => setActiveTab('register')}
                  className={`flex-1 px-6 py-4 text-sm font-medium transition-colors duration-150 ease-out ${
                    activeTab === 'register' ?'text-primary border-b-2 border-primary bg-primary-50' :'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  Sign Up
                </button>
              </div>

              {/* Form Content */}
              {activeTab === 'login' ? (
                <LoginForm 
                  onSuccess={handleSuccessfulAuth}
                  onForgotPassword={() => setShowForgotPassword(true)}
                />
              ) : (
                <RegisterForm onSuccess={handleSuccessfulAuth} />
              )}

              {/* Social Login */}
              <SocialLogin onSuccess={handleSuccessfulAuth} />
            </div>

            {/* Additional Links */}
            <div className="text-center mt-6">
              <p className="text-sm text-text-secondary">
                Need help? {' '}
                <Link 
                  to="/contact-faq" 
                  className="text-primary hover:underline font-medium"
                >
                  Contact Support
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotPassword && (
        <ForgotPasswordModal onClose={() => setShowForgotPassword(false)} />
      )}
    </div>
  );
};

export default UserAuthentication;
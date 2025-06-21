import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const LoginForm = ({ onSuccess, onForgotPassword }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Mock credentials for demonstration
  const mockCredentials = {
    student: { email: 'student@edutech.com', password: 'Student123!' },
    instructor: { email: 'instructor@edutech.com', password: 'Instructor123!' },
    admin: { email: 'admin@edutech.com', password: 'Admin123!' }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      const isValidCredentials = Object.values(mockCredentials).some(
        cred => cred.email === formData.email && cred.password === formData.password
      );

      if (isValidCredentials) {
        onSuccess();
      } else {
        setErrors({
          submit: 'Invalid email or password. Please try: student@edutech.com / Student123!'
        });
      }
      setIsLoading(false);
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Email Field */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-text-primary mb-2">
          Email Address
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon name="Mail" size={20} color="var(--color-text-secondary)" />
          </div>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className={`input-field pl-10 ${errors.email ? 'border-error focus:ring-error' : ''}`}
            placeholder="Enter your email"
            disabled={isLoading}
          />
        </div>
        {errors.email && (
          <p className="mt-1 text-sm text-error flex items-center">
            <Icon name="AlertCircle" size={16} className="mr-1" />
            {errors.email}
          </p>
        )}
      </div>

      {/* Password Field */}
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-text-primary mb-2">
          Password
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon name="Lock" size={20} color="var(--color-text-secondary)" />
          </div>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className={`input-field pl-10 ${errors.password ? 'border-error focus:ring-error' : ''}`}
            placeholder="Enter your password"
            disabled={isLoading}
          />
        </div>
        {errors.password && (
          <p className="mt-1 text-sm text-error flex items-center">
            <Icon name="AlertCircle" size={16} className="mr-1" />
            {errors.password}
          </p>
        )}
      </div>

      {/* Remember Me & Forgot Password */}
      <div className="flex items-center justify-between">
        <label className="flex items-center">
          <input
            type="checkbox"
            name="rememberMe"
            checked={formData.rememberMe}
            onChange={handleInputChange}
            className="h-4 w-4 text-primary focus:ring-primary border-border rounded"
            disabled={isLoading}
          />
          <span className="ml-2 text-sm text-text-secondary">Remember me</span>
        </label>
        <button
          type="button"
          onClick={onForgotPassword}
          className="text-sm text-primary hover:underline font-medium"
          disabled={isLoading}
        >
          Forgot password?
        </button>
      </div>

      {/* Submit Error */}
      {errors.submit && (
        <div className="p-3 bg-error-50 border border-error-100 rounded-md">
          <p className="text-sm text-error flex items-center">
            <Icon name="AlertTriangle" size={16} className="mr-2" />
            {errors.submit}
          </p>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full btn-primary flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            <span>Signing In...</span>
          </>
        ) : (
          <>
            <Icon name="LogIn" size={20} />
            <span>Sign In</span>
          </>
        )}
      </button>

      {/* Demo Credentials */}
      <div className="mt-4 p-3 bg-primary-50 border border-primary-100 rounded-md">
        <p className="text-xs text-primary font-medium mb-2">Demo Credentials:</p>
        <div className="text-xs text-primary space-y-1">
          <p>Student: student@edutech.com / Student123!</p>
          <p>Instructor: instructor@edutech.com / Instructor123!</p>
          <p>Admin: admin@edutech.com / Admin123!</p>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
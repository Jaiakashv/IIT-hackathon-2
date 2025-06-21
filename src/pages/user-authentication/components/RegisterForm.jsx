import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const RegisterForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    programInterest: '',
    agreeToTerms: false,
    agreeToPrivacy: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const programOptions = [
    { value: '', label: 'Select your area of interest' },
    { value: 'web-development', label: 'Web Development' },
    { value: 'data-science', label: 'Data Science' },
    { value: 'mobile-development', label: 'Mobile Development' },
    { value: 'ui-ux-design', label: 'UI/UX Design' },
    { value: 'digital-marketing', label: 'Digital Marketing' },
    { value: 'cybersecurity', label: 'Cybersecurity' }
  ];

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[a-z]/.test(password)) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    return strength;
  };

  const getPasswordStrengthText = (strength) => {
    switch (strength) {
      case 0:
      case 1: return { text: 'Very Weak', color: 'text-error' };
      case 2: return { text: 'Weak', color: 'text-warning' };
      case 3: return { text: 'Fair', color: 'text-accent' };
      case 4: return { text: 'Good', color: 'text-success' };
      case 5: return { text: 'Strong', color: 'text-success' };
      default: return { text: '', color: '' };
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Full name must be at least 2 characters';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.programInterest) {
      newErrors.programInterest = 'Please select your area of interest';
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms of service';
    }

    if (!formData.agreeToPrivacy) {
      newErrors.agreeToPrivacy = 'You must agree to the privacy policy';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: newValue
    }));

    // Calculate password strength
    if (name === 'password') {
      setPasswordStrength(calculatePasswordStrength(value));
    }

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
      onSuccess();
      setIsLoading(false);
    }, 2000);
  };

  const strengthInfo = getPasswordStrengthText(passwordStrength);

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Full Name Field */}
      <div>
        <label htmlFor="fullName" className="block text-sm font-medium text-text-primary mb-2">
          Full Name
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon name="User" size={20} color="var(--color-text-secondary)" />
          </div>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            className={`input-field pl-10 ${errors.fullName ? 'border-error focus:ring-error' : ''}`}
            placeholder="Enter your full name"
            disabled={isLoading}
          />
        </div>
        {errors.fullName && (
          <p className="mt-1 text-sm text-error flex items-center">
            <Icon name="AlertCircle" size={16} className="mr-1" />
            {errors.fullName}
          </p>
        )}
      </div>

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
            placeholder="Create a strong password"
            disabled={isLoading}
          />
        </div>
        
        {/* Password Strength Indicator */}
        {formData.password && (
          <div className="mt-2">
            <div className="flex items-center space-x-2">
              <div className="flex-1 bg-border-light rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${
                    passwordStrength <= 1 ? 'bg-error' :
                    passwordStrength <= 2 ? 'bg-warning' :
                    passwordStrength <= 3 ? 'bg-accent' : 'bg-success'
                  }`}
                  style={{ width: `${(passwordStrength / 5) * 100}%` }}
                ></div>
              </div>
              <span className={`text-xs font-medium ${strengthInfo.color}`}>
                {strengthInfo.text}
              </span>
            </div>
          </div>
        )}
        
        {errors.password && (
          <p className="mt-1 text-sm text-error flex items-center">
            <Icon name="AlertCircle" size={16} className="mr-1" />
            {errors.password}
          </p>
        )}
      </div>

      {/* Confirm Password Field */}
      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-text-primary mb-2">
          Confirm Password
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon name="Lock" size={20} color="var(--color-text-secondary)" />
          </div>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            className={`input-field pl-10 ${errors.confirmPassword ? 'border-error focus:ring-error' : ''}`}
            placeholder="Confirm your password"
            disabled={isLoading}
          />
        </div>
        {errors.confirmPassword && (
          <p className="mt-1 text-sm text-error flex items-center">
            <Icon name="AlertCircle" size={16} className="mr-1" />
            {errors.confirmPassword}
          </p>
        )}
      </div>

      {/* Program Interest Field */}
      <div>
        <label htmlFor="programInterest" className="block text-sm font-medium text-text-primary mb-2">
          Area of Interest
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon name="BookOpen" size={20} color="var(--color-text-secondary)" />
          </div>
          <select
            id="programInterest"
            name="programInterest"
            value={formData.programInterest}
            onChange={handleInputChange}
            className={`input-field pl-10 ${errors.programInterest ? 'border-error focus:ring-error' : ''}`}
            disabled={isLoading}
          >
            {programOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        {errors.programInterest && (
          <p className="mt-1 text-sm text-error flex items-center">
            <Icon name="AlertCircle" size={16} className="mr-1" />
            {errors.programInterest}
          </p>
        )}
      </div>

      {/* Terms and Privacy Checkboxes */}
      <div className="space-y-3">
        <label className="flex items-start">
          <input
            type="checkbox"
            name="agreeToTerms"
            checked={formData.agreeToTerms}
            onChange={handleInputChange}
            className="h-4 w-4 text-primary focus:ring-primary border-border rounded mt-0.5"
            disabled={isLoading}
          />
          <span className="ml-2 text-sm text-text-secondary">
            I agree to the{' '}
            <button type="button" className="text-primary hover:underline font-medium">
              Terms of Service
            </button>
          </span>
        </label>
        {errors.agreeToTerms && (
          <p className="text-sm text-error flex items-center">
            <Icon name="AlertCircle" size={16} className="mr-1" />
            {errors.agreeToTerms}
          </p>
        )}

        <label className="flex items-start">
          <input
            type="checkbox"
            name="agreeToPrivacy"
            checked={formData.agreeToPrivacy}
            onChange={handleInputChange}
            className="h-4 w-4 text-primary focus:ring-primary border-border rounded mt-0.5"
            disabled={isLoading}
          />
          <span className="ml-2 text-sm text-text-secondary">
            I agree to the{' '}
            <button type="button" className="text-primary hover:underline font-medium">
              Privacy Policy
            </button>
          </span>
        </label>
        {errors.agreeToPrivacy && (
          <p className="text-sm text-error flex items-center">
            <Icon name="AlertCircle" size={16} className="mr-1" />
            {errors.agreeToPrivacy}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full btn-primary flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            <span>Creating Account...</span>
          </>
        ) : (
          <>
            <Icon name="UserPlus" size={20} />
            <span>Create Account</span>
          </>
        )}
      </button>
    </form>
  );
};

export default RegisterForm;
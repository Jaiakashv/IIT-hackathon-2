import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from 'components/AppIcon';

const VerificationForm = ({ onVerify, isLoading }) => {
  const [certificateId, setCertificateId] = useState('');
  const [error, setError] = useState('');

  const validateCertificateId = (id) => {
    const pattern = /^CERT-\d{4}-\d{3}$/;
    return pattern.test(id.toUpperCase());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!certificateId.trim()) {
      setError('Please enter a certificate ID');
      return;
    }

    if (!validateCertificateId(certificateId)) {
      setError('Invalid certificate ID format. Please use format: CERT-YYYY-XXX');
      return;
    }

    onVerify(certificateId);
  };

  const handleInputChange = (e) => {
    const value = e.target.value.toUpperCase();
    setCertificateId(value);
    if (error) setError('');
  };

  const sampleIds = ['CERT-2024-001', 'CERT-2024-002', 'CERT-2023-999'];

  return (
    <div className="card-elevated">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="Search" size={24} color="var(--color-primary)" />
        </div>
        <h2 className="text-2xl font-bold text-text-primary mb-2">
          Verify Certificate
        </h2>
        <p className="text-text-secondary">
          Enter the certificate ID to validate its authenticity
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="certificateId" className="block text-sm font-medium text-text-primary mb-2">
            Certificate ID *
          </label>
          <div className="relative">
            <input
              type="text"
              id="certificateId"
              value={certificateId}
              onChange={handleInputChange}
              placeholder="CERT-2024-001"
              className={`input-field pr-12 ${error ? 'border-error focus:ring-error' : ''}`}
              disabled={isLoading}
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <Icon 
                name="FileText" 
                size={20} 
                color={error ? "var(--color-error)" : "var(--color-text-secondary)"} 
              />
            </div>
          </div>
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-2 text-sm text-error flex items-center"
            >
              <Icon name="AlertCircle" size={16} className="mr-1" />
              {error}
            </motion.p>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading || !certificateId.trim()}
          className="btn-primary w-full flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <Icon name="Loader2" size={20} />
              </motion.div>
              <span>Verifying...</span>
            </>
          ) : (
            <>
              <Icon name="Shield" size={20} />
              <span>Verify Certificate</span>
            </>
          )}
        </button>
      </form>

      {/* Sample IDs for testing */}
      <div className="mt-8 p-4 bg-primary-50 rounded-lg">
        <h3 className="text-sm font-medium text-text-primary mb-2 flex items-center">
          <Icon name="Info" size={16} className="mr-2" />
          Sample Certificate IDs for Testing
        </h3>
        <div className="flex flex-wrap gap-2">
          {sampleIds.map((id) => (
            <button
              key={id}
              type="button"
              onClick={() => setCertificateId(id)}
              className="px-3 py-1 text-xs bg-primary text-white rounded-full hover:bg-primary-600 transition-colors duration-150"
              disabled={isLoading}
            >
              {id}
            </button>
          ))}
        </div>
        <p className="text-xs text-text-secondary mt-2">
          Click on any sample ID to test the verification system
        </p>
      </div>

      {/* Format Guide */}
      <div className="mt-6 p-4 bg-background rounded-lg border border-border-light">
        <h3 className="text-sm font-medium text-text-primary mb-2">Certificate ID Format</h3>
        <div className="text-sm text-text-secondary space-y-1">
          <p>• Format: CERT-YYYY-XXX</p>
          <p>• YYYY: Year of issue (e.g., 2024)</p>
          <p>• XXX: Sequential number (e.g., 001)</p>
          <p>• Example: CERT-2024-001</p>
        </div>
      </div>
    </div>
  );
};

export default VerificationForm;
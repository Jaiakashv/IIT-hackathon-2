import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from 'components/AppIcon';

import Breadcrumb from 'components/ui/Breadcrumb';
import AnimatedBackground from 'components/ui/AnimatedBackground';
import VerificationForm from './components/VerificationForm';
import VerificationResult from './components/VerificationResult';
import VerificationGuide from './components/VerificationGuide';

const CertificateVerification = () => {
  const [verificationResult, setVerificationResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleVerification = async (certificateId) => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock verification logic
    const mockCertificates = {
      'CERT-2024-001': {
        id: 'CERT-2024-001',
        holderName: 'Sarah Johnson',
        program: 'Full Stack Web Development Internship',
        completionDate: '2024-03-15',
        grade: 'A+',
        score: '95%',
        issueDate: '2024-03-20',
        validUntil: '2027-03-20',
        status: 'valid',
        institution: 'EduTech Platform',
        verificationCode: 'VER-789-XYZ',
        skills: ['React.js', 'Node.js', 'MongoDB', 'JavaScript', 'HTML/CSS']
      },
      'CERT-2024-002': {
        id: 'CERT-2024-002',
        holderName: 'Michael Chen',
        program: 'Data Science & Analytics Program',
        completionDate: '2024-02-28',
        grade: 'A',
        score: '88%',
        issueDate: '2024-03-05',
        validUntil: '2027-03-05',
        status: 'valid',
        institution: 'EduTech Platform',
        verificationCode: 'VER-456-ABC',
        skills: ['Python', 'Machine Learning', 'Data Visualization', 'SQL', 'Statistics']
      },
      'CERT-2023-999': {
        id: 'CERT-2023-999',
        holderName: 'Unknown',
        program: 'Unknown',
        status: 'expired',
        expiredDate: '2024-01-15'
      }
    };

    const result = mockCertificates[certificateId.toUpperCase()];
    
    if (result) {
      setVerificationResult(result);
    } else {
      setVerificationResult({
        status: 'invalid',
        message: 'Certificate not found. Please check the certificate ID and try again.'
      });
    }
    
    setIsLoading(false);
  };

  const resetVerification = () => {
    setVerificationResult(null);
  };

  return (
    <AnimatedBackground variant="gradient" className="min-h-screen">
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Breadcrumb />
          </motion.div>
          
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 max-w-5xl mx-auto"
          >
            <div className="w-24 h-24 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Icon name="Shield" size={48} color="var(--color-primary)" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
              Certificate Verification
            </h1>
            <p className="text-lg md:text-xl text-text-secondary max-w-3xl mx-auto">
              Verify the authenticity of certificates issued by Inlighn Tech. 
              Enter the certificate ID to validate credentials instantly.
            </p>
          </motion.div>

          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 xl:gap-12">
              {/* Main Verification Area */}
              <div className="xl:col-span-8 2xl:col-span-9">
                {!verificationResult ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    <VerificationForm 
                      onVerify={handleVerification}
                      isLoading={isLoading}
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="h-full"
                  >
                    <VerificationResult 
                      result={verificationResult}
                      onReset={resetVerification}
                    />
                  </motion.div>
                )}
              </div>

              {/* Sidebar */}
              <div className="xl:col-span-4 2xl:col-span-3">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="sticky top-24"
                >
                  <VerificationGuide />
                </motion.div>
              </div>
            </div>
          </div>

          {/* Security Features Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-16 max-w-5xl mx-auto"
          >
            <div className="card">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-text-primary mb-4">
                  Security & Trust Features
                </h2>
                <p className="text-text-secondary">
                  Our verification system employs multiple security layers to ensure authenticity
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-success-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name="Lock" size={24} color="var(--color-success)" />
                  </div>
                  <h3 className="font-semibold text-text-primary mb-2">Encrypted Database</h3>
                  <p className="text-sm text-text-secondary">
                    All certificate data is stored with enterprise-grade encryption
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name="Clock" size={24} color="var(--color-primary)" />
                  </div>
                  <h3 className="font-semibold text-text-primary mb-2">Real-time Validation</h3>
                  <p className="text-sm text-text-secondary">
                    Instant verification with timestamp logging for audit trails
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-accent-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name="Award" size={24} color="var(--color-accent)" />
                  </div>
                  <h3 className="font-semibold text-text-primary mb-2">Digital Signatures</h3>
                  <p className="text-sm text-text-secondary">
                    Each certificate includes unique digital signatures for authenticity
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* FAQ Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-16 max-w-4xl mx-auto"
          >
            <div className="card">
              <h2 className="text-2xl font-bold text-text-primary mb-6 text-center">
                Frequently Asked Questions
              </h2>
              
              <div className="space-y-4">
                <details className="group bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
                  <summary className="flex justify-between items-center font-medium text-gray-900 cursor-pointer">
                    <span>How do I verify a certificate?</span>
                    <Icon name="ChevronDown" className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" />
                  </summary>
                  <p className="mt-2 text-gray-600">
                    Enter the certificate ID in the verification field above and click 'Verify'. The system will check our database and display the certificate details if found.
                  </p>
                </details>

                <details className="group bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
                  <summary className="flex justify-between items-center font-medium text-gray-900 cursor-pointer">
                    <span>What information is shown in the verification results?</span>
                    <Icon name="ChevronDown" className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" />
                  </summary>
                  <p className="mt-2 text-gray-600">
                    The verification results show the certificate holder's name, program name, completion date, issue date, verification status, and any associated skills or credentials.
                  </p>
                </details>

                <details className="group bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
                  <summary className="flex justify-between items-center font-medium text-gray-900 cursor-pointer">
                    <span>What should I do if my certificate is not found?</span>
                    <Icon name="ChevronDown" className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" />
                  </summary>
                  <p className="mt-2 text-gray-600">
                    Please double-check the certificate ID for any typos. If the issue persists, contact our support team with your certificate details for assistance.
                  </p>
                </details>

                <details className="group bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
                  <summary className="flex justify-between items-center font-medium text-gray-900 cursor-pointer">
                    <span>How long does it take to verify a certificate?</span>
                    <Icon name="ChevronDown" className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" />
                  </summary>
                  <p className="mt-2 text-gray-600">
                    Verification is typically instant. However, in rare cases where manual verification is required, it may take up to 24 hours.
                  </p>
                </details>

                <details className="group bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
                  <summary className="flex justify-between items-center font-medium text-gray-900 cursor-pointer">
                    <span>Is my personal information secure during verification?</span>
                    <Icon name="ChevronDown" className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" />
                  </summary>
                  <p className="mt-2 text-gray-600">
                    Yes, we take data privacy seriously. Your personal information is protected and only the necessary details are displayed during verification.
                  </p>
                </details>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatedBackground>
  );
};

export default CertificateVerification;
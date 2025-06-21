import React from 'react';
import { motion } from 'framer-motion';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const VerificationGuide = () => {
  const steps = [
    {
      icon: 'FileText',
      title: 'Locate Certificate ID',
      description: 'Find the certificate ID on your digital certificate (format: CERT-YYYY-XXX)'
    },
    {
      icon: 'Search',
      title: 'Enter ID',
      description: 'Type the certificate ID in the verification form above'
    },
    {
      icon: 'Shield',
      title: 'Verify',
      description: 'Click verify to check the certificate authenticity instantly'
    },
    {
      icon: 'CheckCircle',
      title: 'View Results',
      description: 'Get detailed verification results with certificate information'
    }
  ];

  const tips = [
    {
      icon: 'AlertCircle',
      title: 'Case Sensitive',
      description: 'Certificate IDs are automatically converted to uppercase'
    },
    {
      icon: 'Clock',
      title: 'Instant Results',
      description: 'Verification typically takes 1-2 seconds to complete'
    },
    {
      icon: 'Download',
      title: 'Download Reports',
      description: 'Save verification reports for your records'
    },
    {
      icon: 'Share2',
      title: 'Share Results',
      description: 'Share verification results with employers or institutions'
    }
  ];

  return (
    <div className="space-y-6">
      {/* How to Verify */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="card"
      >
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="HelpCircle" size={20} color="var(--color-primary)" />
          <h3 className="text-lg font-semibold text-text-primary">How to Verify</h3>
        </div>
        
        <div className="space-y-4">
          {steps.map((step, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-primary-50 rounded-full flex items-center justify-center flex-shrink-0">
                <Icon name={step.icon} size={16} color="var(--color-primary)" />
              </div>
              <div>
                <h4 className="font-medium text-text-primary text-sm">{step.title}</h4>
                <p className="text-xs text-text-secondary mt-1">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Certificate Sample */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="card"
      >
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="Image" size={20} color="var(--color-primary)" />
          <h3 className="text-lg font-semibold text-text-primary">Certificate ID Location</h3>
        </div>
        
        <div className="relative">
          <div className="bg-gradient-to-br from-primary-50 to-secondary-50 p-4 rounded-lg border-2 border-dashed border-primary-200">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto">
                <Icon name="Award" size={24} color="white" />
              </div>
              <h4 className="font-semibold text-text-primary">Sample Certificate</h4>
              <p className="text-sm text-text-secondary">EduTech Platform</p>
              
              {/* Certificate ID highlight */}
              <div className="mt-4 p-2 bg-white rounded border-2 border-accent relative">
                <p className="text-xs text-text-secondary">Certificate ID:</p>
                <p className="font-mono font-bold text-primary">CERT-2024-001</p>
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-accent rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
          
          <div className="absolute top-2 right-2 bg-accent text-white text-xs px-2 py-1 rounded-full">
            ID Here
          </div>
        </div>
        
        <p className="text-xs text-text-secondary mt-3">
          The certificate ID is typically located in the top-right corner of your digital certificate.
        </p>
      </motion.div>

      {/* Tips & Tricks */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="card"
      >
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="Lightbulb" size={20} color="var(--color-accent)" />
          <h3 className="text-lg font-semibold text-text-primary">Tips & Tricks</h3>
        </div>
        
        <div className="space-y-3">
          {tips.map((tip, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-accent-50 rounded-full flex items-center justify-center flex-shrink-0">
                <Icon name={tip.icon} size={12} color="var(--color-accent)" />
              </div>
              <div>
                <h4 className="font-medium text-text-primary text-sm">{tip.title}</h4>
                <p className="text-xs text-text-secondary">{tip.description}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Contact Support */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="card bg-secondary-50 border border-secondary-100"
      >
        <div className="text-center">
          <div className="w-12 h-12 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <Icon name="MessageCircle" size={20} color="var(--color-secondary)" />
          </div>
          <h3 className="font-semibold text-text-primary mb-2">Need Help?</h3>
          <p className="text-sm text-text-secondary mb-4">
            Can't find your certificate ID or having verification issues?
          </p>
          <button className="btn-secondary text-sm px-4 py-2">
            Contact Support
          </button>
        </div>
      </motion.div>

      {/* Statistics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="card"
      >
        <h3 className="text-lg font-semibold text-text-primary mb-4 text-center">
          Verification Statistics
        </h3>
        
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-primary">15,847</div>
            <div className="text-xs text-text-secondary">Certificates Verified</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-success">99.9%</div>
            <div className="text-xs text-text-secondary">Uptime</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-accent">&lt;2s</div>
            <div className="text-xs text-text-secondary">Avg Response Time</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-secondary">24/7</div>
            <div className="text-xs text-text-secondary">Availability</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default VerificationGuide;
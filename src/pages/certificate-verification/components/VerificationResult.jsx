import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from 'components/AppIcon';

const VerificationResult = ({ result, onReset }) => {
  const [showDetails, setShowDetails] = useState(false);

  const getStatusConfig = () => {
    switch (result.status) {
      case 'valid':
        return {
          icon: 'CheckCircle',
          color: 'var(--color-success)',
          bgColor: 'bg-success-50',
          textColor: 'text-success',
          title: 'Certificate Valid',
          message: 'This certificate is authentic and currently valid.'
        };
      case 'expired':
        return {
          icon: 'AlertTriangle',
          color: 'var(--color-warning)',
          bgColor: 'bg-warning-50',
          textColor: 'text-warning',
          title: 'Certificate Expired',
          message: `This certificate expired on ${result.expiredDate || 'Unknown date'}.`
        };
      case 'invalid':
      default:
        return {
          icon: 'XCircle',
          color: 'var(--color-error)',
          bgColor: 'bg-error-50',
          textColor: 'text-error',
          title: 'Certificate Invalid',
          message: result.message || 'This certificate could not be verified.'
        };
    }
  };

  const statusConfig = getStatusConfig();

  const handleDownloadReport = () => {
    // Mock download functionality
    const reportData = {
      verificationDate: new Date().toISOString(),
      certificateId: result.id,
      status: result.status,
      verifiedBy: 'EduTech Verification System'
    };
    
    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `verification-report-${result.id}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleShareResults = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Certificate Verification Result',
        text: `Certificate ${result.id} verification: ${result.status}`,
        url: window.location.href
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(
        `Certificate ${result.id} verification: ${result.status}\nVerified at: ${window.location.href}`
      );
      alert('Verification details copied to clipboard!');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Status Card */}
      <div className={`card-elevated ${statusConfig.bgColor} border-l-4 border-l-current ${statusConfig.textColor}`}>
        <div className="flex items-start space-x-4">
          <div className={`w-12 h-12 ${statusConfig.bgColor} rounded-full flex items-center justify-center flex-shrink-0`}>
            <Icon name={statusConfig.icon} size={24} color={statusConfig.color} />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-text-primary mb-2">
              {statusConfig.title}
            </h3>
            <p className="text-text-secondary mb-4">
              {statusConfig.message}
            </p>
            <div className="text-sm text-text-secondary">
              <p>Verified on: {new Date().toLocaleDateString()}</p>
              <p>Verification ID: VER-{Date.now().toString().slice(-6)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Certificate Details (for valid certificates) */}
      {result.status === 'valid' && (
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-text-primary">Certificate Details</h3>
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <Icon name="Award" size={16} color="white" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-text-secondary">Certificate Holder</label>
                <p className="text-lg font-semibold text-text-primary">{result.holderName}</p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-text-secondary">Program</label>
                <p className="text-text-primary">{result.program}</p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-text-secondary">Institution</label>
                <p className="text-text-primary">{result.institution}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-text-secondary">Completion Date</label>
                <p className="text-text-primary">{new Date(result.completionDate).toLocaleDateString()}</p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-text-secondary">Grade</label>
                <p className="text-text-primary font-semibold">{result.grade} ({result.score})</p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-text-secondary">Valid Until</label>
                <p className="text-text-primary">{new Date(result.validUntil).toLocaleDateString()}</p>
              </div>
            </div>
          </div>

          {/* Skills Section */}
          {result.skills && (
            <div className="mt-6 pt-6 border-t border-border-light">
              <label className="text-sm font-medium text-text-secondary mb-3 block">Skills Acquired</label>
              <div className="flex flex-wrap gap-2">
                {result.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-primary-50 text-primary text-sm rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Toggle Details Button */}
          <div className="mt-6 pt-6 border-t border-border-light">
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="flex items-center space-x-2 text-primary hover:text-primary-600 transition-colors duration-150"
            >
              <Icon name={showDetails ? 'ChevronUp' : 'ChevronDown'} size={16} />
              <span className="text-sm font-medium">
                {showDetails ? 'Hide' : 'Show'} Additional Details
              </span>
            </button>

            {showDetails && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-4 p-4 bg-background rounded-lg space-y-2"
              >
                <div className="flex justify-between text-sm">
                  <span className="text-text-secondary">Certificate ID:</span>
                  <span className="text-text-primary font-mono">{result.id}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text-secondary">Issue Date:</span>
                  <span className="text-text-primary">{new Date(result.issueDate).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text-secondary">Verification Code:</span>
                  <span className="text-text-primary font-mono">{result.verificationCode}</span>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={onReset}
          className="flex items-center justify-center space-x-2 px-6 py-3 bg-background border border-border text-text-primary rounded-lg hover:bg-primary-50 transition-colors duration-150"
        >
          <Icon name="RotateCcw" size={16} />
          <span>Verify Another Certificate</span>
        </button>

        {result.status === 'valid' && (
          <>
            <button
              onClick={handleDownloadReport}
              className="flex items-center justify-center space-x-2 px-6 py-3 bg-secondary text-white rounded-lg hover:bg-secondary-600 transition-colors duration-150"
            >
              <Icon name="Download" size={16} />
              <span>Download Report</span>
            </button>

            <button
              onClick={handleShareResults}
              className="flex items-center justify-center space-x-2 px-6 py-3 bg-accent text-white rounded-lg hover:bg-accent-600 transition-colors duration-150"
            >
              <Icon name="Share2" size={16} />
              <span>Share Results</span>
            </button>
          </>
        )}
      </div>

      {/* Security Notice */}
      <div className="card bg-primary-50 border border-primary-100">
        <div className="flex items-start space-x-3">
          <Icon name="Shield" size={20} color="var(--color-primary)" className="flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-medium text-text-primary mb-1">Security Notice</h4>
            <p className="text-sm text-text-secondary">
              This verification was performed using our secure database. All verification 
              activities are logged for security and audit purposes. The verification 
              timestamp and IP address are recorded.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default VerificationResult;
// src/pages/programs-catalog/components/ProgramCard.jsx
import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

// Shared price formatting helper
const formatPrice = (price) => {
  if (!price) return '₹0';
  try {
    const numericValue = typeof price === 'number'
      ? price
      : parseFloat(price.toString().replace(/[^0-9.-]+/g, '')) || 0;

    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
      minimumFractionDigits: 0
    }).format(numericValue);
  } catch (error) {
    console.error('Error formatting price:', error);
    return '₹0';
  }
};

const CheckoutModal = ({ program, onClose, onConfirm }) => {
  const [couponCode, setCouponCode] = useState('');
  const [selectedPayment, setSelectedPayment] = useState('');
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [discount, setDiscount] = useState(0);
  const modalRef = useRef(null);

  const handleApplyCoupon = () => {
    if (!couponCode.trim()) return;

    setIsApplyingCoupon(true);
    setTimeout(() => {
      const code = couponCode.trim().toUpperCase();
      if (code === 'WELCOME10') {
        setDiscount(10);
      } else if (code === 'SPECIAL20') {
        setDiscount(20);
      } else {
        alert('Invalid coupon code');
      }
      setIsApplyingCoupon(false);
    }, 1000);
  };

  const calculateTotal = () => {
    const priceStr = (program?.price ?? '0').toString();
    const price = parseFloat(priceStr.replace(/[^0-9.-]+/g, '')) || 0;
    const discountAmount = (price * discount) / 100;
    return {
      subtotal: price,
      discount: discountAmount,
      total: Math.max(0, price - discountAmount)
    };
  };

  const { subtotal, discount: discountAmount, total } = calculateTotal();

  const handlePayment = () => {
    if (!selectedPayment) {
      alert('Please select a payment method');
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      onConfirm();
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div
        ref={modalRef}
        className="bg-white rounded-xl w-full max-w-md max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-100"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-5 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold text-gray-900">Complete Enrollment</h3>
            <button 
              onClick={onClose} 
              className="text-gray-400 hover:text-gray-600 transition-colors p-1 -mr-2"
              aria-label="Close"
            >
              <Icon name="X" className="w-4 h-4" />
            </button>
          </div>

          <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
            <h4 className="font-semibold text-gray-900 text-sm mb-0.5">{program.title}</h4>
            <p className="text-gray-600 text-xs line-clamp-2">{program.description}</p>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center bg-gray-50 px-3 py-2 rounded-lg">
              <span className="text-sm text-gray-600">Program Price</span>
              <span className="font-semibold text-sm text-gray-900">{formatPrice(program.price)}</span>
            </div>

            <div className="flex gap-2">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="Coupon code"
                  className={`w-full border text-sm ${discount > 0 ? 'border-green-500 bg-green-50' : 'border-gray-300'} rounded-lg px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent transition-all`}
                  disabled={discount > 0}
                />
                {discount > 0 && (
                  <div className="absolute inset-y-0 right-0 pr-2 flex items-center pointer-events-none">
                    <Icon name="CheckCircle" className="w-4 h-4 text-green-500" />
                  </div>
                )}
              </div>
              <button
                onClick={handleApplyCoupon}
                disabled={!couponCode.trim() || isApplyingCoupon || discount > 0}
                className={`whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  discount > 0 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-200 disabled:text-gray-500'
                }`}
              >
                {isApplyingCoupon ? 'Applying...' : discount > 0 ? 'Applied' : 'Apply'}
              </button>
            </div>

            {discount > 0 && (
              <div className="text-green-600 text-sm">
                {discount}% discount applied!
              </div>
            )}
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-medium text-gray-900">Payment Method</h4>
            <div className="space-y-1.5">
              {['Credit/Debit Card', 'UPI', 'Net Banking', 'Pay After Admission'].map((method) => (
                <label 
                  key={method} 
                  className={`flex items-center p-2.5 text-sm border rounded-lg cursor-pointer transition-all ${
                    selectedPayment === method 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={selectedPayment === method}
                    onChange={() => setSelectedPayment(method)}
                    className="h-3.5 w-3.5 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2.5 text-sm text-gray-700">{method}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="space-y-2 bg-gray-50 p-3 rounded-lg border border-gray-100 text-sm">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>₹{subtotal.toLocaleString('en-IN')}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Discount ({discount}%)</span>
                <span>-₹{discountAmount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              </div>
            )}
            <div className="flex justify-between items-center pt-2 border-t border-gray-200 mt-1.5">
              <span className="font-semibold text-gray-900">Total</span>
              <span className="text-lg font-bold text-gray-900">₹{total.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>
          </div>

          <button
            onClick={handlePayment}
            disabled={!selectedPayment || isProcessing}
            className={`w-full py-2.5 rounded-lg font-medium text-sm text-white transition-all ${
              isProcessing 
                ? 'bg-blue-500' 
                : 'bg-blue-600 hover:bg-blue-700 shadow hover:shadow-md'
            } disabled:opacity-70 disabled:cursor-not-allowed`}
          >
            {isProcessing ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </div>
            ) : (
              `Pay ₹${total.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

CheckoutModal.propTypes = {
  program: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

const ProgramCard = ({ program }) => {
  const [showCheckout, setShowCheckout] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [isEnrolling, setIsEnrolling] = useState(false);

  const handleEnroll = (e) => {
    e.stopPropagation();
    setIsEnrolling(true);
    setTimeout(() => {
      setShowCheckout(true);
      setIsEnrolling(false);
    }, 500);
  };

  const handleEnrollConfirm = () => {
    setIsEnrolled(true);
    setShowCheckout(false);
    setTimeout(() => {
      setIsEnrolled(false);
    }, 5000);
  };

  const getLevelColor = (level) => {
    switch (level) {
      case 'Beginner':
        return 'bg-green-100 text-green-800';
      case 'Intermediate':
        return 'bg-yellow-100 text-yellow-800';
      case 'Advanced':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  const safeProgram = {
    title: program?.title || 'Program',
    description: program?.description || '',
    price: program?.price || 0,
    ...program
  };

  return (
    <>
      {showCheckout && (
        <CheckoutModal
          program={safeProgram}
          onClose={() => setShowCheckout(false)}
          onConfirm={handleEnrollConfirm}
        />
      )}
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg h-full flex flex-col">
        <div className="relative h-40 overflow-hidden">
          <Image
            src={program.image}
            alt={program.title}
            className="object-cover w-full h-full"
          />
          <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/70 to-transparent">
            <div className="flex justify-between items-center">
              <span className={`text-xs font-medium px-2 py-1 rounded ${getLevelColor(program.level)}`}>
                {program.level || 'All Levels'}
              </span>
              <div className="flex items-center bg-white/90 rounded-full px-2 py-1">
                <Icon name="Star" className="w-4 h-4 text-yellow-500 fill-yellow-500 mr-1" />
                <span className="text-xs font-medium">{program.rating ?? 'N/A'}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 flex-1 flex flex-col">
          <div className="flex items-center text-sm text-gray-500 mb-2">
            <Icon name="BookOpen" className="w-4 h-4 mr-1" />
            <span>{program.category}</span>
            <span className="mx-2">•</span>
            <Icon name="Clock" className="w-4 h-4 mr-1" />
            <span>{program.duration}</span>
          </div>

          <h3 className="font-semibold text-lg mb-2 line-clamp-2 h-14">{program.title}</h3>
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{program.description}</p>

          <div className="flex flex-wrap gap-1 mb-4">
            {(program.skills || []).slice(0, 3).map((skill, index) => (
              <span key={index} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                {skill}
              </span>
            ))}
            {(program.skills?.length || 0) > 3 && (
              <span className="text-xs text-gray-500">
                +{program.skills.length - 3} more
              </span>
            )}
          </div>

          <div className="mt-auto pt-3 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-2">
                  <Icon name="User" className="w-4 h-4 text-gray-500" />
                </div>
                <span className="text-sm text-gray-600">{program.instructor ?? 'Instructor'}</span>
              </div>
              <div className="flex items-center">
                <Icon name="Users" className="w-4 h-4 text-gray-400 mr-1" />
                <span className="text-sm text-gray-500">{program.enrollments?.toLocaleString() ?? '0'}</span>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <div>
                <span className="text-xl font-bold text-gray-900">{formatPrice(program.price)}</span>
                {program.originalPrice && (
                  <span className="ml-2 text-sm text-gray-500 line-through">
                    {formatPrice(program.originalPrice)}
                  </span>
                )}
              </div>
              <button
                className={`${
                  isEnrolled
                    ? 'bg-green-600 hover:bg-green-700'
                    : 'bg-blue-600 hover:bg-blue-700'
                } text-white px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center justify-center min-w-[120px] ${
                  isEnrolling ? 'opacity-75 cursor-not-allowed' : ''
                }`}
                onClick={handleEnroll}
                disabled={isEnrolling || isEnrolled}
              >
                {isEnrolling ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Enrolling...
                  </>
                ) : isEnrolled ? (
                  <>
                    <Icon name="Check" className="w-4 h-4 mr-1" />
                    Enrolled!
                  </>
                ) : (
                  'Enroll Now'
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

ProgramCard.propTypes = {
  program: PropTypes.object.isRequired,
};

export default ProgramCard;

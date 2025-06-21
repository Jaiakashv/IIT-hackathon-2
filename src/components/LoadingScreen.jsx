import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

const LoadingScreen = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const animationRef = useRef();
  const startTimeRef = useRef(null);
  const totalDuration = 2000; // 2 seconds

  useEffect(() => {
    const animate = (timestamp) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      
      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / totalDuration, 1);
      
      setProgress(Math.floor(progress * 100));

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setIsComplete(true);
        setTimeout(() => {
          onLoadingComplete();
        }, 300);
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [onLoadingComplete]);

  // Animation variants for smooth transitions
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.5
      }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <motion.div 
      className="fixed inset-0 bg-white flex items-center justify-center z-50"
      variants={containerVariants}
      initial="hidden"
      animate={isComplete ? "exit" : "visible"}
    >
      <div className="w-full max-w-xs px-6">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <motion.div
            className="w-16 h-16 relative"
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{
              scale: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              },
              rotate: {
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }}
          >
            <img 
              src="/assets/images/inlighn-tech-logo.png" 
              alt="Inlighn Tech" 
              className="w-full h-full object-contain"
            />
          </motion.div>
        </div>

        {/* Progress Bar */}
        <div className="mb-2">
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>Loading</span>
            <span>{progress}%</span>
          </div>
          <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ 
                duration: 0.3,
                ease: "easeOut"
              }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
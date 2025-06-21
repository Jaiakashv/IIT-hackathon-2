// src/components/ui/AnimatedBackground.jsx
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const AnimatedBackground = ({ children, variant = 'default' }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const deltaX = (x - centerX) / centerX;
      const deltaY = (y - centerY) / centerY;
      
      const shapes = container.querySelectorAll('.floating-shape');
      shapes.forEach((shape, index) => {
        const intensity = (index + 1) * 0.1;
        const newX = deltaX * 20 * intensity;
        const newY = deltaY * 20 * intensity;
        
        shape.style.transform = `translate(${newX}px, ${newY}px) rotateX(${deltaY * 10}deg) rotateY(${deltaX * 10}deg)`;
      });
    };

    container.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const getBackgroundVariant = () => {
    switch (variant) {
      case 'gradient':
        return 'bg-gradient-to-br from-primary-50 via-background to-secondary-50';
      case 'dots':
        return 'bg-3d-pattern';
      case 'waves':
        return 'bg-gradient-to-r from-primary-100 via-accent-50 to-secondary-100';
      default:
        return 'bg-background';
    }
  };

  return (
    <div 
      ref={containerRef}
      className={`relative min-h-screen ${getBackgroundVariant()} overflow-hidden`}
    >
      {/* Floating Geometric Shapes */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="floating-shape absolute w-32 h-32 bg-primary-100 rounded-full opacity-20"
          style={{ top: '10%', left: '10%' }}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div
          className="floating-shape absolute w-24 h-24 bg-secondary-100 opacity-30"
          style={{ 
            top: '20%', 
            right: '15%',
            clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)'
          }}
          animate={{
            y: [0, 15, -10, 0],
            rotate: [0, -360],
            scale: [1, 0.9, 1.2, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div
          className="floating-shape absolute w-20 h-20 bg-accent-100 rounded-lg opacity-25"
          style={{ bottom: '20%', left: '20%' }}
          animate={{
            y: [0, -25, 10, 0],
            rotate: [0, 180, 360],
            x: [0, 10, -10, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div
          className="floating-shape absolute w-28 h-28 bg-success-100 opacity-20"
          style={{ 
            bottom: '30%', 
            right: '25%',
            clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)'
          }}
          animate={{
            y: [0, 20, -15, 0],
            rotate: [0, 270],
            scale: [1, 1.3, 0.8, 1],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div
          className="floating-shape absolute w-16 h-16 bg-error-100 rounded-full opacity-30"
          style={{ top: '60%', left: '70%' }}
          animate={{
            y: [0, -30, 5, 0],
            rotate: [0, -180, -360],
            scale: [1, 0.7, 1.4, 1],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Particle Effects */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="floating-shape absolute w-2 h-2 bg-primary rounded-full opacity-40"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -Math.random() * 100 - 50, 0],
              x: [0, Math.random() * 40 - 20, 0],
              opacity: [0.4, 0.8, 0.4],
              scale: [1, Math.random() * 2 + 0.5, 1],
            }}
            transition={{
              duration: Math.random() * 10 + 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>
      
      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <svg width="100%" height="100%" className="w-full h-full">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" className="text-primary"/>
        </svg>
      </div>
      
      {/* Main Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default AnimatedBackground;
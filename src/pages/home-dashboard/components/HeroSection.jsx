import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const HeroSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2,
        when: "beforeChildren"
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.6, 
        ease: [0.16, 1, 0.3, 1],
        type: "spring",
        damping: 12,
        stiffness: 100
      }
    }
  };

  const floatingVariants = {
    animate: {
      y: [0, -15, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <section className="relative bg-gradient-to-br from-gray-50 to-blue-50 py-20 lg:py-32 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-blue-100 opacity-30"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 20, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-indigo-100 opacity-20"
          animate={{
            scale: [1, 1.1, 1],
            x: [0, -30, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid lg:grid-cols-2 gap-16 items-center"
        >
          {/* Content */}
          <div className="text-center lg:text-left">
            <motion.div variants={itemVariants} className="mb-6">
              <span className="inline-flex items-center px-4 py-2 bg-white text-primary-600 rounded-full text-sm font-medium shadow-sm border border-gray-100">
                <Icon name="Sparkles" size={16} className="mr-2 text-yellow-500" />
                Transform Your Career Today
              </span>
              <h1 className="text-4xl lg:text-6xl font-bold text-text-primary mb-6 leading-tight">
                Launch Your
                <span className="text-primary block">Tech Career</span>
                with Expert Guidance
              </h1>
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="text-lg lg:text-xl text-text-secondary mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0"
            >
              Join thousands of students and professionals who have transformed their careers through our comprehensive internship programs. Get hands-on experience, mentorship from industry experts, and guaranteed placement assistance to kickstart your journey in technology.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                to="/programs-catalog"
                className="btn-primary inline-flex items-center justify-center space-x-2 text-lg px-8 py-4"
              >
                <Icon name="Rocket" size={20} />
                <span>Start Internship</span>
              </Link>
              
              <Link
                to="/about-us"
                className="inline-flex items-center justify-center space-x-2 px-8 py-4 border-2 border-primary text-primary rounded-lg font-medium transition-all duration-150 ease-out hover:bg-primary hover:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
              >
                <Icon name="Play" size={20} />
                <span>Learn More</span>
              </Link>
            </motion.div>

            <motion.div variants={itemVariants} className="mt-8 flex items-center justify-center lg:justify-start space-x-6 text-sm text-text-secondary">
              <div className="flex items-center space-x-2">
                <Icon name="Users" size={16} className="text-success" />
                <span>5000+ Students</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Award" size={16} className="text-accent" />
                <span>95% Placement Rate</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Star" size={16} className="text-warning" />
                <span>4.9/5 Rating</span>
              </div>
            </motion.div>
          </div>

          {/* Hero Image */}
          <motion.div
            variants={itemVariants}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80"
                alt="Students collaborating in modern workspace"
                className="w-full h-96 lg:h-[500px] object-cover"
              />
              
              {/* Floating Stats Card */}
              <div className="absolute top-6 right-6 bg-surface rounded-lg shadow-lg p-4 backdrop-blur-sm bg-opacity-95">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-success-100 rounded-full flex items-center justify-center">
                    <Icon name="TrendingUp" size={20} className="text-success" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-text-primary">Success Rate</p>
                    <p className="text-2xl font-bold text-success">98%</p>
                  </div>
                </div>
              </div>

              {/* Floating Achievement Card */}
              <div className="absolute bottom-6 left-6 bg-surface rounded-lg shadow-lg p-4 backdrop-blur-sm bg-opacity-95">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                    <Icon name="Award" size={20} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-text-primary">Certified Programs</p>
                    <p className="text-2xl font-bold text-primary">50+</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-accent opacity-20 rounded-full blur-xl"></div>
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-secondary opacity-20 rounded-full blur-xl"></div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
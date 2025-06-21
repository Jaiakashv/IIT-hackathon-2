// src/pages/about-us/index.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';
import Breadcrumb from 'components/ui/Breadcrumb';
import AnimatedBackground from 'components/ui/AnimatedBackground';
import JourneyRoadmap from './components/JourneyRoadmap';
import VisionMission from './components/VisionMission';
import AchievementsShowcase from './components/AchievementsShowcase';
import TeamGallery from './components/TeamGallery';

const AboutUs = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const heroContent = {
    title: "Empowering Futures Through Education",
    subtitle: "Building Tomorrow's Leaders Today",
    description: `At EduTech, we believe that education is the cornerstone of progress. Since our inception, we have been dedicated to bridging the gap between academic learning and industry requirements through innovative internship programs and skill development initiatives.

Our mission extends beyond traditional education – we create pathways for students and professionals to discover their potential, develop essential skills, and build successful careers in today's dynamic technological landscape.`
  };

  return (
    <AnimatedBackground variant="gradient" className="overflow-hidden">
      {/* Header Spacing */}
      <div className="h-16"></div>
      
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Breadcrumb />
        </motion.div>
        
        {/* Hero Section */}
        <motion.section 
          className="mb-20 md:mb-24"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-16 relative">
            <motion.h1 
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-text-primary mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent"
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              {heroContent.title}
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl text-text-secondary font-medium mb-8 max-w-3xl mx-auto leading-relaxed"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              {heroContent.subtitle}
            </motion.p>
            
            {/* Decorative Elements */}
            <motion.div 
              className="absolute -top-8 -left-8 w-32 h-32 rounded-full bg-primary/10 blur-3xl -z-10"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.6, 0.8, 0.6],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
            <motion.div 
              className="absolute -bottom-16 -right-16 w-40 h-40 rounded-full bg-secondary/10 blur-3xl -z-10"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.4, 0.7, 0.4],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                repeatType: "reverse",
                delay: 2
              }}
            />
          </div>
          
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ x: -30, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              <div className="prose prose-lg max-w-none text-text-secondary mb-10 space-y-6">
                {heroContent.description.split('\n\n').map((paragraph, i) => (
                  <motion.p 
                    key={i}
                    className="text-lg leading-relaxed text-text-secondary/90"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * (i + 1), duration: 0.6 }}
                  >
                    {paragraph}
                  </motion.p>
                ))}
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                >
                  <Link
                    to="/programs-catalog"
                    className="relative group inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-gradient-to-r from-primary to-primary/90 text-white font-medium shadow-lg hover:shadow-xl hover:shadow-primary/20 transition-all duration-300 overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      <Icon name="BookOpen" size={18} className="transition-transform group-hover:scale-110" />
                      <span>Explore Programs</span>
                    </span>
                    <span className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  </Link>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                >
                  <Link
                    to="/contact-faq"
                    className="group inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-white text-text-primary font-medium border-2 border-gray-200 hover:border-primary/30 hover:bg-gray-50 shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    <span className="flex items-center gap-2">
                      <Icon name="MessageCircle" size={18} className="text-primary transition-transform group-hover:scale-110" />
                      <span>Get in Touch</span>
                    </span>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
            
            <motion.div 
              className="relative"
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <motion.div 
                className="aspect-w-16 aspect-h-12 rounded-2xl overflow-hidden shadow-3d"
                whileHover={{ 
                  rotateY: 10,
                  rotateX: 5,
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
              >
                <Image
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80"
                  alt="Students collaborating in modern learning environment"
                  className="w-full h-80 object-cover"
                />
              </motion.div>
              <motion.div 
                className="absolute -bottom-6 -right-6 w-24 h-24 bg-accent rounded-full flex items-center justify-center shadow-3d"
                animate={{ 
                  rotate: [0, 360],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                  scale: { duration: 3, repeat: Infinity }
                }}
              >
                <Icon name="Users" size={32} color="white" />
              </motion.div>
            </motion.div>
          </div>
        </motion.section>

        {/* Journey Roadmap Section */}
        <JourneyRoadmap />

        {/* Vision & Mission Section */}
        <VisionMission />

        {/* Achievements Showcase */}
        <AchievementsShowcase />

        {/* Team Gallery */}
        <TeamGallery />

        {/* Call to Action Section */}
        <motion.section 
          className="bg-gradient-to-r from-primary-50 via-accent-50 to-secondary-50 rounded-2xl p-8 md:p-12 text-center relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {/* Background Animation */}
          <div className="absolute inset-0 opacity-30">
            <motion.div 
              className="absolute -top-10 -left-10 w-20 h-20 bg-primary rounded-full"
              animate={{ 
                y: [0, -20, 0],
                x: [0, 20, 0],
                rotate: [0, 360]
              }}
              transition={{ duration: 8, repeat: Infinity }}
            />
            <motion.div 
              className="absolute -bottom-10 -right-10 w-16 h-16 bg-secondary rounded-full"
              animate={{ 
                y: [0, 20, 0],
                x: [0, -20, 0],
                rotate: [0, -360]
              }}
              transition={{ duration: 10, repeat: Infinity }}
            />
          </div>
          
          <div className="max-w-3xl mx-auto relative z-10">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold text-text-primary mb-6"
              initial={{ scale: 0.8 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              Ready to Start Your Journey?
            </motion.h2>
            <p className="text-lg text-text-secondary mb-8">
              Join thousands of students and professionals who have transformed their careers through our comprehensive programs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div
                whileHover={{ scale: 1.05, rotateY: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/programs-catalog"
                  className="btn-primary inline-flex items-center justify-center space-x-2 shadow-3d"
                >
                  <Icon name="Rocket" size={20} />
                  <span>Start Learning Today</span>
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05, rotateY: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/user-authentication"
                  className="btn-accent inline-flex items-center justify-center space-x-2 shadow-3d"
                >
                  <Icon name="LogIn" size={20} />
                  <span>Join Our Community</span>
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.section>
      </div>
    </AnimatedBackground>
  );
};

export default AboutUs;
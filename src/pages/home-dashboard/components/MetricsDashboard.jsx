// src/pages/home-dashboard/components/MetricsDashboard.jsx
import React from 'react';
import { motion } from 'framer-motion';
import Icon from 'components/AppIcon';

const MetricsDashboard = () => {
  const metrics = [
    {
      id: 1,
      title: "Total Interns Enrolled",
      value: "12,500+",
      icon: "Users",
      color: "primary",
      bgColor: "bg-primary-50",
      iconColor: "text-primary",
      growth: "+23%",
      description: "Active learners this year"
    },
    {
      id: 2,
      title: "Projects Completed",
      value: "8,750",
      icon: "CheckCircle",
      color: "success",
      bgColor: "bg-success-50",
      iconColor: "text-success",
      growth: "+18%",
      description: "Real-world projects delivered"
    },
    {
      id: 3,
      title: "Student Satisfaction Rate",
      value: "96.8%",
      icon: "Heart",
      color: "accent",
      bgColor: "bg-accent-50",
      iconColor: "text-accent",
      growth: "+2.3%",
      description: "Based on 5000+ reviews"
    },
    {
      id: 4,
      title: "Top Instructors",
      value: "150+",
      icon: "Award",
      color: "secondary",
      bgColor: "bg-secondary-50",
      iconColor: "text-secondary",
      growth: "+12%",
      description: "Industry expert mentors"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, rotateX: -15 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: { 
        duration: 0.8, 
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="py-16 lg:py-20 bg-surface relative">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-100 rounded-full opacity-20 blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary-100 rounded-full opacity-20 blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center px-4 py-2 bg-primary-100 text-primary rounded-full text-sm font-medium mb-4">
            <Icon name="BarChart3" size={16} className="mr-2" />
            Our Impact
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
            Transforming Careers Worldwide
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            See how we're making a difference in the lives of students and professionals through our comprehensive programs and expert guidance.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 perspective-1000"
        >
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.id}
              variants={cardVariants}
              whileHover={{ 
                y: -15, 
                rotateX: 10, 
                rotateY: 5,
                scale: 1.05,
                transition: { duration: 0.3 } 
              }}
              className="card-3d group cursor-pointer transform-gpu"
              style={{
                transformStyle: 'preserve-3d',
                perspective: '1000px'
              }}
            >
              <div className="relative">
                {/* Glowing Effect */}
                <div className={`absolute inset-0 ${metric.bgColor} rounded-xl opacity-0 group-hover:opacity-30 transition-all duration-300 blur-xl`}></div>
                
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <motion.div 
                      className={`w-12 h-12 ${metric.bgColor} rounded-lg flex items-center justify-center relative overflow-hidden`}
                      whileHover={{ 
                        rotateY: 180,
                        transition: { duration: 0.6 }
                      }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
                      <Icon name={metric.icon} size={24} className={`${metric.iconColor} relative z-10`} />
                    </motion.div>
                    <motion.div 
                      className="flex items-center space-x-1 text-success text-sm font-medium"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: index * 0.1 + 0.5 }}
                    >
                      <Icon name="TrendingUp" size={14} />
                      <span>{metric.growth}</span>
                    </motion.div>
                  </div>

                  <div className="mb-2">
                    <motion.h3 
                      className="text-2xl lg:text-3xl font-bold text-text-primary mb-1"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 + 0.3 }}
                    >
                      {metric.value}
                    </motion.h3>
                    <p className="text-sm font-medium text-text-primary mb-1">
                      {metric.title}
                    </p>
                    <p className="text-xs text-text-secondary">
                      {metric.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-4 border-t border-border-light">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-text-secondary">This month</span>
                      <div className="flex items-center space-x-1">
                        <motion.div 
                          className={`w-2 h-2 rounded-full bg-${metric.color}`}
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        ></motion.div>
                        <span className="text-xs text-text-secondary">Active</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* 3D Shadow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/5 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none"></div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-6 text-center"
        >
          {[
            { value: "500+", label: "Partner Companies" },
            { value: "24/7", label: "Support Available" },
            { value: "15+", label: "Technology Tracks" },
            { value: "3 Months", label: "Average Program Duration" }
          ].map((stat, index) => (
            <motion.div 
              key={index}
              className="p-4 rounded-lg bg-white/50 backdrop-blur-sm border border-white/20"
              whileHover={{ 
                y: -5,
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                transition: { duration: 0.2 }
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 + 0.5, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <motion.div 
                className="text-2xl font-bold text-primary mb-1"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
              >
                {stat.value}
              </motion.div>
              <div className="text-sm text-text-secondary">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default MetricsDashboard;
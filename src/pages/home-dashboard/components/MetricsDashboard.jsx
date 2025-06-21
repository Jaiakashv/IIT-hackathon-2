// src/pages/home-dashboard/components/MetricsDashboard.jsx
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Icon from 'components/AppIcon';

const AnimatedCounter = ({ value, duration = 2000, prefix = '', suffix = '' }) => {
  const [count, setCount] = useState(0);
  const target = parseFloat(value.replace(/[^0-9.]/g, ''));
  const isPercentage = value.includes('%');
  const stepTime = 20;
  const totalSteps = duration / stepTime;
  const increment = target / totalSteps;

  useEffect(() => {
    let currentCount = 0;
    const counter = setInterval(() => {
      currentCount += increment;
      if (currentCount >= target) {
        setCount(target);
        clearInterval(counter);
      } else {
        setCount(Math.ceil(currentCount));
      }
    }, stepTime);

    return () => clearInterval(counter);
  }, [target, increment]);

  return (
    <span className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
      {prefix}
      {isPercentage ? count.toFixed(1) : count.toLocaleString()}
      {suffix}
    </span>
  );
};

const MetricCard = ({ metric, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{
      duration: 0.5,
      delay: index * 0.1,
      ease: [0.16, 1, 0.3, 1],
    }}
    whileHover={{
      y: -5,
      transition: { duration: 0.2 },
    }}
    className="p-6 rounded-2xl bg-white shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
  >
    <div className="flex items-start justify-between mb-4">
      <div className={`p-3 rounded-xl ${metric.bgColor}`}>
        <Icon name={metric.icon} size={24} className={metric.iconColor} />
      </div>
      <span
        className={`text-sm font-medium px-2.5 py-0.5 rounded-full ${metric.iconColor} ${metric.bgColor} bg-opacity-50`}
      >
        {metric.growth}
      </span>
    </div>
    <h3 className="text-lg font-semibold text-gray-800 mb-1">{metric.title}</h3>
    <div className="text-3xl font-bold text-gray-900 mb-2">
      <AnimatedCounter value={metric.value} />
    </div>
    <p className="text-sm text-gray-500">{metric.description}</p>
  </motion.div>
);

const MetricsDashboard = () => {
  const metrics = [
    {
      id: 1,
      title: 'Total Interns Enrolled',
      value: '12,500+',
      icon: 'Users',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600',
      growth: '+23%',
      description: 'Active learners this year',
    },
    {
      id: 2,
      title: 'Projects Completed',
      value: '8,750',
      icon: 'CheckCircle',
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      iconColor: 'text-emerald-600',
      growth: '+18%',
      description: 'Real-world projects delivered',
    },
    {
      id: 3,
      title: 'Satisfaction Rate',
      value: '96.8%',
      icon: 'Heart',
      color: 'text-rose-500',
      bgColor: 'bg-rose-50',
      iconColor: 'text-rose-500',
      growth: '+2.3%',
      description: 'Based on 5000+ reviews',
    },
    {
      id: 4,
      title: 'Expert Instructors',
      value: '150+',
      icon: 'Award',
      color: 'text-amber-500',
      bgColor: 'bg-amber-50',
      iconColor: 'text-amber-500',
      growth: '+12%',
      description: 'Industry expert mentors',
    },
  ];

  const stats = [
    { value: '500+', label: 'Partner Companies' },
    { value: '24/7', label: 'Support Available' },
    { value: '15+', label: 'Technology Tracks' },
    { value: '3 Months', label: 'Average Program Duration' },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-3 py-1 text-sm font-medium text-blue-600 bg-blue-50 rounded-full mb-4">
            Our Impact
          </span>
          <h2 className="text-4xl font-bold text-gray-900 sm:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
            Empowering Future Innovators
          </h2>
          <p className="mt-4 text-xl text-gray-500 max-w-2xl mx-auto">
            Join thousands of learners who have transformed their careers with our industry-leading programs
          </p>
        </motion.div>

        {/* Metric Cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric, index) => (
            <MetricCard key={metric.id} metric={metric} index={index} />
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          className="mt-16 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 md:p-12 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="p-4 rounded-lg bg-white/50 backdrop-blur-sm border border-white/20"
                whileHover={{
                  y: -5,
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                  transition: { duration: 0.2 },
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
        </motion.div>
      </div>
    </section>
  );
};

export default MetricsDashboard;

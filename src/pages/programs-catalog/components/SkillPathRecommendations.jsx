// src/pages/programs-catalog/components/SkillPathRecommendations.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from 'components/AppIcon';

const skillPaths = [
  {
    id: 'web-dev',
    title: 'Web Development',
    description: 'Become a full-stack web developer',
    icon: 'Code',
    color: 'from-blue-500 to-blue-600',
    skills: ['HTML/CSS', 'JavaScript', 'React', 'Node.js', 'Databases'],
    duration: '6 months',
    courses: 12,
    salary: '$85,000+',
    isPopular: true
  },
  {
    id: 'data-science',
    title: 'Data Science',
    description: 'Master data analysis and machine learning',
    icon: 'BarChart',
    color: 'from-purple-500 to-purple-600',
    skills: ['Python', 'Pandas', 'Machine Learning', 'SQL', 'Data Visualization'],
    duration: '8 months',
    courses: 15,
    salary: '$110,000+'
  },
  {
    id: 'mobile-dev',
    title: 'Mobile Development',
    description: 'Build cross-platform mobile apps',
    icon: 'Smartphone',
    color: 'from-green-500 to-green-600',
    skills: ['React Native', 'Flutter', 'iOS', 'Android', 'Firebase'],
    duration: '5 months',
    courses: 10,
    salary: '$95,000+'
  }
];

const SkillPathCard = ({ path, isExpanded, onClick }) => {
  return (
    <motion.div
      className={`relative overflow-hidden rounded-xl border ${
        isExpanded ? 'border-blue-400 shadow-lg' : 'border-gray-200 hover:border-gray-300'
      } bg-white transition-all duration-300`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onClick={onClick}
    >
      <div className="p-6 cursor-pointer">
        <div className="flex items-start">
          <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${path.color} flex items-center justify-center text-white mr-4`}>
            <Icon name={path.icon} size={24} />
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <h3 className="text-xl font-bold text-gray-900">{path.title}</h3>
              {path.isPopular && (
                <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                  Popular
                </span>
              )}
            </div>
            <p className="mt-1 text-gray-600">{path.description}</p>
          </div>
        </div>
        
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-6 overflow-hidden"
            >
              <div className="pt-6 border-t border-gray-100">
                <h4 className="text-sm font-medium text-gray-500 mb-3">SKILLS YOU'LL LEARN</h4>
                <div className="flex flex-wrap gap-2 mb-6">
                  {path.skills.map((skill, index) => (
                    <span 
                      key={index} 
                      className="px-3 py-1 bg-gray-50 text-gray-700 text-sm rounded-full border border-gray-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
                
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div>
                    <p className="text-sm text-gray-500">Duration</p>
                    <p className="font-medium">{path.duration}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Courses</p>
                    <p className="font-medium">{path.courses} Courses</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Avg. Salary</p>
                    <p className="font-medium text-green-600">{path.salary}</p>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center text-sm text-gray-500">
                    <Icon name="Users" size={16} className="mr-1" />
                    <span>1,200+ students enrolled</span>
                  </div>
                  <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
                    View Path
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

const SkillPathRecommendations = () => {
  const [expandedPath, setExpandedPath] = useState('web-dev');

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1 text-sm font-medium text-blue-600 bg-blue-50 rounded-full mb-4">
            Career Paths
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Find Your Perfect Career Path
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get personalized recommendations based on your interests and goals
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-4">
          {skillPaths.map((path) => (
            <SkillPathCard
              key={path.id}
              path={path}
              isExpanded={expandedPath === path.id}
              onClick={() => setExpandedPath(expandedPath === path.id ? null : path.id)}
            />
          ))}
        </div>

        <div className="mt-12 text-center">
          <button className="px-6 py-3 border border-blue-600 text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-colors">
            Explore All Career Paths
          </button>
        </div>
      </div>
    </section>
  );
};

export default SkillPathRecommendations;
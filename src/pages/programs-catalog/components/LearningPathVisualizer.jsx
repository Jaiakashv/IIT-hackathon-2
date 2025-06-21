// src/pages/programs-catalog/components/LearningPathVisualizer.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from 'components/AppIcon';

const learningPaths = {
  'web-dev': [
    {
      id: 1,
      title: 'Frontend Fundamentals',
      description: 'Learn HTML, CSS, and JavaScript basics',
      duration: '4 weeks',
      level: 'Beginner',
      courses: 3,
      completed: true
    },
    {
      id: 2,
      title: 'React Development',
      description: 'Build interactive UIs with React',
      duration: '6 weeks',
      level: 'Intermediate',
      courses: 4,
      completed: true
    },
    {
      id: 3,
      title: 'Backend with Node.js',
      description: 'Create server-side applications',
      duration: '8 weeks',
      level: 'Intermediate',
      courses: 5,
      completed: false
    },
    {
      id: 4,
      title: 'Full Stack Projects',
      description: 'Build complete web applications',
      duration: '6 weeks',
      level: 'Advanced',
      courses: 4,
      completed: false
    }
  ]
};

const PathStep = ({ step, index, isLast, isActive, onClick }) => {
  return (
    <div className="relative">
      {!isLast && (
        <div className="absolute left-5 top-10 w-0.5 h-full bg-gray-200"></div>
      )}
      <motion.div
        className="relative flex items-start group cursor-pointer"
        onClick={onClick}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.1 }}
      >
        <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
          step.completed 
            ? 'bg-green-100 text-green-600' 
            : isActive 
              ? 'bg-blue-100 text-blue-600' 
              : 'bg-gray-100 text-gray-400'
        }`}>
          {step.completed ? (
            <Icon name="Check" size={20} />
          ) : (
            <span className="font-medium">{index + 1}</span>
          )}
        </div>
        <div className={`ml-4 pb-10 ${isActive ? 'opacity-100' : 'opacity-70 group-hover:opacity-100'}`}>
          <div className="flex items-center">
            <h3 className={`text-lg font-medium ${
              step.completed ? 'text-green-600' : isActive ? 'text-blue-600' : 'text-gray-700'
            }`}>
              {step.title}
            </h3>
            <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-gray-100 text-gray-600">
              {step.level}
            </span>
          </div>
          <p className="mt-1 text-sm text-gray-500">{step.description}</p>
          <div className="mt-2 flex items-center text-sm text-gray-500">
            <Icon name="BookOpen" size={14} className="mr-1" />
            <span className="mr-4">{step.courses} courses</span>
            <Icon name="Clock" size={14} className="mr-1" />
            <span>{step.duration}</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const LearningPathVisualizer = () => {
  const [activePath, setActivePath] = useState('web-dev');
  const [activeStep, setActiveStep] = useState(0);
  const currentPath = learningPaths[activePath];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1 text-sm font-medium text-blue-600 bg-blue-50 rounded-full mb-4">
            Learning Path
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Your Web Development Journey
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Follow this structured path to become a professional web developer
          </p>
        </div>

        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="text-xl font-bold text-gray-900">Web Development Path</h3>
              <p className="text-gray-500">Master full-stack web development</p>
            </div>
            <div className="flex items-center">
              <div className="mr-4 text-right">
                <p className="text-sm text-gray-500">Progress</p>
                <p className="font-medium">
                  {Math.round((currentPath.filter(step => step.completed).length / currentPath.length) * 100)}% Complete
                </p>
              </div>
              <div className="w-12 h-12">
                <svg viewBox="0 0 36 36" className="circular-chart">
                  <path
                    className="circle-bg"
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#eee"
                    strokeWidth="3"
                  />
                  <path
                    className="circle"
                    strokeDasharray={`${(currentPath.filter(step => step.completed).length / currentPath.length) * 100}, 100`}
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="3"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            {currentPath.map((step, index) => (
              <PathStep
                key={step.id}
                step={step}
                index={index}
                isLast={index === currentPath.length - 1}
                isActive={activeStep === index}
                onClick={() => setActiveStep(index)}
              />
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-gray-100">
            <h4 className="font-medium text-gray-900 mb-3">Next Steps</h4>
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex">
                <div className="flex-shrink-0">
                  <Icon name="Lightbulb" size={20} className="text-blue-600" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-blue-700">
                    <span className="font-medium">Tip:</span> {currentPath[activeStep].courses} courses in this section. 
                    Start with the first course to begin your learning journey.
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <button className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 mr-3">
                Save for Later
              </button>
              <button className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
                Start Learning
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LearningPathVisualizer;
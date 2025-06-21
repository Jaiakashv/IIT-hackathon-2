import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from 'components/AppIcon';

const JourneyRoadmap = () => {
  const [activeStep, setActiveStep] = useState(0);

  const roadmapSteps = [
    {
      id: 1,
      title: "Discovery & Assessment",
      description: "Comprehensive skill assessment and career guidance to identify your strengths and areas for growth.",
      icon: "Search",
      duration: "Week 1-2",
      details: `Our journey begins with understanding your unique background, aspirations, and current skill level. Through detailed assessments and one-on-one consultations, we create a personalized learning path that aligns with your career goals.

We evaluate your technical skills, soft skills, and industry knowledge to ensure you're placed in the most suitable program track.`
    },
    {
      id: 2,
      title: "Skill Development",
      description: "Intensive training programs covering both technical and soft skills essential for modern workplaces.",
      icon: "BookOpen",
      duration: "Week 3-8",
      details: `Dive deep into comprehensive learning modules designed by industry experts. Our curriculum covers cutting-edge technologies, best practices, and real-world applications.

Interactive workshops, hands-on projects, and peer collaboration ensure you gain practical experience while building theoretical knowledge.`
    },
    {
      id: 3,
      title: "Project Implementation",
      description: "Real-world project experience working on industry-relevant challenges and solutions.",
      icon: "Code",
      duration: "Week 9-14",
      details: `Apply your newly acquired skills to real industry projects. Work in teams, manage deadlines, and deliver solutions that make a tangible impact.

Our project-based learning approach ensures you graduate with a portfolio of work that demonstrates your capabilities to potential employers.`
    },
    {
      id: 4,
      title: "Mentorship & Guidance",
      description: "One-on-one mentorship from industry professionals and career development support.",
      icon: "Users",
      duration: "Throughout",
      details: `Receive personalized guidance from experienced professionals who understand the industry landscape. Our mentors provide career advice, technical insights, and networking opportunities.

Regular feedback sessions and progress reviews ensure you stay on track and continuously improve your skills and professional development.`
    },
    {
      id: 5,
      title: "Industry Integration",
      description: "Seamless transition to full-time opportunities with our partner companies and organizations.",
      icon: "Briefcase",
      duration: "Week 15+",
      details: `Leverage our extensive network of industry partners for internship and job placement opportunities. Our career services team provides interview preparation, resume optimization, and job search support.

Many of our graduates receive full-time offers from companies they interned with, creating a direct pathway from education to employment.`
    }
  ];

  return (
    <section className="mb-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
          Your Learning Journey
        </h2>
        <p className="text-lg text-text-secondary max-w-3xl mx-auto">
          Our structured approach ensures every student receives comprehensive support from day one through career placement.
        </p>
      </div>

      {/* Desktop Timeline */}
      <div className="hidden lg:block">
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-border-light transform -translate-y-1/2"></div>
          <div 
            className="absolute top-1/2 left-0 h-1 bg-primary transform -translate-y-1/2 transition-all duration-500 ease-out"
            style={{ width: `${(activeStep + 1) * 20}%` }}
          ></div>

          {/* Timeline Steps */}
          <div className="relative flex justify-between items-center">
            {roadmapSteps.map((step, index) => (
              <motion.div
                key={step.id}
                className="flex flex-col items-center cursor-pointer"
                onHoverStart={() => setActiveStep(index)}
                whileHover={{ scale: 1.05 }}
              >
                {/* Step Circle */}
                <div 
                  className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-all duration-300 ${
                    index <= activeStep 
                      ? 'bg-primary text-white shadow-lg' 
                      : 'bg-surface border-2 border-border text-text-secondary'
                  }`}
                >
                  <Icon name={step.icon} size={24} />
                </div>

                {/* Step Content */}
                <div className="text-center max-w-48">
                  <h3 className="font-semibold text-text-primary mb-2">{step.title}</h3>
                  <p className="text-sm text-text-secondary mb-2">{step.description}</p>
                  <span className="text-xs text-primary font-medium">{step.duration}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Active Step Details */}
        <motion.div
          key={activeStep}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-12 bg-surface rounded-xl p-8 shadow-sm border border-border-light"
        >
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center flex-shrink-0">
              <Icon name={roadmapSteps[activeStep].icon} size={24} color="var(--color-primary)" />
            </div>
            <div>
              <h4 className="text-xl font-semibold text-text-primary mb-2">
                {roadmapSteps[activeStep].title}
              </h4>
              <p className="text-text-secondary leading-relaxed">
                {roadmapSteps[activeStep].details}
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Mobile Timeline */}
      <div className="lg:hidden space-y-6">
        {roadmapSteps.map((step, index) => (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="bg-surface rounded-xl p-6 shadow-sm border border-border-light"
          >
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon name={step.icon} size={24} color="white" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-text-primary">{step.title}</h3>
                  <span className="text-xs text-primary font-medium bg-primary-50 px-2 py-1 rounded">
                    {step.duration}
                  </span>
                </div>
                <p className="text-sm text-text-secondary mb-3">{step.description}</p>
                <details className="text-sm">
                  <summary className="font-medium text-primary cursor-pointer">Learn more</summary>
                  <p className="mt-2 text-text-secondary">{step.details}</p>
                </details>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default JourneyRoadmap;
import React from 'react';
import { motion } from 'framer-motion';
import Icon from 'components/AppIcon';

const WhyChooseUs = () => {
  const benefits = [
    {
      id: 1,
      title: "Industry-Ready Skills",
      description: "Learn cutting-edge technologies and frameworks that are in high demand in today\'s job market. Our curriculum is designed by industry experts and updated regularly.",
      icon: "Code",
      color: "primary"
    },
    {
      id: 2,
      title: "Expert Mentorship",
      description: "Get personalized guidance from experienced professionals who have worked at top tech companies. One-on-one sessions and career counseling included.",
      icon: "Users",
      color: "success"
    },
    {
      id: 3,
      title: "Real Project Experience",
      description: "Work on actual client projects and build a portfolio that showcases your skills to potential employers. Gain practical experience that matters.",
      icon: "Briefcase",
      color: "accent"
    },
    {
      id: 4,
      title: "Placement Assistance",
      description: "95% of our students get placed within 3 months of completion. We provide interview preparation, resume building, and direct connections with hiring partners.",
      icon: "Target",
      color: "secondary"
    },
    {
      id: 5,
      title: "Flexible Learning",
      description: "Choose from full-time, part-time, or weekend batches. Online and offline options available to fit your schedule and learning preferences.",
      icon: "Clock",
      color: "primary"
    },
    {
      id: 6,
      title: "Lifetime Support",
      description: "Join our alumni network and get continued support even after program completion. Access to job opportunities, skill updates, and community events.",
      icon: "Shield",
      color: "success"
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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <section className="py-16 lg:py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center px-4 py-2 bg-accent-100 text-accent rounded-full text-sm font-medium mb-4">
            <Icon name="Star" size={16} className="mr-2" />
            Why Choose Inlighn Tech
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
            Your Success is Our Priority
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            We provide everything you need to transition into a successful tech career. From expert guidance to hands-on experience, we've got you covered.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {benefits.map((benefit) => (
            <motion.div
              key={benefit.id}
              variants={cardVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="card group cursor-pointer"
            >
              <div className="mb-6">
                <div className={`w-14 h-14 bg-${benefit.color}-50 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200`}>
                  <Icon 
                    name={benefit.icon} 
                    size={28} 
                    className={`text-${benefit.color}`} 
                  />
                </div>
                <h3 className="text-xl font-semibold text-text-primary mb-3">
                  {benefit.title}
                </h3>
                <p className="text-text-secondary leading-relaxed">
                  {benefit.description}
                </p>
              </div>

              <div className="flex items-center text-primary text-sm font-medium group-hover:translate-x-2 transition-transform duration-200">
                <span>Learn more</span>
                <Icon name="ArrowRight" size={16} className="ml-2" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-8 lg:p-12 text-white">
            <h3 className="text-2xl lg:text-3xl font-bold mb-4">
              Ready to Transform Your Career?
            </h3>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
              Join thousands of successful graduates who have launched their tech careers with our comprehensive internship programs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-primary px-8 py-3 rounded-lg font-medium transition-all duration-150 ease-out hover:scale-102 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50">
                Start Your Journey
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-medium transition-all duration-150 ease-out hover:bg-white hover:text-primary focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50">
                Schedule a Call
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
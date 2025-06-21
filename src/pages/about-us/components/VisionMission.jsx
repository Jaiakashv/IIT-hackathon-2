import React from 'react';
import { motion } from 'framer-motion';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const VisionMission = () => {
  const visionMissionData = {
    vision: {
      title: "Our Vision",
      content: `To become the leading global platform that transforms lives through innovative education and skill development, creating a world where every individual has access to quality learning opportunities that unlock their full potential.

We envision a future where the gap between education and industry requirements is completely bridged, enabling seamless transitions from learning to meaningful careers.`,
      icon: "Eye",
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    },
    mission: {
      title: "Our Mission",
      content: `To provide comprehensive, industry-aligned education and internship programs that empower students and professionals with the skills, knowledge, and confidence needed to excel in today's competitive landscape.

We are committed to fostering innovation, creativity, and critical thinking while building strong partnerships with industry leaders to ensure our graduates are job-ready and future-prepared.`,
      icon: "Target",
      image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
    }
  };

  const coreValues = [
    {
      icon: "Heart",
      title: "Excellence",
      description: "We strive for the highest standards in everything we do, from curriculum design to student support."
    },
    {
      icon: "Users",
      title: "Collaboration",
      description: "We believe in the power of teamwork and building strong partnerships with students, educators, and industry."
    },
    {
      icon: "Lightbulb",
      title: "Innovation",
      description: "We continuously evolve our methods and technologies to provide cutting-edge learning experiences."
    },
    {
      icon: "Shield",
      title: "Integrity",
      description: "We maintain the highest ethical standards and transparency in all our interactions and operations."
    }
  ];

  return (
    <section className="mb-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
          Vision & Mission
        </h2>
        <p className="text-lg text-text-secondary max-w-3xl mx-auto">
          Our guiding principles that drive every decision and shape our commitment to educational excellence.
        </p>
      </div>

      {/* Vision Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="mb-12"
      >
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div className="order-2 lg:order-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center">
                <Icon name={visionMissionData.vision.icon} size={24} color="var(--color-primary)" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-text-primary">
                {visionMissionData.vision.title}
              </h3>
            </div>
            <div className="prose prose-lg max-w-none text-text-secondary">
              <p className="leading-relaxed">{visionMissionData.vision.content}</p>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <div className="relative rounded-2xl overflow-hidden shadow-lg">
              <Image
                src={visionMissionData.vision.image}
                alt="Vision - Future of education"
                className="w-full h-64 md:h-80 object-cover"
              />
              <div className="absolute inset-0 bg-primary bg-opacity-10"></div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Mission Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
        className="mb-12"
      >
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div>
            <div className="relative rounded-2xl overflow-hidden shadow-lg">
              <Image
                src={visionMissionData.mission.image}
                alt="Mission - Empowering through education"
                className="w-full h-64 md:h-80 object-cover"
              />
              <div className="absolute inset-0 bg-secondary bg-opacity-10"></div>
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-secondary-50 rounded-lg flex items-center justify-center">
                <Icon name={visionMissionData.mission.icon} size={24} color="var(--color-secondary)" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-text-primary">
                {visionMissionData.mission.title}
              </h3>
            </div>
            <div className="prose prose-lg max-w-none text-text-secondary">
              <p className="leading-relaxed">{visionMissionData.mission.content}</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Core Values */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        viewport={{ once: true }}
        className="bg-surface rounded-2xl p-8 md:p-12 shadow-sm border border-border-light"
      >
        <div className="text-center mb-8">
          <h3 className="text-2xl md:text-3xl font-bold text-text-primary mb-4">
            Our Core Values
          </h3>
          <p className="text-text-secondary max-w-2xl mx-auto">
            The fundamental principles that guide our actions and define our culture.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {coreValues.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center group"
            >
              <div className="w-16 h-16 bg-accent-50 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-accent group-hover:scale-110 transition-all duration-300">
                <Icon 
                  name={value.icon} 
                  size={24} 
                  className="text-accent group-hover:text-white transition-colors duration-300" 
                />
              </div>
              <h4 className="text-lg font-semibold text-text-primary mb-2">
                {value.title}
              </h4>
              <p className="text-sm text-text-secondary leading-relaxed">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default VisionMission;
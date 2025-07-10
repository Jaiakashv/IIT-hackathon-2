// src/pages/mentorship-community/index.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Breadcrumb from '../../components/ui/Breadcrumb';
import AnimatedBackground from '../../components/ui/AnimatedBackground';
import Icon from '../../components/AppIcon';
import MentorsList from './components/MentorsList';
import CommunityDiscussion from './components/CommunityDiscussion';

const MentorshipCommunity = () => {
  const [showMentorsList, setShowMentorsList] = useState(false);
  const heroContent = {
    title: "Mentorship & Community",
    subtitle: "Grow Together, Learn Together",
    description: `Connect with industry experts, collaborate with peers, and accelerate your learning journey through our vibrant community and mentorship programs.`
  };

  const mentorshipPrograms = [
    {
      id: 1,
      title: "1:1 Mentorship",
      description: "Get personalized guidance from industry professionals in your field of interest.",
      icon: "UserCheck",
      features: [
        "Weekly 1:1 video calls",
        "Personalized career roadmap",
        "Code reviews and feedback",
        "Interview preparation"
      ]
    },
    {
      id: 2,
      title: "Group Mentorship",
      description: "Learn in small groups with peers who share similar goals and interests.",
      icon: "Users",
      features: [
        "Small group sessions (4-6 people)",
        "Collaborative learning",
        "Peer code reviews",
        "Group projects"
      ]
    },
    {
      id: 3,
      title: "Expert Office Hours",
      description: "Drop-in sessions with industry experts to get your questions answered.",
      icon: "Clock",
      features: [
        "Live Q&A sessions",
        "Technical deep dives",
        "Career advice",
        "Industry insights"
      ]
    }
  ];

  const communityFeatures = [
    {
      id: 1,
      title: "Discussion Forums",
      description: "Engage in meaningful discussions, ask questions, and share knowledge.",
      icon: "MessageSquare"
    },
    {
      id: 2,
      title: "Study Groups",
      description: "Join or create study groups to learn together with peers.",
      icon: "Users"
    },
    {
      id: 3,
      title: "Code Challenges",
      description: "Participate in weekly coding challenges and hackathons.",
      icon: "Code"
    },
    {
      id: 4,
      title: "Project Collaboration",
      description: "Find team members for your next big project.",
      icon: "GitBranch"
    },
    {
      id: 5,
      title: "Resource Sharing",
      description: "Share and discover valuable learning resources.",
      icon: "Share2"
    },
    {
      id: 6,
      title: "Networking Events",
      description: "Connect with professionals and like-minded learners.",
      icon: "Globe"
    }
  ];

  return (
    <AnimatedBackground variant="gradient" className="overflow-hidden">
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <Breadcrumb />
          </div>
        </div>

        <section className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <motion.h1 
                className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                {heroContent.title}
              </motion.h1>
              <motion.p 
                className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                {heroContent.subtitle}
              </motion.p>
              <motion.p 
                className="text-lg text-gray-600 mb-12 max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {heroContent.description}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <button
                    onClick={() => setShowMentorsList(true)}
                    className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
                  >
                    Find a Mentor
                    <Icon name="Search" className="ml-2" />
                  </button>
                  <Link
                    to="/mentorship-community#join"
                    className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 transition-colors duration-200"
                  >
                    Join Community
                    <Icon name="Users" className="ml-2" />
                  </Link>
                </div>
                
                {showMentorsList && (
                  <MentorsList onClose={() => setShowMentorsList(false)} />
                )}
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900">Mentorship Programs</h2>
              <p className="mt-3 text-lg text-gray-500">Choose the mentorship program that fits your needs</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {mentorshipPrograms.map((program, index) => (
                <motion.div
                  key={program.id}
                  className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <div className="p-6">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                      <Icon name={program.icon} size={24} className="text-blue-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{program.title}</h3>
                    <p className="text-gray-600 mb-4">{program.description}</p>
                    <ul className="space-y-2 mb-6">
                      {program.features.map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <Icon name="CheckCircle" size={16} className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                          <span className="text-gray-600">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <button className="w-full py-2 px-4 border border-blue-600 text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors">
                      Learn More
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900">Community Features</h2>
              <p className="mt-3 text-lg text-gray-500">Connect, collaborate, and grow with our community</p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {communityFeatures.map((feature, index) => (
                <motion.div
                  key={feature.id}
                  className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  whileHover={{ scale: 1.02, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
                >
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <Icon name={feature.icon} size={20} className="text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              ))}
            </div>

            <div className="mt-16 text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to join our community?</h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Become part of a growing community of learners and professionals. Share knowledge, collaborate on projects, and grow together.
              </p>
              <button className="px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
                Join Now - It's Free!
              </button>
            </div>
          </div>
        </section>
      </main>
      
      {/* Community Discussion Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <CommunityDiscussion />
        </div>
      </div>
    </AnimatedBackground>
  );
};

export default MentorshipCommunity;
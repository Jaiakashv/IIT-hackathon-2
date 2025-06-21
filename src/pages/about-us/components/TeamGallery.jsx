import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const TeamGallery = () => {
  const [activeCategory, setActiveCategory] = useState('leadership');

  const teamCategories = [
    { id: 'leadership', label: 'Leadership', icon: 'Crown' },
    { id: 'instructors', label: 'Instructors', icon: 'Users' },
    { id: 'support', label: 'Support Team', icon: 'HeadphonesIcon' }
  ];

  const teamMembers = {
    leadership: [
      {
        id: 1,
        name: "Dr. Sarah Johnson",
        position: "Chief Executive Officer",
        bio: "15+ years in educational technology with a PhD in Computer Science from MIT. Previously led digital transformation at Fortune 500 companies.",
        image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
        linkedin: "#",
        twitter: "#"
      },
      {
        id: 2,
        name: "Michael Chen",
        position: "Chief Technology Officer",
        bio: "Former Google engineer with expertise in scalable systems and AI. Passionate about leveraging technology to enhance learning experiences.",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        linkedin: "#",
        twitter: "#"
      },
      {
        id: 3,
        name: "Emily Rodriguez",
        position: "Head of Academic Affairs",
        bio: "Educational psychologist with 12 years of curriculum development experience. Specializes in creating engaging and effective learning pathways.",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        linkedin: "#",
        twitter: "#"
      }
    ],
    instructors: [
      {
        id: 4,
        name: "David Kumar",
        position: "Senior Full-Stack Instructor",
        bio: "10+ years of industry experience at startups and tech giants. Expert in React, Node.js, and cloud technologies.",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
        linkedin: "#",
        twitter: "#"
      },
      {
        id: 5,
        name: "Lisa Thompson",
        position: "Data Science Instructor",
        bio: "PhD in Statistics with experience at leading research institutions. Specializes in machine learning and data visualization.",
        image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=761&q=80",
        linkedin: "#",
        twitter: "#"
      },
      {
        id: 6,
        name: "James Wilson",
        position: "UX/UI Design Instructor",
        bio: "Award-winning designer with 8 years at top design agencies. Expert in user research, prototyping, and design systems.",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
        linkedin: "#",
        twitter: "#"
      }
    ],
    support: [
      {
        id: 7,
        name: "Anna Martinez",
        position: "Student Success Manager",
        bio: "Dedicated to ensuring every student achieves their goals. 6 years of experience in educational support and career counseling.",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80",
        linkedin: "#",
        twitter: "#"
      },
      {
        id: 8,
        name: "Robert Taylor",
        position: "Technical Support Lead",
        bio: "Ensures smooth technical operations and provides 24/7 support to students. Expert in troubleshooting and system optimization.",
        image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
        linkedin: "#",
        twitter: "#"
      }
    ]
  };

  const facilities = [
    {
      title: "Modern Learning Spaces",
      description: "State-of-the-art classrooms equipped with the latest technology",
      image: "https://images.unsplash.com/photo-1497486751825-1233686d5d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
    },
    {
      title: "Collaboration Hubs",
      description: "Open spaces designed for teamwork and creative problem-solving",
      image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
    },
    {
      title: "Innovation Labs",
      description: "Dedicated spaces for hands-on projects and experimentation",
      image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
    }
  ];

  return (
    <section className="mb-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
          Meet Our Team
        </h2>
        <p className="text-lg text-text-secondary max-w-3xl mx-auto">
          Passionate educators, industry experts, and support professionals dedicated to your success.
        </p>
      </div>

      {/* Team Category Tabs */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {teamCategories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
              activeCategory === category.id
                ? 'bg-primary text-white shadow-md'
                : 'bg-surface text-text-primary hover:bg-primary-50 border border-border-light'
            }`}
          >
            <Icon name={category.icon} size={20} />
            <span>{category.label}</span>
          </button>
        ))}
      </div>

      {/* Team Members Grid */}
      <motion.div
        key={activeCategory}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
      >
        {teamMembers[activeCategory].map((member, index) => (
          <motion.div
            key={member.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-surface rounded-xl p-6 shadow-sm border border-border-light hover:shadow-md transition-all duration-300 group"
          >
            <div className="text-center">
              <div className="relative mb-4">
                <div className="w-24 h-24 mx-auto rounded-full overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
              </div>
              
              <h3 className="text-xl font-semibold text-text-primary mb-1">
                {member.name}
              </h3>
              <p className="text-primary font-medium mb-3">
                {member.position}
              </p>
              <p className="text-sm text-text-secondary leading-relaxed mb-4">
                {member.bio}
              </p>
              
              <div className="flex justify-center space-x-3">
                <a
                  href={member.linkedin}
                  className="w-8 h-8 bg-primary-50 rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all duration-300"
                >
                  <Icon name="Linkedin" size={16} />
                </a>
                <a
                  href={member.twitter}
                  className="w-8 h-8 bg-primary-50 rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all duration-300"
                >
                  <Icon name="Twitter" size={16} />
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Facilities Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="text-center mb-8">
          <h3 className="text-2xl md:text-3xl font-bold text-text-primary mb-4">
            Our Facilities
          </h3>
          <p className="text-text-secondary max-w-2xl mx-auto">
            World-class infrastructure designed to provide the best learning environment for our students.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {facilities.map((facility, index) => (
            <motion.div
              key={facility.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="relative rounded-xl overflow-hidden mb-4">
                <Image
                  src={facility.image}
                  alt={facility.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-10 transition-all duration-300"></div>
              </div>
              <h4 className="text-lg font-semibold text-text-primary mb-2">
                {facility.title}
              </h4>
              <p className="text-text-secondary text-sm">
                {facility.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default TeamGallery;
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from 'components/AppIcon';
import MentorRequestModal from './MentorRequestModal';

const mentors = [
  {
    id: 1,
    name: 'Alex Johnson',
    role: 'Senior Full Stack Developer',
    company: 'TechCorp',
    experience: '8+ years',
    expertise: ['React', 'Node.js', 'AWS'],
    rating: 4.9,
    sessions: 245,
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    available: true
  },
  {
    id: 2,
    name: 'Sarah Williams',
    role: 'Lead UI/UX Designer',
    company: 'DesignHub',
    experience: '6+ years',
    expertise: ['Figma', 'UI/UX', 'Prototyping'],
    rating: 4.8,
    sessions: 189,
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    available: true
  },
  {
    id: 3,
    name: 'Michael Chen',
    role: 'Data Science Lead',
    company: 'DataInsights',
    experience: '7+ years',
    expertise: ['Python', 'Machine Learning', 'TensorFlow'],
    rating: 4.7,
    sessions: 156,
    avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
    available: false
  },
];

const MentorsList = ({ onClose }) => {
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [expertiseFilter, setExpertiseFilter] = useState('all');

  const handleRequestMentor = (mentor) => {
    setSelectedMentor(mentor);
    setShowRequestModal(true);
  };

  const filteredMentors = mentors.filter(mentor => {
    const matchesSearch = mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       mentor.role.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesExpertise = expertiseFilter === 'all' || 
                           mentor.expertise.some(skill => 
                             skill.toLowerCase().includes(expertiseFilter.toLowerCase())
                           );
    return matchesSearch && matchesExpertise && mentor.available;
  });

  const allExpertise = [...new Set(mentors.flatMap(mentor => mentor.expertise))];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <motion.div 
        className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
      >
        <div className="sticky top-0 bg-white z-10 p-6 border-b">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-2xl font-bold text-gray-900">Available Mentors</h3>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <Icon name="X" size={24} />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Icon name="Search" className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search mentors..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <select
              className="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={expertiseFilter}
              onChange={(e) => setExpertiseFilter(e.target.value)}
            >
              <option value="all">All Expertise</option>
              {allExpertise.map((skill) => (
                <option key={skill} value={skill}>{skill}</option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="p-6 space-y-6">
          {filteredMentors.length > 0 ? (
            filteredMentors.map((mentor) => (
              <div 
                key={mentor.id} 
                className="flex flex-col md:flex-row items-center p-6 border rounded-xl hover:shadow-md transition-shadow"
              >
                <div className="w-24 h-24 rounded-full overflow-hidden mb-4 md:mb-0 md:mr-6 border-4 border-blue-100">
                  <img 
                    src={mentor.avatar} 
                    alt={mentor.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="flex-1 w-full">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                      <h4 className="text-xl font-semibold text-gray-900">{mentor.name}</h4>
                      <p className="text-gray-600">{mentor.role} at {mentor.company}</p>
                    </div>
                    <div className="flex items-center mt-2 md:mt-0">
                      <div className="flex items-center bg-yellow-50 px-3 py-1 rounded-full">
                        <Icon name="Star" className="text-yellow-400 mr-1" />
                        <span className="text-yellow-700 font-medium">{mentor.rating}</span>
                      </div>
                      <span className="mx-2 text-gray-300">•</span>
                      <span className="text-sm text-gray-500">{mentor.sessions} sessions</span>
                    </div>
                  </div>
                  
                  <div className="mt-3 flex flex-wrap gap-2">
                    {mentor.expertise.map((skill) => (
                      <span 
                        key={skill}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                  
                  <div className="mt-4 flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={() => handleRequestMentor(mentor)}
                      className="flex-1 flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      <Icon name="Video" className="mr-2" />
                      Request 1:1 Session
                    </button>
                    <button className="flex-1 flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                      <Icon name="MessageSquare" className="mr-2" />
                      Send Message
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <Icon name="Users" className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-lg font-medium text-gray-900">No mentors found</h3>
              <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filter criteria.</p>
              <div className="mt-6">
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setExpertiseFilter('all');
                  }}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Reset filters
                </button>
              </div>
            </div>
          )}
        </div>
      </motion.div>

      {showRequestModal && selectedMentor && (
        <MentorRequestModal
          mentor={selectedMentor}
          onClose={() => setShowRequestModal(false)}
        />
      )}
    </div>
  );
};

export default MentorsList;
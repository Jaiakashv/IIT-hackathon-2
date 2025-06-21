// src/pages/home-dashboard/components/UpcomingEvents.jsx
import React from 'react';
import { motion } from 'framer-motion';
import Icon from 'components/AppIcon';

const events = [
  {
    id: 1,
    title: "Introduction to Web Development",
    date: "2025-06-25",
    time: "14:00",
    duration: "1 hour",
    speaker: "Alex Johnson",
    category: "Web Development",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f456dfb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
  },
  {
    id: 2,
    title: "Data Science Fundamentals",
    date: "2025-06-28",
    time: "15:30",
    duration: "1.5 hours",
    speaker: "Sarah Williams",
    category: "Data Science",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
  },
  {
    id: 3,
    title: "UI/UX Design Workshop",
    date: "2025-07-02",
    time: "13:00",
    duration: "2 hours",
    speaker: "Michael Chen",
    category: "Design",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
  }
];

const UpcomingEvents = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Upcoming Webinars & Events</h2>
          <p className="mt-3 text-lg text-gray-500">Join our live sessions and interactive workshops</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="h-48 bg-gray-200 relative">
                <img 
                  src={event.image} 
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-medium">
                  {event.category}
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <Icon name="Calendar" size={16} className="mr-1" />
                  {new Date(event.date).toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric', 
                    year: 'numeric' 
                  })}
                  <span className="mx-2">•</span>
                  <Icon name="Clock" size={16} className="mr-1" />
                  {event.time} ({event.duration})
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{event.title}</h3>
                <div className="flex items-center text-sm text-gray-600 mb-4">
                  <Icon name="User" size={16} className="mr-1 text-gray-400" />
                  Hosted by {event.speaker}
                </div>
                <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                  Register Now
                </button>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <button className="px-6 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
            View All Events
          </button>
        </div>
      </div>
    </section>
  );
};

export default UpcomingEvents;
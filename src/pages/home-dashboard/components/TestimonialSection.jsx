import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const TestimonialSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Full Stack Developer",
      company: "Google",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
      content: `The internship program at Inlighn Tech completely transformed my career. I went from having zero coding experience to landing a job at Google within 6 months. The mentors were incredible, and the hands-on projects gave me the confidence I needed to succeed in interviews.`,
      program: "Full Stack Development",
      rating: 5,
      duration: "6 months ago"
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Data Scientist",
      company: "Microsoft",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
      content: `Inlighn Tech's Data Science program exceeded all my expectations. The curriculum was cutting-edge, covering everything from machine learning to deep learning. The real-world projects and industry connections helped me secure my dream job at Microsoft.`,
      program: "Data Science & AI",
      rating: 5,
      duration: "4 months ago"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "UX Designer",
      company: "Apple",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      content: `The UX Design internship was a game-changer for me. I learned not just the technical skills but also how to think like a designer. The portfolio I built during the program directly led to my job offer at Apple. Forever grateful!`,
      program: "UX/UI Design",
      rating: 5,
      duration: "8 months ago"
    },
    {
      id: 4,
      name: "David Kumar",
      role: "DevOps Engineer",
      company: "Amazon",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      content: `Inlighn Tech's DevOps program gave me hands-on experience with AWS, Docker, and Kubernetes. The instructors were industry veterans who shared real-world insights. I'm now working at Amazon, managing cloud infrastructure at scale.`,
      program: "DevOps & Cloud",
      rating: 5,
      duration: "3 months ago"
    },
    {
      id: 5,
      name: "Lisa Thompson",
      role: "Mobile Developer",
      company: "Spotify",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80",
      content: `The Mobile Development track was exactly what I needed to transition from web development. Learning React Native and Flutter opened up so many opportunities. The career support team helped me land my role at Spotify.`,
      program: "Mobile Development",
      rating: 5,
      duration: "5 months ago"
    }
  ];

  // Auto-rotate testimonials
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials.length]);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="py-16 lg:py-20 bg-gradient-to-br from-primary-50 to-secondary-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center px-4 py-2 bg-success-100 text-success rounded-full text-sm font-medium mb-4">
            <Icon name="MessageSquare" size={16} className="mr-2" />
            Student Success Stories
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
            What Our Students Say
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Hear from our successful graduates who have transformed their careers and landed jobs at top tech companies.
          </p>
        </motion.div>

        <div className="relative">
          {/* Main Testimonial Card */}
          <div 
            className="relative bg-surface rounded-2xl shadow-2xl p-8 lg:p-12 mx-auto max-w-4xl"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="text-center"
              >
                {/* Quote Icon */}
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Icon name="Quote" size={32} className="text-primary" />
                </div>

                {/* Rating */}
                <div className="flex justify-center mb-6">
                  {[...Array(currentTestimonial.rating)].map((_, i) => (
                    <Icon key={i} name="Star" size={20} className="text-warning fill-current" />
                  ))}
                </div>

                {/* Testimonial Content */}
                <blockquote className="text-lg lg:text-xl text-text-primary leading-relaxed mb-8 max-w-3xl mx-auto">
                  "{currentTestimonial.content}"
                </blockquote>

                {/* Author Info */}
                <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                  <div className="relative">
                    <Image
                      src={currentTestimonial.image}
                      alt={currentTestimonial.name}
                      className="w-16 h-16 rounded-full object-cover border-4 border-primary-100"
                    />
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-success rounded-full border-2 border-surface flex items-center justify-center">
                      <Icon name="Check" size={12} className="text-white" />
                    </div>
                  </div>
                  
                  <div className="text-center sm:text-left">
                    <h4 className="text-lg font-semibold text-text-primary">
                      {currentTestimonial.name}
                    </h4>
                    <p className="text-text-secondary">
                      {currentTestimonial.role} at {currentTestimonial.company}
                    </p>
                    <div className="flex items-center justify-center sm:justify-start space-x-4 mt-2 text-sm text-text-secondary">
                      <span className="flex items-center space-x-1">
                        <Icon name="BookOpen" size={14} />
                        <span>{currentTestimonial.program}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Icon name="Clock" size={14} />
                        <span>{currentTestimonial.duration}</span>
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <button
              onClick={prevTestimonial}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-surface border border-border rounded-full flex items-center justify-center text-text-secondary hover:text-primary hover:border-primary transition-all duration-200 shadow-md"
              aria-label="Previous testimonial"
            >
              <Icon name="ChevronLeft" size={20} />
            </button>
            
            <button
              onClick={nextTestimonial}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-surface border border-border rounded-full flex items-center justify-center text-text-secondary hover:text-primary hover:border-primary transition-all duration-200 shadow-md"
              aria-label="Next testimonial"
            >
              <Icon name="ChevronRight" size={20} />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  index === currentIndex 
                    ? 'bg-primary scale-125' :'bg-border hover:bg-primary-300'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          {/* Thumbnail Navigation (Desktop) */}
          <div className="hidden lg:flex justify-center mt-8 space-x-4">
            {testimonials.map((testimonial, index) => (
              <button
                key={testimonial.id}
                onClick={() => goToSlide(index)}
                className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 ${
                  index === currentIndex
                    ? 'bg-primary-100 border-2 border-primary' :'bg-surface border border-border hover:border-primary-300'
                }`}
              >
                <Image
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="text-left">
                  <p className="text-sm font-medium text-text-primary">
                    {testimonial.name}
                  </p>
                  <p className="text-xs text-text-secondary">
                    {testimonial.company}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
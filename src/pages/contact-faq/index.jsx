import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from 'components/AppIcon';

import Breadcrumb from 'components/ui/Breadcrumb';
import AnimatedBackground from 'components/ui/AnimatedBackground';

const ContactFaq = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    inquiryType: '',
    message: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showLiveChat, setShowLiveChat] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your virtual assistant. How can I help you today?",
      sender: 'agent',
      timestamp: new Date(),
      status: 'delivered'
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [chatStatus, setChatStatus] = useState('online'); // online, away, offline
  
  // Common questions and bot responses
  const botResponses = {
    greeting: [
      "Hello! I'm EduBot, your virtual assistant. How can I help you today?",
      "Hi there! I'm here to assist you with any questions about our programs and services.",
      "Welcome! How can I help you with your educational journey today?"
    ],
    programs: [
      "We offer a variety of programs in technology, business, and creative fields. You can browse all programs in our Programs section.",
      "Our programs range from short-term certifications to comprehensive career tracks. What specific field are you interested in?"
    ],
    pricing: [
      "Our program fees vary based on the course duration and content. Most programs offer flexible payment options. Would you like to know about a specific program?",
      "We have various pricing options including one-time payments and installment plans. Some programs also offer scholarships."
    ],
    contact: [
      "You can reach our support team at support@edutech.com or call us at +91 93688 42663. Our team is available Monday to Saturday, 9 AM to 7 PM IST.",
      "Feel free to email us at support@edutech.com or fill out the contact form on our website for assistance."
    ],
    certificate: [
      "You can verify your certificate by visiting the Verify Certificate page. You'll need your certificate ID which can be found at the bottom of your certificate.",
      "To verify a certificate, go to the Verify Certificate section and enter the certificate ID. Need help finding your certificate ID?"
    ],
    default: [
      "I'm sorry, I didn't understand that. Could you please rephrase your question?",
      "I'm still learning! Could you try asking that in a different way?",
      "I want to make sure I help you correctly. Could you provide more details about your question?"
    ]
  };

  // Quick reply suggestions
  const quickReplies = [
    { text: "What programs do you offer?", type: "programs" },
    { text: "How much do courses cost?", type: "pricing" },
    { text: "How can I contact support?", type: "contact" },
    { text: "How do I verify my certificate?", type: "certificate" }
  ];

  // Process user message and generate bot response
  const processUserMessage = (userMessage) => {
    const message = userMessage.toLowerCase().trim();
    let responseType = 'default';

    // Simple keyword matching for demo purposes
    if (/(hi|hello|hey|greeting)/i.test(message)) {
      responseType = 'greeting';
    } else if (/(program|course|learn|study)/i.test(message)) {
      responseType = 'programs';
    } else if (/(price|cost|fee|payment|installment)/i.test(message)) {
      responseType = 'pricing';
    } else if (/(contact|support|help|assistance)/i.test(message)) {
      responseType = 'contact';
    } else if (/(certificate|verify|validation)/i.test(message)) {
      responseType = 'certificate';
    }

    const possibleResponses = botResponses[responseType] || botResponses.default;
    return possibleResponses[Math.floor(Math.random() * possibleResponses.length)];
  };

  const faqData = [
    {
      id: 1,
      category: 'Admissions',
      icon: 'UserPlus',
      question: 'What are the eligibility criteria for internship programs?',
      answer: `To be eligible for our internship programs, candidates must meet the following requirements:

• Currently enrolled in a bachelor's or master's degree program, or recent graduates (within 6 months)
• Minimum GPA of 3.0 or equivalent academic standing
• Basic knowledge of relevant programming languages or technical skills for tech internships
• Strong communication skills and ability to work in a team environment
• Commitment to complete the full duration of the internship program

For specific program requirements, please check individual program descriptions or contact our admissions team.`
    },
    {
      id: 2,
      category: 'Programs',
      icon: 'BookOpen',
      question: 'How long do the internship programs typically last?',
      answer: `Our internship programs are designed with flexible durations to accommodate different learning needs:

• Short-term programs: 4-8 weeks (intensive skill-building focus)
• Standard programs: 3-6 months (comprehensive learning experience)
• Extended programs: 6-12 months (in-depth industry exposure)

Each program includes structured learning modules, hands-on projects, mentorship sessions, and performance evaluations. The duration depends on the specific track you choose and your availability.`
    },
    {
      id: 3,
      category: 'Certificates',
      icon: 'Award',
      question: 'How can I verify my certificate authenticity?',
      answer: `Certificate verification is simple and secure through our digital verification system:

• Visit our Certificate Verification page
• Enter your certificate ID or registration number
• Provide your full name as it appears on the certificate
• The system will instantly validate and display certificate details

All certificates include QR codes for quick mobile verification. Employers can also verify certificates directly through our corporate verification portal.`
    },
    {
      id: 4,
      category: 'Technical',
      icon: 'Settings',
      question: 'What technical requirements do I need for online programs?',
      answer: `To ensure optimal learning experience, please ensure you have:

• Stable internet connection (minimum 10 Mbps recommended)
• Modern web browser (Chrome, Firefox, Safari, or Edge - latest versions)
• Computer or laptop with at least 4GB RAM
• Webcam and microphone for interactive sessions
• Access to required software tools (provided during program orientation)

Our platform is optimized for both desktop and mobile devices. Technical support is available 24/7 to assist with any setup issues.`
    },
    {
      id: 5,
      category: 'Admissions',
      icon: 'UserPlus',
      question: 'When do applications open for the next batch?',
      answer: `We offer multiple intake periods throughout the year to provide maximum flexibility:

• Spring Intake: Applications open January 1st, programs start March 1st
• Summer Intake: Applications open April 1st, programs start June 1st
• Fall Intake: Applications open July 1st, programs start September 1st
• Winter Intake: Applications open October 1st, programs start December 1st

Early applications are encouraged as seats are limited. Priority consideration is given to applications submitted within the first two weeks of each application period.`
    },
    {
      id: 6,
      category: 'Programs',
      icon: 'BookOpen',
      question: 'Do you provide placement assistance after program completion?',
      answer: `Yes, we offer comprehensive career support services to all program graduates:

• Dedicated placement assistance team with industry connections
• Resume building and interview preparation workshops
• Mock interview sessions with industry professionals
• Access to exclusive job portal with partner companies
• Networking events and career fairs
• Alumni mentorship program for ongoing career guidance

Our placement success rate is over 85% within 6 months of program completion. We maintain partnerships with 200+ companies across various industries.`
    }
  ];

  const contactChannels = [
    {
      id: 1,
      type: 'Phone',
      icon: 'Phone',
      title: 'Call Us',
      primary: '+91 93688 42663',
      secondary: '',
      description: 'Mon-Sat: 9:00 AM - 7:00 PM IST',
      responseTime: 'Immediate'
    },
    {
      id: 2,
      type: 'Email',
      icon: 'Mail',
      title: 'Email Support',
      primary: 'info@inlighntech.com',
      secondary: 'support@inlighntech.com',
      description: 'General inquiries and support',
      responseTime: 'Within 24 hours'
    },
    {
      id: 3,
      type: 'Address',
      icon: 'MapPin',
      title: 'Corporate Office',
      primary: 'Office No: VO-301, WeWork Prestige Central',
      secondary: 'Ground Floor, 36, Infantry Rd, Tasker Town, Shivaji Nagar',
      description: 'Bengaluru, Karnataka 560001',
      responseTime: 'Walk-ins welcome by appointment'
    },
    {
      id: 4,
      type: 'Chat',
      icon: 'MessageCircle',
      title: 'Live Chat',
      primary: 'Available 24/7',
      secondary: 'Instant messaging support',
      description: 'Quick answers to common questions',
      responseTime: 'Within 5 minutes'
    }
  ];

  const socialMedia = [
    {
      platform: 'LinkedIn',
      icon: 'Linkedin',
      url: 'https://linkedin.com/company/edutech',
      followers: '25.4K',
      activity: 'Posted 2 hours ago'
    },
    {
      platform: 'Twitter',
      icon: 'Twitter',
      url: 'https://twitter.com/edutech',
      followers: '18.2K',
      activity: 'Posted 4 hours ago'
    },
    {
      platform: 'Facebook',
      icon: 'Facebook',
      url: 'https://facebook.com/edutech',
      followers: '32.1K',
      activity: 'Posted 1 day ago'
    },
    {
      platform: 'Instagram',
      icon: 'Instagram',
      url: 'https://instagram.com/edutech',
      followers: '15.8K',
      activity: 'Posted 3 hours ago'
    },
    {
      platform: 'YouTube',
      icon: 'Youtube',
      url: 'https://youtube.com/edutech',
      followers: '42.3K',
      activity: 'New video yesterday'
    }
  ];

  const inquiryTypes = [
    { value: 'general', label: 'General Inquiry' },
    { value: 'admissions', label: 'Admissions' },
    { value: 'programs', label: 'Program Information' },
    { value: 'technical', label: 'Technical Support' },
    { value: 'certificates', label: 'Certificate Verification' },
    { value: 'partnerships', label: 'Partnership Opportunities' }
  ];

  const filteredFaqs = faqData.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleFaq = (faqId) => {
    setExpandedFaq(expandedFaq === faqId ? null : faqId);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContactForm(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!contactForm.name.trim()) {
      errors.name = 'Name is required';
    }
    
    if (!contactForm.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(contactForm.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    if (!contactForm.subject.trim()) {
      errors.subject = 'Subject is required';
    }
    
    if (!contactForm.inquiryType) {
      errors.inquiryType = 'Please select an inquiry type';
    }
    
    if (!contactForm.message.trim()) {
      errors.message = 'Message is required';
    } else if (contactForm.message.trim().length < 10) {
      errors.message = 'Message must be at least 10 characters long';
    }
    
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      alert('Thank you for your message! We will get back to you within 24 hours.');
      setContactForm({
        name: '',
        email: '',
        subject: '',
        inquiryType: '',
        message: ''
      });
      setFormErrors({});
      setIsSubmitting(false);
    }, 2000);
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Admissions': 'bg-blue-50 text-blue-700 border-blue-200',
      'Programs': 'bg-green-50 text-green-700 border-green-200',
      'Certificates': 'bg-purple-50 text-purple-700 border-purple-200',
      'Technical': 'bg-orange-50 text-orange-700 border-orange-200'
    };
    return colors[category] || 'bg-gray-50 text-gray-700 border-gray-200';
  };

  return (
    <AnimatedBackground variant="gradient" className="min-h-screen relative">
      {/* Chat Widget */}
      <div className="fixed bottom-6 right-6 z-[1000] shadow-2xl rounded-full">
        <button
          onClick={() => setShowLiveChat(!showLiveChat)}
          className={`w-16 h-16 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 flex items-center justify-center relative ${
            chatStatus === 'online' ? 'bg-gradient-to-br from-primary to-primary-600' : 
            chatStatus === 'away' ? 'bg-gradient-to-br from-amber-500 to-amber-600' : 
            'bg-gradient-to-br from-gray-500 to-gray-600'
          } text-white animate-bounce`}
          style={{
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2)'
          }}
          aria-label="Need help? Chat with us"
        >
          {chatStatus === 'online' && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-pulse"></span>
          )}
          <div className="relative">
            <Icon 
              name={
                showLiveChat ? "X" : 
                chatStatus === 'away' ? "Clock" : 
                chatStatus === 'offline' ? "MessageSquare" : 
                "MessageCircle"
              } 
              size={28} 
            />
            {!showLiveChat && (
              <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                <span>!</span>
              </div>
            )}
          </div>
        </button>

        {showLiveChat && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="absolute bottom-20 right-0 w-80 bg-white rounded-lg shadow-modal border border-gray-200 overflow-hidden flex flex-col"
            style={{ maxHeight: '80vh' }}
          >
            {/* Chat Header */}
            <div className={`p-4 text-white flex justify-between items-center ${
              chatStatus === 'online' ? 'bg-primary' : 
              chatStatus === 'away' ? 'bg-amber-500' : 'bg-gray-500'
            }`}>
              <div>
                <h3 className="font-semibold">Live Chat Support</h3>
                <p className="text-xs opacity-90">
                  {chatStatus === 'online' ? 'We\'re online' : 
                   chatStatus === 'away' ? 'Away - responses may be delayed' : 
                   'Offline - leave a message'}
                </p>
              </div>
              <button 
                onClick={() => setShowLiveChat(false)}
                className="p-1 rounded-full hover:bg-black/10"
                aria-label="Close chat"
              >
                <Icon name="X" size={16} />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4" style={{ maxHeight: 'calc(80vh - 180px)' }}>
              {messages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.sender === 'agent' && (
                    <div className="w-8 h-8 bg-primary-50 rounded-full flex items-center justify-center flex-shrink-0 mr-2">
                      <Icon name="User" size={16} className="text-primary" />
                    </div>
                  )}
                  <div className={`max-w-[80%] rounded-lg p-3 ${
                    msg.sender === 'user' 
                      ? 'bg-primary text-white rounded-br-none' 
                      : 'bg-gray-50 text-gray-800 rounded-bl-none'
                  }`}>
                    <p className="text-sm">{msg.text}</p>
                    <p className="text-xs mt-1 opacity-60 text-right">
                      {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      {msg.status === 'sending' && ' • Sending...'}
                      {msg.status === 'delivered' && ' • ✓'}
                    </p>
                  </div>
                  {msg.sender === 'user' && (
                    <div className="w-8 h-8 bg-primary-50 rounded-full flex items-center justify-center flex-shrink-0 ml-2">
                      <Icon name="User" size={16} className="text-primary" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <div className="p-3 border-t border-gray-200 bg-white">
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!message.trim()) return;
                  
                  // Add user message
                  const userMessage = {
                    id: Date.now(),
                    text: message,
                    sender: 'user',
                    timestamp: new Date(),
                    status: 'delivered'
                  };
                  
                  setMessages(prev => [...prev, userMessage]);
                  setMessage('');
                  
                  // Simulate agent typing
                  setIsTyping(true);
                  
                  // Generate bot response after a delay
                  setTimeout(() => {
                    setIsTyping(false);
                    // Generate context-aware response
                    const botResponse = processUserMessage(message);
                    
                    // Add bot response
                    setMessages(prev => [...prev, {
                      id: Date.now() + 1,
                      text: botResponse,
                      sender: 'agent',
                      timestamp: new Date(),
                      status: 'delivered',
                      isBot: true
                    }]);
                  }, 1500);
                }}
                className="flex space-x-2"
              >
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  disabled={chatStatus === 'offline'}
                />
                <button 
                  type="submit"
                  className={`px-3 py-2 rounded-lg transition-colors duration-200 ${
                    message.trim() && chatStatus !== 'offline'
                      ? 'bg-primary text-white hover:bg-primary-600'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                  disabled={!message.trim() || chatStatus === 'offline'}
                >
                  <Icon name="Send" size={16} />
                </button>
              </form>
              <p className="text-xs text-gray-400 mt-2 text-center">
                {chatStatus === 'online' 
                  ? 'Our team is online. We\'ll respond quickly!'
                  : chatStatus === 'away'
                    ? 'Response time may be delayed. We appreciate your patience.'
                    : 'Our team is currently offline. Leave a message and we\'ll get back to you soon.'
                }
              </p>
            </div>
          </motion.div>
        )}
      </div>
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Breadcrumb />
          </motion.div>
          
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
              Contact & Support
            </h1>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto">
              Get in touch with our team or find answers to your questions. We're here to help you succeed in your learning journey.
            </p>
          </motion.div>

          {/* FAQ Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-16"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-text-primary mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-text-secondary">
                Find quick answers to common questions about our programs and services.
              </p>
            </div>

            {/* FAQ Search */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <Icon 
                  name="Search" 
                  size={20} 
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-text-secondary" 
                />
                <input
                  type="text"
                  placeholder="Search FAQs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-border rounded-lg bg-surface text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>

            {/* FAQ Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {filteredFaqs.map((faq, index) => (
                <motion.div
                  key={faq.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="card hover:shadow-interactive transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-3">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getCategoryColor(faq.category)}`}>
                      <Icon name={faq.icon} size={12} className="mr-1" />
                      {faq.category}
                    </span>
                  </div>
                  
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full text-left focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 rounded-lg"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-text-primary pr-4">
                        {faq.question}
                      </h3>
                      <Icon 
                        name={expandedFaq === faq.id ? "ChevronUp" : "ChevronDown"} 
                        size={20} 
                        className="text-text-secondary flex-shrink-0 transition-transform duration-200" 
                      />
                    </div>
                  </button>
                  
                  {expandedFaq === faq.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-4 pt-4 border-t border-border-light"
                    >
                      <div className="text-text-secondary whitespace-pre-line">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>

            {filteredFaqs.length === 0 && (
              <div className="text-center py-12">
                <Icon name="Search" size={48} className="mx-auto text-text-secondary mb-4" />
                <h3 className="text-xl font-semibold text-text-primary mb-2">No results found</h3>
                <p className="text-text-secondary">
                  Try adjusting your search terms or browse all questions above.
                </p>
              </div>
            )}
          </motion.section>

          {/* Contact Channels */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-16"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-text-primary mb-4">
                Get In Touch
              </h2>
              <p className="text-text-secondary">
                Choose your preferred way to reach us. We're available through multiple channels.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {contactChannels.map((channel, index) => (
                <motion.div
                  key={channel.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="card text-center hover:shadow-interactive transition-all duration-300 group"
                >
                  <div className="w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                    <Icon 
                      name={channel.icon} 
                      size={24} 
                      className="text-primary group-hover:text-white transition-colors duration-300" 
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-text-primary mb-2">
                    {channel.title}
                  </h3>
                  <p className="text-text-primary font-medium mb-1">
                    {channel.primary}
                  </p>
                  <p className="text-text-secondary text-sm mb-2">
                    {channel.secondary}
                  </p>
                  <p className="text-text-secondary text-sm mb-2">
                    {channel.description}
                  </p>
                  <span className="inline-block px-3 py-1 bg-success-50 text-success text-xs font-medium rounded-full">
                    {channel.responseTime}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Contact Form and Map */}
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <div className="card">
                <h3 className="text-2xl font-bold text-text-primary mb-6">
                  Send us a Message
                </h3>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-text-primary mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={contactForm.name}
                        onChange={handleInputChange}
                        className={`input-field ${formErrors.name ? 'border-error focus:ring-error' : ''}`}
                        placeholder="Enter your full name"
                      />
                      {formErrors.name && (
                        <p className="mt-1 text-sm text-error">{formErrors.name}</p>
                      )}
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-text-primary mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={contactForm.email}
                        onChange={handleInputChange}
                        className={`input-field ${formErrors.email ? 'border-error focus:ring-error' : ''}`}
                        placeholder="Enter your email"
                      />
                      {formErrors.email && (
                        <p className="mt-1 text-sm text-error">{formErrors.email}</p>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="inquiryType" className="block text-sm font-medium text-text-primary mb-2">
                      Inquiry Type *
                    </label>
                    <select
                      id="inquiryType"
                      name="inquiryType"
                      value={contactForm.inquiryType}
                      onChange={handleInputChange}
                      className={`input-field ${formErrors.inquiryType ? 'border-error focus:ring-error' : ''}`}
                    >
                      <option value="">Select inquiry type</option>
                      {inquiryTypes.map(type => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                    {formErrors.inquiryType && (
                      <p className="mt-1 text-sm text-error">{formErrors.inquiryType}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-text-primary mb-2">
                      Subject *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={contactForm.subject}
                      onChange={handleInputChange}
                      className={`input-field ${formErrors.subject ? 'border-error focus:ring-error' : ''}`}
                      placeholder="Brief subject of your inquiry"
                    />
                    {formErrors.subject && (
                      <p className="mt-1 text-sm text-error">{formErrors.subject}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-text-primary mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={contactForm.message}
                      onChange={handleInputChange}
                      className={`input-field resize-none ${formErrors.message ? 'border-error focus:ring-error' : ''}`}
                      placeholder="Please provide details about your inquiry..."
                    />
                    {formErrors.message && (
                      <p className="mt-1 text-sm text-error">{formErrors.message}</p>
                    )}
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Icon name="Send" size={20} />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            </motion.div>

            {/* Map */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <div className="card h-full">
                <h3 className="text-2xl font-bold text-text-primary mb-6">
                  Visit Our Office
                </h3>
                
                <div className="mb-6">
                  <div className="flex items-start space-x-3 mb-4">
                    <Icon name="MapPin" size={20} className="text-primary mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-text-primary">Inlighn Tech - Corporate Office</p>
                      <p className="text-text-secondary">Office No: VO-301, WeWork Prestige Central</p>
                      <p className="text-text-secondary">Ground Floor, 36, Infantry Rd, Tasker Town</p>
                      <p className="text-text-secondary">Shivaji Nagar, Bengaluru, Karnataka 560001</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 mb-4">
                    <Icon name="Clock" size={20} className="text-primary flex-shrink-0" />
                    <div>
                      <p className="font-medium text-text-primary">Office Hours</p>
                      <p className="text-text-secondary">Monday - Friday: 9:00 AM - 6:00 PM</p>
                      <p className="text-text-secondary">Saturday: 10:00 AM - 4:00 PM</p>
                    </div>
                  </div>
                </div>
                
                <div className="h-96 rounded-lg overflow-hidden border border-border-light">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.8539624819537!2d77.60071167489313!3d12.98119088733508!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1747be80a971%3A0xdff198e5f32aa7e2!2sInlighn%20Tech!5e0!3m2!1sen!2sin!4v1750508109384!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    title="Inlighn Tech Office Location"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Social Media */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="mb-16"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-text-primary mb-4">
                Follow Us
              </h2>
              <p className="text-text-secondary">
                Stay connected and get the latest updates from our social media channels.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {socialMedia.map((social, index) => (
                <motion.a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="card text-center hover:shadow-interactive transition-all duration-300 group hover:scale-105"
                >
                  <div className="w-12 h-12 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-primary transition-colors duration-300">
                    <Icon 
                      name={social.icon} 
                      size={20} 
                      className="text-primary group-hover:text-white transition-colors duration-300" 
                    />
                  </div>
                  <h3 className="font-semibold text-text-primary mb-1">
                    {social.platform}
                  </h3>
                  <p className="text-sm text-text-secondary mb-1">
                    {social.followers} followers
                  </p>
                  <p className="text-xs text-text-secondary">
                    {social.activity}
                  </p>
                </motion.a>
              ))}
            </div>
          </motion.section>
        </div>
      </div>

      {/* Enhanced Live Chat Widget - Made more visible */}
      <div className="fixed bottom-6 right-6 z-[1000] shadow-2xl rounded-full">
        <button
          onClick={() => setShowLiveChat(!showLiveChat)}
          className={`w-16 h-16 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 flex items-center justify-center relative ${
            chatStatus === 'online' ? 'bg-gradient-to-br from-primary to-primary-600' : 
            chatStatus === 'away' ? 'bg-gradient-to-br from-amber-500 to-amber-600' : 
            'bg-gradient-to-br from-gray-500 to-gray-600'
          } text-white animate-bounce`}
          style={{
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2)'
          }}
          aria-label="Need help? Chat with us"
        >
          {chatStatus === 'online' && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-pulse"></span>
          )}
          <div className="relative">
            <Icon 
              name={
                showLiveChat ? "X" : 
                chatStatus === 'away' ? "Clock" : 
                chatStatus === 'offline' ? "MessageSquare" : 
                "MessageCircle"
              } 
              size={28} 
            />
            {!showLiveChat && (
              <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                <span>!</span>
              </div>
            )}
          </div>
        </button>

        {showLiveChat && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="absolute bottom-16 right-0 w-80 bg-surface rounded-lg shadow-modal border border-border-light overflow-hidden flex flex-col"
            style={{ maxHeight: '80vh' }}
          >
            {/* Chat Header */}
            <div className={`p-4 text-white flex justify-between items-center ${
              chatStatus === 'online' ? 'bg-primary' : 
              chatStatus === 'away' ? 'bg-amber-500' : 'bg-gray-500'
            }`}>
              <div>
                <h3 className="font-semibold">Live Chat Support</h3>
                <p className="text-xs opacity-90">
                  {chatStatus === 'online' ? 'We\'re online' : 
                   chatStatus === 'away' ? 'Away - responses may be delayed' : 
                   'Offline - leave a message'}
                </p>
              </div>
              <button 
                onClick={() => setShowLiveChat(false)}
                className="p-1 rounded-full hover:bg-black/10"
                aria-label="Close chat"
              >
                <Icon name="X" size={16} />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4" style={{ maxHeight: 'calc(80vh - 180px)' }}>
              {/* Initial greeting message */}
              {messages.length <= 1 && (
                <div className="text-center text-sm text-gray-500 mb-4">
                  <p>Hi there! I'm EduBot. Ask me anything about our programs.</p>
                </div>
              )}
              {messages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.sender === 'agent' && (
                    <div className="w-8 h-8 bg-primary-50 rounded-full flex items-center justify-center flex-shrink-0 mr-2">
                      <Icon name="User" size={16} className="text-primary" />
                    </div>
                  )}
                  <div className={`max-w-[80%] rounded-lg p-3 ${
                    msg.sender === 'user' 
                      ? 'bg-primary text-white rounded-br-none' 
                      : 'bg-gray-50 text-text-primary rounded-bl-none'
                  }`}>
                    <p className="text-sm">{msg.text}</p>
                    <p className="text-xs mt-1 opacity-60 text-right">
                      {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      {msg.status === 'sending' && ' • Sending...'}
                      {msg.status === 'delivered' && ' • ✓'}
                    </p>
                  </div>
                  {msg.sender === 'user' && (
                    <div className="w-8 h-8 bg-primary-50 rounded-full flex items-center justify-center flex-shrink-0 ml-2">
                      <Icon name="User" size={16} className="text-primary" />
                    </div>
                  )}
                </div>
              ))}
              {isTyping && (
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-primary-50 rounded-full flex items-center justify-center flex-shrink-0">
                    <Icon name="User" size={16} className="text-primary" />
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Chat Input */}
            <div className="p-3 border-t border-border-light bg-white">
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!message.trim()) return;
                  
                  // Add user message
                  const userMessage = {
                    id: Date.now(),
                    text: message,
                    sender: 'user',
                    timestamp: new Date(),
                    status: 'delivered'
                  };
                  
                  setMessages(prev => [...prev, userMessage]);
                  setMessage('');
                  
                  // Simulate agent typing
                  setIsTyping(true);
                  
                  // Generate bot response after a delay
                  setTimeout(() => {
                    setIsTyping(false);
                    
                    // Generate context-aware response
                    const botResponse = processUserMessage(message);
                    
                    // Add bot response
                    setMessages(prev => [...prev, {
                      id: Date.now() + 1,
                      text: botResponse,
                      sender: 'agent',
                      timestamp: new Date(),
                      status: 'delivered',
                      isBot: true
                    }]);
                  }, 1500);
                }}
                className="flex space-x-2"
              >
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  disabled={chatStatus === 'offline'}
                />
                <button 
                  type="submit"
                  className={`px-3 py-2 rounded-lg transition-colors duration-200 ${
                    message.trim() && chatStatus !== 'offline'
                      ? 'bg-primary text-white hover:bg-primary-600'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                  disabled={!message.trim() || chatStatus === 'offline'}
                >
                  <Icon name="Send" size={16} />
                </button>
              </form>
              {/* Quick Reply Suggestions */}
              <div className="flex flex-wrap gap-2 mb-2">
                {quickReplies.map((reply, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setMessage(reply.text);
                      // Auto-submit after a small delay to allow state update
                      setTimeout(() => {
                        const form = document.querySelector('form');
                        const submitButton = form?.querySelector('button[type="submit"]');
                        if (submitButton) submitButton.click();
                      }, 50);
                    }}
                    className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-800 px-2 py-1 rounded-full transition-colors duration-200"
                  >
                    {reply.text}
                  </button>
                ))}
              </div>
              <p className="text-xs text-gray-400 mt-1 text-center">
                {chatStatus === 'online' 
                  ? 'Our team is online. We\'ll respond quickly!'
                  : chatStatus === 'away'
                    ? 'Response time may be delayed. We appreciate your patience.'
                    : 'Our team is currently offline. Leave a message and we\'ll get back to you soon.'
                }
              </p>
            </div>
          </motion.div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-text-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Icon name="GraduationCap" size={20} color="white" />
                </div>
                <span className="text-xl font-semibold">EduTech</span>
              </div>
              <p className="text-gray-300 mb-4">
                Empowering the next generation through innovative education and hands-on learning experiences.
              </p>
              <div className="flex space-x-4">
                {socialMedia.slice(0, 4).map((social) => (
                  <a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-primary transition-colors duration-200"
                  >
                    <Icon name={social.icon} size={16} />
                  </a>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="/home-dashboard" className="text-gray-300 hover:text-white transition-colors duration-200">Home</a></li>
                <li><a href="/about-us" className="text-gray-300 hover:text-white transition-colors duration-200">About Us</a></li>
                <li><a href="/programs-catalog" className="text-gray-300 hover:text-white transition-colors duration-200">Programs</a></li>
                <li><a href="/certificate-verification" className="text-gray-300 hover:text-white transition-colors duration-200">Verify Certificate</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-2">
                <li><a href="/contact-faq" className="text-gray-300 hover:text-white transition-colors duration-200">Contact Us</a></li>
                <li><a href="/contact-faq" className="text-gray-300 hover:text-white transition-colors duration-200">FAQ</a></li>
                <li><span className="text-gray-300">Help Center</span></li>
                <li><span className="text-gray-300">Privacy Policy</span></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
              <div className="space-y-2 text-gray-300">
                <div className="flex items-center space-x-2">
                  <Icon name="Phone" size={16} />
                  <a href="tel:+919368842663" className="hover:text-primary transition-colors">+91 93688 42663</a>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Mail" size={16} />
                  <span>support@edutech.com</span>
                </div>
                <div className="flex items-start space-x-2">
                  <Icon name="MapPin" size={16} className="mt-1 flex-shrink-0" />
                  <span>123 Education Boulevard<br />Tech City, TC 12345</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
            <p>&copy; {new Date().getFullYear()} EduTech Platform. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </AnimatedBackground>
  );
};

export default ContactFaq;
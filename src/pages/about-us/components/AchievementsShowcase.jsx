import React from 'react';
import { motion } from 'framer-motion';
import Icon from 'components/AppIcon';

const AchievementsShowcase = () => {
  const achievements = [
    {
      id: 1,
      title: "Students Trained",
      value: "15,000+",
      description: "Successful graduates across various programs",
      icon: "Users",
      color: "primary",
      growth: "+25% this year"
    },
    {
      id: 2,
      title: "Industry Partners",
      value: "500+",
      description: "Leading companies trust our training programs",
      icon: "Building",
      color: "secondary",
      growth: "+40% partnerships"
    },
    {
      id: 3,
      title: "Job Placement Rate",
      value: "92%",
      description: "Students placed within 6 months of completion",
      icon: "TrendingUp",
      color: "success",
      growth: "Industry leading"
    },
    {
      id: 4,
      title: "Course Completion",
      value: "96%",
      description: "High engagement and completion rates",
      icon: "Award",
      color: "accent",
      growth: "+8% improvement"
    },
    {
      id: 5,
      title: "Years of Excellence",
      value: "12+",
      description: "Consistent quality education since 2012",
      icon: "Calendar",
      color: "primary",
      growth: "Established leader"
    },
    {
      id: 6,
      title: "Global Reach",
      value: "25+",
      description: "Countries with our alumni network",
      icon: "Globe",
      color: "secondary",
      growth: "Expanding globally"
    }
  ];

  const awards = [
    {
      title: "Best EdTech Platform 2023",
      organization: "Education Excellence Awards",
      year: "2023",
      icon: "Trophy"
    },
    {
      title: "Innovation in Learning",
      organization: "Tech Innovation Summit",
      year: "2023",
      icon: "Lightbulb"
    },
    {
      title: "Top Employer Partner",
      organization: "Industry Skills Council",
      year: "2022",
      icon: "Star"
    },
    {
      title: "Student Choice Award",
      organization: "National Education Survey",
      year: "2022",
      icon: "Heart"
    }
  ];

  const getColorClasses = (color) => {
    const colorMap = {
      primary: "bg-primary-50 text-primary border-primary-100",
      secondary: "bg-secondary-50 text-secondary border-secondary-100",
      success: "bg-success-50 text-success border-success-100",
      accent: "bg-accent-50 text-accent border-accent-100"
    };
    return colorMap[color] || colorMap.primary;
  };

  return (
    <section className="relative py-16 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10 opacity-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgdmlld0JveD0iMCAwIDYwIDYwIj48cGF0aCBkPSJNMzAgMGMxNi41NjkgMCAzMCAxMy40MzEgMzAgMzBzLTEzLjQzMSAzMC0zMCAzMFMwIDE2LjU2OSAwIDMwczEzLjQzMSAzMCAzMCAzMCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDA3OGQ3IiBzdHJva2Utd2lkdGg9IjAuNSIgc3Ryb2tlLW9wYWNpdHk9IjAuMSIvPjwvc3ZnPg==')]" />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.span 
            className="inline-block text-sm font-semibold text-primary bg-primary/10 px-4 py-1.5 rounded-full mb-4"
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            Our Milestones
          </motion.span>
          <motion.h2 
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Building Success Stories
          </motion.h2>
          <motion.p 
            className="text-lg text-text-secondary/80 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Numbers that reflect our commitment to excellence and the trust placed in us by students and industry partners.
          </motion.p>
        </motion.div>

      {/* Statistics Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {achievements.map((achievement, index) => {
          const colorMap = {
            primary: 'from-primary/90 to-primary/70',
            secondary: 'from-secondary/90 to-secondary/70',
            success: 'from-success/90 to-success/70',
            accent: 'from-accent/90 to-accent/70'
          };
          
          const bgMap = {
            primary: 'bg-primary/5',
            secondary: 'bg-secondary/5',
            success: 'bg-success/5',
            accent: 'bg-accent/5'
          };
          
          return (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                duration: 0.6, 
                delay: 0.1 * (index % 3),
                ease: [0.16, 1, 0.3, 1]
              }}
              whileHover={{ y: -5 }}
              className={`group relative h-full rounded-2xl overflow-hidden ${bgMap[achievement.color] || 'bg-gray-50'} transition-all duration-500`}
            >
              {/* Animated gradient border effect */}
              <div className={`absolute inset-0 bg-gradient-to-br ${colorMap[achievement.color] || 'from-primary/90 to-primary/70'} opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10`}></div>
              
              <div className="h-full p-6 relative z-10">
                <div className="flex items-start justify-between mb-6">
                  <div 
                    className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                      getColorClasses(achievement.color).replace('border-', 'border-2 ')
                    } group-hover:scale-110 group-hover:shadow-lg transition-all duration-300`}
                  >
                    <Icon 
                      name={achievement.icon} 
                      size={26} 
                      className="group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <span className="text-xs font-medium px-3 py-1 rounded-full bg-white/80 text-gray-700 shadow-sm border border-gray-100 group-hover:bg-white group-hover:scale-105 transition-all duration-300">
                    {achievement.growth}
                  </span>
                </div>
                
                <div className="space-y-3">
                  <h3 className="text-3xl md:text-4xl font-bold text-text-primary">
                    {achievement.value}
                  </h3>
                  <h4 className="text-lg font-semibold text-text-primary group-hover:text-gray-900 transition-colors duration-300">
                    {achievement.title}
                  </h4>
                  <p className="text-sm text-text-secondary/80 leading-relaxed group-hover:text-text-secondary transition-colors duration-300">
                    {achievement.description}
                  </p>
                </div>
                
                {/* Animated underline */}
                <div className="mt-6 pt-4 border-t border-gray-100 group-hover:border-transparent transition-colors duration-300 relative">
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-accent group-hover:w-full transition-all duration-500"></div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Awards Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="relative bg-surface rounded-2xl p-8 md:p-12 shadow-sm border border-border-light"
      >
        <div className="text-center mb-12">
          <motion.span 
            className="inline-block text-sm font-semibold text-accent bg-accent/10 px-4 py-1.5 rounded-full mb-4"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Our Achievements
          </motion.span>
          <motion.h3 
            className="text-2xl sm:text-3xl font-bold text-text-primary mb-4"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Awards & Recognition
          </motion.h3>
          <motion.p 
            className="text-text-secondary/80 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            Our commitment to excellence has been recognized by leading organizations in the education and technology sectors.
          </motion.p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {awards.map((award, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ 
                duration: 0.5, 
                delay: 0.1 * (index % 4),
                ease: [0.16, 1, 0.3, 1]
              }}
              whileHover={{ y: -5 }}
              className="group relative bg-white rounded-xl overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-500"
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
              
              <div className="p-6 relative z-10">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 text-primary flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                  <Icon name={award.icon} size={24} className="group-hover:scale-110 transition-transform duration-300" />
                </div>
                <h4 className="text-lg font-semibold text-text-primary mb-2 group-hover:text-primary transition-colors duration-300">
                  {award.title}
                </h4>
                <p className="text-sm text-text-secondary/80 mb-3 leading-relaxed">
                  {award.organization}
                </p>
                <span className="inline-block text-xs font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
                  {award.year}
                </span>
                
                {/* Animated arrow */}
                <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 -translate-x-2 transition-all duration-300">
                  <Icon name="ArrowRight" size={20} className="text-primary" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full bg-primary/5 blur-3xl -z-10"></div>
      <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-accent/5 blur-3xl -z-10"></div>
    </section>
  );
};

export default AchievementsShowcase;
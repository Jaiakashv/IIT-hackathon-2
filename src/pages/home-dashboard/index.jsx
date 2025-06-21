// src/pages/home-dashboard/index.jsx
import React from 'react';
import Breadcrumb from 'components/ui/Breadcrumb';
import AnimatedBackground from 'components/ui/AnimatedBackground';
import HeroSection from './components/HeroSection';
import MetricsDashboard from './components/MetricsDashboard';
import WhyChooseUs from './components/WhyChooseUs';
import TestimonialSection from './components/TestimonialSection';
import Footer from './components/Footer';
import UpcomingEvents from './components/UpcomingEvents';  // Add this import

const HomeDashboard = () => {
  return (
    <AnimatedBackground variant="gradient">
      {/* Main Content */}
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <Breadcrumb />
          </div>
        </div>

        {/* Hero Section */}
        <HeroSection />

        {/* Metrics Dashboard */}
        <MetricsDashboard />

        {/* Upcoming Events */}
        <UpcomingEvents />

        {/* Why Choose Us Section */}
        <WhyChooseUs />

        {/* Testimonial Section */}
        <TestimonialSection />
      </main>

      {/* Footer */}
      <Footer />
    </AnimatedBackground>
  );
};

export default HomeDashboard;
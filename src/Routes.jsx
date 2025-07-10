import React from 'react';
import { BrowserRouter, Routes as RouterRoutes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import ErrorBoundary from './components/ErrorBoundary';
import Header from './components/ui/Header';
import Footer from './components/ui/Footer';
import HomeDashboard from './pages/home-dashboard';
import AboutUs from './pages/about-us';
import ProgramsCatalog from './pages/programs-catalog';
import ContactFaq from './pages/contact-faq';
import UserAuthentication from './pages/user-authentication';
import CertificateVerification from './pages/certificate-verification';
import Assessments from './pages/assessments/Assessments';
import QuizPage from './pages/assessments/QuizPage';
import MentorshipCommunity from './pages/mentorship-community';

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <RouterRoutes>
          <Route path="/" element={<Layout><HomeDashboard /></Layout>} />
          <Route path="/home-dashboard" element={<Layout><HomeDashboard /></Layout>} />
          <Route path="/about-us" element={<Layout><AboutUs /></Layout>} />
          <Route path="/programs-catalog" element={<Layout><ProgramsCatalog /></Layout>} />
          <Route path="/contact-faq" element={<Layout><ContactFaq /></Layout>} />
          <Route path="/user-authentication" element={<UserAuthentication />} />
          <Route path="/certificate-verification" element={<Layout><CertificateVerification /></Layout>} />
          <Route path="/assessments" element={<Layout><Assessments /></Layout>} />
          <Route path="/assessments/quiz/:category" element={<Layout><QuizPage /></Layout>} />
          <Route path="/mentorship-community" element={<Layout><MentorshipCommunity /></Layout>} />
        </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};
export default Routes;
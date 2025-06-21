import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import Header from "components/ui/Header";
import HomeDashboard from "pages/home-dashboard";
import AboutUs from "pages/about-us";
import ProgramsCatalog from "pages/programs-catalog";
import ContactFaq from "pages/contact-faq";
import UserAuthentication from "pages/user-authentication";
import CertificateVerification from "pages/certificate-verification";
const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <Header />
        <RouterRoutes>
          <Route path="/" element={<HomeDashboard />} />
          <Route path="/home-dashboard" element={<HomeDashboard />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/programs-catalog" element={<ProgramsCatalog />} />
          <Route path="/contact-faq" element={<ContactFaq />} />
          <Route path="/user-authentication" element={<UserAuthentication />} />
          <Route path="/certificate-verification" element={<CertificateVerification />} />
        </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};
export default Routes;
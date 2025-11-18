import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/common/Navbar.jsx';
import Footer from './components/common/Footer.jsx';
import Home from './pages/Home/Home.jsx';
import Services from './pages/Services/Services.jsx';
import Portfolio from './pages/Portfolio/Portfolio.jsx';
import About from './pages/About/About.jsx';
import Contact from './pages/Contact/Contact.jsx';
import Blogs from './pages/Blogs/Blogs.jsx';
import Admin from './pages/Admin/Admin.jsx';
import ServiceDetail from './pages/Services/ServiceDetail.jsx';
import ServiceCategory from './pages/Services/ServiceCategory.jsx';
import ProjectDetail from './pages/Portfolio/ProjectDetail.jsx';
import PrivacyPolicy from './pages/Legal/PrivacyPolicy.jsx';
import TermsOfService from './pages/Legal/TermsOfService.jsx';
import BlogDetail from './pages/Blogs/BlogDetail.jsx';
import './App.css';

function AppContent() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  React.useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {!isAdminRoute && <Navbar />}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:categoryId" element={<ServiceCategory />} />
          <Route path="/services/:categoryId/:serviceId" element={<ServiceDetail />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/portfolio/:projectId" element={<ProjectDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blog/:slug" element={<BlogDetail />} />
          <Route path="/admin/*" element={<Admin />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
        </Routes>
      </main>
      {!isAdminRoute && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
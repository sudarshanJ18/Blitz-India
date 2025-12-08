import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from '../../components/common/ProtectedRoute.jsx';
import AdminLayout from '../../components/admin/AdminLayout.jsx';
import Dashboard from '../../components/admin/Dashboard.jsx';
import BlogsManager from '../../components/admin/BlogsManager.jsx';
import ProjectsManager from '../../components/admin/ProjectsManager.jsx';
import ServicesManager from '../../components/admin/ServicesManager.jsx';
import TestimonialsManager from '../../components/admin/TestimonialsManager.jsx';
import ContactSubmissions from '../../components/admin/ContactSubmissions.jsx';
import AdminSettings from '../../components/admin/AdminSettings.jsx';
import MFASetup from '../../components/admin/MFASetup.jsx';
import Login from './Login.jsx';
import ForgotPassword from './ForgotPassword.jsx';
import ResetPassword from './ResetPassword.jsx';

const Admin = () => {
  return (
    <Routes>
      {/* Public routes - Login and Password Reset */}
      <Route path="login" element={<Login />} />
      <Route path="forgot-password" element={<ForgotPassword />} />
      <Route path="reset-password/:token" element={<ResetPassword />} />

      {/* Protected routes - Require authentication */}
      <Route
        path="*"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <Routes>
                <Route path="" element={<Navigate to="dashboard" replace />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="blogs" element={<BlogsManager />} />
                <Route path="projects" element={<ProjectsManager />} />
                <Route path="services" element={<ServicesManager />} />
                <Route path="testimonials" element={<TestimonialsManager />} />
                <Route path="contact" element={<ContactSubmissions />} />
                <Route path="settings" element={<AdminSettings />} />
                <Route path="setup-mfa" element={<MFASetup />} />
              </Routes>
            </AdminLayout>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default Admin;
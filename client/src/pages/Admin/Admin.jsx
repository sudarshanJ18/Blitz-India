import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout.jsx';
import Dashboard from '../../components/admin/Dashboard.jsx';
import BlogsManager from '../../components/admin/BlogsManager.jsx'
import ProjectsManager from '../../components/admin/ProjectsManager.jsx'
import ServicesManager from '../../components/admin/ServicesManager.jsx'
import AdminSettings from '../../components/admin/AdminSettings.jsx';

const Admin = () => {
  return (
    <AdminLayout>
      <Routes>
        <Route path="" element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="blogs" element={<BlogsManager />} />
        <Route path="projects" element={<ProjectsManager />} />
        <Route path="services" element={<ServicesManager />} />
        <Route path="settings" element={<AdminSettings />} />
      </Routes>
    </AdminLayout>
  );
};

export default Admin;
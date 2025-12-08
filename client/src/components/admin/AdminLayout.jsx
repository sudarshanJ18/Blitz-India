import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { assets } from '../../assets/assets.js';

const AdminLayout = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear authentication token
    localStorage.removeItem('adminToken');
    // Redirect to login page
    navigate('/admin/login');
  };

  const iconClass = "w-5 h-5";

  const icons = {
    dashboard: (
      <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4h7v7H4zM13 4h7v4h-7zM13 11h7v9h-7zM4 13h7v7H4z" />
      </svg>
    ),
    projects: (
      <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
    services: (
      <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    blogs: (
      <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    ),
    testimonials: (
      <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
      </svg>
    ),
    contact: (
      <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    settings: (
      <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    logout: (
      <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
      </svg>
    ),
    menu: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    ),
    close: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
    ),
  };

  const navItems = [
    { icon: icons.dashboard, text: 'Dashboard', path: '/admin/dashboard' },
    { icon: icons.projects, text: 'Projects', path: '/admin/projects' },
    { icon: icons.services, text: 'Services', path: '/admin/services' },
    { icon: icons.blogs, text: 'Blogs', path: '/admin/blogs' },
    { icon: icons.contact, text: 'Messages', path: '/admin/contact' },
    { icon: icons.testimonials, text: 'Testimonials', path: '/admin/testimonials' },
    { icon: icons.settings, text: 'Settings', path: '/admin/settings' },
  ];

  const Sidebar = () => (
    <aside className={`bg-white text-slate-700 w-72 min-h-screen fixed lg:relative lg:translate-x-0 transform transition-transform duration-300 ease-in-out shadow-lg border-r border-gray-100 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} z-40`}>
      {/* Logo Section */}
      <div className="flex justify-between items-center px-6 py-6 border-b border-gray-100">
        <Link to="/" className="flex items-center space-x-3 group">
          <img
            src={assets.logo}
            alt="Blitz India Engineering"
            className="h-10 w-auto transition-opacity group-hover:opacity-80"
            draggable={false}
          />
          <div>
            <h1 className="text-xl font-bold text-slate-800">Admin</h1>
            <p className="text-xs text-slate-500">Control Panel</p>
          </div>
        </Link>
        <button
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden text-slate-500 hover:text-orange-600 transition-colors"
        >
          {icons.close}
        </button>
      </div>

      {/* Navigation */}
      <nav className="px-4 py-6 space-y-1">
        {navItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group ${isActive
                ? 'bg-gradient-to-r from-orange-50 to-orange-100 text-orange-600 font-semibold border-l-4 border-orange-600'
                : 'text-slate-600 hover:bg-gray-50 hover:text-orange-600 border-l-4 border-transparent'
              }`
            }
          >
            <span className="transition-colors">
              {item.icon}
            </span>
            <span className="font-medium">{item.text}</span>
          </NavLink>
        ))}
      </nav>

      {/* Bottom Section */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-100 bg-white space-y-2">
        <button
          onClick={handleLogout}
          className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-white bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 transition-all duration-200 group shadow-md hover:shadow-lg"
        >
          <span className="transition-colors">
            {icons.logout}
          </span>
          <span className="font-medium">Logout</span>
        </button>
        <Link
          to="/"
          className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-gray-50 hover:text-orange-600 transition-all duration-200 group"
        >
          <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span className="font-medium text-sm">Back to Website</span>
        </Link>
      </div>
    </aside>
  );

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar />

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-30 lg:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex-1 flex flex-col">
        {/* Mobile Header */}
        <header className="bg-white shadow-sm px-6 py-4 flex justify-between items-center lg:hidden sticky top-0 z-20 border-b border-gray-100">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-slate-700 hover:text-orange-600 transition-colors"
          >
            {icons.menu}
          </button>
          <Link to="/" className="flex items-center">
            <img
              src={assets.logo}
              alt="Blitz India Engineering"
              className="h-8 w-auto"
              draggable={false}
            />
          </Link>
          <h2 className="text-lg font-bold text-slate-800">Admin</h2>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-6 md:p-8 lg:p-10">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;

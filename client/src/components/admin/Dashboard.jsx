import React, { useState, useEffect } from 'react';
import contactService from '../../services/contact.service';
import { Link } from 'react-router-dom';
import { Mail } from 'lucide-react';

const iconClass = "w-7 h-7";

const dashboardIcons = {
  projects: (
    <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
    </svg>
  ),
  clients: (
    <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  ),
  revenue: (
    <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  inquiries: (
    <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
};

const StatCard = ({ icon, title, value, change, bgColor, iconColor }) => (
  <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-6 border border-gray-100 group">
    <div className="flex items-start justify-between mb-4">
      <div className={`p-3 rounded-lg ${bgColor} group-hover:scale-105 transition-transform duration-300`}>
        <div className={iconColor}>
          {icon}
        </div>
      </div>
      <div className={`text-xs font-semibold px-2.5 py-1 rounded-full ${change.includes('+') ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'
        }`}>
        {change}
      </div>
    </div>
    <div>
      <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
      <p className="text-3xl font-bold text-slate-800">
        {value}
      </p>
    </div>
  </div>
);

const Dashboard = () => {
  const [recentMessages, setRecentMessages] = useState([]);
  const [loadingMessages, setLoadingMessages] = useState(true);

  useEffect(() => {
    fetchRecentMessages();
  }, []);

  const fetchRecentMessages = async () => {
    try {
      setLoadingMessages(true);
      const response = await contactService.getAllSubmissions(1, 5, ''); // Get latest 5 messages
      setRecentMessages(response.data || []);
    } catch (error) {
      console.error('Error fetching recent messages:', error);
    } finally {
      setLoadingMessages(false);
    }
  };

  const getTimeAgo = (dateString) => {
    const now = new Date();
    const past = new Date(dateString);
    const diffMs = now - past;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins} min${diffMins !== 1 ? 's' : ''} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
    return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
  };

  const stats = [
    {
      icon: dashboardIcons.projects,
      title: 'Active Projects',
      value: '12',
      change: '+2 this month',
      bgColor: 'bg-orange-50',
      iconColor: 'text-orange-600'
    },
    {
      icon: dashboardIcons.clients,
      title: 'New Clients',
      value: '4',
      change: '+1 this month',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600'
    },
    {
      icon: dashboardIcons.revenue,
      title: 'Monthly Revenue',
      value: '$25,650',
      change: '+8% vs last month',
      bgColor: 'bg-emerald-50',
      iconColor: 'text-emerald-600'
    },
    {
      icon: dashboardIcons.inquiries,
      title: 'Pending Inquiries',
      value: recentMessages.filter(m => m.status === 'new').length.toString(),
      change: '-3 from yesterday',
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-600'
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-slate-800 mb-2">
          Dashboard Overview
        </h1>
        <p className="text-slate-600 text-lg">Welcome back! Here's what's happening with your projects.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Contact Messages */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-slate-800">Recent Messages</h2>
            <Link to="/admin/contact" className="text-sm text-orange-600 hover:text-orange-700 font-medium">
              View All →
            </Link>
          </div>

          {loadingMessages ? (
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-orange-600"></div>
            </div>
          ) : recentMessages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-40 text-center">
              <Mail className="w-12 h-12 text-gray-300 mb-2" />
              <p className="text-slate-500 text-sm">No messages yet</p>
            </div>
          ) : (
            <ul className="space-y-3">
              {recentMessages.map((message) => (
                <li key={message._id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center text-orange-700 font-bold text-sm">
                    {message.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-slate-900 font-semibold text-sm truncate">
                        {message.name}
                      </p>
                      <span className={`ml-2 px-2 py-0.5 text-xs rounded-full ${message.status === 'new' ? 'bg-blue-100 text-blue-700' :
                          message.status === 'read' ? 'bg-gray-100 text-gray-700' :
                            'bg-green-100 text-green-700'
                        }`}>
                        {message.status}
                      </span>
                    </div>
                    <p className="text-slate-600 text-sm truncate mt-0.5">
                      {message.serviceCategory}
                    </p>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {getTimeAgo(message.submittedAt)}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Project Status Overview */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-slate-800">Quick Stats</h2>
            <div className="w-12 h-1 bg-orange-600 rounded-full"></div>
          </div>
          <div className="flex items-center justify-center h-64 bg-gradient-to-br from-gray-50 to-slate-50 rounded-lg border border-gray-200">
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <p className="text-slate-600 font-medium">Chart Visualization</p>
              <p className="text-sm text-slate-400 mt-1">Coming soon</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

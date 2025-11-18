import React from 'react';

const iconClass = "w-8 h-8";

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

const StatCard = ({ icon, title, value, change, gradient }) => (
  <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 group hover:border-orange-200">
    <div className="flex items-center justify-between mb-4">
      <div className={`p-4 rounded-xl ${gradient} group-hover:scale-110 transition-transform duration-300`}>
        <div className="text-white">
          {icon}
        </div>
      </div>
      <div className={`text-sm font-semibold px-3 py-1 rounded-full ${
        change.includes('+') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
      }`}>
        {change}
      </div>
    </div>
    <div>
      <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
      <p className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-orange-700 bg-clip-text text-transparent">
        {value}
      </p>
    </div>
  </div>
);

const Dashboard = () => {
  const stats = [
    { 
      icon: dashboardIcons.projects,
      title: 'Active Projects', 
      value: '12', 
      change: '+2 this month',
      gradient: 'bg-gradient-to-br from-orange-500 to-orange-600'
    },
    { 
      icon: dashboardIcons.clients,
      title: 'New Clients', 
      value: '4', 
      change: '+1 this month',
      gradient: 'bg-gradient-to-br from-blue-500 to-blue-600'
    },
    { 
      icon: dashboardIcons.revenue,
      title: 'Monthly Revenue', 
      value: '$25,650', 
      change: '+8% vs last month',
      gradient: 'bg-gradient-to-br from-emerald-500 to-emerald-600'
    },
    { 
      icon: dashboardIcons.inquiries,
      title: 'Pending Inquiries', 
      value: '7', 
      change: '-3 from yesterday',
      gradient: 'bg-gradient-to-br from-purple-500 to-purple-600'
    },
  ];

  const recentActivities = [
    { user: 'John Doe', action: 'submitted a new project proposal', time: '2 hours ago', type: 'project' },
    { user: 'Jane Smith', action: 'updated the status of Project Alpha', time: '5 hours ago', type: 'update' },
    { user: 'Admin', action: 'approved a new client registration', time: '1 day ago', type: 'approval' },
    { user: 'Mike Johnson', action: 'sent a new inquiry about 3D modeling', time: '2 days ago', type: 'inquiry' },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 via-orange-700 to-orange-800 bg-clip-text text-transparent mb-2">
          Admin Dashboard
        </h1>
        <p className="text-gray-600 text-lg">Welcome back! Here's what's happening with your projects.</p>
      </div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activities */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Recent Activities</h2>
            <div className="w-12 h-1 bg-gradient-to-r from-orange-600 to-orange-700 rounded-full"></div>
          </div>
          <ul className="space-y-4">
            {recentActivities.map((activity, index) => (
              <li key={index} className="flex items-start space-x-4 p-4 rounded-xl hover:bg-gray-50 transition-colors group">
                <div className={`flex-shrink-0 w-2 h-2 rounded-full mt-2 ${
                  activity.type === 'project' ? 'bg-orange-500' :
                  activity.type === 'update' ? 'bg-blue-500' :
                  activity.type === 'approval' ? 'bg-green-500' : 'bg-purple-500'
                } group-hover:scale-150 transition-transform`}></div>
                <div className="flex-1 min-w-0">
                  <p className="text-gray-800 font-medium">
                    <span className="font-semibold text-gray-900">{activity.user}</span> {activity.action}.
                  </p>
                  <p className="text-sm text-gray-500 mt-1">{activity.time}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Project Status Overview */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Project Status Overview</h2>
            <div className="w-12 h-1 bg-gradient-to-r from-orange-600 to-orange-700 rounded-full"></div>
          </div>
          <div className="flex items-center justify-center h-64 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border-2 border-dashed border-gray-300">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <p className="text-gray-500 font-medium">Chart visualization</p>
              <p className="text-sm text-gray-400 mt-1">Will be displayed here</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

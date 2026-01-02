import React, { useState, useEffect } from 'react';
import { getDashboardStats } from '../../services/dashboard.service';
import { Link } from 'react-router-dom';
import { Mail, Briefcase, FileText, MessageSquare, Layers, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100
    }
  }
};

const StatCard = ({ icon: Icon, title, value, subtext, color, to }) => (
  <Link to={to} className="block group">
    <motion.div
      variants={itemVariants}
      className={`relative overflow-hidden rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 h-full bg-white group-hover:-translate-y-1`}
    >
      <div className={`absolute top-0 right-0 w-32 h-32 bg-${color}-50 rounded-full -mr-16 -mt-16 opacity-50 group-hover:scale-150 transition-transform duration-500`}></div>

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className={`p-3 rounded-xl bg-${color}-50 text-${color}-600 group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
            <Icon className="w-6 h-6" />
          </div>
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-x-2 group-hover:translate-x-0">
            <ArrowUpRight className="w-5 h-5 text-gray-400" />
          </div>
        </div>

        <div>
          <h3 className="text-4xl font-extrabold text-slate-800 mb-1 tracking-tight">
            {value}
          </h3>
          <p className="text-sm font-semibold text-slate-500 mb-1">{title}</p>
          <div className="flex items-center gap-1.5 mt-3">
            <span className={`inline-block w-2 h-2 rounded-full bg-${color}-500`}></span>
            <p className="text-xs font-medium text-slate-400">
              {subtext}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  </Link>
);

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const output = await getDashboardStats();
      if (output.success) {
        setStats(output.data);
      }
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    } finally {
      setLoading(false);
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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
      </div>
    );
  }

  const { counts, recentActivity } = stats || {};

  const statCards = [
    {
      title: 'Active Projects',
      value: counts?.projects?.total || 0,
      subtext: `${counts?.projects?.published || 0} Published`,
      icon: Briefcase,
      color: 'orange',
      to: '/admin/projects'
    },
    {
      title: 'Services Offered',
      value: counts?.services?.total || 0,
      subtext: `${counts?.services?.published || 0} Live`,
      icon: Layers,
      color: 'blue',
      to: '/admin/services'
    },
    {
      title: 'Testimonials',
      value: counts?.testimonials?.total || 0,
      subtext: `${counts?.testimonials?.published || 0} Visible`,
      icon: MessageSquare,
      color: 'purple',
      to: '/admin/testimonials'
    },
    {
      title: 'Blog Posts',
      value: counts?.blogs?.total || 0,
      subtext: `${counts?.blogs?.published || 0} Published`,
      icon: FileText,
      color: 'emerald',
      to: '/admin/blogs'
    },
    {
      title: 'Inquiries',
      value: counts?.submissions?.total || 0, // Showing total here, subtext shows new
      subtext: `${counts?.submissions?.new || 0} Unread`,
      icon: Mail,
      color: 'red',
      to: '/admin/contact'
    }
  ];

  return (
    <motion.div
      className="space-y-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-2">
        <div>
          <h1 className="text-4xl font-extrabold text-slate-800 tracking-tight">
            Dashboard
          </h1>
          <p className="text-slate-500 text-lg mt-1 font-medium">
            Overview of your platform's performance
          </p>
        </div>
        <div className="text-sm font-medium px-4 py-2 bg-white rounded-full shadow-sm border border-gray-100 text-slate-500">
          {stats?.serverTime ?
            new Date(stats.serverTime).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) :
            new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
          }
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {statCards.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Contact Messages */}
        <motion.div variants={itemVariants} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-50 flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-red-500 rounded-full"></span>
              Recent Inquiries
            </h2>
            <Link to="/admin/contact" className="text-sm font-semibold text-red-600 hover:text-red-700 hover:bg-red-50 px-3 py-1.5 rounded-lg transition-colors">
              View All
            </Link>
          </div>

          <div className="p-1">
            {!recentActivity?.submissions?.length ? (
              <div className="flex flex-col items-center justify-center h-64 text-center p-6">
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                  <Mail className="w-8 h-8 text-gray-300" />
                </div>
                <h3 className="text-slate-800 font-semibold mb-1">No new messages</h3>
                <p className="text-slate-500 text-sm">When clients contact you, looking for work, they'll appear here.</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-50">
                {recentActivity.submissions.map((message) => (
                  <Link
                    key={message._id}
                    to={`/admin/contact`}
                    className="flex items-center gap-4 p-4 hover:bg-slate-50 transition-colors group"
                  >
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center text-slate-600 font-bold text-lg shadow-inner">
                      {message.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="text-slate-900 font-semibold truncate group-hover:text-red-600 transition-colors">
                          {message.name}
                        </h4>
                        <span className="text-xs text-slate-400 font-medium whitespace-nowrap">
                          {getTimeAgo(message.submittedAt)}
                        </span>
                      </div>
                      <p className="text-sm text-slate-500 truncate">
                        {message.service || 'General Inquiry'}
                      </p>
                    </div>
                    {message.status === 'new' && (
                      <div className="w-2.5 h-2.5 bg-red-500 rounded-full ring-4 ring-white shadow-sm"></div>
                    )}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </motion.div>

        {/* Recent Blogs Activity */}
        <motion.div variants={itemVariants} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-50 flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-emerald-500 rounded-full"></span>
              Latest Blogs
            </h2>
            <Link to="/admin/blogs" className="text-sm font-semibold text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 px-3 py-1.5 rounded-lg transition-colors">
              Manage Blogs
            </Link>
          </div>

          <div className="p-1">
            {!recentActivity?.blogs?.length ? (
              <div className="flex flex-col items-center justify-center h-64 text-center p-6">
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                  <FileText className="w-8 h-8 text-gray-300" />
                </div>
                <h3 className="text-slate-800 font-semibold mb-1">No blog posts yet</h3>
                <p className="text-slate-500 text-sm">Start writing articles to engage your audience.</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-50">
                {recentActivity.blogs.map((blog) => (
                  <Link
                    key={blog._id}
                    to={`/admin/blogs`}
                    className="flex items-center gap-4 p-4 hover:bg-slate-50 transition-colors group"
                  >
                    <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center shadow-sm ${blog.published ? 'bg-emerald-50 text-emerald-600' : 'bg-yellow-50 text-yellow-600'}`}>
                      <FileText className="w-6 h-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-slate-900 font-semibold truncate group-hover:text-emerald-600 transition-colors">
                        {blog.title}
                      </h4>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${blog.published ? 'bg-emerald-100 text-emerald-700' : 'bg-yellow-100 text-yellow-700'}`}>
                          {blog.published ? 'Published' : 'Draft'}
                        </span>
                        <span className="text-xs text-slate-400">
                          • {getTimeAgo(blog.createdAt)}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Dashboard;

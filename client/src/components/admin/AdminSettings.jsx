import React, { useEffect, useState } from 'react';

const defaultSettings = {
  brandName: 'Blitz India Engineering',
  tagline: 'Engineering Excellence Delivered',
  theme: 'light',
  primaryColor: '#EA580C', // orange-600
  contactEmail: 'info@blitzindiaengineering.com',
  contactPhone: '+91-9158575785',
};

const loadSettings = () => {
  try {
    const raw = localStorage.getItem('admin.settings');
    return raw ? JSON.parse(raw) : defaultSettings;
  } catch (e) {
    return defaultSettings;
  }
};

const saveSettings = (settings) => {
  localStorage.setItem('admin.settings', JSON.stringify(settings));
};

const AdminSettings = () => {
  const [settings, setSettings] = useState(defaultSettings);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setSettings(loadSettings());
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings((s) => ({ ...s, [name]: value }));
    setSaved(false);
  };

  const handleThemeToggle = (theme) => {
    setSettings((s) => ({ ...s, theme }));
    setSaved(false);
  };

  const handleSave = (e) => {
    e.preventDefault();
    saveSettings(settings);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 via-orange-700 to-orange-800 bg-clip-text text-transparent mb-2">
          Settings
        </h1>
        <p className="text-gray-600 text-lg">Manage your site settings and preferences</p>
      </div>

      {saved && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-xl shadow-sm">
          <div className="flex items-center">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Settings saved successfully.
          </div>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-8">
        {/* Branding */}
        <section className="bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Branding</h2>
            <div className="w-12 h-1 bg-gradient-to-r from-orange-600 to-orange-700 rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Brand Name</label>
              <input 
                name="brandName" 
                value={settings.brandName} 
                onChange={handleChange} 
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Tagline</label>
              <input 
                name="tagline" 
                value={settings.tagline} 
                onChange={handleChange} 
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
              />
            </div>
          </div>
        </section>

        {/* Theme */}
        <section className="bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Theme</h2>
            <div className="w-12 h-1 bg-gradient-to-r from-orange-600 to-orange-700 rounded-full"></div>
          </div>
          <div className="flex items-center gap-4">
            <button 
              type="button" 
              onClick={() => handleThemeToggle('light')} 
              className={`px-6 py-3 rounded-xl border-2 font-semibold transition-all ${
                settings.theme === 'light' 
                  ? 'bg-gradient-to-r from-orange-600 to-orange-700 text-white border-orange-600 shadow-lg' 
                  : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
              }`}
            >
              Light
            </button>
            <button 
              type="button" 
              onClick={() => handleThemeToggle('dark')} 
              className={`px-6 py-3 rounded-xl border-2 font-semibold transition-all ${
                settings.theme === 'dark' 
                  ? 'bg-gradient-to-r from-orange-600 to-orange-700 text-white border-orange-600 shadow-lg' 
                  : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
              }`}
            >
              Dark
            </button>
            <div className="ml-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Primary Color</label>
              <div className="flex items-center gap-3">
                <input 
                  type="color" 
                  name="primaryColor" 
                  value={settings.primaryColor} 
                  onChange={handleChange} 
                  className="w-16 h-12 p-1 border-2 border-gray-300 rounded-xl cursor-pointer"
                />
                <span className="text-sm text-gray-600 font-mono">{settings.primaryColor}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Info */}
        <section className="bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Contact Information</h2>
            <div className="w-12 h-1 bg-gradient-to-r from-orange-600 to-orange-700 rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
              <input 
                name="contactEmail" 
                type="email"
                value={settings.contactEmail} 
                onChange={handleChange} 
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Phone</label>
              <input 
                name="contactPhone" 
                type="tel"
                value={settings.contactPhone} 
                onChange={handleChange} 
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
              />
            </div>
          </div>
        </section>

        <div className="flex justify-end">
          <button 
            type="submit" 
            className="px-8 py-3 bg-gradient-to-r from-orange-600 to-orange-700 text-white font-semibold rounded-xl hover:from-orange-700 hover:to-orange-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Save Settings
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminSettings;

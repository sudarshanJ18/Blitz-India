import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const SettingsContext = createContext();

export const useSettings = () => {
    const context = useContext(SettingsContext);
    if (!context) {
        throw new Error('useSettings must be used within a SettingsProvider');
    }
    return context;
};

export const SettingsProvider = ({ children }) => {
    const [settings, setSettings] = useState({
        companyName: 'Blitz India Engineering',
        tagline: 'Engineering Excellence for Global Industries',
        description: 'Comprehensive design, FEA, and documentation services',
        email: 'info@blitzindiaengineering.com',
        phone: '+91-91585-75785',
        address: {
            city: 'Pune',
            state: 'Maharashtra',
            country: 'India'
        },
        socialLinks: {},
        logo: null
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/api/settings/public`
            );
            if (response.data.success) {
                setSettings(response.data.data);
            }
        } catch (error) {
            console.error('Failed to fetch settings:', error);
            // Keep default settings if fetch fails
        } finally {
            setLoading(false);
        }
    };

    const refreshSettings = () => {
        fetchSettings();
    };

    return (
        <SettingsContext.Provider value={{ settings, loading, refreshSettings }}>
            {children}
        </SettingsContext.Provider>
    );
};

import React, { createContext, useState, useEffect, useCallback } from 'react';
import { getCurrentUser, logout as authLogout, isAuthenticated, getStoredUser, storeAuthData } from '../services/auth.service';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAuth, setIsAuth] = useState(false);

    
    useEffect(() => {
        const initAuth = async () => {
            try {
                if (isAuthenticated()) {
                    const storedUser = getStoredUser();
                    if (storedUser) {
                        setUser(storedUser);
                        setIsAuth(true);

                        
                        try {
                            const currentUser = await getCurrentUser();
                            setUser(currentUser.admin);
                            storeAuthData(null, currentUser.admin);
                        } catch (error) {
                            console.error('Token verification failed:', error);
                            logout();
                        }
                    }
                }
            } catch (error) {
                console.error('Auth initialization error:', error);
                logout();
            } finally {
                setLoading(false);
            }
        };

        initAuth();
    }, []);

    const login = useCallback((token, userData) => {
        storeAuthData(token, userData);
        setUser(userData);
        setIsAuth(true);
    }, []);

    const logout = useCallback(() => {
        authLogout();
        setUser(null);
        setIsAuth(false);
    }, []);

    const updateUser = useCallback((userData) => {
        setUser(userData);
        storeAuthData(null, userData);
    }, []);

    const value = {
        user,
        isAuth,
        loading,
        login,
        logout,
        updateUser,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

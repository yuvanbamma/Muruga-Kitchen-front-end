import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../utils/api';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('muruga-auth-token');
        const role = localStorage.getItem('muruga-user-role');
        const email = localStorage.getItem('muruga-user-email');

        const userId = localStorage.getItem('muruga-user-id');
        const orphanageId = localStorage.getItem('muruga-user-orphanage-id');

        if (token && role) {
            setUser({ token, role, email, userId, orphanageId });
        }
        setLoading(false);
    }, []);

    const login = async (credentials) => {
        try {
            const data = await api.post('/auth/login', credentials);
            const { token, roleName, userId, orphanageId } = data;
            const role = roleName; // Backend returns roleName

            localStorage.setItem('muruga-auth-token', token);
            localStorage.setItem('muruga-user-role', role);
            localStorage.setItem('muruga-user-email', credentials.email);

            if (userId) localStorage.setItem('muruga-user-id', userId);
            if (orphanageId) localStorage.setItem('muruga-user-orphanage-id', orphanageId);

            setUser({ token, role, email: credentials.email, userId, orphanageId });
            return { success: true, role };
        } catch (error) {
            return { success: false, message: error.message };
        }
    };

    const signup = async (userData, role) => {
        const endpoint = role === 'MISSION_HERO'
            ? '/auth/registry/food-donor'
            : '/auth/registry/orphanage';

        try {
            await api.post(endpoint, userData);
            return { success: true };
        } catch (error) {
            return { success: false, message: error.message };
        }
    };

    const logout = () => {
        localStorage.removeItem('muruga-auth-token');
        localStorage.removeItem('muruga-user-role');
        localStorage.removeItem('muruga-user-email');
        localStorage.removeItem('muruga-user-id');
        localStorage.removeItem('muruga-user-orphanage-id');
        setUser(null);
    };

    const value = {
        user,
        loading,
        login,
        signup,
        logout,
        isAuthenticated: !!user,
        isHero: user?.role === 'FOOD_DONATOR',
        isOrphanage: user?.role === 'ORPHANAGE'
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

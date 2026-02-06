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

        if (token && role) {
            setUser({ token, role, email });
        }
        setLoading(false);
    }, []);

    const login = async (credentials) => {
        try {
            const data = await api.post('/auth/login', credentials);
            const { token, role } = data; // Backend returns token and role

            localStorage.setItem('muruga-auth-token', token);
            localStorage.setItem('muruga-user-role', role);
            localStorage.setItem('muruga-user-email', credentials.email);

            setUser({ token, role, email: credentials.email });
            return { success: true };
        } catch (error) {
            return { success: false, message: error.message };
        }
    };

    const signup = async (userData, role) => {
        const endpoint = role === 'FOOD_DONATOR'
            ? '/auth/registry/food-donor'
            : '/auth/registry/food-delivery-boy';

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
        setUser(null);
    };

    const value = {
        user,
        loading,
        login,
        signup,
        logout,
        isAuthenticated: !!user,
        isDonor: user?.role === 'FOOD_DONATOR',
        isDeliveryBoy: user?.role === 'FOOD_DELIVERY_BOY'
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

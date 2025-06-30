/**
 * @fileoverview React Context for managing global authentication state.
 * @description Provides user and token state, along with login/logout functions,
 * to the entire application. It also persists the user session in localStorage.
 */

'use client';

import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

// Create the context
const AuthContext = createContext();

// Create a provider component
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    // useEffect to check for a user session in localStorage when the app loads
    useEffect(() => {
        const storedUser = localStorage.getItem('reacherUser');
        const storedToken = localStorage.getItem('reacherToken');

        if (storedUser && storedToken) {
            setUser(JSON.parse(storedUser));
            setToken(storedToken);
        }
        setLoading(false);
    }, []);

    // Login function
    const login = (userData, userToken) => {
        setUser(userData);
        setToken(userToken);
        localStorage.setItem('reacherUser', JSON.stringify(userData));
        localStorage.setItem('reacherToken', userToken);
    };

    // Logout function
    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('reacherUser');
        localStorage.removeItem('reacherToken');
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to easily use the AuthContext
export const useAuth = () => {
    return useContext(AuthContext);
};

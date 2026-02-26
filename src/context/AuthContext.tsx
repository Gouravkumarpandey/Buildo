'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

interface User {
    id: string;
    name: string;
    email: string;
    role: string;
}

interface AuthContextType {
    user: User | null;
    token: string | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (name: string, email: string, password: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const stored = localStorage.getItem('autodeploy_token');
        const storedUser = localStorage.getItem('autodeploy_user');
        if (stored && storedUser) {
            setToken(stored);
            setUser(JSON.parse(storedUser));
            axios.defaults.headers.common['Authorization'] = `Bearer ${stored}`;
        }
        setLoading(false);
    }, []);

    const login = useCallback(async (email: string, password: string) => {
        const { data } = await axios.post(`${API}/api/auth/login`, { email, password });
        setToken(data.token);
        setUser(data.user);
        localStorage.setItem('autodeploy_token', data.token);
        localStorage.setItem('autodeploy_user', JSON.stringify(data.user));
        axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
    }, []);

    const register = useCallback(async (name: string, email: string, password: string) => {
        await axios.post(`${API}/api/auth/register`, { name, email, password });
    }, []);

    const logout = useCallback(() => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('autodeploy_token');
        localStorage.removeItem('autodeploy_user');
        delete axios.defaults.headers.common['Authorization'];
    }, []);

    return (
        <AuthContext.Provider value={{ user, token, loading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
    return ctx;
};

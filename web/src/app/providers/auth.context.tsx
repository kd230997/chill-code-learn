'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@/domains/user';
import { authUseCase } from '@/di/container';
import { useRouter } from 'next/navigation';

interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (email: string, password: string, name?: string) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [mounted, setMounted] = useState(false);
    const router = useRouter();

    // Ensure we only run client-side code after mounting
    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted) return;

        async function init() {
            try {
                const current = await authUseCase.getCurrentUser();
                setUser(current);
            } catch (e) {
                console.error('Failed to load user', e);
            } finally {
                setLoading(false);
            }
        }
        init();
    }, [mounted]);

    const login = async (email: string, password: string) => {
        const loggedInUser = await authUseCase.login(email, password);
        setUser(loggedInUser);
        router.push('/');
    };

    const register = async (email: string, password: string, name?: string) => {
        const registeredUser = await authUseCase.register(email, password, name);
        if (registeredUser) {
            setUser(registeredUser);
            router.push('/');
        }
    };

    const logout = async () => {
        await authUseCase.logout();
        setUser(null);
        router.push('/login');
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

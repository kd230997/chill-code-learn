'use client';

import { useState, useEffect } from 'react';
import { Navbar, ThemeToggle } from '@shared/components';
import { useAuth } from '@/app/providers/auth.context';

/**
 * Client-side container that connects the pure Navbar component
 * with the auth context and handles hydration.
 */
export function NavbarContainer() {
    const [mounted, setMounted] = useState(false);
    const { user, logout, loading } = useAuth();

    useEffect(() => {
        setMounted(true);
    }, []);

    // Prevent hydration mismatch by showing loading state until mounted
    if (!mounted) {
        return <Navbar user={null} loading={true} />;
    }

    return (
        <Navbar
            user={user}
            loading={loading}
            onLogout={logout}
            themeToggle={<ThemeToggle />}
        />
    );
}

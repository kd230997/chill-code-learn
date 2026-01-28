'use client';

import React, { createContext, useContext, useCallback, useState, useEffect, useSyncExternalStore } from 'react';
import { Toast, ToastContainer, ToastData, ToastType } from '@shared/components';

// ==============================================
// Toast Manager (State Management)
// ==============================================
type ToastListener = () => void;

class ToastManager {
    private toasts: ToastData[] = [];
    private listeners: Set<ToastListener> = new Set();

    subscribe(listener: ToastListener) {
        this.listeners.add(listener);
        return () => { this.listeners.delete(listener); };
    }

    getSnapshot() {
        return this.toasts;
    }

    private notify() {
        this.listeners.forEach(listener => listener());
    }

    addToast(toast: ToastData) {
        this.toasts = [...this.toasts, toast];
        this.notify();
    }

    removeToast(id: string) {
        this.toasts = this.toasts.filter(t => t.id !== id);
        this.notify();
    }

    show(message: string, type: ToastType = 'info', duration: number = 5000) {
        const toast: ToastData = {
            id: Math.random().toString(36).substring(2, 9),
            message,
            type,
            duration,
        };
        this.addToast(toast);
    }

    success(message: string, duration?: number) {
        this.show(message, 'success', duration);
    }

    error(message: string, duration?: number) {
        this.show(message, 'error', duration);
    }

    info(message: string, duration?: number) {
        this.show(message, 'info', duration);
    }

    warning(message: string, duration?: number) {
        this.show(message, 'warning', duration);
    }
}

// Singleton instance (exported for non-hook consumers like http-client)
export const toastManager = new ToastManager();

// ==============================================
// Toast Item Wrapper (handles auto-dismiss timer)
// ==============================================
interface ToastItemWrapperProps {
    toast: ToastData;
    onRemove: (id: string) => void;
}

function ToastItemWrapper({ toast, onRemove }: ToastItemWrapperProps) {
    const [isExiting, setIsExiting] = useState(false);

    const handleRemove = useCallback(() => {
        setIsExiting(true);
        setTimeout(() => onRemove(toast.id), 300);
    }, [toast.id, onRemove]);

    useEffect(() => {
        const timer = setTimeout(handleRemove, toast.duration || 5000);
        return () => clearTimeout(timer);
    }, [toast.duration, handleRemove]);

    return (
        <Toast
            toast={toast}
            isExiting={isExiting}
            onClose={handleRemove}
        />
    );
}

// ==============================================
// Toast Context
// ==============================================
interface ToastContextValue {
    show: (message: string, type?: ToastType, duration?: number) => void;
    success: (message: string, duration?: number) => void;
    error: (message: string, duration?: number) => void;
    info: (message: string, duration?: number) => void;
    warning: (message: string, duration?: number) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

// ==============================================
// Toast Provider
// ==============================================
const subscribe = (callback: () => void) => toastManager.subscribe(callback);
const getSnapshot = () => toastManager.getSnapshot();
const EMPTY_TOASTS: ToastData[] = [];
const getServerSnapshot = () => EMPTY_TOASTS;

export interface ToastProviderProps {
    children: React.ReactNode;
}

export function ToastProvider({ children }: ToastProviderProps) {
    const toasts = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const removeToast = useCallback((id: string) => {
        toastManager.removeToast(id);
    }, []);

    const contextValue: ToastContextValue = {
        show: toastManager.show.bind(toastManager),
        success: toastManager.success.bind(toastManager),
        error: toastManager.error.bind(toastManager),
        info: toastManager.info.bind(toastManager),
        warning: toastManager.warning.bind(toastManager),
    };

    return (
        <ToastContext.Provider value={contextValue}>
            {children}
            {mounted && toasts.length > 0 && (
                <ToastContainer>
                    {toasts.map((toast) => (
                        <ToastItemWrapper key={toast.id} toast={toast} onRemove={removeToast} />
                    ))}
                </ToastContainer>
            )}
        </ToastContext.Provider>
    );
}

// ==============================================
// useToast Hook
// ==============================================
export function useToast(): ToastContextValue {
    const context = useContext(ToastContext);
    if (!context) {
        // Fallback to toastManager if used outside provider
        return {
            show: toastManager.show.bind(toastManager),
            success: toastManager.success.bind(toastManager),
            error: toastManager.error.bind(toastManager),
            info: toastManager.info.bind(toastManager),
            warning: toastManager.warning.bind(toastManager),
        };
    }
    return context;
}

import Cookies from 'js-cookie';
import { toastManager } from '@/app/providers/toast.context';

const BASE_URL = 'http://localhost:3001';

class HttpClient {
    private getHeaders() {
        const token = typeof window !== 'undefined' ? Cookies.get('auth_token') : null;
        return {
            'Content-Type': 'application/json',
            ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
        };
    }

    private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T | null> {
        const url = endpoint.startsWith('http') ? endpoint : `${BASE_URL}${endpoint}`;
        try {
            const response = await fetch(url, {
                ...options,
                headers: {
                    ...this.getHeaders(),
                    ...options.headers,
                },
            });

            // Handle non-ok responses
            if (!response.ok) {
                if (response.status === 401) {
                    if (typeof window !== 'undefined') {
                        Cookies.remove('auth_token');
                        Cookies.remove('user_data');
                        // Use window.location for a full refresh/redirect if not already on login
                        if (!window.location.pathname.includes('/login')) {
                            window.location.href = '/login';
                        }
                    }
                }

                const errorData = await response.json().catch(() => ({ message: 'An error occurred' }));
                const errorMessage = `${response.status} | ${errorData.message || 'An error occurred'}`;
                toastManager.error(errorMessage);

                return null;
            }

            if (response.status === 204) return {} as T;

            const data = await response.json();

            // Show success toast if server returns a message (common in POST/PATCH/DELETE)
            if (data && typeof data === 'object' && 'message' in data && typeof data.message === 'string') {
                toastManager.success(data.message);
            }

            return data;
        } catch (error) {
            // Only show toast here if it wasn't already shown above (e.g. network error)
            if (error instanceof TypeError && error.message === 'Failed to fetch') {
                toastManager.error('Network error: Could not connect to the server');
            }

            return null;
        }
    }

    async get<T>(endpoint: string): Promise<T | null> {
        return this.request<T>(endpoint, { method: 'GET' });
    }

    async post<T>(endpoint: string, body: any): Promise<T | null> {
        return this.request<T>(endpoint, {
            method: 'POST',
            body: JSON.stringify(body),
        });
    }

    async patch<T>(endpoint: string, body: any): Promise<T | null> {
        return this.request<T>(endpoint, {
            method: 'PATCH',
            body: JSON.stringify(body),
        });
    }

    async delete(endpoint: string): Promise<void> {
        await this.request<void>(endpoint, { method: 'DELETE' });
    }
}

export const httpClient = new HttpClient();

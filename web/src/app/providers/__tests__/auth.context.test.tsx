import { render, screen, act, waitFor } from '@testing-library/react';
import { AuthProvider, useAuth } from '../auth.context';
import { authUseCase } from '@/di/container';
import { useRouter } from 'next/navigation';

// Mock dependencies
jest.mock('@/di/container', () => ({
    authUseCase: {
        getCurrentUser: jest.fn(),
        login: jest.fn(),
        register: jest.fn(),
        logout: jest.fn(),
    },
}));

jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
}));

const TestComponent = () => {
    const { user, loading, login, logout } = useAuth();
    return (
        <div>
            <div data-testid="loading">{loading.toString()}</div>
            <div data-testid="user">{user ? user.email : 'null'}</div>
            <button data-testid="login-btn" onClick={() => login('test@test.com', 'pass')}>Login</button>
            <button data-testid="logout-btn" onClick={() => logout()}>Logout</button>
        </div>
    );
};

describe('AuthContext', () => {
    const mockPush = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
        (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
        // Default mock for init
        (authUseCase.getCurrentUser as jest.Mock).mockResolvedValue(null);
    });

    it('initializes with null user if no session', async () => {
        render(
            <AuthProvider>
                <TestComponent />
            </AuthProvider>
        );

        expect(screen.getByTestId('loading')).toHaveTextContent('true');

        await waitFor(() => {
            expect(screen.getByTestId('loading')).toHaveTextContent('false');
            expect(screen.getByTestId('user')).toHaveTextContent('null');
        });
    });

    it('initializes with current user if session exists', async () => {
        const mockUser = { id: '1', email: 'test@test.com' };
        (authUseCase.getCurrentUser as jest.Mock).mockResolvedValue(mockUser);

        render(
            <AuthProvider>
                <TestComponent />
            </AuthProvider>
        );

        await waitFor(() => {
            expect(screen.getByTestId('user')).toHaveTextContent('test@test.com');
            expect(screen.getByTestId('loading')).toHaveTextContent('false');
        });
    });

    it('handles login successfully', async () => {
        const mockUser = { id: '1', email: 'test@test.com' };
        (authUseCase.login as jest.Mock).mockResolvedValue(mockUser);

        render(
            <AuthProvider>
                <TestComponent />
            </AuthProvider>
        );

        // Wait for init to finish
        await waitFor(() => expect(screen.getByTestId('loading')).toHaveTextContent('false'));

        act(() => {
            screen.getByTestId('login-btn').click();
        });

        await waitFor(() => {
            expect(authUseCase.login).toHaveBeenCalledWith('test@test.com', 'pass');
            expect(screen.getByTestId('user')).toHaveTextContent('test@test.com');
            expect(mockPush).toHaveBeenCalledWith('/');
        });
    });

    it('handles logout successfully', async () => {
        const mockUser = { id: '1', email: 'test@test.com' };
        (authUseCase.getCurrentUser as jest.Mock).mockResolvedValue(mockUser);

        render(
            <AuthProvider>
                <TestComponent />
            </AuthProvider>
        );

        await waitFor(() => expect(screen.getByTestId('user')).toHaveTextContent('test@test.com'));

        act(() => {
            screen.getByTestId('logout-btn').click();
        });

        await waitFor(() => {
            expect(authUseCase.logout).toHaveBeenCalledTimes(1);
            expect(screen.getByTestId('user')).toHaveTextContent('null');
            expect(mockPush).toHaveBeenCalledWith('/login');
        });
    });
});

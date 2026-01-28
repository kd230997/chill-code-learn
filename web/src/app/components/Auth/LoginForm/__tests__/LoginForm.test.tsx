import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { LoginForm } from '../LoginForm';
import { useAuth } from '@/app/providers/auth.context';

// Mock useAuth
jest.mock('@/app/providers/auth.context', () => ({
    useAuth: jest.fn(),
}));

// Mock next/link
jest.mock('next/link', () => {
    return ({ children, href }: { children: React.ReactNode; href: string }) => {
        return <a href={href}>{children}</a>;
    };
});

// Mock @shared/components
jest.mock('@shared/components', () => ({
    Input: ({ label, onChange, value, id, placeholder }: any) => (
        <div>
            <label>{label}</label>
            <input
                data-testid={`input-${id}`}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
            />
        </div>
    ),
    Button: ({ children, disabled }: any) => (
        <button disabled={disabled}>{children}</button>
    ),
    Card: ({ children }: any) => <div>{children}</div>,
    Icon: () => <div data-testid="icon" />,
}));

describe('LoginForm', () => {
    const mockLogin = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
        (useAuth as jest.Mock).mockReturnValue({
            login: mockLogin,
        });
    });

    it('renders login form correctly', () => {
        render(<LoginForm />);
        expect(screen.getByText('Welcome Back')).toBeInTheDocument();
        expect(screen.getByTestId('input-login-email')).toBeInTheDocument();
        expect(screen.getByTestId('input-login-password')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Begin Session' })).toBeInTheDocument();
    });

    it('updates input values on change', () => {
        render(<LoginForm />);
        const emailInput = screen.getByTestId('input-login-email') as HTMLInputElement;
        const passwordInput = screen.getByTestId('input-login-password') as HTMLInputElement;

        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'password123' } });

        expect(emailInput.value).toBe('test@example.com');
        expect(passwordInput.value).toBe('password123');
    });

    it('calls login function on submit', async () => {
        render(<LoginForm />);
        const emailInput = screen.getByTestId('input-login-email');
        const passwordInput = screen.getByTestId('input-login-password');
        const submitButton = screen.getByRole('button', { name: 'Begin Session' });

        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'password123' } });
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(mockLogin).toHaveBeenCalledWith('test@example.com', 'password123');
        });
    });

    it('displays error message on login failure', async () => {
        mockLogin.mockRejectedValue(new Error('Invalid credentials'));
        render(<LoginForm />);

        const submitButton = screen.getByRole('button', { name: 'Begin Session' });
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText('Invalid credentials')).toBeInTheDocument();
        });
    });

    it('shows loading state during submission', async () => {
        mockLogin.mockImplementation(() => new Promise(resolve => setTimeout(resolve, 100)));
        render(<LoginForm />);

        const submitButton = screen.getByRole('button', { name: 'Begin Session' });
        fireEvent.click(submitButton);

        expect(screen.getByText('Signing in...')).toBeInTheDocument();
        expect(submitButton).toBeDisabled();
    });
});

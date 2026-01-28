import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { RegisterForm } from '../RegisterForm';
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

describe('RegisterForm', () => {
    const mockRegister = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
        (useAuth as jest.Mock).mockReturnValue({
            register: mockRegister,
        });
    });

    it('renders register form correctly', () => {
        render(<RegisterForm />);
        expect(screen.getByText('Create Account')).toBeInTheDocument();
        expect(screen.getByTestId('input-register-name')).toBeInTheDocument();
        expect(screen.getByTestId('input-register-email')).toBeInTheDocument();
        expect(screen.getByTestId('input-register-password')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Get Started' })).toBeInTheDocument();
    });

    it('updates input values on change', () => {
        render(<RegisterForm />);
        const nameInput = screen.getByTestId('input-register-name') as HTMLInputElement;
        const emailInput = screen.getByTestId('input-register-email') as HTMLInputElement;
        const passwordInput = screen.getByTestId('input-register-password') as HTMLInputElement;

        fireEvent.change(nameInput, { target: { value: 'John Doe' } });
        fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'password123' } });

        expect(nameInput.value).toBe('John Doe');
        expect(emailInput.value).toBe('john@example.com');
        expect(passwordInput.value).toBe('password123');
    });

    it('calls register function on submit', async () => {
        render(<RegisterForm />);
        const nameInput = screen.getByTestId('input-register-name');
        const emailInput = screen.getByTestId('input-register-email');
        const passwordInput = screen.getByTestId('input-register-password');
        const submitButton = screen.getByRole('button', { name: 'Get Started' });

        fireEvent.change(nameInput, { target: { value: 'John Doe' } });
        fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'password123' } });
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(mockRegister).toHaveBeenCalledWith('john@example.com', 'password123', 'John Doe');
        });
    });

    it('displays error message on registration failure', async () => {
        mockRegister.mockRejectedValue(new Error('Email already exists'));
        render(<RegisterForm />);

        const submitButton = screen.getByRole('button', { name: 'Get Started' });
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText('Email already exists')).toBeInTheDocument();
        });
    });
});

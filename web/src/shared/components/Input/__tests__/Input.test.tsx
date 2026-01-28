import { render, screen, fireEvent } from '@testing-library/react';
import { Input } from '../Input';

describe('Input', () => {
    it('renders label correctly', () => {
        render(<Input label="Username" />);
        expect(screen.getByText('Username')).toBeInTheDocument();
    });

    it('renders input element with correct type', () => {
        render(<Input type="password" placeholder="Password" />);
        const input = screen.getByPlaceholderText('Password');
        expect(input).toHaveAttribute('type', 'password');
    });

    it('displays error message and applies error class', () => {
        render(<Input error="Invalid email" />);
        expect(screen.getByText('Invalid email')).toBeInTheDocument();
        expect(screen.getByRole('textbox')).toHaveClass('error');
    });

    it('handles onChange events', () => {
        const handleChange = jest.fn();
        render(<Input onChange={handleChange} placeholder="Type here" />);

        const input = screen.getByPlaceholderText('Type here');
        fireEvent.change(input, { target: { value: 'test value' } });

        expect(handleChange).toHaveBeenCalledTimes(1);
        expect((input as HTMLInputElement).value).toBe('test value');
    });

    it('is disabled when disabled prop is true', () => {
        render(<Input disabled />);
        expect(screen.getByRole('textbox')).toBeDisabled();
    });
});

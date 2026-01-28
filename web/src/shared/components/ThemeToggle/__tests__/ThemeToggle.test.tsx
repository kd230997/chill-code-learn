import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeToggle } from '../ThemeToggle';
import { useTheme } from '@/app/providers/theme.context';

// Mock useTheme hook
jest.mock('@/app/providers/theme.context', () => ({
    useTheme: jest.fn(),
}));

describe('ThemeToggle', () => {
    const mockToggleTheme = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders correctly in light mode', () => {
        (useTheme as jest.Mock).mockReturnValue({
            theme: 'light',
            toggleTheme: mockToggleTheme,
        });

        render(<ThemeToggle />);

        const button = screen.getByRole('button');
        expect(button).toHaveAttribute('aria-label', 'Switch to dark theme');
        expect(screen.getByText('☀️')).toHaveClass('active');
        expect(screen.getByText('🌙')).not.toHaveClass('active');
    });

    it('renders correctly in dark mode', () => {
        (useTheme as jest.Mock).mockReturnValue({
            theme: 'dark',
            toggleTheme: mockToggleTheme,
        });

        render(<ThemeToggle />);

        const button = screen.getByRole('button');
        expect(button).toHaveAttribute('aria-label', 'Switch to light theme');
        expect(screen.getByText('🌙')).toHaveClass('active');
        expect(screen.getByText('☀️')).not.toHaveClass('active');
    });

    it('calls toggleTheme when clicked', () => {
        (useTheme as jest.Mock).mockReturnValue({
            theme: 'light',
            toggleTheme: mockToggleTheme,
        });

        render(<ThemeToggle />);

        fireEvent.click(screen.getByRole('button'));
        expect(mockToggleTheme).toHaveBeenCalledTimes(1);
    });
});

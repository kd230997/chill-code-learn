import { render, screen, act } from '@testing-library/react';
import { ThemeProvider, useTheme } from '../theme.context';
import React from 'react';

const TestComponent = () => {
    const { theme, toggleTheme } = useTheme();
    return (
        <div>
            <div data-testid="theme">{theme}</div>
            <button data-testid="toggle-btn" onClick={toggleTheme}>Toggle</button>
        </div>
    );
};

describe('ThemeContext', () => {
    beforeEach(() => {
        localStorage.clear();
        jest.clearAllMocks();

        // Mock matchMedia
        Object.defineProperty(window, 'matchMedia', {
            writable: true,
            configurable: true,
            value: jest.fn().mockImplementation(query => ({
                matches: false,
                media: query,
                onchange: null,
                addListener: jest.fn(),
                removeListener: jest.fn(),
                addEventListener: jest.fn(),
                removeEventListener: jest.fn(),
                dispatchEvent: jest.fn(),
            })),
        });

        // Mock documentElement classList
        document.documentElement.className = '';
    });

    it('initializes with light theme if no preference saved and system is light', () => {
        render(
            <ThemeProvider>
                <TestComponent />
            </ThemeProvider>
        );
        expect(screen.getByTestId('theme')).toHaveTextContent('light');
    });

    it('initializes with dark theme if system preference is dark', () => {
        Object.defineProperty(window, 'matchMedia', {
            writable: true,
            configurable: true,
            value: jest.fn().mockImplementation(query => ({
                matches: query === '(prefers-color-scheme: dark)',
                media: query,
            })),
        });

        render(
            <ThemeProvider>
                <TestComponent />
            </ThemeProvider>
        );
        expect(screen.getByTestId('theme')).toHaveTextContent('dark');
    });

    it('initializes with saved theme from localStorage', () => {
        localStorage.setItem('chill-code-theme', 'dark');

        render(
            <ThemeProvider>
                <TestComponent />
            </ThemeProvider>
        );
        expect(screen.getByTestId('theme')).toHaveTextContent('dark');
    });

    it('toggles theme and updates document attributes and localStorage', () => {
        render(
            <ThemeProvider>
                <TestComponent />
            </ThemeProvider>
        );

        const toggleBtn = screen.getByTestId('toggle-btn');

        act(() => {
            toggleBtn.click();
        });

        expect(screen.getByTestId('theme')).toHaveTextContent('dark');
        expect(localStorage.getItem('chill-code-theme')).toBe('dark');
        expect(document.documentElement.classList.contains('dark')).toBe(true);

        act(() => {
            toggleBtn.click();
        });

        expect(screen.getByTestId('theme')).toHaveTextContent('light');
        expect(localStorage.getItem('chill-code-theme')).toBe('light');
        expect(document.documentElement.classList.contains('light')).toBe(true);
    });
});

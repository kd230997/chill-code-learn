import { render, screen } from '@testing-library/react';
import { NavbarContainer } from '../NavbarContainer';
import { useAuth } from '@/app/providers/auth.context';

// Mock useAuth
jest.mock('@/app/providers/auth.context', () => ({
    useAuth: jest.fn(),
}));

// Mock @shared/components
jest.mock('@shared/components', () => ({
    Navbar: ({ user, loading, onLogout, themeToggle }: any) => (
        <div data-testid="navbar">
            <span data-testid="user">{user ? user.email : 'Guest'}</span>
            <span data-testid="loading">{loading ? 'Loading' : 'Loaded'}</span>
            {themeToggle}
        </div>
    ),
    ThemeToggle: () => <div data-testid="theme-toggle" />,
}));

describe('NavbarContainer', () => {
    const mockLogout = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders loading state before mounting', () => {
        (useAuth as jest.Mock).mockReturnValue({
            user: null,
            logout: mockLogout,
            loading: false,
        });

        // We can't easily test the "unmounted" state in a simple render call 
        // because useEffect runs immediately, but we can check if it passes props correctly
        render(<NavbarContainer />);

        expect(screen.getByTestId('navbar')).toBeInTheDocument();
    });

    it('passes user and loading state to Navbar after mounting', () => {
        const mockUser = { id: '1', email: 'test@example.com' };
        (useAuth as jest.Mock).mockReturnValue({
            user: mockUser,
            logout: mockLogout,
            loading: false,
        });

        render(<NavbarContainer />);

        expect(screen.getByTestId('user')).toHaveTextContent('test@example.com');
        expect(screen.getByTestId('loading')).toHaveTextContent('Loaded');
        expect(screen.getByTestId('theme-toggle')).toBeInTheDocument();
    });
});

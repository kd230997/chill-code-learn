import { render, screen, fireEvent } from '@testing-library/react';
import { Navbar } from '../Navbar';

// Mock next/link
jest.mock('next/link', () => {
    return ({ children, href }: { children: React.ReactNode; href: string }) => {
        return <a href={href}>{children}</a>;
    };
});

// Mock next/image
jest.mock('next/image', () => {
    return (props: any) => {
        // eslint-disable-next-line @next/next/no-img-element
        return <img {...props} alt={props.alt} />;
    };
});

// Mock @shared/components
jest.mock('@shared/components', () => ({
    Button: ({ children, onClick, className }: any) => (
        <button onClick={onClick} className={className}>
            {children}
        </button>
    ),
}));

describe('Navbar', () => {
    const mockUser = {
        id: '1',
        email: 'test@example.com',
        name: 'Test User',
    };

    it('renders logo and application name', () => {
        render(<Navbar user={null} />);
        expect(screen.getByText('Chill Code Learn')).toBeInTheDocument();
        expect(screen.getByAltText('Chill Code Learn Logo')).toBeInTheDocument();
    });

    it('renders login and signup links when user is not logged in', () => {
        render(<Navbar user={null} />);
        expect(screen.getByText('Login')).toBeInTheDocument();
        expect(screen.getByText('Sign Up')).toBeInTheDocument();
        expect(screen.queryByText('Logout')).not.toBeInTheDocument();
    });

    it('renders user name and logout button when user is logged in', () => {
        render(<Navbar user={mockUser} />);
        expect(screen.getByText('Test User')).toBeInTheDocument();
        expect(screen.getByText('Logout')).toBeInTheDocument();
        expect(screen.queryByText('Login')).not.toBeInTheDocument();
    });

    it('renders user email if name is not provided', () => {
        const userNoName = { id: '1', email: 'test@example.com' };
        render(<Navbar user={userNoName} />);
        expect(screen.getByText('test@example.com')).toBeInTheDocument();
    });

    it('calls onLogout when logout button is clicked', () => {
        const onLogout = jest.fn();
        render(<Navbar user={mockUser} onLogout={onLogout} />);

        fireEvent.click(screen.getByText('Logout'));
        expect(onLogout).toHaveBeenCalledTimes(1);
    });

    it('does not render auth links when loading is true', () => {
        render(<Navbar user={null} loading={true} />);
        expect(screen.queryByText('Login')).not.toBeInTheDocument();
        expect(screen.queryByText('Sign Up')).not.toBeInTheDocument();
    });

    it('renders theme toggle if provided', () => {
        render(<Navbar user={null} themeToggle={<div data-testid="theme-toggle" />} />);
        expect(screen.getByTestId('theme-toggle')).toBeInTheDocument();
    });
});

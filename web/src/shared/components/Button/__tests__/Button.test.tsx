import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '../Button';

describe('Button', () => {
    it('renders children correctly', () => {
        render(<Button>Click me</Button>);
        expect(screen.getByText('Click me')).toBeInTheDocument();
    });

    it('calls onClick when clicked', () => {
        const handleClick = jest.fn();
        render(<Button onClick={handleClick}>Click me</Button>);

        fireEvent.click(screen.getByText('Click me'));
        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('is disabled when disabled prop is true', () => {
        render(<Button disabled>Disabled</Button>);
        expect(screen.getByRole('button')).toBeDisabled();
    });

    it('renders with different variants', () => {
        const { rerender } = render(<Button variant="primary">Primary</Button>);
        expect(screen.getByRole('button')).toHaveClass('primary');

        rerender(<Button variant="secondary">Secondary</Button>);
        expect(screen.getByRole('button')).toHaveClass('secondary');

        rerender(<Button variant="outline">Outline</Button>);
        expect(screen.getByRole('button')).toHaveClass('outline');
    });

    it('renders with different sizes', () => {
        const { rerender } = render(<Button size="medium">Medium</Button>);
        // medium is default, might not have a specific class depending on implementation

        rerender(<Button size="small">Small</Button>);
        expect(screen.getByRole('button')).toHaveClass('small');
    });

    it('applies fullWidth class when fullWidth prop is true', () => {
        render(<Button fullWidth>Full Width</Button>);
        expect(screen.getByRole('button')).toHaveClass('full-width');
    });

    it('passes extra props to the button element', () => {
        render(<Button data-testid="test-btn" type="submit">Submit</Button>);
        expect(screen.getByTestId('test-btn')).toHaveAttribute('type', 'submit');
    });
});

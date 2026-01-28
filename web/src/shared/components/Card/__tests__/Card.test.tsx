import { render, screen, fireEvent } from '@testing-library/react';
import { Card } from '../Card';

describe('Card', () => {
    it('renders title and children', () => {
        render(
            <Card title="Test Card">
                <p>Card content</p>
            </Card>
        );
        expect(screen.getByText('Test Card')).toBeInTheDocument();
        expect(screen.getByText('Card content')).toBeInTheDocument();
    });

    it('applies interactive class when onClick is provided', () => {
        const handleClick = jest.fn();
        const { container } = render(<Card onClick={handleClick}>Clickable</Card>);
        const cardElement = container.firstChild;
        expect(cardElement).toHaveClass('interactive');
    });

    it('calls onClick when clicked', () => {
        const handleClick = jest.fn();
        render(<Card onClick={handleClick}>Clickable</Card>);
        fireEvent.click(screen.getByText('Clickable'));
        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('applies compact class when compact prop is true', () => {
        const { container } = render(<Card compact>Compact Card</Card>);
        const cardElement = container.firstChild;
        expect(cardElement).toHaveClass('compact');
    });

    it('applies custom className', () => {
        const { container } = render(<Card className="my-custom-card">Content</Card>);
        const cardElement = container.firstChild;
        expect(cardElement).toHaveClass('my-custom-card');
    });
});

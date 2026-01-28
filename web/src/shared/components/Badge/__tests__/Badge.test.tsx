import { render, screen } from '@testing-library/react';
import { Badge } from '../Badge';

describe('Badge', () => {
    it('renders children correctly', () => {
        render(<Badge>New</Badge>);
        expect(screen.getByText('New')).toBeInTheDocument();
    });

    it('renders with different variants', () => {
        const { rerender } = render(<Badge variant="primary">Primary</Badge>);
        expect(screen.getByText('Primary')).toHaveClass('primary');

        rerender(<Badge variant="accent">Accent</Badge>);
        expect(screen.getByText('Accent')).toHaveClass('accent');
    });

    it('applies custom className', () => {
        render(<Badge className="custom-class">Custom</Badge>);
        expect(screen.getByText('Custom')).toHaveClass('custom-class');
    });
});

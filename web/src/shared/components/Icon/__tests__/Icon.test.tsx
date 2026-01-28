import { render, screen } from '@testing-library/react';
import { Icon } from '../Icon';

describe('Icon', () => {
    it('renders correctly with given name', () => {
        const { container } = render(<Icon name="home" />);
        const svg = container.querySelector('svg');
        expect(svg).toBeInTheDocument();
    });

    it('applies custom size and color', () => {
        const { container } = render(<Icon name="user" size={32} color="red" />);
        const svg = container.querySelector('svg');
        expect(svg).toHaveAttribute('width', '32');
        expect(svg).toHaveAttribute('height', '32');
        expect(svg).toHaveAttribute('color', 'red');
    });

    it('sets aria-label and role correctly', () => {
        render(<Icon name="settings" aria-label="Settings Icon" />);
        const svg = screen.getByLabelText('Settings Icon');
        expect(svg).toHaveAttribute('role', 'img');
    });

    it('is hidden from screen readers by default if no aria-label', () => {
        const { container } = render(<Icon name="check" />);
        const svg = container.querySelector('svg');
        expect(svg).toHaveAttribute('aria-hidden', 'true');
    });
});

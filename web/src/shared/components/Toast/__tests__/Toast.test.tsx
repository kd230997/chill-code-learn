import { render, screen, fireEvent } from '@testing-library/react';
import { Toast, ToastContainer, ToastData } from '../Toast';

describe('Toast', () => {
    const mockToast: ToastData = {
        id: '1',
        message: 'Test message',
        type: 'success',
        duration: 5000,
    };

    it('renders toast message correctly', () => {
        render(<Toast toast={mockToast} />);
        expect(screen.getByText('Test message')).toBeInTheDocument();
        expect(screen.getByText('Success')).toBeInTheDocument();
    });

    it('renders different types with correct titles', () => {
        const { rerender } = render(<Toast toast={{ ...mockToast, type: 'error' }} />);
        expect(screen.getByText('Error')).toBeInTheDocument();

        rerender(<Toast toast={{ ...mockToast, type: 'warning' }} />);
        expect(screen.getByText('Warning')).toBeInTheDocument();

        rerender(<Toast toast={{ ...mockToast, type: 'info' }} />);
        expect(screen.getByText('Info')).toBeInTheDocument();
    });

    it('calls onClose when clicked', () => {
        const handleClose = jest.fn();
        render(<Toast toast={mockToast} onClose={handleClose} />);

        fireEvent.click(screen.getByText('Test message'));
        expect(handleClose).toHaveBeenCalledTimes(1);
    });

    it('applies exiting class when isExiting is true', () => {
        const { container } = render(<Toast toast={mockToast} isExiting={true} />);
        const toastElement = container.firstChild;
        expect(toastElement).toHaveClass('exiting');
    });
});

describe('ToastContainer', () => {
    it('renders children correctly', () => {
        render(
            <ToastContainer>
                <div data-testid="child">Child</div>
            </ToastContainer>
        );
        expect(screen.getByTestId('child')).toBeInTheDocument();
    });
});

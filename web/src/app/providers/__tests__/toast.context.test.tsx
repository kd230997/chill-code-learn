import { render, screen, act, waitFor } from '@testing-library/react';
import { toastManager, ToastProvider, useToast } from '../toast.context';
import React from 'react';

// Mock the Toast component to simplify testing
jest.mock('@shared/components', () => ({
    Toast: ({ toast, onClose }: any) => (
        <div data-testid={`toast-${toast.type}`}>
            {toast.message}
            <button onClick={onClose}>Close</button>
        </div>
    ),
    ToastContainer: ({ children }: any) => <div data-testid="toast-container">{children}</div>,
}));

const TestComponent = () => {
    const { success, error } = useToast();
    return (
        <div>
            <button data-testid="success-btn" onClick={() => success('Success Message')}>Success</button>
            <button data-testid="error-btn" onClick={() => error('Error Message')}>Error</button>
        </div>
    );
};

describe('Toast System', () => {
    beforeEach(() => {
        // Reset singleton state
        (toastManager as any).toasts = [];
        (toastManager as any).listeners = new Set();
    });

    describe('ToastManager', () => {
        it('should add toasts via convenience methods', () => {
            toastManager.success('Success');
            toastManager.error('Error');
            toastManager.info('Info');
            toastManager.warning('Warning');

            const toasts = toastManager.getSnapshot();
            expect(toasts).toHaveLength(4);
            expect(toasts[0].type).toBe('success');
            expect(toasts[1].type).toBe('error');
            expect(toasts[2].type).toBe('info');
            expect(toasts[3].type).toBe('warning');
        });

        it('should remove toast by id', () => {
            toastManager.info('Test');
            const id = toastManager.getSnapshot()[0].id;
            toastManager.removeToast(id);
            expect(toastManager.getSnapshot()).toHaveLength(0);
        });
    });

    describe('ToastProvider & useToast', () => {
        it('should render toasts when methods are called', async () => {
            render(
                <ToastProvider>
                    <TestComponent />
                </ToastProvider>
            );

            act(() => {
                screen.getByTestId('success-btn').click();
            });

            expect(screen.getByTestId('toast-success')).toHaveTextContent('Success Message');

            act(() => {
                screen.getByTestId('error-btn').click();
            });

            expect(screen.getByTestId('toast-error')).toHaveTextContent('Error Message');
        });

        it('should auto-remove toast after duration', async () => {
            jest.useFakeTimers();

            render(
                <ToastProvider>
                    <TestComponent />
                </ToastProvider>
            );

            act(() => {
                toastManager.show('Quick Toast', 'info', 1000);
            });

            expect(screen.getByTestId('toast-info')).toBeInTheDocument();

            act(() => {
                jest.advanceTimersByTime(1100); // duration + exit animation time
            });

            // Advance for the exit animation timeout in ToastItemWrapper
            act(() => {
                jest.advanceTimersByTime(300);
            });

            await waitFor(() => {
                expect(screen.queryByTestId('toast-info')).not.toBeInTheDocument();
            });

            jest.useRealTimers();
        });

        it('should manually remove toast when closed', async () => {
            render(
                <ToastProvider>
                    <TestComponent />
                </ToastProvider>
            );

            act(() => {
                toastManager.success('Manual');
            });

            const closeBtn = screen.getByText('Close');
            act(() => {
                closeBtn.click();
            });

            // Wait for exit animation
            await waitFor(() => {
                expect(screen.queryByTestId('toast-success')).not.toBeInTheDocument();
            }, { timeout: 1000 });
        });
    });
});

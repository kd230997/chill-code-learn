import styles from './Toast.module.scss';

// ==============================================
// Types
// ==============================================
export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface ToastData {
    id: string;
    message: string;
    type: ToastType;
    duration?: number;
}

// ==============================================
// Toast Item Component (Pure)
// ==============================================
export interface ToastProps {
    /** Toast data to display */
    toast: ToastData;
    /** Whether the toast is exiting (for animation) */
    isExiting?: boolean;
    /** Callback when close button is clicked */
    onClose?: () => void;
}

/** Get icon based on toast type */
function getIcon(type: ToastType): string {
    switch (type) {
        case 'success': return '✓';
        case 'error': return '✕';
        case 'warning': return '!';
        case 'info': return 'i';
        default: return 'i';
    }
}

/** Get title based on toast type */
function getTitle(type: ToastType): string {
    switch (type) {
        case 'success': return 'Success';
        case 'error': return 'Error';
        case 'warning': return 'Warning';
        case 'info': return 'Info';
        default: return 'Notification';
    }
}

export function Toast({ toast, isExiting = false, onClose }: ToastProps) {
    return (
        <div onClick={onClose} className={`${styles.toast} ${styles[toast.type]} ${isExiting ? styles.exiting : ''}`}>
            {/* Icon Badge */}
            <div className={styles["icon-wrapper"]}>
                {getIcon(toast.type)}
            </div>

            {/* Content */}
            <div className={styles["content-wrapper"]}>
                <div className={styles.title}>{getTitle(toast.type)}</div>
                <div className={styles.message}>{toast.message}</div>
            </div>

            {/* Close Button */}
            {/* <button
                className={styles["close-button"]}
                onClick={onClose}
                aria-label="Dismiss notification"
            >
                ✕
            </button> */}

            {/* Progress Bar */}
            <div className={styles["progress-track"]}>
                <div
                    className={styles["progress-bar"]}
                    style={{ animationDuration: `${toast.duration || 5000}ms` }}
                />
            </div>
        </div>
    );
}

// ==============================================
// Toast Container Component (Pure)
// ==============================================
export interface ToastContainerProps {
    /** List of toasts to render */
    children: React.ReactNode;
}

export function ToastContainer({ children }: ToastContainerProps) {
    return (
        <div className={styles["toast-container"]}>
            {children}
        </div>
    );
}

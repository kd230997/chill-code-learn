import { ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './Button.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    variant?: 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost';
    size?: 'small' | 'medium';
    fullWidth?: boolean;
}

export function Button({
    children,
    variant = 'primary',
    size = 'medium',
    fullWidth = false,
    className = '',
    ...props
}: ButtonProps) {
    const buttonClasses = `
        ${styles.button}
        ${styles[variant]}
        ${size === 'small' ? styles.small : ''}
        ${fullWidth ? styles["full-width"] : ''}
        ${className}
    `.trim();

    return (
        <button className={buttonClasses} {...props}>
            {children}
        </button>
    );
}

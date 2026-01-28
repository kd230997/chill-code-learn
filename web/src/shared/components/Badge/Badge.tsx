import { ReactNode } from 'react';
import styles from './Badge.module.scss';

interface BadgeProps {
    children: ReactNode;
    variant?: 'default' | 'primary' | 'accent' | 'outline';
    className?: string;
}

export function Badge({ children, variant = 'default', className = '' }: BadgeProps) {
    const badgeClasses = `${styles.badge} ${styles[variant]} ${className}`;

    return <span className={badgeClasses}>{children}</span>;
}

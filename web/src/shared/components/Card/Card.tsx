import { ReactNode } from 'react';
import styles from './Card.module.scss';

interface CardProps {
    children: ReactNode;
    title?: string;
    className?: string;
    onClick?: () => void;
    compact?: boolean;
    hover?: boolean;
}

export function Card({ children, title, className = '', onClick, compact = false, hover = false }: CardProps) {
    const cardClasses = `
        ${styles.card} 
        ${onClick ? styles.interactive : ''} 
        ${compact ? styles.compact : ''} 
        ${className}
        ${hover ? styles.hover : ''}
    `.trim();

    return (
        <div className={cardClasses} onClick={onClick}>
            {title && <h2 className={styles.title}>{title}</h2>}
            {children}
        </div>
    );
}

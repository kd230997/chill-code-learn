import { InputHTMLAttributes } from 'react';
import styles from './Input.module.scss';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

export function Input({ label, error, className = '', ...props }: InputProps) {
    const inputClasses = `${styles.input} ${error ? styles.error : ''} ${className}`;

    return (
        <div className={styles.field}>
            {label && <label className={styles.label}>{label}</label>}
            <input className={inputClasses} {...props} />
            {error && <p className={styles["error-text"]}>{error}</p>}
        </div>
    );
}

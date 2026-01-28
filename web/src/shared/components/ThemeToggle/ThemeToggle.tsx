'use client';

import { useTheme } from '@/app/providers/theme.context';
import styles from './ThemeToggle.module.scss';

export function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();
    const isDark = theme === 'dark';

    return (
        <button
            className={styles["theme-toggle"]}
            onClick={toggleTheme}
            aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
            title={`Switch to ${isDark ? 'light' : 'dark'} theme`}
        >
            <span className={`${styles.icon} ${styles["icon-sun"]} ${!isDark ? styles.active : ''}`}>
                ☀️
            </span>
            <span className={`${styles.icon} ${styles["icon-moon"]} ${isDark ? styles.active : ''}`}>
                🌙
            </span>
            <span className={styles.slider} />
        </button>
    );
}

import React from 'react';

// ==============================================
// Icon Types
// ==============================================
export type IconName =
    | 'home'
    | 'user'
    | 'user-plus'
    | 'login'
    | 'settings'
    | 'game'
    | 'book'
    | 'trophy'
    | 'star'
    | 'check'
    | 'close'
    | 'arrow-right';

export interface IconProps {
    /** Icon name from the available set */
    name: IconName;
    /** Size in pixels (default: 24) */
    size?: number;
    /** Color - uses currentColor by default for theme support */
    color?: string;
    /** Additional CSS class */
    className?: string;
    /** Accessibility label */
    'aria-label'?: string;
}

// ==============================================
// Icon Paths (SVG path data)
// ==============================================
const iconPaths: Record<IconName, React.ReactNode> = {
    home: (
        <path
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            fill="none"
            stroke="currentColor"
        />
    ),
    user: (
        <path
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            fill="none"
            stroke="currentColor"
        />
    ),
    'user-plus': (
        <path
            d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            fill="none"
            stroke="currentColor"
        />
    ),
    login: (
        <path
            d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            fill="none"
            stroke="currentColor"
        />
    ),
    settings: (
        <path
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            fill="none"
            stroke="currentColor"
        />
    ),
    game: (
        <>
            <path
                d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                fill="currentColor"
            />
            <path
                d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                fill="none"
                stroke="currentColor"
            />
        </>
    ),
    book: (
        <path
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            fill="none"
            stroke="currentColor"
        />
    ),
    trophy: (
        <path
            d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            fill="none"
            stroke="currentColor"
        />
    ),
    star: (
        <path
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            fill="none"
            stroke="currentColor"
        />
    ),
    check: (
        <path
            d="M5 13l4 4L19 7"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            fill="none"
            stroke="currentColor"
        />
    ),
    close: (
        <path
            d="M6 18L18 6M6 6l12 12"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            fill="none"
            stroke="currentColor"
        />
    ),
    'arrow-right': (
        <path
            d="M14 5l7 7m0 0l-7 7m7-7H3"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            fill="none"
            stroke="currentColor"
        />
    ),
};

// ==============================================
// Icon Component
// ==============================================
export function Icon({
    name,
    size = 24,
    color = 'currentColor',
    className = '',
    'aria-label': ariaLabel,
}: IconProps) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            color={color}
            className={className}
            aria-label={ariaLabel}
            aria-hidden={!ariaLabel}
            role={ariaLabel ? 'img' : 'presentation'}
        >
            {iconPaths[name]}
        </svg>
    );
}

// ==============================================
// Available Icons List (for documentation)
// ==============================================
export const availableIcons: IconName[] = [
    'home',
    'user',
    'user-plus',
    'login',
    'settings',
    'game',
    'book',
    'trophy',
    'star',
    'check',
    'close',
    'arrow-right',
];

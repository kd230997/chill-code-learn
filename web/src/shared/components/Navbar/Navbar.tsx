import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@shared/components';
import logo from '@/shared/styles/logo/logo.png';
import styles from './Navbar.module.scss';

interface User {
    id: string;
    email: string;
    name?: string;
}

export interface NavbarProps {
    /** Current authenticated user, null if not logged in */
    user: User | null;
    /** Whether auth state is still loading */
    loading?: boolean;
    /** Callback when logout button is clicked */
    onLogout?: () => void;
    /** Optional theme toggle component to render */
    themeToggle?: React.ReactNode;
}

export function Navbar({ user, loading = false, onLogout, themeToggle }: NavbarProps) {
    return (
        <nav className={styles.navbar}>
            <div className={styles.container}>
                <Link href="/" className={styles.logo}>
                    <div className={styles["logo-icon"]}>
                        <Image
                            src={logo}
                            alt="Chill Code Learn Logo"
                            width={32}
                            height={32}
                            priority
                        />
                    </div>
                    <span className={styles["logo-text"]}>Chill Code Learn</span>
                </Link>

                <div className={styles.actions}>
                    {themeToggle}

                    {!loading && (
                        <>
                            {user ? (
                                <div className={styles["user-section"]}>
                                    <span className={styles["user-name"]}>
                                        {user.name || user.email}
                                    </span>
                                    <Button
                                        onClick={onLogout}
                                        className={styles["logout-btn"]}
                                    >
                                        Logout
                                    </Button>
                                </div>
                            ) : (
                                <div className={styles["auth-links"]}>
                                    <Link href="/login" className={styles["login-link"]}>
                                        Login
                                    </Link>
                                    <Link href="/register" className={styles["register-link"]}>
                                        Sign Up
                                    </Link>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}

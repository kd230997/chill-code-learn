"use client";

import Link from "next/link";
import { Icon, IconName } from "@shared/components";
import { useAuth } from "@/app/providers/auth.context";
import styles from "./HomePage.module.scss";

interface QuickAction {
    href: string;
    icon: IconName;
    iconClass: string;
    title: string;
    description: string;
}

const quickActions: QuickAction[] = [
    {
        href: "/tic-tac-toe",
        icon: "game",
        iconClass: "action-icon-games",
        title: "Play Games",
        description: "Challenge yourself with fun coding games and puzzles.",
    },
    {
        href: "/playground",
        icon: "book",
        iconClass: "action-icon-learn",
        title: "Learn & Practice",
        description: "Explore lessons and practice coding exercises.",
    },
    {
        href: "/profile",
        icon: "user",
        iconClass: "action-icon-profile",
        title: "Your Profile",
        description: "View your progress and customize your experience.",
    },
];

interface Stat {
    value: string;
    label: string;
    icon: IconName;
}

const stats: Stat[] = [
    { value: "0", label: "Games Played", icon: "game" },
    { value: "0", label: "Lessons Completed", icon: "book" },
    { value: "0", label: "Day Streak", icon: "star" },
    { value: "0", label: "Achievements", icon: "trophy" },
];

export function HomePage() {
    const { user } = useAuth();
    const displayName = user?.name || user?.email?.split("@")[0] || "Learner";

    return (
        <div className={styles.container}>
            {/* Header Section */}
            <header className={styles.header}>
                <h1 className={styles.greeting}>
                    Welcome back, <span className={styles.highlight}>{displayName}</span>!
                </h1>
                <p className={styles.subtitle}>
                    Ready to continue your coding journey? Pick up where you left off or try something new.
                </p>
            </header>

            {/* Quick Actions */}
            <div className={styles["actions-grid"]}>
                {quickActions.map((action) => (
                    <Link
                        key={action.href}
                        href={action.href}
                        className={styles["action-card"]}
                    >
                        <div className={`${styles["action-icon"]} ${styles[action.iconClass]}`}>
                            <Icon name={action.icon} size={28} color="#FFFFFF" />
                        </div>
                        <h2 className={styles["action-title"]}>{action.title}</h2>
                        <p className={styles["action-description"]}>{action.description}</p>
                    </Link>
                ))}
            </div>

            {/* Stats Section */}
            <section className={styles["stats-section"]}>
                <h2 className={styles["section-title"]}>Your Progress</h2>
                <div className={styles["stats-grid"]}>
                    {stats.map((stat) => (
                        <div key={stat.label} className={styles["stat-card"]}>
                            <div className={styles["stat-icon"]}>
                                <Icon name={stat.icon} size={20} />
                            </div>
                            <div className={styles["stat-value"]}>{stat.value}</div>
                            <div className={styles["stat-label"]}>{stat.label}</div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}

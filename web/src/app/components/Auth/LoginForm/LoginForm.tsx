"use client";

import { useState } from "react";
import { useAuth } from "@/app/providers/auth.context";
import Link from "next/link";
import { Input, Button, Card, Icon } from "@shared/components";
import styles from "./LoginForm.module.scss";

export function LoginForm() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const { login } = useAuth();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setError("");
		try {
			await login(email, password);
		} catch (err) {
			const message = err instanceof Error ? err.message : "Login failed. Please check your credentials.";
			setError(message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className={styles.container}>
			<Card className={styles["login-card"]}>
				<div className={styles["icon-wrapper"]}>
					<div className={styles["icon-badge"]}>
						<Icon name="login" size={32} color="#FFFFFF" />
					</div>
				</div>

				<h1 className={styles["card-title"]}>Welcome Back</h1>
				<p className={styles["card-subtitle"]}>
					Sign in to continue your learning journey
				</p>

				<form onSubmit={handleSubmit} className={styles.form}>
					<Input
						id="login-email"
						label="Email"
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder="Enter your email..."
						required
					/>
					<Input
						id="login-password"
						label="Password"
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						placeholder="••••••••"
						required
					/>
					{error && <p className={styles.error}>{error}</p>}
					<Button
						type="submit"
						variant="primary"
						fullWidth
						disabled={loading}
					>
						{loading ? "Signing in..." : "Login"}
					</Button>
				</form>
				<p className={styles.footer}>
					Don&apos;t have an account? <Link href="/register">Join Here</Link>
				</p>
			</Card>
		</div>
	);
}

"use client";

import { useState } from "react";
import { useAuth } from "@/app/providers/auth.context";
import Link from "next/link";
import { Button, Card, Input, Icon } from "@shared/components";
import styles from "./RegisterForm.module.scss";

export function RegisterForm() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [name, setName] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const { register } = useAuth();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setError("");
		try {
			await register(email, password, name);
		} catch (err) {
			const message = err instanceof Error ? err.message : "Registration failed. Please try again.";
			setError(message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className={styles.container}>
			<Card className={styles["register-card"]}>
				<div className={styles["icon-wrapper"]}>
					<div className={styles["icon-badge"]}>
						<Icon name="user-plus" size={32} color="#FFFFFF" />
					</div>
				</div>

				<h1 className={styles["card-title"]}>Create Account</h1>
				<p className={styles["card-subtitle"]}>
					Join us and start your learning adventure
				</p>

				<form onSubmit={handleSubmit} className={styles.form}>
					<Input
						id="register-name"
						label="Full Name"
						type="text"
						value={name}
						onChange={(e) => setName(e.target.value)}
						placeholder="John Doe"
					/>
					<Input
						id="register-email"
						label="Email"
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder="you@example.com"
						required
					/>
					<Input
						id="register-password"
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
						{loading ? "Creating account..." : "Get Started"}
					</Button>
				</form>
				<p className={styles.footer}>
					Already have an account? <Link href="/login">Sign In</Link>
				</p>
			</Card>
		</div>
	);
}

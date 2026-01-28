import Cookies from "js-cookie";

import { User } from "../entities/user.entity";
import { UserRepository } from "../repositories/user.repository";
import { httpClient } from "@shared/http-client";

export class ApiAuthRepository implements UserRepository {
	async login(email: string, password: string): Promise<User | null> {
		const data = await httpClient.post<{ token: string; user: User }>(
			"/auth/login",
			{ email, password }
		);

		if (data === null) return null;

		this.saveUserToken(data);

		return User.create(
			{
				email: data.user.email,
				name: data.user.name,
				token: data.token,
			},
			data.user.id
		);
	}

	private saveUserToken(data: { token: string; user: User }) {
		if (typeof window !== "undefined") {
			Cookies.set("auth_token", data.token, {
				expires: 7,
				path: "/",
				// sameSite: "lax",
			});
			Cookies.set("user_data", JSON.stringify(data.user), {
				expires: 7,
				path: "/",
				// sameSite: "lax",
			});
		}
	}

	async register(
		email: string,
		password: string,
		name?: string
	): Promise<User | null> {
		const data = await httpClient.post<{ user: User, token: string }>("/auth/register", {
			email,
			password,
			name,
		});

		if (!data || (data && (!data.user || !data.token))) return null;

		this.saveUserToken(data);

		return User.create(
			{
				email: data.user.email,
				name: data.user.name,
				token: data.token,
			},
			data.user.id
		);
	}

	async getCurrentUser(): Promise<User | null> {
		if (typeof window === "undefined") return null;
		const data = Cookies.get("user_data");
		const token = Cookies.get("auth_token");

		if (!data || !token) return null;

		try {
			const parsed = JSON.parse(data);
			return User.create(
				{
					email: parsed.email,
					name: parsed.name,
					token: token,
				},
				parsed.id
			);
		} catch {
			return null;
		}
	}

	async logout(): Promise<void> {
		if (typeof window !== "undefined") {
			Cookies.remove("auth_token");
			Cookies.remove("user_data");
		}
	}
}

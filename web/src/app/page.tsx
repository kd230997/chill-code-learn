"use client";

import { useAuth } from "./providers/auth.context";

export default function Main({ children }: { children: React.ReactNode }) {
	const { loading } = useAuth();

	if (loading)
		return (
			<div className="text-center py-20 text-4xl font-black">
				VALIDATING SESSION...
			</div>
		);

	return <main>{children}</main>;
}

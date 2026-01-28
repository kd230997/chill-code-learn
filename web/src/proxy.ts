import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_PATH = ["register", "login"];

export function proxy(request: NextRequest) {
	const session = request.cookies.get("auth_token")?.value;

	const { pathname } = request.nextUrl;

	const isPublicPath = PUBLIC_PATH.some((item) => pathname.startsWith(`/${item}`));

	if (!session && !isPublicPath) {
		return NextResponse.redirect(new URL("/login", request.url));
	}

	if (session && ["/login", "/"].includes(pathname)) {
		return NextResponse.redirect(new URL("/home", request.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

import path from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	reactCompiler: true,
	sassOptions: {
		includePaths: [path.join(process.cwd(), "src")],
	},
	allowedDevOrigins: ['local-origin.dev', '*.local-origin.dev'],
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "pbs.twimg.com",
            },
            {
                protocol: "https",
                hostname: "i.pravatar.cc",
            },
        ],
    },
    serverExternalPackages: ["twitter-api-v2"],
};

export default nextConfig;

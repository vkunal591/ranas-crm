import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "server.silkindia.co.in",
      },
      {
        protocol: "https",
        hostname: "server.silkindia.co.in",
      },
    ],
  },
};

export default nextConfig;

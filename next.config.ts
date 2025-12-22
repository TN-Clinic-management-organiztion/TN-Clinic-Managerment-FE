import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true, // Tắt optimization để test
    domains: ["localhost"],
  },
};

export default nextConfig;

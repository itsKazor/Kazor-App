import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    domains: ["i.ytimg.com"], // Tambahkan domain YouTube
  },
};

export default nextConfig;

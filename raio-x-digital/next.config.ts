import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Vercel / Next.js Server Actions max duration (em segundos)
  serverExternalPackages: ['child_process', 'fs', 'path', 'util'],
};

export default nextConfig;

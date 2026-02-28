import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ['child_process', 'fs', 'path', 'util'],
  outputFileTracingExcludes: {
    '*': ['./intelligence/**'],
  },
};

export default nextConfig;

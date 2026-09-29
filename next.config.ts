import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Playwright et le navigateur local appellent 127.0.0.1, pas seulement localhost.
  allowedDevOrigins: ["127.0.0.1"],
};

export default nextConfig;

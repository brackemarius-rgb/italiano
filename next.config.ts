import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Erzeugt beim Build einen eigenständigen, lauffähigen Ordner (.next/standalone)
  output: "standalone",
};

export default nextConfig;

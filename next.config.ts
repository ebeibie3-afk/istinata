import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  // With custom domain veritras.online we serve from root domain
  basePath: '',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;

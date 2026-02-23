import type { NextConfig } from "next";

const basePath = "/coahub";

const nextConfig: NextConfig = {
  output: "standalone",
  basePath,
  assetPrefix: basePath,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },

  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "9000",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "ftphxcudgdnpeoeiromp.supabase.co",
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
};

export default nextConfig;

import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    // 👇 Add the allowed quality values here
    qualities: [25, 50, 75, 85, 90, 100],

    // (Optional) configure remote domains if needed
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },

  allowedDevOrigins: ['192.168.1.41'],

  /* config options here */
  reactCompiler: true,
};

export default nextConfig;

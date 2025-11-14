import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
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

  /* config options here */
  reactCompiler: true,
};

export default nextConfig;

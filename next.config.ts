import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'openweathermap.org', // 날씨 아이콘 도메인 허용
      },
    ],
  },
};

export default nextConfig;

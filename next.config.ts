import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  headers: () => Promise.resolve([
    {
      source: '/uploads/:path*',
      headers: [
        { key: 'Access-Control-Allow-Origin', value: '*' },
        { key: 'Content-Disposition', value: 'attachment' }
      ]
    }
  ])
};

export default nextConfig;

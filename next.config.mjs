/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      // !process.env.NODE_ENV === "development" ?
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '5000',
        pathname: '/uploads/**',
      },
      {
        protocol: "https",
        hostname: "**",
      },
      // :
      // {
      //   protocol: 'https',
      //   hostname: 'storage.c2.liara.space',
      //   pathname: '/flashbaz-upload/**',
      //   // loader: 'default',
      //   // minimumCacheTTL: 60 * 60 * 24 * 365, // Cache for 1 year
      // }
    ],
  },
  experimental: {
    runtime: 'experimental-edge',
  },
};

export default nextConfig;

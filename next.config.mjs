/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      // !process.env.NODE_ENV === "development" ?
      //   {
      //     protocol: 'http',
      //     hostname: 'localhost',
      //     port: '5000',
      //     pathname: '/uploads/**',
      //   }
      //   :
      {
        protocol: 'https',
        hostname: 'storage.c2.liara.space',
        pathname: '/flashbaz-upload/**',
      }
    ],
  },
};

export default nextConfig;
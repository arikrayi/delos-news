/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  webpack5: true,
  images: {
    domains: ['static01.nyt.com'],
  },
};

export default nextConfig;

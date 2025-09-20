/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure image domains if needed
  images: {
    domains: [], // Add your domains here if needed
  },
  // Ensure proper function execution in serverless environments
  experimental: {
    // Enable if you're using Vercel or similar serverless platforms
    // runtime: 'nodejs',
  },
};

export default nextConfig;

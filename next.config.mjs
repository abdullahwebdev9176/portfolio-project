/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure image domains if needed
  images: {
    domains: [], // Add your domains here if needed
  },

  api: {
    bodyParser: false,      // Disable body parser for formData (required for large files)
    responseLimit: false,   // Allow large response payloads
    sizeLimit: '150mb',     // Increase upload limit to 150 MB
  },

  // ✅ Ensure Node.js runtime is used (not Edge) for serverless environments like Vercel
  experimental: {
    runtime: 'nodejs',
  },

  // Ensure proper function execution in serverless environments
  // experimental: {
    // Enable if you're using Vercel or similar serverless platforms
    // runtime: 'nodejs',
  // },

};

export default nextConfig;

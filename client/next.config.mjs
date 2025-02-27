/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ["localhost", "avatars.githubusercontent.com"],
    },
    eslint: {
      ignoreDuringBuilds: true
    }
  };
  
  export default nextConfig;
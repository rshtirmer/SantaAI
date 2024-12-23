/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        CLAUDE_API_KEY: process.env.CLAUDE_API_KEY,
      }
};

export default nextConfig;

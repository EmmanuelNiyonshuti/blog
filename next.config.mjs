import { withSentryConfig } from '@sentry/nextjs';

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  // output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn-images-1.medium.com',
      }
    ]
  },
  // Turbopack experimental features
  // experimental: {
  //   turbo: {
  //     // Turbopack rules if needed in future
  //   },
  // },
};

// Export with Sentry configuration
export default withSentryConfig(nextConfig, {
  org: "emmanuel-b3",
  project: "my-blog",
  silent: !process.env.CI,
  widenClientFileUpload: true,
  
  webpack: {
    automaticVercelMonitors: true,
    treeshake: {
      removeDebugLogging: true,
    },
  }
});
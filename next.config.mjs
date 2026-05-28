/** @type {import('next').NextConfig} */
// Build version 2026-05-28.1 - bumped to force fresh Hostinger rebuild after JSON-LD + widget changes
// after the index.html cache poisoning fix. Safe to bump on any future
// stuck-cache incident.
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Static export: Next.js writes a fully static site to ./out, which Hostinger
  // Premium Web Hosting can serve directly. The Node runtime (and API routes)
  // live on the VPS at api.devpilotx.com instead.
  output: 'export',
  // Hostinger Apache serves /resume as /resume/index.html most reliably.
  trailingSlash: true,
  eslint: {
    dirs: ['src']
  },
  typescript: {
    ignoreBuildErrors: false
  },
  images: {
    // next/image optimizer requires a Node server; with static export we ship
    // images as-is via the <img> element under the hood.
    unoptimized: true,
    remotePatterns: [
      { protocol: 'https', hostname: 'avatars.githubusercontent.com' },
      { protocol: 'https', hostname: 'images.unsplash.com' }
    ]
  }
};

export default nextConfig;

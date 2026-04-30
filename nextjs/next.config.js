/** @type {import('next').NextConfig} */
const nextConfig = {
  // No output: 'export' — Vercel runs Next.js natively with ISR
  // This gives us the best of both: static generation + auto-refresh on deploy
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
    ],
    unoptimized: false,
  },
  // Trailing slash for clean URLs (matches existing site structure)
  trailingSlash: false,
}

module.exports = nextConfig

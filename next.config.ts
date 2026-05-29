import type { NextConfig } from 'next'
import createMDX from '@next/mdx'

const withMDX = createMDX({
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
})

const nextConfig: NextConfig = {
  pageExtensions: ['ts', 'tsx', 'mdx'],
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**.vercel.app' },
      { protocol: 'https', hostname: 'kendamoto.cl' },
      { protocol: 'http', hostname: 'localhost' },
      { protocol: 'https', hostname: 'powersports.kendatire.com', pathname: '/media/**' },
      { protocol: 'https', hostname: 'www.kendatire.com', pathname: '/wp-content/**' },
      { protocol: 'https', hostname: 'cdn.kendatire.com', pathname: '/**' },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [375, 640, 768, 1080, 1200, 1920],
    imageSizes: [16, 32, 64, 128, 256, 300, 600],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
    ]
  },
  async redirects() {
    return []
  },
}

export default withMDX(nextConfig)

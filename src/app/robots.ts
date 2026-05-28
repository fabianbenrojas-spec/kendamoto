import type { MetadataRoute } from 'next'
import { absoluteUrl } from '@/lib/site'

export default function robots(): MetadataRoute.Robots {
  const live = process.env.NEXT_PUBLIC_SITE_LIVE === 'true'

  if (!live) {
    return {
      rules: { userAgent: '*', disallow: '/' },
    }
  }

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/mayoristas/cotizacion/'],
    },
    sitemap: absoluteUrl('/sitemap.xml'),
  }
}

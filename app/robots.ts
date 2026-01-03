import { MetadataRoute } from 'next'
import { PUBLIC_ROUTES, PRIVATE_ROUTES } from '@/lib/routes'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL!

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: PUBLIC_ROUTES.map(route => route.path),
        disallow: PRIVATE_ROUTES,
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}

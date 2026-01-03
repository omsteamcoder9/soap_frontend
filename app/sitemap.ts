import { MetadataRoute } from 'next'
import { PUBLIC_ROUTES } from '@/lib/routes'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL!
const API_URL = process.env.NEXT_PUBLIC_API_URL!

// ✅ Backend product type
interface Product {
  _id: string
  updatedAt?: string
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 🔁 Base routes from config (dynamic)
  const baseRoutes: MetadataRoute.Sitemap = PUBLIC_ROUTES.map(route => ({
    url: `${SITE_URL}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }))

  // 🔁 Product routes from API (dynamic)
  let productRoutes: MetadataRoute.Sitemap = []

  try {
    const res = await fetch(`${API_URL}/products`, {
      cache: 'no-store',
    })

    const json = await res.json()

    // ✅ Handle different API shapes safely
    const products: Product[] = Array.isArray(json)
      ? json
      : Array.isArray(json.data)
      ? json.data
      : []

    productRoutes = products.map(product => ({
      url: `${SITE_URL}/products/${product._id}`,
      lastModified: product.updatedAt
        ? new Date(product.updatedAt)
        : new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    }))
  } catch (error) {
    console.error('Sitemap product fetch failed:', error)
  }

  return [...baseRoutes, ...productRoutes]
}

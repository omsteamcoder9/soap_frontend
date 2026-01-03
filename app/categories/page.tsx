// app/categories/page.tsx
import { fetchActiveCategories } from '@/lib/categoryService';
import Link from 'next/link';
import { Metadata } from 'next';

// Define Category type
interface Category {
  _id: string;
  name: string;
  slug: string;
  description?: string;
}

// ✅ SEO Metadata
export async function generateMetadata(): Promise<Metadata> {
  const storeName = process.env.NEXT_PUBLIC_SITE_NAME || 'soap';
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://soapstore.com';
  
  return {
    title: `Shop by Category | Organic Soap Categories | ${storeName}`,
    description: `Browse all soap categories at ${storeName}. Explore our organic, natural, and specialty soap collections for every skin type and need.`,
    keywords: ['soap categories', 'organic soap types', 'natural soap collections', 'soap by category', 'skin care categories', storeName],
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
    openGraph: {
      type: 'website',
      url: `${siteUrl}/categories`,
      title: `Soap Categories | ${storeName}`,
      description: `Explore all our organic soap categories and find the perfect soap for your skin type.`,
      siteName: storeName,
      images: [
        {
          url: `${siteUrl}/og-categories.jpg`,
          width: 1200,
          height: 630,
          alt: `${storeName} - Soap Categories`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `Soap Categories | ${storeName}`,
      description: `Browse all our organic soap categories`,
      images: [`${siteUrl}/og-categories.jpg`],
    },
    alternates: {
      canonical: `${siteUrl}/categories`,
    },
  };
}

// ✅ Generate structured data for Categories Page
function generateStructuredData(categories: Category[]) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://soapstore.com';
  
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Soap Categories",
    "description": "Browse all organic soap categories",
    "url": `${siteUrl}/categories`,
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": categories.length,
      "itemListElement": categories.map((category, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "ProductCategory",
          "name": category.name,
          "description": category.description || `${category.name} organic soaps`,
          "url": `${siteUrl}/products?category=${category._id}`,
          "image": `${siteUrl}/images/soap-category-${category.slug}.jpg`
        }
      }))
    }
  };
}

export const dynamic = 'force-dynamic';

export default async function CategoriesPage() {
  const categories = await fetchActiveCategories() as Category[];
  const storeName = process.env.NEXT_PUBLIC_SITE_NAME || 'soap';

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateStructuredData(categories)) }}
      />

      <div className="min-h-screen bg-white">
        {/* Header Section */}
        <section className="bg-gradient-to-r from-[#556B2F]/10 to-[#D9825B]/10 py-12">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Soap Categories
              </h1>
              <p className="text-xl text-gray-700 mb-6">
                Browse our carefully curated collection of organic soap categories. 
                Find the perfect soap for your skin type and preferences.
              </p>
              <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full">
                <span className="text-sm font-medium text-gray-700">
                  {categories.length}+ Categories
                </span>
                <span className="w-1.5 h-1.5 bg-[#556B2F] rounded-full"></span>
                <span className="text-sm font-medium text-gray-700">
                  100% Organic
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Hidden semantic content for better indexing */}
        <div className="sr-only">
          <h2>Organic Soap Categories - {storeName}</h2>
          <p>Explore our complete range of organic soap categories including face soaps, body soaps, specialty soaps, and natural skincare products.</p>
        </div>

        {/* Categories Grid Section */}
        <section className="py-12" aria-label="Soap Categories Grid">
          <div className="container mx-auto px-4">
            {categories.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {categories.map((category) => (
                    <Link
                      key={category._id}
                      href={`/products?category=${category.slug || category._id}`}
                      className="group bg-white backdrop-blur-sm rounded-3xl border border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden p-6 text-center"
                      aria-label={`Browse ${category.name} soaps`}
                      itemScope
                      itemType="https://schema.org/ProductCategory"
                    >
                      <div 
                        className="w-16 h-16 bg-gradient-to-br from-[#556B2F]/10 to-[#D9825B]/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300"
                        itemProp="image"
                        aria-hidden="true"
                      >
                        <svg className="w-8 h-8 text-[#556B2F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2" itemProp="name">
                        {category.name}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed" itemProp="description">
                        {category.description || `Premium organic ${category.name.toLowerCase()} soaps for healthy skin`}
                      </p>
                     
                    </Link>
                  ))}
                </div>

                {/* Category Benefits Section for SEO */}
                <div className="mt-16 max-w-4xl mx-auto">
                  <div className="bg-gradient-to-r from-[#556B2F]/5 to-[#D9825B]/5 rounded-2xl p-8 border border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                      Why Shop by Category?
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="text-center">
                        <div className="w-12 h-12 bg-[#556B2F]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                          <svg className="w-6 h-6 text-[#556B2F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-2">Targeted Solutions</h3>
                        <p className="text-sm text-gray-600">Find soaps specifically formulated for different skin types and concerns</p>
                      </div>
                      <div className="text-center">
                        <div className="w-12 h-12 bg-[#D9825B]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                          <svg className="w-6 h-6 text-[#D9825B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-2">Easy Navigation</h3>
                        <p className="text-sm text-gray-600">Quickly find what you&apos;re looking for with our organized categories</p>
                      </div>
                      <div className="text-center">
                        <div className="w-12 h-12 bg-[#556B2F]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                          <svg className="w-6 h-6 text-[#556B2F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                          </svg>
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-2">Quality Assured</h3>
                        <p className="text-sm text-gray-600">Every category features Soap with natural ingredients</p>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-gray-600 text-lg">No categories found.</p>
                <Link 
                  href="/products" 
                  className="inline-block mt-4 bg-gray-700 text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Browse All Products
                </Link>
              </div>
            )}
          </div>
        </section>

      </div>
    </>
  );
} 
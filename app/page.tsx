import { Metadata } from 'next';
import { fetchActiveCategories } from '@/lib/categoryService';
import HomeClient from '@/components/home/HomeClient';

// ✅ SEO METADATA FUNCTION - Runs on server at build/request time
export async function generateMetadata(): Promise<Metadata> {
  const storeName = process.env.NEXT_PUBLIC_SITE_NAME;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const twitterHandle = process.env.NEXT_PUBLIC_TWITTER_HANDLE;
  
  return {
    title: `Premium Organic Soaps & Natural Skincare | ${storeName} | 100% Natural`,
    description: `Shop premium 100% organic soaps & skincare at ${storeName}. Handmade with natural ingredients, cruelty-free, and environmentally friendly. Free shipping available.`,
    keywords: ['organic soap', 'natural soap', 'handmade soap', 'skincare', 'glow soaps',],
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      type: 'website',
      url: siteUrl,
      title: `Soap | 100% Natural Skincare | ${storeName}`,
      description: `Shop Soap at ${storeName}. 100% natural, handmade, cruelty-free.`,
      siteName: storeName,
      images: [
        {
          url: `${siteUrl}/og-homepage.jpg`,
          width: 1200,
          height: 630,
          alt: `${storeName} - Soap`,
        },
      ],
      locale: 'en_IN',
    },
    twitter: {
      card: 'summary_large_image',
      site: twitterHandle,
      creator: twitterHandle,
      title: `Soap | ${storeName}`,
      description: `Shop Soap at ${storeName}`,
      images: [`${siteUrl}/og-homepage.jpg`],
    },
    alternates: {
      canonical: siteUrl,
    },
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    },
    authors: [{ name: storeName }],
    publisher: storeName,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
  };
}

// ✅ Generate JSON-LD structured data
function generateStructuredData() {
  const storeName = process.env.NEXT_PUBLIC_SITE_NAME || 'soap';
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://soapstore.com';
  
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": storeName,
    "url": siteUrl,
    "description": "Soap and skincare products",
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${siteUrl}/products?search={search_term_string}`,
      "query-input": "required name=search_term_string"
    },
    "publisher": {
      "@type": "Organization",
      "name": storeName,
      "logo2": {
        "@type": "ImageObject",
        "url": `${siteUrl}/logo2.png`
      }
    }
  };

  return JSON.stringify(structuredData);
}

// ✅ SERVER COMPONENT - Home Page
export default async function HomePage() {
  const categories = await fetchActiveCategories();
  const featuredCategories = categories.slice(0, 3);
  
  const storeName = process.env.NEXT_PUBLIC_SITE_NAME;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: generateStructuredData() }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": storeName,
            "url": siteUrl,
            "logo2": `${siteUrl}/logo2.png`,
            "description": "Soap and skincare products",
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "IN"
            },
            "contactPoint": {
              "@type": "ContactPoint",
              "contactType": "customer service",
              "availableLanguage": ["English", "Hindi"]
            },
            "sameAs": [
              `https://facebook.com/${storeName}`,
              `https://instagram.com/${storeName}`,
              `https://twitter.com/${storeName}`
            ]
          })
        }}
      />

      <div className="sr-only" aria-hidden="true">
        <h2>{storeName} - Soap</h2>
        <p>Shop 100% natural, handmade organic soaps and skincare products. Best quality skincare with free shipping across India.</p>
        <ul>
          {categories.map(category => (
            <li key={category._id}>{category.name} Soap - Organic & Natural</li>
          ))}
        </ul>
      </div>

      <HomeClient 
        categories={categories}
        featuredCategories={featuredCategories}
      />
    </>
  );
}
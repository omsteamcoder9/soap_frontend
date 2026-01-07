import ProductGrid from '@/components/products/ProductGrid';
import {getCategoryBySlug } from '@/lib/categoryService';

interface ProductsPageProps {
  searchParams: Promise<{
    category?: string;
    sortBy?: string;
    sortOrder?: string;
    page?: string;
  }>;
}

export async function generateMetadata(props: ProductsPageProps) {
  const searchParams = await props.searchParams;
  const categorySlug = searchParams.category;
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ;
  const storeName = process.env.NEXT_PUBLIC_SITE_NAME ;
  const storeDescription = process.env.NEXT_PUBLIC_SITE_DESCRIPTION;
  const twitterHandle = process.env.NEXT_PUBLIC_TWITTER_HANDLE ;
  
  let title = `  Fashion and Fancy | Buy at Best Price | ${storeName}`;
  let description = `Browse our collection of 100% natural & organicFashion and Fancys. ${storeDescription} Free shipping & money-back guarantee. Shop now!`;
  let keywords = `organicFashion and Fancy, naturalFashion and Fancy, handmadeFashion and Fancy, buyFashion and Fancy online,Fashion and Fancy store, ${storeName}`;
  let canonicalUrl = `${siteUrl}/products`;
  
  if (categorySlug) {
    try {
      const category = await getCategoryBySlug(categorySlug);
      if (category) {
        title = `${category.name} |  sastika Fashion and FancyFashion and Fancy | ${storeName}`;
        description = `Shop 100% organic ${category.name.toLowerCase()}Fashion and Fancys. Natural ingredients, handmade with care. Best prices at ${storeName}. Free shipping available.`;
        keywords = `${category.name}Fashion and Fancy, organic ${category.name.toLowerCase()}, natural ${category.name.toLowerCase()}, buy ${category.name.toLowerCase()}Fashion and Fancy, ${storeName}`;
        canonicalUrl = `${siteUrl}/products?category=${categorySlug}`;
      }
    } catch (error) {
      console.error('Error fetching category for metadata:', error);
    }
  }
  
  if (page > 1) {
    title = `${title} - Page ${page}`;
    description = `${description} Page ${page} of our organicFashion and Fancy collection.`;
    canonicalUrl = `${canonicalUrl}${categorySlug ? `?category=${categorySlug}&` : '?'}page=${page}`;
  }

  const ogImage = `${siteUrl}/og-organic-  Fashion and Fancys.jpg`;
  
  // Structured Data for Product Listing
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": title,
    "description": description,
    "url": canonicalUrl,
    "publisher": {
      "@type": "Organization",
      "name": storeName,
      "logo2": {
        "@type": "ImageObject",
        "url": `${siteUrl}/logo2.png`
      },
      "description": storeDescription
    },
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": 50,
      "itemListOrder": "https://schema.org/ItemListOrderDescending"
    }
  };

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: storeName,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'en_IN',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      site: twitterHandle,
      creator: twitterHandle,
      title,
      description,
      images: [ogImage],
    },
    alternates: {
      canonical: canonicalUrl,
    },
    other: {
      'application/ld+json': JSON.stringify(structuredData),
    },
  };
}

export default async function ProductsPage(props: ProductsPageProps) {
  const searchParams = await props.searchParams;

  const selectedCategory = searchParams.category;
  
  const storeName = process.env.NEXT_PUBLIC_SITE_NAME ;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ;

  // Structured Data for Breadcrumb
  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": siteUrl
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "OrganicFashion and Fancys",
        "item": `${siteUrl}/products`
      }
    ]
  };

  // Structured Data for Site Navigation
  const siteNavigationData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": storeName,
    "url": siteUrl,
    "description": process.env.NEXT_PUBLIC_SITE_DESCRIPTION || '  Fashion and Fancy',
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${siteUrl}/products?search={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <>
      {/* Inline structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbData)
        }}
      />
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(siteNavigationData)
        }}
      />
      
      <div className="min-h-screen bg-white">
        {/* Products Grid Section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            {/* SEO-friendly heading */}
            <h1 className="sr-only"> sastika Fashion and FancyFashion and Fancy Collection - {storeName}</h1>
            
         

            {/* Product Grid */}
            <ProductGrid category={selectedCategory} />
            
    
          </div>
        </section>
      </div>
    </>
  );
}
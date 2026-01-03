import { productAPI } from '@/lib/api';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import ClientProductDetail from './ClientProductDetail';

interface ProductDetailPageProps {
  params: Promise<{ slug: string }>;
}

// ✅ SERVER-SIDE: Generate metadata
export async function generateMetadata(props: ProductDetailPageProps): Promise<Metadata> {
  const params = await props.params;
  
  try {
    const response = await productAPI.getBySlug(params.slug);
    
    if (!response.success || !response.data) {
      return {
        title: 'Product Not Found',
        description: 'The requested product could not be found.',
      };
    }

    const product = response.data;
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const storeName = process.env.NEXT_PUBLIC_SITE_NAME || 'Organic Store';
    const twitterHandle = process.env.NEXT_PUBLIC_TWITTER_HANDLE;

    // Meta Title
    const metaTitle = product.metaTitle || `${product.name} | Buy at Best Price | ${storeName}`;
    
    // Meta Description
    const metaDescription = product.metaDescription || 
      `${product.description.substring(0, 150)}... Buy ${product.name} at ₹${product.price.toLocaleString('en-IN')}. Free shipping & 100% organic guarantee.`;
    
    // Canonical URL
    const canonicalUrl = product.canonicalUrl || `${siteUrl}/products/${product.slug}`;
    
    // Open Graph Image
    const ogImage = product.ogImage || 
      (product.images && product.images.length > 0 && product.images[0]?.image 
        ? `${baseUrl}${product.images[0].image}`
        : `${siteUrl}/og-image.png`);

    // Keywords
    const keywords = product.metaKeywords || [
      product.name,
      typeof product.category === 'object' ? product.category.name : 'organic soap',
      'organic',
      'natural soap',
      'handmade soap',
      'buy soap online',
      storeName
    ];

    return {
      title: metaTitle,
      description: metaDescription,
      keywords: keywords,
      authors: [{ name: product.seller || storeName }],
      creator: product.seller || storeName,
      publisher: storeName,
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
      alternates: {
        canonical: canonicalUrl,
      },
      twitter: {
        card: 'summary_large_image',
        site: twitterHandle,
        creator: twitterHandle,
        title: product.ogTitle || product.name,
        description: product.ogDescription || metaDescription,
        images: [ogImage],
      },
      other: {
        'product:price:amount': product.price.toString(),
        'product:price:currency': 'INR',
        'product:availability': product.stock > 0 ? 'in stock' : 'out of stock',
        'product:condition': 'new',
        'product:brand': product.seller || storeName,
        'product:retailer_item_id': product._id,
        'product:organic': 'yes',
        'product:natural': 'yes',
        'product:category': 'Personal Care',
        'product:material': 'Organic Ingredients',
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Product Details',
      description: 'View product details',
    };
  }
}

// ✅ SERVER COMPONENT: Main page
// ✅ SERVER COMPONENT: Main page
export default async function ProductDetailPage(props: ProductDetailPageProps) {
  const params = await props.params;

  // Fetch product data on server
  const response = await productAPI.getBySlug(params.slug);
  
  if (!response.success || !response.data) {
    notFound();
  }

  const product = response.data;

  // Fetch random products for "Related Products"
  const getRandomProducts = async (currentProductId: string, limit = 4) => {
    try {
      const response = await productAPI.getAll({});
      if (response.success && response.data) {
        const otherProducts = response.data.filter(p => p._id !== currentProductId);
        const shuffled = [...otherProducts].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, limit);
      }
      return [];
    } catch (error) {
      console.error('Error fetching random products:', error);
      return [];
    }
  };

  const randomProducts = await getRandomProducts(product._id, 6);

  // Pass data to client component
  return (
    <ClientProductDetail 
      product={product} 
      randomProducts={randomProducts} 
    />
  );
}
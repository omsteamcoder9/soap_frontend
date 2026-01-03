'use client';

import Image from 'next/image';
import AddToCartButton from '@/components/products/AddToCartButton';
import ProductCard from '@/components/ui/ProductCard';
import { Product } from '@/types/product';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useCallback } from 'react';
import { useCart } from '@/context/CartContext';

interface ClientProductDetailProps {
  product: Product;
  randomProducts: Product[];
}

// Mobile Floating Button Component (same as before)
interface MobileFloatingButtonProps {
  product: Product;
  isVisible: boolean;
  onAddToCart: (quantity: number) => Promise<void>;
}

const MobileFloatingButton = ({ 
  product, 
  isVisible, 
  onAddToCart 
}: MobileFloatingButtonProps) => {
  const router = useRouter();
  const [addingToCart, setAddingToCart] = useState(false);
  const [addingToBuy, setAddingToBuy] = useState(false);
  const [showAddedMessage, setShowAddedMessage] = useState(false);
  const [quantity, setQuantity] = useState(1);
  
  const isOutOfStock = product.stock <= 0;
  
  const handleCartClick = async () => {
    if (isOutOfStock) return;
    
    try {
      setAddingToCart(true);
      await onAddToCart(quantity);
      
      setShowAddedMessage(true);
      setTimeout(() => {
        setShowAddedMessage(false);
      }, 2000);
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setAddingToCart(false);
    }
  };
  
  const handleBuyClick = async () => {
    if (isOutOfStock) return;
    
    try {
      setAddingToBuy(true);
      await onAddToCart(quantity);
      router.push('/checkout');
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setAddingToBuy(false);
    }
  };

  return (
    <div className={`
      lg:hidden fixed bottom-0 left-0 right-0 z-50 
      transform transition-transform duration-300 ease-in-out
      ${isVisible ? 'translate-y-0' : 'translate-y-full'}
    `}>
      <div className="bg-white border-t border-gray-300">
        {/* QUANTITY ROW - COMPACT */}
        <div className="flex items-center justify-between px-3 py-1.5 bg-gray-100 border-b border-gray-300">
          <span className="text-xs font-medium text-gray-800">Quantity:</span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
              disabled={quantity <= 1}
              className="w-6 h-6 flex items-center justify-center bg-white border border-gray-400 rounded-md text-gray-800 disabled:opacity-40 hover:bg-gray-50"
            >
              -
            </button>
            <span className="text-sm font-medium w-6 text-center text-gray-900">{quantity}</span>
            <button
              onClick={() => {
                const maxStock = product.stock || 99;
                setQuantity(prev => Math.min(maxStock, prev + 1))
              }}
              disabled={isOutOfStock || quantity >= (product.stock || 99)}
              className="w-6 h-6 flex items-center justify-center bg-white border border-gray-400 rounded-md text-gray-800 disabled:opacity-40 hover:bg-gray-50"
            >
              +
            </button>
          </div>
        </div>
        
        {/* ACTION BUTTONS ROW */}
        <div className="flex items-stretch h-10">
          {/* LEFT HALF - CART BUTTON */}
          <button
            onClick={handleCartClick}
            disabled={isOutOfStock || addingToCart}
            className={`
              flex-1
              flex items-center justify-center gap-1
              transition-all duration-300
              relative
              ${isOutOfStock || addingToCart
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-gray-700 text-white hover:bg-gray-800 hover:shadow-md shadow cursor-pointer'
              }
            `}
          >
            {addingToCart ? (
              <div className="animate-spin rounded-full h-3.5 w-3.5 border-b-2 border-white"></div>
            ) : showAddedMessage ? (
              <span className="text-xs font-medium animate-pulse">Added! ✓</span>
            ) : (
              <>
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span className="text-xs font-medium">Cart</span>
              </>
            )}
          </button>
          
          {/* RIGHT HALF - BUY BUTTON */}
          <button
            onClick={handleBuyClick}
            disabled={isOutOfStock || addingToBuy}
            className={`
              flex-1
              flex items-center justify-center gap-1
              transition-colors duration-200
              ${isOutOfStock || addingToBuy
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                : 'bg-gray-900 text-white hover:bg-gray-800'
              }
            `}
          >
            {addingToBuy ? (
              <div className="animate-spin rounded-full h-3.5 w-3.5 border-b-2 border-white"></div>
            ) : (
              <>
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                <span className="text-xs font-medium">Buy</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

// Structured Data Component (JSON-LD)
const ProductStructuredData = ({ product }: { product: Product }) => {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const storeName = process.env.NEXT_PUBLIC_SITE_NAME;
  
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "description": product.description,
    "image": product.images && product.images.length > 0 && product.images[0]?.image 
      ? `${process.env.NEXT_PUBLIC_BASE_URL}${product.images[0].image}`
      : `${siteUrl}/og-image.png`,
    "brand": {
      "@type": "Brand",
      "name": product.seller || storeName,
      "logo2": `${siteUrl}/logo2.png`
    },
    "sku": product._id,
    "gtin": product.sNo?.toString() || `SNO${product.sNo}`,
    "offers": {
      "@type": "Offer",
      "url": `${siteUrl}/products/${product.slug}`,
      "priceCurrency": "INR",
      "price": product.price,
      "availability": product.stock > 0 
        ? "https://schema.org/InStock" 
        : "https://schema.org/OutOfStock",
      "itemCondition": "https://schema.org/NewCondition",
      "seller": {
        "@type": "Organization",
        "name": product.seller || storeName
      }
    },
    "aggregateRating": product.rating > 0 ? {
      "@type": "AggregateRating",
      "ratingValue": product.rating,
      "reviewCount": product.numberOfReviews,
      "bestRating": "5",
      "worstRating": "1"
    } : undefined,
    "category": typeof product.category === 'object' ? product.category.name : "Organic Soap",
    "additionalProperty": [
      {
        "@type": "PropertyValue",
        "name": "organic",
        "value": "yes"
      },
      {
        "@type": "PropertyValue",
        "name": "natural",
        "value": "yes"
      },
      {
        "@type": "PropertyValue",
        "name": "handmade",
        "value": "yes"
      }
    ]
  };

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
        "name": "Organic Soaps",
        "item": `${siteUrl}/products`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": product.name,
        "item": `${siteUrl}/products/${product.slug}`
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbData)
        }}
      />
    </>
  );
};

export default function ClientProductDetail({ product, randomProducts }: ClientProductDetailProps) {
  const [showFloatingButton, setShowFloatingButton] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { addToCart } = useCart();

  // Handle scroll to show/hide floating button
  const handleScroll = useCallback(() => {
    if (typeof window !== 'undefined') {
      const currentScrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      const isScrollingUp = currentScrollY < lastScrollY;
      const isPastThreshold = currentScrollY > 100;
      const isNotAtBottom = currentScrollY < documentHeight - windowHeight - 100;
      
      setShowFloatingButton(isScrollingUp && isPastThreshold && isNotAtBottom);
      setLastScrollY(currentScrollY);
    }
  }, [lastScrollY]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [handleScroll]);

  const handleMobileAddToCart = async (quantity: number) => {
    if (!product) {
      alert('Product not found');
      return;
    }
    
    try {
      await addToCart(product, quantity);
      return;
    } catch (error) {
      console.error('❌ Mobile - Error adding to cart:', error);
      throw error;
    }
  };

  const stock = product.stock || 0;

  const groupedSpecifications = () => {
    if (!product.specifications || !Array.isArray(product.specifications)) {
      return [];
    }

    const groups: { [key: string]: Array<{ key: string; value: string }> } = {};
    
    product.specifications.forEach(spec => {
      const category = 'Details';
      
      if (!groups[category]) {
        groups[category] = [];
      }
      groups[category].push(spec);
    });
    
    return Object.entries(groups);
  };

  const specGroups = groupedSpecifications();

  return (
    <>
      {/* ✅ Structured Data - JSON-LD (for SEO) */}
      <ProductStructuredData product={product} />
      
      <div className="min-h-screen bg-[#f2f2f2] pb-16 lg:pb-0">
        <div className="mx-auto">
          {/* Product Section - ULTRA COMPACT */}
          <div className="bg-white">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-4">
              {/* Product Images - FULL HEIGHT */}
              <div className="w-full">
                <div className="relative w-full overflow-hidden rounded-lg mt-5">
                  <div className="relative w-full h-auto min-h-[400px] lg:min-h-[500px]">
                    {product.images && product.images.length > 0 && product.images[0]?.image ? (
                      <Image
                        src={`${process.env.NEXT_PUBLIC_BASE_URL}${product.images[0].image}`}
                        alt={`${product.name} - Premium Organic Soap | ${process.env.NEXT_PUBLIC_SITE_NAME}`}
                        fill
                        className="object-contain" 
                        priority
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-400 text-sm">No image</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Product Details - ULTRA TIGHT */}
              <div className="space-y-3 p-3 sm:p-4">
                {/* Product Name */}
                <h1 className="text-lg sm:text-xl font-bold text-gray-900">
                  {product.name}
                </h1>

                {/* Price and Stock - BELOW THE NAME */}
                <div className="space-y-1">
                  <span className="text-xl sm:text-2xl font-bold text-gray-800">
                    ₹{product.price.toLocaleString('en-IN')}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded-full text-xs ${stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {stock > 0 ? `In Stock (${stock})` : 'Out of Stock'}
                    </span>
                  </div>
                </div>

                {/* Add to Cart - COMPACT */}
                <div className="pt-2">
                  <div className="max-w-sm">
                    {/* Desktop Add to Cart Button */}
                    <div className="hidden lg:block">
                      <AddToCartButton product={product} />
                    </div>
                    
                    {/* Mobile Add to Cart Button */}
                    <div className="lg:hidden">
                      <div className="space-y-2">
                        <AddToCartButton product={product} />
                        
                        {/* Mobile Buy Now Button */}
                        <button
                          onClick={() => window.location.href = '/checkout'}
                          disabled={stock <= 0}
                          className={`
                            w-full py-3 rounded-lg font-semibold text-sm
                            transition-colors duration-200 flex items-center justify-center gap-1.5
                            ${stock <= 0 
                              ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                              : 'bg-gray-900 text-white hover:bg-gray-800'
                            }
                          `}
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                          </svg>
                          Buy Now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Product Details - COMPACT */}
                <div className="space-y-3 pt-2">
                  {/* Description */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 mb-1">Description</h3>
                    <p className="text-gray-700 text-sm leading-relaxed">{product.description}</p>
                  </div>

                  {/* Specifications - Grouped by category */}
                  {specGroups.length > 0 && (
                    <div className="space-y-3">
                      <h3 className="text-sm font-medium text-gray-900">Specifications</h3>
                      {specGroups.map(([category, specs], groupIndex) => (
                        <div key={groupIndex} className="space-y-1">
                          <h4 className="text-xs font-semibold text-gray-700 uppercase tracking-wide">{category}</h4>
                          <div className="space-y-1">
                            {specs.map((spec, index) => (
                              <div key={index} className="flex text-sm">
                                <span className="font-medium text-gray-700 w-2/5">{spec.key}:</span>
                                <span className="text-gray-600 w-3/5">{spec.value}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Additional Product Info */}
                  <div className="space-y-2 pt-2 border-t border-gray-300">
                    {product.category && (
                      <div className="flex text-sm">
                        <span className="font-medium text-gray-800 w-2/5">Category:</span>
                        <span className="text-gray-900 w-3/5">{typeof product.category === 'object' ? product.category.name : 'Organic Soap'}</span>
                      </div>
                    )}
                    
                    {product.seller && (
                      <div className="flex text-sm">
                        <span className="font-medium text-gray-800 w-2/5">Seller:</span>
                        <span className="text-gray-900 w-3/5">{product.seller}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Related Products - TIGHT */}
          {randomProducts.length > 0 && (
            <div className="p-3 sm:p-4 mt-2 border-t border-gray-300">
              <h2 className="text-base font-bold text-gray-800 mb-2">Related Organic Soaps</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
                {randomProducts.map((relatedProduct) => (
                  <div key={relatedProduct._id} className="scale-95">
                    <ProductCard product={relatedProduct} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Mobile Floating Button - Appears when scrolling up */}
        {product && (
          <MobileFloatingButton 
            product={product} 
            isVisible={showFloatingButton}
            onAddToCart={handleMobileAddToCart}
          />
        )}
      </div>
    </>
  );
}
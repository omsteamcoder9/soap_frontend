// src/components/ProductCard.tsx
import { Product } from '@/types/product';
import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';
import { ShoppingBag } from 'lucide-react';
import Image from 'next/image';

interface ProductCardProps {
  product: Product;
}

// Format price with commas
const formatPrice = (price: number): string => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

// ============= OFFER LOGIC - WORKS FOR BOTH PRODUCT AND VARIANTS =============
const getProductOfferInfo = (product: Product) => {
  
  // 🎯 CASE 1: PRODUCT HAS VARIANTS - Check default variant for offer
  if (product.variants && product.variants.length > 0) {
    // Get default variant or first variant
    const defaultVariant = product.variants.find(v => v.isDefault) || product.variants[0];
    
    // ✅ Check if variant has originalPrice AND it's greater than price
    if (defaultVariant.originalPrice && 
        defaultVariant.price && 
        parseFloat(defaultVariant.originalPrice.toString()) > parseFloat(defaultVariant.price.toString())) {
      
      const original = parseFloat(defaultVariant.originalPrice.toString());
      const discounted = parseFloat(defaultVariant.price.toString());
      const discountPercentage = defaultVariant.discountPercentage || 
        ((original - discounted) / original) * 100;
      
      return {
        hasOffer: true,
        originalPrice: original,
        discountedPrice: discounted,
        discountPercentage: Math.round(discountPercentage * 100) / 100
      };
    }
    
    // No offer on default variant
    return {
      hasOffer: false,
      originalPrice: parseFloat(defaultVariant.price.toString()),
      discountedPrice: parseFloat(defaultVariant.price.toString()),
      discountPercentage: 0
    };
  }
  
  // 🎯 CASE 2: NO VARIANTS - Check product-level offer
  if (product.hasOffer && 
      product.originalPrice && 
      product.basePrice &&
      parseFloat(product.originalPrice.toString()) > parseFloat(product.basePrice.toString())) {
    
    const original = parseFloat(product.originalPrice.toString());
    const discounted = parseFloat(product.basePrice.toString());
    const discountPercentage = product.discountPercentage || 
      ((original - discounted) / original) * 100;
    
    return {
      hasOffer: true,
      originalPrice: original,
      discountedPrice: discounted,
      discountPercentage: Math.round(discountPercentage * 100) / 100
    };
  }
  
  // No offer
  return {
    hasOffer: false,
    originalPrice: parseFloat(product.basePrice?.toString() || '0'),
    discountedPrice: parseFloat(product.basePrice?.toString() || '0'),
    discountPercentage: 0
  };
};

// Get product image - prioritize variant images
const getProductImage = (product: Product) => {
  // Check variants first
  if (product.variants && product.variants.length > 0) {
    const defaultVariant = product.variants.find(v => v.isDefault) || product.variants[0];
    
    if (defaultVariant?.images?.[0]?.image) {
      return `${process.env.NEXT_PUBLIC_BASE_URL}${defaultVariant.images[0].image}`;
    }
  }
  
  // Fallback to main product images
  if (product.images?.[0]?.image) {
    return `${process.env.NEXT_PUBLIC_BASE_URL}${product.images[0].image}`;
  }
  
  return '/placeholder-image.jpg';
};

export default function ProductCard({ product }: ProductCardProps) {
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  const { addToCart, cart } = useCart();
  const router = useRouter();

  // ✅ Get offer info - THIS WILL SHOW OFFER BADGE FOR VARIANTS
  const offerInfo = getProductOfferInfo(product);
  const hasValidOffer = offerInfo.hasOffer && offerInfo.originalPrice > offerInfo.discountedPrice;
  
  const isInCart = cart?.items?.some(item => item.product._id === product._id) || false;
  const isOutOfStock = product.stock <= 0;
  const imageUrl = getProductImage(product);

  const handleCardClick = () => {
    router.push(`/products/${product.slug}`);
  };

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await addToCart(product, 1);
    } catch (error) {
      console.error('Failed to add product to cart:', error);
    }
  };

  return (
    <div 
      className="group relative bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden cursor-pointer font-sans transform hover:scale-105"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
    >
      {isInCart && (
        <div className="absolute top-2 right-2 z-10 bg-gray-700 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shadow-md">
          ✓
        </div>
      )}

      {/* Image Section */}
      <div className="relative p-3 sm:p-4 pb-0 overflow-hidden">
        <div className="relative h-32 xs:h-36 sm:h-40 md:h-48 bg-gray-100 flex items-center justify-center overflow-hidden rounded-lg">
          <div className="relative w-full h-full">
            <Image
              src={imageUrl}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className={`object-contain transition-all duration-300 ${isHovered ? 'scale-110' : ''}`}
              onError={() => setImageError(true)}
              priority={false}
              loading="lazy"
            />
          </div>

          {imageError && (
            <div className="absolute inset-0 bg-gray-200 flex items-center justify-center rounded-lg">
              <svg className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          )}
        </div>
      </div>
      
      {/* Content Section */}
      <div className="p-3">
        {/* Product Name and Offer Badge */}
        <div className="flex justify-between items-start mb-2 min-h-[2.5rem]">
          <h3 className="font-semibold text-gray-900 line-clamp-2 text-[10px] sm:text-[14px] flex-1 pr-2 text-left">
            {product.name}
          </h3>
          
          {/* ✅ OFFER BADGE - SHOWS FOR BOTH PRODUCT AND VARIANT OFFERS */}
          {hasValidOffer && (
            <div className="bg-red-100 text-red-800 px-1.5 py-0.5 rounded-md text-[10px] xs:text-xs font-bold whitespace-nowrap flex-shrink-0 sm:px-2 sm:text-xs">
              {Math.round(offerInfo.discountPercentage)}% OFF
            </div>
          )}
        </div>
        
        {/* Price and Stock */}
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Discounted Price */}
            <span className="text-sm xs:text-base sm:text-lg font-bold text-gray-900">
              ₹{formatPrice(offerInfo.discountedPrice)}
            </span>
            
            {/* ✅ ORIGINAL PRICE WITH STRIKETHROUGH - SHOWS FOR OFFERS */}
            {hasValidOffer && (
              <span 
                className="text-[10px] xs:text-xs sm:text-sm text-gray-500 font-medium"
                style={{ 
                  textDecoration: 'line-through',
                  textDecorationColor: '#6b7280',
                  textDecorationThickness: '0.5px'
                }}
              >
                ₹{formatPrice(offerInfo.originalPrice)}
              </span>
            )}
          </div>
          
          {/* Stock Badge */}
          <span className={`px-1.5 py-0.5 xs:px-2 xs:py-1 text-[10px] xs:text-xs rounded-full font-medium whitespace-nowrap ${
            !isOutOfStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {!isOutOfStock ? 'In stock' : 'Out of stock'}
          </span>
        </div>

        {/* Add to Cart Button */}
        <button 
          onClick={handleAddToCart}
          disabled={isOutOfStock}
          className="w-full py-2 px-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-all duration-300 bg-gray-700 text-white hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed shadow-lg hover:shadow-gray-500/25 text-xs xs:text-sm sm:text-sm transform hover:scale-105 cursor-pointer mb-2"
        >
          <ShoppingBag size={14} className="xs:w-4 xs:h-4 sm:w-4 sm:h-4" />
          <span className="text-xs xs:text-sm sm:text-sm">
            {!isOutOfStock ? 'Add to Cart' : 'Out of Stock'}
          </span>
        </button>
      </div>
    </div>
  );
}
import { Product } from '@/types/product';
import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';
import { ShoppingBag, Eye, CreditCard } from 'lucide-react';
import Image from 'next/image';

interface ProductCardProps {
  product: Product;
}

// ✅ Format price with commas for thousands
const formatPrice = (price: number): string => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

// ✅ Calculate discount percentage
const calculateDiscountPercentage = (originalPrice: number, discountedPrice: number): number => {
  if (originalPrice <= 0) return 0;
  const discountAmount = originalPrice - discountedPrice;
  const discountPercentage = (discountAmount / originalPrice) * 100;
  return Math.round(discountPercentage * 100) / 100;
};

// ✅ Get product offer information
const getProductOfferInfo = (product: Product): {
  hasOffer: boolean;
  originalPrice: number;
  discountedPrice: number;
  discountPercentage: number;
} => {
  if (product.hasOffer && product.originalPrice && product.discountPercentage) {
    return {
      hasOffer: true,
      originalPrice: product.originalPrice,
      discountedPrice: product.basePrice,
      discountPercentage: product.discountPercentage
    };
  }
  
  return {
    hasOffer: false,
    originalPrice: product.basePrice,
    discountedPrice: product.basePrice,
    discountPercentage: 0
  };
};

export default function ProductCard({ product }: ProductCardProps) {
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  const { addToCart, cart } = useCart();
  const router = useRouter();

  const offerInfo = getProductOfferInfo(product);
  const actualDiscountPercentage = offerInfo.hasOffer 
    ? calculateDiscountPercentage(offerInfo.originalPrice, offerInfo.discountedPrice)
    : 0;
  const hasValidOffer = offerInfo.hasOffer && offerInfo.originalPrice > offerInfo.discountedPrice;

  const handleCardClick = () => {
    router.push(`/products/${product.slug}`);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.stopPropagation();
    router.push(`/products/${product.slug}?quickview=true`);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await addToCart(product, 1);
    } catch (error) {
      console.error('Failed to add product to cart:', error);
    }
  };

  const handleBuyNow = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await addToCart(product, 1);
      router.push('/checkout');
    } catch (error) {
      console.error('Failed to process Buy Now:', error);
    }
  };

  const isInCart = cart?.items?.some(item => item.product._id === product._id) || false;
  const isOutOfStock = product.stock <= 0;
  const imageUrl = product.images?.[0]?.image 
    ? `${process.env.NEXT_PUBLIC_BASE_URL}${product.images[0].image}`
    : '/placeholder-image.jpg';

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

      <div className="relative p-3 sm:p-4 pb-0 overflow-hidden">
        <div className="relative h-32 xs:h-36 sm:h-40 md:h-48 bg-gray-100 flex items-center justify-center overflow-hidden rounded-lg">
          <div className="relative w-full h-full">
            <Image
              src={imageUrl}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className={`object-contain transition-all duration-300 ${isHovered ? 'scale-110' : ''}`}
              onError={handleImageError}
              priority={false}
              loading="lazy"
            />
          </div>
          
          <div className={`absolute inset-0 bg-black/20 flex items-center justify-center transition-all duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'
          } hidden sm:flex`}>
           
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
      
<div className="p-3">
  {/* Product Name with fixed height */}
  <div className="flex justify-between items-start mb-2 min-h-[2.5rem]">
    <h3 className="font-semibold text-gray-900 line-clamp-2 text-[10px] sm:text-[14px] flex-1 pr-2 text-left">
      {product.name}
    </h3>
    
{hasValidOffer && actualDiscountPercentage > 0 && (
  <div className="bg-red-100 text-red-800 px-1.5 py-0.5 rounded-md text-[10px] xs:text-xs font-bold whitespace-nowrap flex-shrink-0 sm:px-2 sm:text-xs">
    {Math.round(actualDiscountPercentage)}% OFF
  </div>
)}
  </div>
        
        {/* Price and Stock - FIXED THE STRIKETHROUGH */}
<div className="flex justify-between items-center mb-3">
  <div className="flex items-center gap-1 sm:gap-2">
    {/* Discounted Price - Larger on mobile too */}
    <span className="text-sm xs:text-base sm:text-lg font-bold text-gray-900">
      ₹{formatPrice(offerInfo.discountedPrice)}
    </span>
    
    {/* Original Price - EXTRA SMALL on mobile, small on desktop */}
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
  
  {/* Stock Badge - Also smaller on mobile */}
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

        {/* Buy Now Button
        <button 
          onClick={handleBuyNow}
          disabled={isOutOfStock}
          className="w-full py-2 px-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-all duration-300 bg-gray-700 text-white hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed shadow-lg hover:shadow-gray-500/25 text-xs xs:text-sm sm:text-sm transform hover:scale-105 cursor-pointer"
        >
          <CreditCard size={14} className="xs:w-4 xs:h-4 sm:w-4 sm:h-4" />
          <span className="text-xs xs:text-sm sm:text-sm">Buy Now</span>
        </button> */}
      </div>
    </div>
  );
}
'use client';

import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { Product } from '@/types/product';
import { ShoppingBag, Check } from 'lucide-react';

interface AddToCartButtonProps {
  product: Product;
  selectedSize?: string;
  disabled?: boolean;
}

export default function AddToCartButton({ product, selectedSize, disabled }: AddToCartButtonProps) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart, loading, addingProductId, cart } = useCart();

  const isAdding = loading && addingProductId === product._id;
  
  // Check if product has sizes
  const hasSizes = product.sizes && product.sizes.length > 0;

  // ✅ FIXED: Calculate max quantity based on product stock OR size stock
  const getMaxQuantity = () => {
    if (hasSizes && selectedSize) {
      const sizeObj = product.sizes?.find(s => s.size === selectedSize);
      return sizeObj ? sizeObj.stock : 0;
    }
    return Math.max(0, product.stock);
  };

  // ✅ FIXED: Simple cart item detection (with size check if applicable)
  const isInCart = cart?.items?.some(item => {
    if (item && item.product && item.product._id === product._id) {
      // If product has sizes, check if size matches
      if (hasSizes && item.selectedSize) {
        return item.selectedSize === selectedSize;
      }
      // If no sizes, just check product ID
      return true;
    }
    return false;
  }) || false;

// In AddToCartButton.tsx - Update just the handleAddToCart function
const handleAddToCart = async () => {
  // Validate size selection for products with sizes
  if (hasSizes && !selectedSize) {
    alert('Please select a size');
    return;
  }

  console.log('🛒 START - Adding to cart:', {
    productId: product._id,
    productName: product.name,
    quantity,
    selectedSize,
    timestamp: new Date().toISOString()
  });

  try {
    // ✅ FIXED: Pass selectedSize as third parameter
    console.log('📤 Calling addToCart function with size:', selectedSize);
    const result = await addToCart(product, quantity, selectedSize); // ✅ Pass selectedSize here
    console.log('✅ addToCart result:', result);
  } catch (error) {
    console.error('❌ Error adding to cart:', error);
    alert('Failed to add item to cart. Please try again.');
  }
};

  const maxQuantity = getMaxQuantity();
  const isOutOfStock = maxQuantity <= 0;
  const finalDisabled = disabled || isOutOfStock || isAdding;

  return (
    <div className="space-y-3">
      {/* Quantity Selector - Only show if product is in stock */}
      {!isOutOfStock && (
        <div className="flex items-center gap-2">
          <span className="font-semibold text-sm">Qty:</span>
          <div className="flex items-center border border-gray-300 rounded">
            <button
              type="button"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="px-2 py-1 hover:bg-gray-50 transition-colors disabled:opacity-50 cursor-pointer text-sm"
              disabled={quantity <= 1}
            >
              -
            </button>
            <span className="px-2 py-1 min-w-8 text-center text-sm">{quantity}</span>
            <button
              type="button"
              onClick={() => setQuantity(Math.min(maxQuantity, quantity + 1))}
              className="px-2 py-1 hover:bg-gray-50 transition-colors disabled:opacity-50 cursor-pointer text-sm"
              disabled={quantity >= maxQuantity}
            >
              +
            </button>
          </div>
          {maxQuantity > 0 && (
            <span className="text-xs text-gray-600">
              Max: {maxQuantity}
            </span>
          )}
        </div>
      )}

      {/* Size Selection Info (if applicable) */}
      {hasSizes && selectedSize && (
        <div className="p-2 bg-gray-50 rounded text-sm">
          <span className="font-medium">Selected Size: </span>
          <span className="text-[#D4AF37] font-bold">{selectedSize}</span>
        </div>
      )}

      {/* Add to Cart Button */}
      <button
        type="button"
        onClick={handleAddToCart}
        disabled={finalDisabled}
        className="w-full py-2 px-4 bg-[#D4AF37] text-white rounded-lg font-medium flex items-center justify-center gap-2 transition-all duration-300 hover:bg-yellow-600 hover:shadow-md disabled:bg-gray-400 disabled:cursor-not-allowed shadow cursor-pointer text-sm"
      >
        {/* Container with fixed width to prevent shifting */}
        <div className="min-w-[120px] flex items-center justify-center gap-2">
          {isAdding ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              <span>Adding...</span>
            </>
          ) : isOutOfStock ? (
            <span>Out of Stock</span>
          ) : hasSizes && !selectedSize ? (
            <span>Select Size</span>
          ) : isInCart ? (
            <>
              <Check size={16} />
              <span>In Cart</span>
            </>
          ) : (
            <>
              <ShoppingBag size={16} />
              <span>Add to Cart</span>
            </>
          )}
        </div>
      </button>
    </div>
  );
}
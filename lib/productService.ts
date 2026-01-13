// lib/productService.ts
import { 
  Product, 
  ApiResponse, 
  FilterOptions, 
  FilteredProductsResponse,
  FeaturedProductsResponse,
  PriceRangesResponse,
  CreateProductData,
  UpdateProductData,
  SingleProductResponse,
  CreateProductResponse,
  ProductOfferInfo // ✅ ADDED
} from '@/types/product';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// Define a type for API parameters
type APIParams = Record<string, string | number | boolean | string[] | number[] | undefined>;

// Helper function to handle API calls
async function fetchAPI<T>(endpoint: string, params: APIParams = {}): Promise<T> {
  try {
    const url = new URL(`${API_BASE_URL}${endpoint}`);
    
    console.log('🌐 API Call:', url.toString()); // Debug log
    console.log('📋 Params:', params); // Debug log
    
    // Add query parameters
    Object.keys(params).forEach(key => {
      const value = params[key];
      if (value !== undefined && value !== null && value !== '') {
        if (Array.isArray(value)) {
          value.forEach((item) => {
            url.searchParams.append(key, item.toString());
          });
        } else {
          url.searchParams.append(key, value.toString());
        }
      }
    });

    console.log('🔗 Final URL:', url.toString()); // Debug log

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store'
    });

    console.log('📡 Response Status:', response.status); // Debug log

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ API Error Response:', errorText);
      throw new Error(`API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log('✅ API Success:', data); // Debug log
    return data as T;
  } catch (error) {
    console.error('❌ API call failed:', error);
    throw error;
  }
}

// Helper function for POST/PUT/PATCH requests
async function mutateAPI<T>(endpoint: string, method: 'POST' | 'PUT' | 'PATCH', data: any): Promise<T> {
  try {
    const url = new URL(`${API_BASE_URL}${endpoint}`);
    
    console.log('🌐 API Call:', url.toString());
    console.log('📋 Method:', method);
    console.log('📦 Request Data:', data);

    const formData = new FormData();
    
    // Handle file uploads and regular data
    Object.keys(data).forEach(key => {
      if (key === 'images' && Array.isArray(data[key])) {
        // Handle image files
        data[key].forEach((file: File, index: number) => {
          formData.append('images', file);
        });
      } else if (key === 'keyFeatures' && Array.isArray(data[key])) {
        // Handle keyFeatures array
        formData.append(key, JSON.stringify(data[key]));
      } else if (key === 'specifications' && Array.isArray(data[key])) {
        // Handle specifications array
        formData.append(key, JSON.stringify(data[key]));
      } else if (key === 'colors' && Array.isArray(data[key])) {
        // Handle colors array
        formData.append(key, JSON.stringify(data[key]));
      } else if (key === 'variants' && Array.isArray(data[key])) {
        // ✅ ADDED: Handle variants array
        formData.append(key, JSON.stringify(data[key]));
      } else if (data[key] !== undefined && data[key] !== null && data[key] !== '') {
        // Handle other fields
        // ✅ CHANGED: Map 'price' to 'basePrice' for backend compatibility
        if (key === 'price') {
          formData.append('basePrice', data[key]);
        } else {
          formData.append(key, data[key]);
        }
      }
    });

    const response = await fetch(url.toString(), {
      method,
      body: formData,
    });

    console.log('📡 Response Status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ API Error Response:', errorText);
      throw new Error(`API error: ${response.status} - ${errorText}`);
    }

    const responseData = await response.json();
    console.log('✅ API Success:', responseData);
    return responseData as T;
  } catch (error) {
    console.error('❌ API call failed:', error);
    throw error;
  }
}

// ✅ Get all products with optional category filtering
export async function getAllProducts(filters: { category?: string } = {}): Promise<ApiResponse> {
  return fetchAPI<ApiResponse>('/products', filters);
}

// ✅ Get product by ID
export async function getProductById(id: string): Promise<SingleProductResponse> {
  return fetchAPI<SingleProductResponse>(`/products/${id}`);
}

// ✅ Get product by slug
export async function getProductBySlug(slug: string): Promise<SingleProductResponse> {
  return fetchAPI<SingleProductResponse>(`/products/slug/${slug}`);
}

// ✅ Create new product
export async function createProduct(productData: CreateProductData): Promise<CreateProductResponse> {
  return mutateAPI<CreateProductResponse>('/products', 'POST', productData);
}

// ✅ Update product
export async function updateProduct(productData: UpdateProductData): Promise<CreateProductResponse> {
  const { _id, ...data } = productData;
  return mutateAPI<CreateProductResponse>(`/products/${_id}`, 'PUT', data);
}

// ✅ Delete product
export async function deleteProduct(id: string): Promise<{ success: boolean; message: string }> {
  try {
    const url = new URL(`${API_BASE_URL}/products/${id}`);
    
    const response = await fetch(url.toString(), {
      method: 'DELETE',
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API error: ${response.status} - ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('❌ Delete product failed:', error);
    throw error;
  }
}

// ✅ Get featured products with filtering
export async function getFeaturedProducts(filters: {
  priceRange?: string;
  category?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
} = {}): Promise<FeaturedProductsResponse> {
  return fetchAPI<FeaturedProductsResponse>('/products/featured', filters);
}

// ✅ Get available price ranges for featured products
export async function getFeaturedPriceRanges(): Promise<PriceRangesResponse> {
  return fetchAPI<PriceRangesResponse>('/products/featured/price-ranges');
}

// ✅ Get filtered featured products with advanced filtering
export async function getFilteredFeaturedProducts(filters: {
  priceRanges?: string | string[];
  categories?: string | string[];
  minPrice?: number;
  maxPrice?: number;
  colors?: string | string[]; // ✅ KEEP: Color filtering
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
} = {}): Promise<FilteredProductsResponse> {
  return fetchAPI<FilteredProductsResponse>('/products/featured/filter', filters);
}

// ✅ Quick search for real-time suggestions (dropdown)
export async function quickSearchProducts(
  query: string, 
  limit: number = 5
): Promise<{
  success: boolean;
  data: Array<{
    _id: string;
    name: string;
    slug: string;
    basePrice: number; // ✅ CHANGED: from price to basePrice
    image: string | null;
    category: string;
    featured: boolean;
  }>;
  count: number;
}> {
  // Clean the query and ensure it's properly encoded
  const cleanQuery = query.trim();
  
  return fetchAPI<{
    success: boolean;
    data: Array<{
      _id: string;
      name: string;
      slug: string;
      basePrice: number;
      image: string | null;
      category: string;
      featured: boolean;
    }>;
    count: number;
  }>('/products/quick-search', { 
    q: cleanQuery, 
    limit: limit 
  });
}

// ✅ Advanced search with filters
export async function searchProducts(
  query: string, 
  filters: FilterOptions = {}
): Promise<ApiResponse> {
  const searchParams: APIParams = {
    search: query,
    ...filters
  };
  return fetchAPI<ApiResponse>('/products/search', searchParams);
}

// ✅ Get products by multiple categories
export async function getProductsByCategories(categoryIds: string[]): Promise<ApiResponse> {
  return fetchAPI<ApiResponse>('/products', { category: categoryIds });
}

// ✅ Utility function to build filter parameters
export function buildFilterParams(filters: FilterOptions): APIParams {
  const params: APIParams = {};

  if (filters.category) params.category = filters.category;
  if (filters.categories) params.categories = filters.categories;
  if (filters.priceRange) params.priceRange = filters.priceRange;
  if (filters.minPrice) params.minPrice = filters.minPrice;
  if (filters.maxPrice) params.maxPrice = filters.maxPrice;
  if (filters.colors) params.colors = filters.colors; // ✅ KEEP
  if (filters.featured) params.featured = filters.featured;
  if (filters.status) params.status = filters.status;
  if (filters.search) params.search = filters.search;
  if (filters.page) params.page = filters.page;
  if (filters.limit) params.limit = filters.limit;
  if (filters.sortBy) params.sortBy = filters.sortBy;
  if (filters.sortOrder) params.sortOrder = filters.sortOrder;

  return params;
}

// ✅ Price range constants matching your backend
export const PRICE_RANGES = [
  { value: '100-200', label: '₹100 - ₹200' },
  { value: '200-300', label: '₹200 - ₹300' },
  { value: '300-400', label: '₹300 - ₹400' },
  { value: '400-500', label: '₹400 - ₹500' },
  { value: '500-600', label: '₹500 - ₹600' },
  { value: 'above-600', label: 'Above ₹600' }
];

// ✅ Color options for filtering
export const COLOR_OPTIONS = [
  { value: 'red', label: 'Red', code: '#FF0000' },
  { value: 'blue', label: 'Blue', code: '#0000FF' },
  { value: 'green', label: 'Green', code: '#00FF00' },
  { value: 'black', label: 'Black', code: '#000000' },
  { value: 'white', label: 'White', code: '#FFFFFF' },
  { value: 'yellow', label: 'Yellow', code: '#FFFF00' },
  { value: 'purple', label: 'Purple', code: '#800080' },
  { value: 'pink', label: 'Pink', code: '#FFC0CB' },
  { value: 'orange', label: 'Orange', code: '#FFA500' },
  { value: 'gray', label: 'Gray', code: '#808080' },
];

// ✅ Sort options
export const SORT_OPTIONS = [
  { value: 'createdAt-desc', label: 'Newest First' },
  { value: 'createdAt-asc', label: 'Oldest First' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'name-asc', label: 'Name: A to Z' },
  { value: 'name-desc', label: 'Name: Z to A' },
  { value: 'rating-desc', label: 'Highest Rated' }
];

// ✅ Helper to format price for display
export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(price);
}

// ✅ Helper to get product image URL
export function getProductImageUrl(product: Product): string {
  if (product.images && product.images.length > 0 && product.images[0].image) {
    const imagePath = product.images[0].image;
    
    if (imagePath.startsWith('http')) {
      return imagePath;
    }
    
    const baseUrl = process.env.NEXT_PUBLIC_IMG_URL;
    return `${baseUrl}${imagePath}`;
  }
  
  if (product.ogImage) {
    const baseUrl = process.env.NEXT_PUBLIC_IMG_URL;
    return `${baseUrl}${product.ogImage}`;
  }
  
  return `${process.env.NEXT_PUBLIC_IMG_URL}`;
}

// ✅ Helper to get variant image URL
export function getVariantImageUrl(variant: any): string {
  if (variant.images && variant.images.length > 0 && variant.images[0].image) {
    const imagePath = variant.images[0].image;
    
    if (imagePath.startsWith('http')) {
      return imagePath;
    }
    
    const baseUrl = process.env.NEXT_PUBLIC_IMG_URL;
    return `${baseUrl}${imagePath}`;
  }
  
  return `${process.env.NEXT_PUBLIC_IMG_URL}`;
}

// ✅ Helper to get color stock status
export function getColorStockStatus(color: { name: string; stock: number }): string {
  if (color.stock > 10) return 'In Stock';
  if (color.stock > 0) return `Low Stock (${color.stock})`;
  return 'Out of Stock';
}

// ✅ Helper to get variant stock status
export function getVariantStockStatus(variant: { variantName: string; stock: number }): string {
  if (variant.stock > 10) return 'In Stock';
  if (variant.stock > 0) return `Low Stock (${variant.stock})`;
  return 'Out of Stock';
}

// ✅ Helper to get key features as array (for display)
export function getKeyFeatures(product: Product): string[] {
  if (product.keyFeatures && Array.isArray(product.keyFeatures)) {
    return product.keyFeatures;
  }
  return [];
}

// ✅ Helper to check if product has key features
export function hasKeyFeatures(product: Product): boolean {
  return !!(product.keyFeatures && product.keyFeatures.length > 0);
}

// ✅ Helper to format key features for display
export function formatKeyFeatures(keyFeatures: string[]): string[] {
  return keyFeatures.map(feature => feature.trim()).filter(feature => feature !== '');
}

// ✅ Helper to create key features from comma-separated string
export function createKeyFeaturesFromString(input: string): string[] {
  return input
    .split(',')
    .map(feature => feature.trim())
    .filter(feature => feature !== '');
}

// ✅ Helper to get the default variant
export function getDefaultVariant(product: Product): any | null {
  if (product.variants && product.variants.length > 0) {
    const defaultVariant = product.variants.find(v => v.isDefault);
    return defaultVariant || product.variants[0];
  }
  return null;
}

// ✅ Helper to get the active price (basePrice or variant price)
export function getActivePrice(product: Product, selectedVariant?: any): number {
  if (selectedVariant && selectedVariant.price) {
    return selectedVariant.price;
  }
  return product.basePrice;
}

// ✅ OFFER-RELATED HELPER FUNCTIONS - ADDED HERE

// ✅ Calculate discount price from original price and discount percentage
export function calculateDiscountedPrice(originalPrice: number, discountPercentage: number): number {
  const discountAmount = (originalPrice * discountPercentage) / 100;
  return originalPrice - discountAmount;
}

// ✅ Calculate discount percentage from original and discounted prices
export function calculateDiscountPercentage(originalPrice: number, discountedPrice: number): number {
  if (originalPrice <= 0) return 0;
  const discountAmount = originalPrice - discountedPrice;
  const discountPercentage = (discountAmount / originalPrice) * 100;
  return Math.round(discountPercentage * 100) / 100; // Round to 2 decimal places
}

// ✅ Get product offer information
export function getProductOfferInfo(product: Product, variant?: any): ProductOfferInfo {
  // Check variant first
  if (variant) {
    if (variant.originalPrice && variant.discountPercentage) {
      const discountedPrice = calculateDiscountedPrice(variant.originalPrice, variant.discountPercentage);
      return {
        hasOffer: variant.discountPercentage > 0,
        originalPrice: variant.originalPrice,
        discountedPrice: discountedPrice,
        discountPercentage: variant.discountPercentage,
        discountAmount: variant.originalPrice - discountedPrice
      };
    }
    
    // If variant doesn't have offer, use product's offer
    return getProductOfferInfo(product);
  }
  
  // Check product offer
  if (product.hasOffer && product.originalPrice && product.discountPercentage) {
    const discountedPrice = calculateDiscountedPrice(product.originalPrice, product.discountPercentage);
    return {
      hasOffer: true,
      originalPrice: product.originalPrice,
      discountedPrice: discountedPrice,
      discountPercentage: product.discountPercentage,
      discountAmount: product.originalPrice - discountedPrice
    };
  }
  
  // No offer
  return {
    hasOffer: false,
    originalPrice: product.basePrice,
    discountedPrice: product.basePrice,
    discountPercentage: 0,
    discountAmount: 0
  };
}

// ✅ Format price with strikethrough for offers
export function formatPriceWithOffer(
  originalPrice: number, 
  discountedPrice: number
): {
  originalFormatted: string;
  discountedFormatted: string;
  discountPercentage: number;
} {
  const discountPercentage = calculateDiscountPercentage(originalPrice, discountedPrice);
  
  return {
    originalFormatted: formatPrice(originalPrice),
    discountedFormatted: formatPrice(discountedPrice),
    discountPercentage: discountPercentage
  };
}

// ✅ Check if product has an active offer
export function hasActiveOffer(product: Product): boolean {
  return !!(product.hasOffer && product.originalPrice && product.discountPercentage && product.discountPercentage > 0);
}

// ✅ Get display price for UI (shows offer if available)
export function getDisplayPrice(product: Product, variant?: any): {
  originalPrice: number;
  currentPrice: number;
  hasOffer: boolean;
  discountPercentage: number;
  formatted: {
    original: string;
    current: string;
    discount: string;
  };
} {
  const offerInfo = getProductOfferInfo(product, variant);
  const formattedPrices = formatPriceWithOffer(offerInfo.originalPrice, offerInfo.discountedPrice);
  
  return {
    originalPrice: offerInfo.originalPrice,
    currentPrice: offerInfo.discountedPrice,
    hasOffer: offerInfo.hasOffer,
    discountPercentage: offerInfo.discountPercentage,
    formatted: {
      original: formattedPrices.originalFormatted,
      current: formattedPrices.discountedFormatted,
      discount: `${offerInfo.discountPercentage}% OFF`
    }
  };
}

// ✅ Get the best price (lowest price including offers)
export function getBestPrice(product: Product): number {
  let lowestPrice = product.basePrice;
  
  // Check product offer
  if (product.hasOffer && product.originalPrice && product.discountPercentage) {
    const discountedPrice = calculateDiscountedPrice(product.originalPrice, product.discountPercentage);
    lowestPrice = Math.min(lowestPrice, discountedPrice);
  }
  
  // Check variant prices
  if (product.variants && product.variants.length > 0) {
    product.variants.forEach(variant => {
      let variantPrice = variant.price;
      
      // Check variant offer
      if (variant.originalPrice && variant.discountPercentage) {
        variantPrice = calculateDiscountedPrice(variant.originalPrice, variant.discountPercentage);
      }
      
      lowestPrice = Math.min(lowestPrice, variantPrice);
    });
  }
  
  return lowestPrice;
}
// ✅ GET OFFER PRODUCTS - ADD THIS FUNCTION
export async function getOfferProducts(filters: {
  category?: string;
  minDiscount?: number;
  maxDiscount?: number;
  limit?: number;
  sort?: 'discount-desc' | 'price-asc' | 'price-desc' | 'new';
} = {}): Promise<{
  success: boolean;
  data: Product[];
  count: number;
}> {
  const params: APIParams = {};
  
  if (filters.category) params.category = filters.category;
  if (filters.minDiscount !== undefined) params.minDiscount = filters.minDiscount;
  if (filters.maxDiscount !== undefined) params.maxDiscount = filters.maxDiscount;
  if (filters.limit) params.limit = filters.limit;
  if (filters.sort) params.sort = filters.sort;

  return fetchAPI<{
    success: boolean;
    data: Product[];
    count: number;
  }>('/products/offers', params);
}

// ✅ Add to FilterOptions type (optional)
// In your types file, you can add:
// export interface FilterOptions {
//   // ... existing filters
//   minDiscount?: number;
//   maxDiscount?: number;
//   sort?: 'discount-desc' | 'price-asc' | 'price-desc' | 'new';
// }

// ✅ DISCOUNT RANGE OPTIONS (add to constants)
export const DISCOUNT_RANGES = [
  { value: '10-20', label: '10% - 20% OFF', min: 10, max: 20 },
  { value: '20-30', label: '20% - 30% OFF', min: 20, max: 30 },
  { value: '30-50', label: '30% - 50% OFF', min: 30, max: 50 },
  { value: '50-70', label: '50% - 70% OFF', min: 50, max: 70 },
  { value: '70-90', label: '70% - 90% OFF', min: 70, max: 90 },
  { value: 'above-90', label: 'Above 90% OFF', min: 90, max: 100 }
];

// ✅ SORT OPTIONS FOR OFFERS (add to constants)
export const OFFER_SORT_OPTIONS = [
  { value: 'discount-desc', label: 'Highest Discount' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'new', label: 'Newest Offers' }
];
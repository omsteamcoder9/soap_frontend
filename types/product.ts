// types/product.ts
export interface ProductImage {
  image: string;
  _id: string;
}

export interface ProductColor {
  name: string;
  code?: string; // hex color code: #FFFFFF
  stock: number;
  _id?: string;
}

export interface ProductVariant {  // ✅ ADDED: Product Variants
  variantName: string;
  variantSlug?: string;
  price: number;
  originalPrice?: number; // ✅ ADDED for offer support
  description?: string;
  stock: number;
  images: ProductImage[];
  sku?: string;
  isDefault: boolean;
  status: 'active' | 'inactive' | 'out-of-stock';
  discountPercentage?: number; // ✅ ADDED for offer support
  features?: string[];
  _id?: string;
}

export interface ProductSpecification {
  key: string;
  value: string;
  _id?: string;
}

export interface Product {
  _id: string;
  sNo: number;
  name: string;
  slug: string;
  basePrice: number; // ✅ CHANGED: from price to basePrice (to match backend)
  
  // ✅ OFFER FIELDS - ADDED HERE
  originalPrice?: number;
  discountPercentage?: number;
  hasOffer?: boolean;
  
  description: string;
  category: string | {
    _id: string;
    name: string;
    slug: string;
    description?: string;
  };
  rating: number;
  images: ProductImage[];
  seller: string;
  stock: number;
  numberOfReviews: number;
  
  // ✅ KEEP: Color variants
  colors?: ProductColor[];
  
  // ✅ ADDED: Product variants (combo packs)
  variants?: ProductVariant[];
  
  // ✅ ADDED: Specifications
  specifications?: ProductSpecification[];
  
  // ✅ ADDED: Key Features
  keyFeatures?: string[];
  
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string[];
  canonicalUrl?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  status: 'active' | 'inactive' | 'out-of-stock';
  featured: boolean;
  tags?: string[];
  isActive?: boolean;
  isFeatured?: boolean;
  ratings?: {
    average: number;
    count: number;
  };
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse {
  success: boolean;
  count: number;
  data: Product[];
}

export interface RawApiResponse {
  success: boolean;
  count: number;
  data?: Product[];
  products?: Product[];
  message?: string;
}

export interface FilterOptions {
  category?: string;
  priceRange?: string;
  categories?: string | string[];
  minPrice?: number;
  maxPrice?: number;
  // ✅ KEEP: Color filtering
  colors?: string[];
  featured?: boolean;
  status?: string;
  search?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PriceRange {
  range: string;
  count: number;
  minPrice: number;
  maxPrice: number;
}

export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalProducts: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface FilteredProductsResponse {
  success: boolean;
  data: Product[];
  pagination: PaginationInfo;
}

export interface FeaturedProductsResponse {
  success: boolean;
  count: number;
  data: Product[];
}

export interface PriceRangesResponse {
  success: boolean;
  data: PriceRange[];
}

// ✅ UPDATED: Product creation/update interfaces
export interface CreateProductData {
  name: string;
  basePrice: number; // ✅ CHANGED: from price to basePrice
  
  // ✅ OFFER FIELDS - ADDED HERE
  originalPrice?: number;
  discountPercentage?: number;
  hasOffer?: boolean;
  
  description: string;
  category: string;
  seller: string;
  stock?: number;
  
  // ✅ KEEP: Color variants
  colors?: ProductColor[];
  
  // ✅ ADDED: Product variants
  variants?: ProductVariant[];
  
  specifications?: ProductSpecification[];
  keyFeatures?: string[];
  images?: File[];
  slug?: string;
  rating?: number;
  numberOfReviews?: number;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string[];
  canonicalUrl?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  status?: 'active' | 'inactive' | 'out-of-stock';
  featured?: boolean;
  tags?: string[];
}

export interface UpdateProductData extends Partial<CreateProductData> {
  _id: string;
}

// ✅ KEEP: Color filter option for frontend
export interface ColorFilterOption {
  name: string;
  code: string;
  count: number;
}

// ✅ ADDED: Product detail response
export interface ProductDetailResponse {
  success: boolean;
  data: Product;
}

// ✅ UPDATED: Cart product interface with selected color AND variant
export interface CartProduct extends Omit<Product, 'colors' | 'variants'> {
  selectedColor?: ProductColor;
  selectedVariant?: ProductVariant; // ✅ ADDED: Support for variant selection
  quantity: number;
}

// ✅ ADDED: API response for single product
export interface SingleProductResponse {
  success: boolean;
  data: Product;
}

// ✅ ADDED: Product creation response
export interface CreateProductResponse {
  success: boolean;
  message: string;
  data: Product;
}

// ✅ ADDED: Offer calculation helper interface
export interface ProductOfferInfo {
  hasOffer: boolean;
  originalPrice: number;
  discountedPrice: number;
  discountPercentage: number;
  discountAmount: number;
}
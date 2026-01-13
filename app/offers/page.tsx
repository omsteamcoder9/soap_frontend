// app/offers/page.tsx
'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { getOfferProducts } from '@/lib/productService';
import { fetchActiveCategories } from '@/lib/categoryService';
import type { Product } from '@/types/product';
import type { Category } from '@/types/category';
import ProductCard from '@/components/ui/ProductCard';
import FilterDropdown from '@/components/products/FilterDropdown';
import SortDropdown from '@/components/products/SortDropdown';

// Define filter state interface
interface FilterState {
  category: string;
  priceRange: string;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
}

// Loading skeleton
function ProductSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: 8 }).map((_, index) => (
        <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden animate-pulse">
          <div className="aspect-square bg-gray-300"></div>
          <div className="p-4">
            <div className="h-4 bg-gray-300 rounded mb-2"></div>
            <div className="h-3 bg-gray-200 rounded mb-3 w-3/4"></div>
            <div className="flex items-center justify-between">
              <div className="h-5 bg-gray-300 rounded w-1/3"></div>
              <div className="h-5 bg-gray-200 rounded w-1/4"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function OffersPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filter state
  const [filters, setFilters] = useState<FilterState>({
    category: '',
    priceRange: '',
    sortBy: 'discount',
    sortOrder: 'desc'
  });

  // Fetch offer products
  const fetchOfferProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Fetch ALL offer products without any filters
      const response = await getOfferProducts({
        limit: 50
      });
      
      if (response.success) {
        setProducts(response.data);
        setFilteredProducts(response.data);
      } else {
        setError('Failed to load offers');
      }
    } catch (err) {
      console.error('Error fetching offers:', err);
      setError('An error occurred while loading offers');
    } finally {
      setLoading(false);
    }
  };

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const categoriesData = await fetchActiveCategories();
      setCategories(categoriesData);
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  };

  useEffect(() => {
    fetchOfferProducts();
    fetchCategories();
  }, []);

  // Apply filters
  const applyFilters = useCallback(() => {
    let result = [...products];

    // Apply category filter
    if (filters.category) {
      result = result.filter(product => product.category === filters.category);
    }

    // Apply price range filter
    if (filters.priceRange) {
      result = result.filter(product => {
        const price = product.basePrice;
        switch (filters.priceRange) {
          case '100-200':
            return price >= 100 && price <= 200;
          case '200-300':
            return price >= 200 && price <= 300;
          case '300-400':
            return price >= 300 && price <= 400;
          case '400-500':
            return price >= 400 && price <= 500;
          case '500-600':
            return price >= 500 && price <= 600;
          case 'above-600':
            return price > 600;
          default:
            return true;
        }
      });
    }

    // Apply sorting
    result.sort((a, b) => {
      let aValue, bValue;
      
      switch (filters.sortBy) {
        case 'price':
          aValue = a.basePrice;
          bValue = b.basePrice;
          break;
        case 'discount':
          aValue = a.discountPercentage || 0;
          bValue = b.discountPercentage || 0;
          break;
        case 'name':
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
        case 'createdAt':
          aValue = new Date(a.createdAt || 0).getTime();
          bValue = new Date(b.createdAt || 0).getTime();
          break;
        default:
          aValue = 0;
          bValue = 0;
      }

      if (filters.sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    setFilteredProducts(result);
  }, [filters, products]);

  useEffect(() => {
    if (products.length > 0) {
      applyFilters();
    }
  }, [filters, products, applyFilters]);

  const handleFiltersChange = (newFilters: Partial<FilterState>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const clearAllFilters = () => {
    setFilters({
      category: '',
      priceRange: '',
      sortBy: 'discount',
      sortOrder: 'desc'
    });
  };

  // Calculate statistics
  const totalProducts = filteredProducts.length;
  const productsWithOffers = products.filter(p => 
    p.hasOffer || p.discountPercentage || (p.variants && p.variants.some(v => v.discountPercentage))
  ).length;

  // Count active filters
  const activeFilterCount = [
    filters.category ? 1 : 0,
    filters.priceRange ? 1 : 0
  ].reduce((a, b) => a + b, 0);

  return (
    <div className="min-h-screen bg-gray-50">
     
      

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Filters Bar */}
       {/* Filters Bar */}
<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
  {/* Mobile Layout - Price and Sort in one line */}
  <div className="lg:hidden mb-4">
    <div className="flex items-center justify-between gap-2">
      {/* Price Filter on Left */}
      <div className="flex items-center gap-2 flex-1">
        <span className="text-sm font-medium text-gray-700 whitespace-nowrap">
         
        </span>
        <FilterDropdown
          title="Price"
          value={filters.priceRange}
          options={[
            { value: '', label: 'All Prices' },
            { value: '100-200', label: '₹100-200' },
            { value: '200-300', label: '₹200-300' },
            { value: '300-400', label: '₹300-400' },
            { value: '400-500', label: '₹400-500' },
            { value: '500-600', label: '₹500-600' },
            { value: 'above-600', label: 'Above ₹600' }
          ]}
          onSelect={(value) => handleFiltersChange({ priceRange: value as string })}
          compact={true}
        />
      </div>

      {/* Sort Dropdown on Right */}
      <div className="flex items-center gap-2 flex-1">
        <span className="text-sm font-medium text-gray-700 whitespace-nowrap">
         
        </span>
        <SortDropdown 
          sortBy={filters.sortBy}
          sortOrder={filters.sortOrder}
          onSortChange={(sortBy, sortOrder) => handleFiltersChange({ sortBy, sortOrder })}
          compact={true}
        />
      </div>
    </div>
  </div>

  {/* Desktop Layout - Hidden on mobile */}
  <div className="hidden lg:flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3">
    {/* Left side - Filter dropdowns */}
    <div className="w-full lg:w-auto">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
        <span className="text-sm font-medium text-gray-700 hidden sm:block whitespace-nowrap">
          Filters:
        </span>
        
        <div className="flex flex-wrap gap-2">
          {/* Price Range Filter */}
          <FilterDropdown
            title="Price"
            value={filters.priceRange}
            options={[
              { value: '', label: 'All Prices' },
              { value: '100-200', label: '₹100-200' },
              { value: '200-300', label: '₹200-300' },
              { value: '300-400', label: '₹300-400' },
              { value: '400-500', label: '₹400-500' },
              { value: '500-600', label: '₹500-600' },
              { value: 'above-600', label: 'Above ₹600' }
            ]}
            onSelect={(value) => handleFiltersChange({ priceRange: value as string })}
          />

          {/* Clear Filters Button */}
          {activeFilterCount > 0 && (
            <button
              onClick={clearAllFilters}
              className="text-sm text-red-600 hover:text-red-700 font-medium px-2 py-2 border border-red-200 rounded-lg hover:bg-red-50 transition-colors whitespace-nowrap"
            >
              Clear All
            </button>
          )}
        </div>
      </div>
    </div>

    {/* Right side - Sort dropdown and results count */}
    <div className="flex items-center gap-3 w-full lg:w-auto justify-between lg:justify-normal mt-3 lg:mt-0">
      <div className="text-sm text-gray-600 hidden lg:block whitespace-nowrap">
        {totalProducts} {totalProducts === 1 ? 'product' : 'products'} found
      </div>
      <div className="flex-1 lg:flex-none">
        <SortDropdown 
          sortBy={filters.sortBy}
          sortOrder={filters.sortOrder}
          onSortChange={(sortBy, sortOrder) => handleFiltersChange({ sortBy, sortOrder })}
        />
      </div>
    </div>
  </div>

  {/* Active Filters Display - Show on both mobile and desktop */}
  {activeFilterCount > 0 && (
    <div className="mt-3 pt-3 border-t border-gray-200">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm text-gray-600 whitespace-nowrap">Active:</span>
        
        {filters.priceRange && (
          <span className="inline-flex items-center gap-1 bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full whitespace-nowrap font-medium">
            Price: {filters.priceRange === 'above-600' ? '>₹600' : `₹${filters.priceRange}`}
            <button 
              onClick={() => handleFiltersChange({ priceRange: '' })}
              className="hover:text-green-900 text-xs font-bold"
            >
              ×
            </button>
          </span>
        )}
      </div>
    </div>
  )}
</div>

        {/* Loading State */}
        {loading && (
          <>
            <div className="mb-6">
              <div className="h-6 bg-gray-200 rounded w-48 animate-pulse"></div>
            </div>
            <ProductSkeleton />
          </>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="text-center py-12">
            <div className="text-red-500 text-xl mb-4">⚠️ {error}</div>
            <button
              onClick={fetchOfferProducts}
              className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Products Grid */}
        {!loading && !error && (
          <>
           

            {/* No Results */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-gray-400 text-5xl mb-4">😔</div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No offers available</h3>
                <p className="text-gray-500 mb-6">
                  Currently, there are no products on special offer. Please check back later!
                </p>
                <Link
                  href="/products"
                  className="inline-block bg-gray-900 text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Browse All Products
                </Link>
              </div>
            ) : (
              /* Products Grid - USING ProductCard COMPONENT */
<div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            )}
          </>
        )}

      </div>
    </div>
  );
}
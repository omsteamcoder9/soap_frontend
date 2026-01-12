'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { Product } from '@/types/product';
import { Category } from '@/types/category';
import { getAllProducts } from '@/lib/productService';
import { fetchActiveCategories } from '@/lib/categoryService';
import ProductCard from '../ui/ProductCard';
import SortDropdown from './SortDropdown';
import FilterDropdown from './FilterDropdown';

interface ProductGridProps {
  category?: string;
  search?: string;
  limit?: number;
  hideFilters?: boolean;
}

// Define the filter state interface
interface FilterState {
  category: string;
  priceRange: string;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
  search: string;
}

// Define the query parameters interface
interface QueryParams {
  category?: string;
  search?: string;
  sortBy?: string;
  sortOrder?: string;
}

export default function ProductGrid({ category, search, limit, hideFilters = false }: ProductGridProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isSticky, setIsSticky] = useState(false);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const filterBarRef = useRef<HTMLDivElement>(null);
  const mobileFiltersRef = useRef<HTMLDivElement>(null);
  
  // Determine if this is the home page (hideFilters is true and limit is not specified)
  const isHomePage = hideFilters && limit === undefined;
  
  // Filter state with proper typing
  const [filters, setFilters] = useState<FilterState>({
    category: category || '',
    priceRange: '',
    sortBy: 'createdAt',
    sortOrder: 'desc',
    search: search || ''
  });

  // Sticky filter bar effect - only if filters are visible
  useEffect(() => {
    if (hideFilters) return;

    const handleScroll = () => {
      if (filterBarRef.current) {
        const filterBarTop = filterBarRef.current.getBoundingClientRect().top;
        setIsSticky(filterBarTop <= 0);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hideFilters]);

  // Close mobile filters when clicking outside - only if filters are visible
  useEffect(() => {
    if (hideFilters) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (mobileFiltersRef.current && !mobileFiltersRef.current.contains(event.target as Node)) {
        setIsMobileFiltersOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [hideFilters]);

  // Wrap loadFilteredProducts in useCallback to memoize it
  const loadFilteredProducts = useCallback(async () => {
    try {
      setLoading(true);
      
      let productsData;

      console.log('🔄 Current filters:', filters);
      console.log('📦 Loading products with category:', filters.category);
      
      const hasPriceFilter = filters.priceRange;
      
      // Use properly typed query parameters
      const queryParams: QueryParams = {};
      
      // Only add category to query if it's not empty
      if (filters.category) {
        queryParams.category = filters.category;
        console.log('🎯 Filtering by category:', filters.category);
      } else {
        console.log('🎯 Showing ALL products (no category filter)');
      }
      
      if (filters.search) queryParams.search = filters.search;
      if (filters.sortBy) queryParams.sortBy = filters.sortBy;
      if (filters.sortOrder) queryParams.sortOrder = filters.sortOrder;
      
      console.log('🚀 Sending to API:', queryParams);
      
      const response = await getAllProducts(queryParams);
      productsData = response.data;
      
      console.log('📦 API Response count:', productsData?.length);

      // Apply price filtering on frontend
      if (hasPriceFilter && productsData) {
        console.log('💰 Applying price filter on frontend:', filters.priceRange);
        const filtered = productsData.filter(product => {
          // ✅ CHANGED: Use product.basePrice instead of product.price
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
        console.log('💰 After price filtering:', filtered.length);
        productsData = filtered;
      }

      // APPLY LIMIT - Always 12 for home page, otherwise use limit prop
      const finalLimit = isHomePage ? 8 : limit;
      if (finalLimit && productsData) {
        console.log(`🎯 Applying limit: ${finalLimit} products`);
        productsData = productsData.slice(0, finalLimit);
      }

      console.log('✅ Final products:', productsData?.length);
      setProducts(productsData || []);
    } catch (err) {
      console.error('❌ Error loading products:', err);
      setError('Failed to load products');
    } finally {
      setLoading(false);
    }
  }, [filters, limit, isHomePage]); // Add dependencies for useCallback

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        
        // Load categories
        const categoriesData = await fetchActiveCategories();
        setCategories(categoriesData);

        // Load products based on filters
        await loadFilteredProducts();
      } catch (err) {
        setError('Failed to load products');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [loadFilteredProducts]); // Add loadFilteredProducts as dependency

  // Update filters when category prop changes
  useEffect(() => {
    console.log('🔄 Category prop changed:', category);
    setFilters(prev => ({
      ...prev,
      category: category || ''
    }));
  }, [category]);

  // Update filters when search prop changes
  useEffect(() => {
    if (search !== undefined) {
      setFilters(prev => ({
        ...prev,
        search: search || ''
      }));
    }
  }, [search]);

  // Reload products when filters change
  useEffect(() => {
    console.log('🔄 Filters changed, reloading products:', filters);
    if (categories.length > 0) {
      loadFilteredProducts();
    }
  }, [filters, categories.length, loadFilteredProducts]); // Add loadFilteredProducts as dependency

  const handleSortChange = (sortBy: string, sortOrder: 'asc' | 'desc') => {
    setFilters(prev => ({
      ...prev,
      sortBy,
      sortOrder
    }));
  };

  const handleFiltersChange = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

  const clearAllFilters = () => {
    setFilters({
      category: '',
      priceRange: '',
      sortBy: 'createdAt',
      sortOrder: 'desc',
      search: ''
    });
  };

  // Count active filters for badge - only if filters are visible
  const activeFilterCount = hideFilters ? 0 : [
    filters.category ? 1 : 0,
    filters.priceRange ? 1 : 0,
    filters.search ? 1 : 0
  ].reduce((a, b) => a + b, 0);

  if (loading && products.length === 0) {
    return (
      <div className="flex justify-center items-center py-8 sm:py-12 font-sans">
        <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-b-2 border-gray-700"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8 sm:py-12 px-4 font-sans">
        <p className="text-red-600 text-base sm:text-lg">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-3 sm:mt-4 bg-gray-700 text-white px-4 sm:px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors text-sm sm:text-base font-medium"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="font-sans">
      {/* Container with increased width - removed side margins on larger screens */}
      <div className="mx-3 xs:mx-4 sm:mx-6 md:mx-8 lg:mx-8 xl:mx-12 2xl:mx-16">
        
        {/* CONDITIONAL RENDERING: Only show filters if hideFilters is false */}
        {!hideFilters && (
          <>
            {/* Mobile Filter and Sort Buttons - Only on small screens */}
            <div className="lg:hidden mb-4 flex gap-2">
              <button
                onClick={() => setIsMobileFiltersOpen(true)}
                className="flex-1 py-2 sm:py-3 bg-gray-700 text-white rounded-lg font-medium flex items-center justify-center gap-2 shadow-lg hover:shadow-gray-500/25 transition-all duration-200 text-sm sm:text-base hover:bg-gray-800"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z" />
                </svg>
                Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
              </button>
              
              {/* Mobile Sort Dropdown */}
              <div className="flex-1">
                <SortDropdown 
                  sortBy={filters.sortBy}
                  sortOrder={filters.sortOrder}
                  onSortChange={handleSortChange}
                  compact={true}
                />
              </div>
            </div>

            {/* Mobile Filter Panel - Inline instead of overlay */}
            {isMobileFiltersOpen && (
              <div 
                ref={mobileFiltersRef}
                className="lg:hidden bg-white rounded-lg shadow-lg border border-gray-200 p-4 mb-4 font-sans"
              >
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
                  <button
                    onClick={() => setIsMobileFiltersOpen(false)}
                    className="p-2 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Mobile Filter Content */}
                <div className="space-y-4">
                  {/* Category Filter */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Category</h3>
                    <div className="space-y-1">
                      {[
                        { value: '', label: 'All Categories' },
                        ...categories.map(cat => ({ value: cat._id, label: cat.name }))
                      ].map((option) => (
                        <label key={option.value} className="flex items-center">
                          <input
                            type="radio"
                            name="mobile-category"
                            checked={filters.category === option.value}
                            onChange={() => handleFiltersChange({ ...filters, category: option.value })}
                            className="text-gray-700 focus:ring-gray-700"
                          />
                          <span className="ml-2 text-gray-700">{option.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Price Range Filter */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Price Range</h3>
                    <div className="space-y-1">
                      {[
                        { value: '', label: 'All Prices' },
                        { value: '100-200', label: '₹100-200' },
                        { value: '200-300', label: '₹200-300' },
                        { value: '300-400', label: '₹300-400' },
                        { value: '400-500', label: '₹400-500' },
                        { value: '500-600', label: '₹500-600' },
                        { value: 'above-600', label: 'Above ₹600' }
                      ].map((option) => (
                        <label key={option.value} className="flex items-center">
                          <input
                            type="radio"
                            name="mobile-price"
                            checked={filters.priceRange === option.value}
                            onChange={() => handleFiltersChange({ ...filters, priceRange: option.value })}
                            className="text-gray-700 focus:ring-gray-700"
                          />
                          <span className="ml-2 text-gray-700">{option.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-2">
                    <button
                      onClick={() => {
                        clearAllFilters();
                        setIsMobileFiltersOpen(false);
                      }}
                      className="flex-1 py-2 text-gray-600 border border-gray-300 rounded-lg hover:border-gray-400 transition-colors font-medium"
                    >
                      Clear All
                    </button>
                    <button
                      onClick={() => setIsMobileFiltersOpen(false)}
                      className="flex-1 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition-all duration-200 font-medium shadow-lg hover:shadow-gray-500/25"
                    >
                      Apply
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Desktop Filter Bar */}
            <div 
              ref={filterBarRef}
              className={`hidden lg:block bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6 transition-all duration-200 font-sans ${
                isSticky 
                  ? 'sticky top-0 z-40 shadow-lg border-b-2 border-gray-300' 
                  : 'relative'
              }`}
            >
              {/* Desktop Header when sticky */}
              {isSticky && (
                <div className="hidden lg:flex items-center justify-between mb-3">
                  <h2 className="text-lg font-semibold text-gray-900">
                    All Products
                    <span className="ml-2 text-sm font-normal text-gray-500">
                      ({products.length} {products.length === 1 ? 'item' : 'items'})
                    </span>
                  </h2>
                  {activeFilterCount > 0 && (
                    <button
                      onClick={clearAllFilters}
                      className="text-sm text-red-600 hover:text-red-700 font-medium px-3 py-1 border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
                    >
                      Clear All Filters
                    </button>
                  )}
                </div>
              )}

              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3">
                {/* Left side - Filter dropdowns */}
                <div className="w-full lg:w-auto">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                    {!isSticky && (
                      <span className="text-sm font-medium text-gray-700 hidden sm:block whitespace-nowrap">
                        Filters:
                      </span>
                    )}
                    
                    <div className="flex flex-wrap gap-2">
                      {/* Category Filter */}
                      <FilterDropdown
                        title="Category"
                        value={filters.category}
                        options={[
                          { value: '', label: 'All Categories' },
                          ...categories.map(cat => ({ value: cat._id, label: cat.name }))
                        ]}
                        onSelect={(value) => handleFiltersChange({ ...filters, category: value as string })}
                      />

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
                        onSelect={(value) => handleFiltersChange({ ...filters, priceRange: value as string })}
                      />

                      {/* Clear Filters Button - Hidden when sticky on desktop */}
                      {!isSticky && activeFilterCount > 0 && (
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
                  {!isSticky && (
                    <div className="text-sm text-gray-600 hidden lg:block whitespace-nowrap">
                      {products.length} {products.length === 1 ? 'product' : 'products'} found
                    </div>
                  )}
                  <div className="flex-1 lg:flex-none">
                    <SortDropdown 
                      sortBy={filters.sortBy}
                      sortOrder={filters.sortOrder}
                      onSortChange={handleSortChange}
                    />
                  </div>
                </div>
              </div>

              {/* Active Filters Display - Hidden when sticky */}
              {!isSticky && activeFilterCount > 0 && (
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm text-gray-600 whitespace-nowrap">Active:</span>
                    
                    {/* Search Filter Display */}
                    {filters.search && (
                      <span className="inline-flex items-center gap-1 bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full whitespace-nowrap font-medium">
                        Search:&quot;{filters.search}
                        <button 
                          onClick={() => handleFiltersChange({ ...filters, search: '' })}
                          className="hover:text-yellow-900 text-xs font-bold"
                        >
                          ×
                        </button>
                      </span>
                    )}
                    
                    {filters.category && (
                      <span className="inline-flex items-center gap-1 bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full whitespace-nowrap font-medium">
                        Cat: {categories.find(c => c._id === filters.category)?.name}
                        <button 
                          onClick={() => handleFiltersChange({ ...filters, category: '' })}
                          className="hover:text-gray-900 text-xs font-bold"
                        >
                          ×
                        </button>
                      </span>
                    )}
                    
                    {filters.priceRange && (
                      <span className="inline-flex items-center gap-1 bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full whitespace-nowrap font-medium">
                        Price: {filters.priceRange === 'above-600' ? '>₹600' : `₹${filters.priceRange}`}
                        <button 
                          onClick={() => handleFiltersChange({ ...filters, priceRange: '' })}
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
          </>
        )}

        {/* Products Grid - Fixed 2 columns on mobile */}
        {products.length === 0 ? (
          <div className="text-center py-8 sm:py-12 font-sans">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 max-w-md mx-auto">
              <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                No Products Found
              </h3>
              <p className="text-gray-600 mb-4 text-sm">
                Try adjusting your filters to see more results.
              </p>
              <button 
                onClick={clearAllFilters}
                className="bg-gray-700 text-white px-6 py-2 rounded-lg font-medium hover:bg-gray-800 transition-all duration-200 text-sm shadow-lg hover:shadow-gray-500/25"
              >
                Clear All Filters
              </button>
            </div>
          </div>
        ) : (
<div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 gap-4 md:gap-6">            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
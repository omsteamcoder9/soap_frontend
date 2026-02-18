'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { useState, useEffect, useRef } from 'react';
import { quickSearchProducts } from '@/lib/productService';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { settingsAPI } from '@/lib/settings-api';

interface Category {
  _id: string;
  name: string;
  slug: string;
  createdAt: string;
}

interface SearchProduct {
  _id: string;
  name: string;
  slug: string;
  basePrice: number;
  image: string | null;
  category: string;
  featured: boolean;
}

interface HeaderClientProps {
  initialCategories: Category[];
}

export default function HeaderClient({ initialCategories }: HeaderClientProps) {
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const router = useRouter();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showShopDropdown, setShowShopDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchProduct[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [categories] = useState<Category[]>(initialCategories);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [siteName, setSiteName] = useState('GLAINIC');
  
  // Scroll behavior for footer
  const [isFooterVisible, setIsFooterVisible] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const shopDropdownRef = useRef<HTMLDivElement>(null);

  // Check if mobile
  const [isMobile, setIsMobile] = useState(false);
 
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1280);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Fetch site settings including siteName
  useEffect(() => {
    const loadSiteSettings = async () => {
      try {
        const response = await settingsAPI.getPublicSettings();
        if (response.success && response.data) {
          const settings = response.data;
          if (settings.siteName && settings.siteName.trim() !== '') {
            setSiteName(settings.siteName);
          }
        }
      } catch (error) {
        console.error('Error loading site settings:', error);
      }
    };

    loadSiteSettings();
  }, []);

  // Scroll behavior for footer
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsFooterVisible(true);
      } else {
        setIsFooterVisible(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', throttledScroll);
    };
  }, [lastScrollY]);

  // Search functionality
  useEffect(() => {
    const performSearch = async () => {
      if (searchQuery.trim().length < 2) {
        setSearchResults([]);
        return;
      }

      setIsSearching(true);
      try {
        const response = await quickSearchProducts(searchQuery, 5);
        if (response.success) {
          setSearchResults(response.data);
        }
      } catch (error) {
        console.error('Search error:', error);
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    };

    const debounceTimer = setTimeout(performSearch, 300);
    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  const handleLogout = () => {
    logout();
    setShowDropdown(false);
    setIsMobileMenuOpen(false);
    router.push('/');
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setShowSearch(false);
      setSearchQuery('');
      setSearchResults([]);
    }
  };

  const handleSearchClick = () => {
    setShowSearch(true);
    setTimeout(() => {
      searchInputRef.current?.focus();
    }, 100);
  };

  const handleProductClick = (product: SearchProduct) => {
    router.push(`/products/${product.slug}`);
    setShowSearch(false);
    setSearchQuery('');
    setSearchResults([]);
  };

  const handleViewAllResults = () => {
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setShowSearch(false);
      setSearchQuery('');
      setSearchResults([]);
    }
  };

  // Get first 2 categories to show in header
  const getFirstTwoCategories = () => {
    return categories.slice(0, 2);
  };

  // Get remaining categories for shop dropdown (after first 2)
  const getRemainingCategories = () => {
    return categories.slice(2);
  };

  const firstTwoCategories = getFirstTwoCategories();
  const remainingCategories = getRemainingCategories();
  
  // Close dropdowns when clicking outside or pressing Escape
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setShowSearch(false);
        setSearchQuery('');
        setSearchResults([]);
      }
      
      if (shopDropdownRef.current && !shopDropdownRef.current.contains(event.target as Node)) {
        setShowShopDropdown(false);
      }
      
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node) && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (showSearch) {
          setShowSearch(false);
          setSearchQuery('');
          setSearchResults([]);
        }
        if (showShopDropdown) {
          setShowShopDropdown(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscapeKey);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [showSearch, showShopDropdown, isMobileMenuOpen]);

  // Calculate cart items count safely
  const getCartItemCount = () => {
    if (!cart?.items) return 0;
    return cart.items.reduce((total, item) => total + (item.quantity || 0), 0);
  };

  const cartItemsCount = getCartItemCount();

  return (
    <>
      {/* Main Header - Using bg-gray-700 with white text */}
      <div className="xl:sticky xl:top-0 z-40">
        <header className="bg-gray-700 shadow-lg border-b border-gray-600 font-sans">
          <div className="container mx-auto px-3 sm:px-4 lg:px-6">
            <div className="flex items-center justify-between h-16 sm:h-20">
              {/* Logo and Mobile Menu Button */}
              <div className="flex items-center space-x-2 sm:space-x-3">
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="xl:hidden p-1.5 text-white hover:text-gray-200 transition-all duration-300 hover:bg-gray-600 rounded-lg cursor-pointer"
                  aria-label="Toggle mobile menu"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>

                {/* Logo */}
                <Link href="/" className="flex items-center space-x-2 sm:space-x-3 group cursor-pointer">
                  <div className="">
                    <Image
                      src="/images/fea.png"
                      alt="soap logo"
                      width={48}
                      height={48}
                      priority
                    />
                  </div>
                 <div className="flex flex-col">
  <span className="text-lg sm:text-xl md:text-2xl font-bold text-white tracking-tight">
    {siteName}
    <sup className="ml-1 text-[0.55em] align-super">™</sup>
  </span>
</div>

                </Link>
              </div>

              {/* Desktop Navigation */}
              <nav className="hidden xl:flex items-center space-x-4 2xl:space-x-6">
                <Link 
                  href="/" 
                  className="text-white hover:text-gray-200 transition-all duration-300 font-medium px-3 py-2 rounded-lg hover:bg-gray-600 border-b-2 border-transparent hover:border-gray-400 text-sm 2xl:text-base cursor-pointer"
                >
                  Home
                </Link>
                
                {/* First 2 Categories - NO LOADING CONDITION */}
                {firstTwoCategories.map((category) => (
                  <Link 
                    key={category._id}
                    href={`/products?category=${category.slug}`}
                    className="text-white hover:text-gray-200 transition-all duration-300 font-medium px-3 py-2 rounded-lg hover:bg-gray-600 border-b-2 border-transparent hover:border-gray-400 text-sm 2xl:text-base cursor-pointer"
                  >
                    {category.name}
                  </Link>
                ))}
                
                {/* Shop Dropdown - Shows remaining categories */}
                {remainingCategories.length > 0 && (
                  <div ref={shopDropdownRef} className="relative">
                    <button
                      onClick={() => setShowShopDropdown(!showShopDropdown)}
                      className="flex items-center space-x-1 text-white hover:text-gray-200 transition-all duration-300 font-medium px-3 py-2 rounded-lg hover:bg-gray-600 border-b-2 border-transparent hover:border-gray-400 text-sm 2xl:text-base cursor-pointer"
                    >
                      <span>Shop</span>
                      <svg
                        className={`w-3 h-3 md:w-4 md:h-4 transition-transform duration-300 ${showShopDropdown ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {/* Shop Dropdown Menu */}
                    {showShopDropdown && (
                      <div className="absolute top-full left-0 mt-1 w-48 bg-gray-800 rounded-lg shadow-xl py-2 z-50 border border-gray-600">
                        <div className="px-3 py-2 border-b border-gray-700">
                          <p className="text-white font-bold text-sm">Shop Categories</p>
                        </div>
                        
                        {/* Remaining Categories (3rd, 4th, etc.) */}
                        {remainingCategories.map((category) => (
                          <Link
                            key={category._id}
                            href={`/products?category=${category.slug}`}
                            className="flex items-center space-x-2 px-3 py-2 text-sm text-white hover:bg-gray-700 hover:text-gray-200 transition-all duration-300 cursor-pointer"
                            onClick={() => setShowShopDropdown(false)}
                          >
                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                            </svg>
                            <span>{category.name}</span>
                          </Link>
                        ))}
                        
                        {/* View All Products Link */}
                        <Link
                          href="/products"
                          className="flex items-center space-x-2 px-3 py-2 text-sm text-white hover:bg-gray-700 hover:text-gray-200 transition-all duration-300 cursor-pointer border-t border-gray-700 mt-1"
                          onClick={() => setShowShopDropdown(false)}
                        >
                          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                          <span className="font-medium">View All Products</span>
                        </Link>
                      </div>
                    )}
                  </div>
                )}
                
                {/* Offers Link in Desktop Navigation */}
                <Link 
                  href="/offers" 
                  className="text-white hover:text-red-200 transition-all duration-300 font-medium px-3 py-2 rounded-lg hover:bg-gray-600 border-b-2 border-transparent hover:border-red-400 text-sm 2xl:text-base cursor-pointer flex items-center"
                >
                  <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                  Offers
                </Link>
                
                <Link 
                  href="/about" 
                  className="text-white hover:text-gray-200 transition-all duration-300 font-medium px-3 py-2 rounded-lg hover:bg-gray-600 border-b-2 border-transparent hover:border-gray-400 text-sm 2xl:text-base cursor-pointer"
                >
                  About
                </Link>
                
                <Link 
                  href="/contact" 
                  className="text-white hover:text-gray-200 transition-all duration-300 font-medium px-3 py-2 rounded-lg hover:bg-gray-600 border-b-2 border-transparent hover:border-gray-400 text-sm 2xl:text-base cursor-pointer"
                >
                  Contact
                </Link>
              </nav>

              {/* Actions */}
              <div className="flex items-center space-x-1 sm:space-x-2 md:space-x-3 justify-center">
                {/* Search Component */}
                <div ref={searchContainerRef} className="relative flex items-center">
                  {showSearch ? (
                    <div className="fixed inset-0 xl:relative xl:inset-auto z-50 flex items-center justify-center xl:block">
                      {/* Mobile Full-Screen Search */}
                      <div className="xl:hidden fixed inset-0 bg-gray-700 pt-20">
                        <div className="container mx-auto px-4">
                          <div className="flex items-center gap-2 mb-4">
                            <div className="flex-1 flex items-center bg-gray-600 rounded-lg px-4 mt-10">
                              <svg className="w-5 h-5 text-gray-300 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                              </svg>
                              <input
                                ref={searchInputRef}
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search products, categories..."
                                className="flex-1 bg-transparent text-white focus:outline-none text-base placeholder-gray-400 w-full"
                                autoFocus
                              />
                              {searchQuery && (
                                <button
                                  type="button"
                                  onClick={() => setSearchQuery('')}
                                  className="ml-2 p-1 text-gray-300 hover:text-white rounded-full hover:bg-gray-500"
                                  aria-label="Clear search"
                                >
                                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                  </svg>
                                </button>
                              )}
                            </div>
                            
                            <button
                              type="submit"
                              onClick={handleSearchSubmit}
                              className="p-3 bg-gray-800 hover:bg-gray-900 text-white rounded-lg transition-all duration-300 flex items-center justify-center mt-10"
                              aria-label="Search"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                              </svg>
                            </button>
                            
                            <button
                              type="button"
                              onClick={() => {
                                setShowSearch(false);
                                setSearchQuery('');
                                setSearchResults([]);
                              }}
                              className="p-3 text-gray-300 hover:text-white hover:bg-gray-600 rounded-lg transition-all duration-300 mt-10"
                              aria-label="Close search"
                            >
                              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </div>

                          {/* Search Results Dropdown - MOBILE */}
                          {(searchResults.length > 0 || isSearching) && (
                            <div className="bg-gray-600 border border-gray-500 rounded-lg shadow-xl max-h-[60vh] overflow-y-auto">
                              {isSearching ? (
                                <div className="p-4 text-center text-gray-300">
                                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-300 mx-auto"></div>
                                  <p className="mt-2 text-sm">Searching...</p>
                                </div>
                              ) : (
                                <>
                                  <div className="p-2">
                                    <p className="text-xs text-white font-medium px-2 py-1">Search Results</p>
                                    {searchResults.map((product) => (
                                      <div
                                        key={product._id}
                                        className="flex items-center p-2 hover:bg-gray-500 rounded cursor-pointer transition-colors"
                                        onClick={() => handleProductClick(product)}
                                      >
                                        <div className="w-12 h-12 bg-gray-700 rounded flex-shrink-0 overflow-hidden border border-gray-600 relative">
                                          {product.image ? (
                                            <Image
                                              src={`${process.env.NEXT_PUBLIC_BASE_URL}${product.image}`}
                                              className="w-full h-full object-cover"
                                              alt={product.name}
                                              fill
                                              sizes="48px"
                                            />
                                          ) : (
                                            <div className="w-full h-full bg-gray-600 flex items-center justify-center">
                                              <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                              </svg>
                                            </div>
                                          )}
                                        </div>
                                        <div className="ml-3 flex-1 min-w-0">
                                          <p className="text-sm font-medium text-white truncate">{product.name}</p>
                                          <div className="flex items-center justify-between">
                                            <p className="text-xs text-gray-300">{product.category}</p>
                                            <p className="text-white font-medium text-sm">₹{product.basePrice}</p>
                                          </div>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                  <div
                                    className="border-t border-gray-500 p-3 bg-gray-700 hover:bg-gray-600 cursor-pointer text-center"
                                    onClick={handleViewAllResults}
                                  >
                                    <p className="text-sm font-medium text-white hover:text-white">
                                      View all results for &quot;{searchQuery}&quot;
                                    </p>
                                  </div>
                                </>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {/* Desktop Search Container */}
                      <div className="hidden xl:block absolute top-0 xl:relative w-full max-w-[90vw] sm:max-w-[400px] md:max-w-[500px] lg:max-w-[600px] xl:w-80 2xl:w-96 mx-auto xl:mx-0">
                        <div className="bg-gray-600 rounded-lg shadow-xl border border-gray-500 p-2 xl:p-1.5">
                          <form onSubmit={handleSearchSubmit} className="flex items-center gap-1.5">
                            <div className="flex-1 flex items-center bg-gray-700 rounded-md px-3 py-1.5">
                              <svg className="w-4 h-4 text-gray-300 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                              </svg>
                              <input
                                ref={searchInputRef}
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search products, categories..."
                                className="flex-1 bg-transparent text-white focus:outline-none text-sm md:text-base placeholder-gray-300 w-full min-w-0"
                                autoFocus
                              />
                              {searchQuery && (
                                <button
                                  type="button"
                                  onClick={() => setSearchQuery('')}
                                  className="ml-1 p-0.5 text-gray-300 hover:text-gray-100 rounded-full hover:bg-gray-500"
                                  aria-label="Clear search"
                                >
                                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                  </svg>
                                </button>
                              )}
                            </div>
                          
                            <button
                              type="submit"
                              className="p-2 bg-gray-800 hover:bg-gray-900 text-white rounded-md transition-all duration-300 flex items-center justify-center"
                              aria-label="Search"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                              </svg>
                            </button>
                          </form>

                          {/* Search Results Dropdown - DESKTOP */}
                          {(searchResults.length > 0 || isSearching) && (
                            <div className="absolute top-full left-0 right-0 mt-1 bg-gray-600 border border-gray-500 rounded-lg shadow-xl z-50 max-h-80 overflow-y-auto">
                              {isSearching ? (
                                <div className="p-4 text-center text-gray-300">
                                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-300 mx-auto"></div>
                                  <p className="mt-2 text-sm">Searching...</p>
                                </div>
                              ) : (
                                <>
                                  <div className="p-2 bg-gray-700">
                                    <p className="text-xs text-white font-medium px-2 py-1">Search Results</p>
                                    {searchResults.map((product) => (
                                      <div
                                        key={product._id}
                                        className="flex items-center p-2 hover:bg-gray-500 rounded cursor-pointer transition-colors"
                                        onClick={() => handleProductClick(product)}
                                      >
                                        <div className="w-10 h-10 bg-gray-700 rounded flex-shrink-0 overflow-hidden border border-gray-600 relative">
                                          {product.image ? (
                                            <Image
                                              src={`${process.env.NEXT_PUBLIC_BASE_URL}${product.image}`}
                                              className="w-full h-full object-cover"
                                              alt={product.name}
                                              fill
                                              sizes="40px"
                                            />
                                          ) : (
                                            <div className="w-full h-full bg-gray-600 flex items-center justify-center">
                                              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                              </svg>
                                            </div>
                                          )}
                                        </div>
                                        <div className="ml-3 flex-1 min-w-0">
                                          <p className="text-sm font-medium text-white truncate">{product.name}</p>
                                          <div className="flex items-center justify-between">
                                            <p className="text-xs text-gray-300">{product.category}</p>
                                            <p className="text-white font-medium text-sm">₹{product.basePrice}</p>
                                          </div>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                  <div
                                    className="border-t border-gray-500 p-3 bg-gray-700 hover:bg-gray-600 cursor-pointer text-center"
                                    onClick={handleViewAllResults}
                                  >
                                    <p className="text-sm font-medium text-white">
                                      View all results for &quot;{searchQuery}&quot;
                                    </p>
                                  </div>
                                </>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <button 
                      onClick={handleSearchClick}
                      className="p-1.5 text-white hover:text-gray-200 hover:bg-gray-600 transition-all duration-300 rounded-lg cursor-pointer"
                      aria-label="Open search"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </button>
                  )}
                </div>
                
                {/* Cart Button */}
                <Link 
                  href="/cart"
                  className="p-1.5 text-white hover:text-gray-200 hover:bg-gray-600 transition-all duration-300 rounded-lg relative group cursor-pointer"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  {cartItemsCount > 0 && (
                    <span className="absolute -top-1 -right-1 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center font-bold">
                      {cartItemsCount > 9 ? '9+' : cartItemsCount}
                    </span>
                  )}
                </Link>
                
                {/* User Section */}
                <div className="flex items-center">
                  {user ? (
                    <div className="relative">
                      <button
                        onClick={() => setShowDropdown(!showDropdown)}
                        className="flex items-center space-x-1 sm:space-x-2 text-white hover:text-gray-200 transition-all duration-300 hover:bg-gray-600 rounded-lg p-1.5 cursor-pointer"
                      >
                        <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 bg-gray-600 rounded-full flex items-center justify-center text-white font-bold text-xs md:text-sm shadow border border-gray-500">
                          {user.email?.charAt(0).toUpperCase()}
                        </div>
                        <span className="hidden lg:block text-white font-medium text-sm">
                          {user.name || user.email?.split('@')[0]}
                        </span>
                        <svg
                          className={`hidden lg:block w-3 h-3 md:w-4 md:h-4 transition-transform duration-300 ${showDropdown ? 'rotate-180' : ''}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>

                      {/* Dropdown Menu */}
                      {showDropdown && (
                        <div className="absolute right-0 mt-4 w-48 bg-gray-800 rounded-lg shadow-xl py-2 z-50 border border-gray-600">
                          <div className="px-3 py-2 border-b border-gray-500">
                            <p className="text-white font-bold text-sm truncate">{user.name || user.email}</p>
                            <p className="text-white text-xs">Welcome back!</p>
                          </div>
                          <Link
                            href="/profile"
                            className="flex items-center space-x-2 px-3 py-2 text-sm text-white cursor-pointer"
                            onClick={() => setShowDropdown(false)}
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            <span>My Profile</span>
                          </Link>
                          <button
                            onClick={handleLogout}
                            className="flex items-center space-x-2 w-full text-left px-3 py-2 text-sm text-white hover:bg-red-700 hover:text-white transition-all duration-300 rounded-b-lg cursor-pointer"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                            <span>Sign Out</span>
                          </button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="flex items-center space-x-1 sm:space-x-2">
                      <Link
                        href="/signup"
                        className="bg-gray-800 text-white px-2 py-1.5 rounded-md hover:bg-gray-900 transition-all duration-300 font-medium shadow hover:shadow-gray-500/25 text-xs sm:text-sm whitespace-nowrap cursor-pointer min-w-[45px] sm:min-w-[50px] text-center border border-gray-700"
                      >
                        Sign Up
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
              <div ref={mobileMenuRef} className="xl:hidden fixed inset-0 z-50">
                <div 
                  className="absolute inset-0 bg-black/30"
                  onClick={() => setIsMobileMenuOpen(false)}
                />
                
                <div className="absolute top-0 left-0 h-full w-64 bg-gray-700 border-r border-gray-600 shadow-2xl">
                  <div className="flex flex-col h-full">
                    {/* Mobile Menu Header */}
                    <div className="flex items-center justify-between p-4 border-b border-gray-600">
                      <Link 
                        href="/" 
                        className="flex items-center space-x-2 group cursor-pointer"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <div className="">
                          <Image
                            src="/images/fea.png"
                            alt="soap logo"
                            width={32}
                            height={32}
                          />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-lg font-bold text-white">{siteName}</span>
                        </div>
                      </Link>
                      <button
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="p-1.5 text-white hover:text-gray-200 hover:bg-gray-600 transition-all duration-300 rounded-lg cursor-pointer"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>

                    {/* Mobile Navigation Links */}
                    <nav className="flex-1 p-4 overflow-y-auto">
                      <div className="space-y-1">
                        <Link 
                          href="/" 
                          className="flex items-center space-x-3 text-white hover:text-gray-200 hover:bg-gray-600 transition-all duration-300 font-medium p-3 rounded-lg border border-transparent hover:border-gray-400 text-sm cursor-pointer"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                          </svg>
                          <span>Home</span>
                        </Link>
                        
                        {/* Offers in Mobile Menu */}
                        <Link 
                          href="/offers" 
                          className="flex items-center space-x-3 text-white hover:text-red-200 hover:bg-gray-600 transition-all duration-300 font-medium p-3 rounded-lg border border-transparent hover:border-red-400 text-sm cursor-pointer"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                          </svg>
                          <span className="text-red-200 font-semibold">Special Offers</span>
                        </Link>
                        
                        {/* All Categories in Mobile Menu - NO LOADING CONDITION */}
                        {categories.map((category) => (
                          <Link
                            key={category._id}
                            href={`/products?category=${category.slug}`}
                            className="flex items-center space-x-3 text-white hover:text-gray-200 hover:bg-gray-600 transition-all duration-300 font-medium p-3 rounded-lg border border-transparent hover:border-gray-400 text-sm cursor-pointer ml-3"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                            </svg>
                            <span>{category.name}</span>
                          </Link>
                        ))}
                        
                        <Link 
                          href="/about" 
                          className="flex items-center space-x-3 text-white hover:text-gray-200 hover:bg-gray-600 transition-all duration-300 font-medium p-3 rounded-lg border border-transparent hover:border-gray-400 text-sm cursor-pointer"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>About</span>
                        </Link>
                        
                        <Link 
                          href="/contact" 
                          className="flex items-center space-x-3 text-white hover:text-gray-200 hover:bg-gray-600 transition-all duration-300 font-medium p-3 rounded-lg border border-transparent hover:border-gray-400 text-sm cursor-pointer"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          <span>Contact</span>
                        </Link>
                      </div>
                    </nav>

                    {/* Mobile Footer Actions */}
                    <div className="p-4 border-t border-gray-600">
                      {user ? (
                        <div className="flex items-center space-x-3 p-2">
                          <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center text-white font-bold text-sm border border-gray-500">
                            {user.email?.charAt(0).toUpperCase()}
                          </div>
                          <div className="flex-1">
                            <p className="text-white font-medium text-sm truncate">{user.name || user.email}</p>
                            <p className="text-gray-300 text-xs">View Profile</p>
                          </div>
                        </div>
                      ) : (
                        <div className="flex space-x-2">
                          <Link
                            href="/login"
                            className="flex-1 text-center bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-500 transition-all duration-300 text-sm font-medium border border-gray-500"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            Login
                          </Link>
                          <Link
                            href="/signup"
                            className="flex-1 text-center bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-900 transition-all duration-300 text-sm font-medium border border-gray-700"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            Sign Up
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </header>
      </div>

      {/* Bottom Navigation Footer */}
      <div className={`
        fixed bottom-0 left-0 right-0 bg-gray-700 border-t border-gray-600 shadow-xl z-40
        transition-transform duration-300 ease-in-out
        ${isFooterVisible ? 'translate-y-0' : 'translate-y-full'}
        xl:hidden
      `}>
        <div className="container mx-auto px-2">
          <div className="flex items-center justify-between h-14">
            {/* Home */}
            <Link 
              href="/" 
              className="flex flex-col items-center justify-center flex-1 p-1 text-white hover:text-gray-200 transition-all duration-300 cursor-pointer min-w-0"
              onClick={() => setIsFooterVisible(false)}
            >
              <svg className="w-4 h-4 mb-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span className="text-[10px] font-medium truncate w-full text-center">Home</span>
            </Link>

            {/* Search */}
            <button 
              onClick={handleSearchClick}
              className="flex flex-col items-center justify-center flex-1 p-1 text-white hover:text-gray-200 transition-all duration-300 cursor-pointer min-w-0"
            >
              <svg className="w-4 h-4 mb-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span className="text-[10px] font-medium truncate w-full text-center">Search</span>
            </button>

            {/* Offers in Mobile Bottom Navigation */}
            <Link 
              href="/offers" 
              className="flex flex-col items-center justify-center flex-1 p-1 text-white hover:text-red-200 transition-all duration-300 cursor-pointer min-w-0 relative"
              onClick={() => setIsFooterVisible(false)}
            >
              <div className="relative">
                <svg className="w-4 h-4 mb-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              </div>
              <span className="text-[10px] font-medium truncate w-full text-center text-red-200">Offers</span>
            </Link>

            {/* Products */}
            <Link 
              href="/products" 
              className="flex flex-col items-center justify-center flex-1 p-1 text-white hover:text-gray-200 transition-all duration-300 cursor-pointer min-w-0"
              onClick={() => setIsFooterVisible(false)}
            >
              <svg className="w-4 h-4 mb-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
              <span className="text-[10px] font-medium truncate w-full text-center">Products</span>
            </Link>

            {/* Cart */}
            <Link 
              href="/cart"
              className="flex flex-col items-center justify-center flex-1 p-1 text-white hover:text-gray-200 transition-all duration-300 relative cursor-pointer min-w-0"
              onClick={() => setIsFooterVisible(false)}
            >
              <svg className="w-4 h-4 mb-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {cartItemsCount > 0 && (
                <span className="absolute top-0 right-4 bg-red-500 text-white text-[10px] rounded-full h-3 w-3 flex items-center justify-center font-bold shadow border border-red-600">
                  {cartItemsCount > 9 ? '9+' : cartItemsCount}
                </span>
              )}
              <span className="text-[10px] font-medium truncate w-full text-center">Cart</span>
            </Link>

            {/* Account */}
            {user ? (
              <Link 
                href="/profile" 
                className="flex flex-col items-center justify-center flex-1 p-1 text-white hover:text-gray-200 transition-all duration-300 cursor-pointer min-w-0"
                onClick={() => setIsFooterVisible(false)}
              >
                <div className="w-4 h-4 bg-gray-600 rounded-full flex items-center justify-center text-white font-bold text-[10px] mb-0.5 border border-gray-500">
                  {user.email?.charAt(0).toUpperCase()}
                </div>
                <span className="text-[10px] font-medium truncate w-full text-center">Account</span>
              </Link>
            ) : (
              <div className="flex flex-col items-center justify-center flex-1 p-1 min-w-0">
                <div className="flex flex-col items-center">
                  <div className="flex space-x-1">
                    <Link
                      href="/signup"
                      className="px-1.5 py-1 bg-gray-800 text-white text-[10px] font-medium rounded hover:bg-gray-900 transition-all duration-300 text-center cursor-pointer border border-gray-700"
                      onClick={() => setIsFooterVisible(false)}
                    >
                      Signup
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
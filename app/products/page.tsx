'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { AdjustmentsHorizontalIcon, XMarkIcon, FunnelIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import ClientWrapper from '@/components/ClientWrapper';
import { allProducts, productCategories, productTypes } from '@/data/mockData';

export default function ProductsPage() {
  return (
    <ClientWrapper>
      {(searchParams) => (
        <ProductsContent searchParams={searchParams} />
      )}
    </ClientWrapper>
  );
}

interface ProductsContentProps {
  searchParams: URLSearchParams;
}

function ProductsContent({ searchParams }: ProductsContentProps) {
  const categoryParam = searchParams.get('category');
  const typeParam = searchParams.get('type');
  const searchQuery = searchParams.get('search');
  
  const [products, setProducts] = useState(allProducts);
  const [filteredProducts, setFilteredProducts] = useState(allProducts);
  const [isLoading, setIsLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState(searchQuery || '');
  
  // Filter states
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    categoryParam ? [categoryParam] : []
  );
  const [selectedTypes, setSelectedTypes] = useState<string[]>(
    typeParam ? [typeParam] : []
  );
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);
  const [sortOption, setSortOption] = useState('featured');
  
  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);
  
  useEffect(() => {
    // Set search term from URL parameter
    if (searchQuery) {
      setSearchTerm(searchQuery);
    }
  }, [searchQuery]);
  
  useEffect(() => {
    // Apply filters
    let result = [...products];
    
    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(product => 
        product.name.toLowerCase().includes(term) || 
        product.description.toLowerCase().includes(term) ||
        product.category.toLowerCase().includes(term) ||
        product.type.toLowerCase().includes(term) ||
        product.fandom.toLowerCase().includes(term)
      );
    }
    
    // Filter by category
    if (selectedCategories.length > 0) {
      result = result.filter(product => 
        selectedCategories.includes(product.category)
      );
    }
    
    // Filter by type
    if (selectedTypes.length > 0) {
      result = result.filter(product => 
        selectedTypes.includes(product.type)
      );
    }
    
    // Filter by price range
    result = result.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );
    
    // Apply sorting
    switch (sortOption) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        result.sort((a, b) => (a.isNew === b.isNew) ? 0 : a.isNew ? -1 : 1);
        break;
      case 'featured':
      default:
        result.sort((a, b) => (a.isFeatured === b.isFeatured) ? 0 : a.isFeatured ? -1 : 1);
        break;
    }
    
    setFilteredProducts(result);
  }, [products, selectedCategories, selectedTypes, priceRange, sortOption, searchTerm]);
  
  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };
  
  const toggleType = (type: string) => {
    setSelectedTypes(prev => 
      prev.includes(type)
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };
  
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = parseInt(e.target.value);
    setPriceRange(prev => {
      const newRange = [...prev] as [number, number];
      newRange[index] = value;
      return newRange;
    });
  };
  
  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedTypes([]);
    setPriceRange([0, 100]);
    setSortOption('featured');
    setSearchTerm('');
  };
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // The search is already applied via the useEffect
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-zenith-black flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-zenith-orange border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-zenith-black">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <h1 className="text-3xl font-anime font-bold text-zenith-white">
              {searchTerm ? `Search: "${searchTerm}"` : 'All Products'}
            </h1>
            
            <div className="w-full md:w-auto flex flex-col md:flex-row items-stretch md:items-center gap-4">
              <form onSubmit={handleSearch} className="relative flex-grow">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-zenith-gray/50 border border-gray-700 rounded-md py-2 pl-4 pr-10 text-zenith-white focus:outline-none focus:ring-2 focus:ring-zenith-orange"
                />
                <button type="submit" className="absolute right-3 top-2.5">
                  <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                </button>
              </form>
              
              <div className="relative">
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="bg-zenith-gray text-zenith-white rounded-md py-2 pl-4 pr-10 appearance-none focus:outline-none focus:ring-2 focus:ring-zenith-orange w-full md:w-auto"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="newest">Newest</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <svg className="w-4 h-4 text-zenith-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="bg-zenith-gray hover:bg-gray-700 text-zenith-white px-4 py-2 rounded-md flex items-center md:hidden"
              >
                <FunnelIcon className="h-5 w-5 mr-2" />
                Filters
              </button>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row gap-8">
            {/* Filters - Desktop */}
            <div className="md:w-1/4 hidden md:block">
              <div className="bg-zenith-gray/30 backdrop-blur-sm rounded-lg p-6 sticky top-24">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-zenith-white">Filters</h2>
                  <button
                    onClick={clearFilters}
                    className="text-sm text-zenith-orange hover:text-zenith-orange/80 transition-colors"
                  >
                    Clear All
                  </button>
                </div>
                
                {/* Categories */}
                <div className="mb-6">
                  <h3 className="text-zenith-white font-bold mb-3">Categories</h3>
                  <div className="space-y-2">
                    {productCategories.map((category) => (
                      <label key={category.id} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={selectedCategories.includes(category.name)}
                          onChange={() => toggleCategory(category.name)}
                          className="mr-2 accent-zenith-orange"
                        />
                        <span className="text-gray-300">{category.name}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                {/* Types */}
                <div className="mb-6">
                  <h3 className="text-zenith-white font-bold mb-3">Product Types</h3>
                  <div className="space-y-2">
                    {productTypes.map((type) => (
                      <label key={type.id} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={selectedTypes.includes(type.type || type.name.toLowerCase().slice(0, -1))}
                          onChange={() => toggleType(type.type || type.name.toLowerCase().slice(0, -1))}
                          disabled={type.comingSoon}
                          className={`mr-2 accent-zenith-orange ${type.comingSoon ? 'opacity-50 cursor-not-allowed' : ''}`}
                        />
                        <span className={`text-gray-300 ${type.comingSoon ? 'opacity-50' : ''}`}>
                          {type.name}
                          {type.comingSoon && (
                            <span className="ml-2 text-xs bg-zenith-orange/20 text-zenith-orange px-2 py-0.5 rounded-full">
                              Coming Soon
                            </span>
                          )}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
                
                {/* Price Range */}
                <div>
                  <h3 className="text-zenith-white font-bold mb-3">Price Range</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-300">₹{priceRange[0]}</span>
                      <span className="text-gray-300">₹{priceRange[1]}</span>
                    </div>
                    <div className="flex gap-4">
                      <input
                        type="range"
                        min="0"
                        max="100"
                        step="5"
                        value={priceRange[0]}
                        onChange={(e) => handlePriceChange(e, 0)}
                        className="w-full accent-zenith-orange"
                      />
                      <input
                        type="range"
                        min="0"
                        max="100"
                        step="5"
                        value={priceRange[1]}
                        onChange={(e) => handlePriceChange(e, 1)}
                        className="w-full accent-zenith-orange"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Filters - Mobile */}
            <AnimatePresence>
              {showFilters && (
                <motion.div 
                  className="md:hidden fixed inset-0 bg-zenith-black/90 backdrop-blur-md z-40 overflow-auto"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-xl font-bold text-zenith-white">Filters</h2>
                      <button
                        onClick={() => setShowFilters(false)}
                        className="text-zenith-white"
                      >
                        <XMarkIcon className="h-6 w-6" />
                      </button>
                    </div>
                    
                    {/* Categories */}
                    <div className="mb-6">
                      <h3 className="text-zenith-white font-bold mb-3">Categories</h3>
                      <div className="space-y-2">
                        {productCategories.map((category) => (
                          <label key={category.id} className="flex items-center">
                            <input
                              type="checkbox"
                              checked={selectedCategories.includes(category.name)}
                              onChange={() => toggleCategory(category.name)}
                              className="mr-2 accent-zenith-orange"
                            />
                            <span className="text-gray-300">{category.name}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    
                    {/* Types */}
                    <div className="mb-6">
                      <h3 className="text-zenith-white font-bold mb-3">Product Types</h3>
                      <div className="space-y-2">
                        {productTypes.map((type) => (
                          <label key={type.id} className="flex items-center">
                            <input
                              type="checkbox"
                              checked={selectedTypes.includes(type.type || type.name.toLowerCase().slice(0, -1))}
                              onChange={() => toggleType(type.type || type.name.toLowerCase().slice(0, -1))}
                              disabled={type.comingSoon}
                              className={`mr-2 accent-zenith-orange ${type.comingSoon ? 'opacity-50 cursor-not-allowed' : ''}`}
                            />
                            <span className={`text-gray-300 ${type.comingSoon ? 'opacity-50' : ''}`}>
                              {type.name}
                              {type.comingSoon && (
                                <span className="ml-2 text-xs bg-zenith-orange/20 text-zenith-orange px-2 py-0.5 rounded-full">
                                  Coming Soon
                                </span>
                              )}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                    
                    {/* Price Range */}
                    <div className="mb-6">
                      <h3 className="text-zenith-white font-bold mb-3">Price Range</h3>
                      <div className="space-y-4">
                        <div className="flex justify-between">
                          <span className="text-gray-300">₹{priceRange[0]}</span>
                          <span className="text-gray-300">₹{priceRange[1]}</span>
                        </div>
                        <div className="flex gap-4">
                          <input
                            type="range"
                            min="0"
                            max="100"
                            step="5"
                            value={priceRange[0]}
                            onChange={(e) => handlePriceChange(e, 0)}
                            className="w-full accent-zenith-orange"
                          />
                          <input
                            type="range"
                            min="0"
                            max="100"
                            step="5"
                            value={priceRange[1]}
                            onChange={(e) => handlePriceChange(e, 1)}
                            className="w-full accent-zenith-orange"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-4">
                      <button
                        onClick={() => {
                          clearFilters();
                          setShowFilters(false);
                        }}
                        className="flex-1 bg-zenith-gray text-zenith-white py-2 rounded-md"
                      >
                        Clear All
                      </button>
                      <button
                        onClick={() => setShowFilters(false)}
                        className="flex-1 bg-zenith-orange text-white py-2 rounded-md"
                      >
                        Apply Filters
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Products Grid */}
            <div className="md:w-3/4">
              {filteredProducts.length === 0 ? (
                <div className="bg-zenith-gray/30 backdrop-blur-sm rounded-lg p-8 text-center">
                  <h3 className="text-xl font-bold text-zenith-white mb-2">No products found</h3>
                  <p className="text-gray-400 mb-4">
                    We couldn't find any products matching your criteria.
                  </p>
                  <button
                    onClick={clearFilters}
                    className="bg-zenith-orange text-white px-4 py-2 rounded-md hover:bg-zenith-light-orange transition-colors"
                  >
                    Clear Filters
                  </button>
                </div>
              ) : (
                <>
                  <p className="text-gray-400 mb-4">
                    Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProducts.map((product, index) => (
                      <div key={product.id} className="relative">
                        <ProductCard product={product} index={index} />
                        {product.comingSoon && (
                          <div className="absolute top-2 right-2 bg-zenith-orange/20 text-zenith-orange text-xs px-2 py-1 rounded-full">
                            Coming Soon
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
} 
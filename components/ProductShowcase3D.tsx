'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShoppingCartIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import { allProducts } from '@/data/mockData';

interface ProductShowcaseProps {
  title: string;
  description: string;
}

const ProductShowcase = ({ title, description }: ProductShowcaseProps) => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [isLoading, setIsLoading] = useState(false);
  const [showcaseProducts, setShowcaseProducts] = useState(allProducts.filter(p => p.isFeatured).slice(0, 4));
  
  // Categories for the showcase
  const categories = ['All', 'Anime', 'Series', 'Movies'];
  
  useEffect(() => {
    setIsLoading(true);
    
    // Filter products based on selected category
    let filtered = allProducts;
    if (activeCategory !== 'All') {
      filtered = allProducts.filter(p => p.category === activeCategory);
    }
    
    // Get featured products first, then add others to make up to 4
    let featured = filtered.filter(p => p.isFeatured);
    let others = filtered.filter(p => !p.isFeatured);
    let result = [...featured];
    
    if (result.length < 4) {
      result = [...result, ...others.slice(0, 4 - result.length)];
    } else {
      result = result.slice(0, 4);
    }
    
    // Simulate loading
    setTimeout(() => {
      setShowcaseProducts(result);
      setIsLoading(false);
    }, 300);
  }, [activeCategory]);
  
  const handleAddToCart = (productId: string) => {
    try {
      // Get existing cart from localStorage
      const existingCart = localStorage.getItem('cart');
      const cart = existingCart ? JSON.parse(existingCart) : [];
      
      // Find the product
      const product = allProducts.find(p => p.id === productId);
      if (!product) return;
      
      // Check if product already exists in cart
      const existingItemIndex = cart.findIndex((item: any) => item.id === productId);
      
      if (existingItemIndex >= 0) {
        // Update quantity if product already in cart
        cart[existingItemIndex].quantity += 1;
      } else {
        // Add new product to cart
        cart.push({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity: 1,
          type: product.type,
          category: product.category
        });
      }
      
      // Save updated cart to localStorage
      localStorage.setItem('cart', JSON.stringify(cart));
      
      // Dispatch custom event to update cart count in header
      window.dispatchEvent(new Event('cartUpdated'));
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  return (
    <div className="bg-zenith-black py-16">
      <div className="container-custom">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-anime font-bold text-zenith-white mb-4">{title}</h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-8">
            {description}
          </p>
          
          {/* Category Selection Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full transition-all ${
                  activeCategory === category 
                    ? 'bg-zenith-orange text-white' 
                    : 'bg-zenith-gray text-gray-300 hover:bg-zenith-gray/80'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </motion.div>
        
        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {isLoading ? (
            // Loading skeletons
            [...Array(4)].map((_, index) => (
              <motion.div 
                key={`skeleton-${index}`}
                className="bg-zenith-gray/30 rounded-lg overflow-hidden h-[350px]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="h-48 bg-zenith-gray/50 animate-pulse"></div>
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-zenith-gray/50 rounded animate-pulse"></div>
                  <div className="h-4 bg-zenith-gray/50 rounded w-3/4 animate-pulse"></div>
                  <div className="h-10 bg-zenith-gray/50 rounded mt-4 animate-pulse"></div>
                </div>
              </motion.div>
            ))
          ) : (
            showcaseProducts.map((product, index) => (
              <motion.div
                key={product.id}
                className="bg-zenith-gray/20 backdrop-blur-sm rounded-lg overflow-hidden flex flex-col h-full"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Link href={`/products/${product.id}`} className="block relative aspect-square">
                  {product.type === 'sticker_card' ? (
                    <div className="relative w-full h-[200px] sm:h-[250px]">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                  ) : (
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-500 hover:scale-105"
                    />
                  )}
                  {product.isNew && (
                    <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-md">
                      New
                    </div>
                  )}
                  <div className="absolute top-2 left-2 bg-zenith-orange/90 text-white text-xs px-2 py-1 rounded-md">
                    {product.category}
                  </div>
                </Link>
                
                <div className="p-4 flex-grow flex flex-col">
                  <Link href={`/products/${product.id}`} className="block">
                    <h3 className="font-bold text-zenith-white hover:text-zenith-orange transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-400 mt-1 mb-3 line-clamp-2">
                      {product.description.substring(0, 60)}...
                    </p>
                  </Link>
                  
                  <div className="mt-auto">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-zenith-orange font-bold">₹{product.price.toFixed(2)}</span>
                      <span className="text-xs text-gray-400 uppercase">
                        {product.type === 'sticker_card' ? 'STICKER CARD' : product.type.toUpperCase()}
                      </span>
                    </div>
                    
                    <button
                      onClick={() => handleAddToCart(product.id)}
                      disabled={!product.inStock}
                      className={`w-full flex items-center justify-center bg-zenith-orange hover:bg-zenith-light-orange text-white py-2 rounded-md transition-colors ${
                        !product.inStock ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                    >
                      <ShoppingCartIcon className="h-5 w-5 mr-2" />
                      <span>{product.inStock ? 'Add to Cart' : 'Out of Stock'}</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
        
        <motion.div 
          className="text-center mt-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Link 
            href="/products" 
            className="inline-flex items-center text-zenith-orange hover:text-zenith-light-orange transition-colors"
          >
            <span className="mr-2">View All Products</span>
            <ArrowRightIcon className="h-5 w-5" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default ProductShowcase; 
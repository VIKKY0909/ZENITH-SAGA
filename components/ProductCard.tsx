'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShoppingCartIcon } from '@heroicons/react/24/solid';
import { useNavigationLoading } from './NavigationLoadingProvider';
import { Product } from '@/data/mockData';

interface ProductCardProps {
  product: Product;
  index: number;
}

const ProductCard = ({ product, index }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const { setIsLoading: setNavigationLoading } = useNavigationLoading();

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsProcessing(true);
    setNavigationLoading(true);
    
    // Simulate adding to cart
    setTimeout(() => {
      try {
        // Get existing cart from localStorage
        const existingCart = localStorage.getItem('cart');
        const cart = existingCart ? JSON.parse(existingCart) : [];
        
        // Check if product already exists in cart
        const existingItemIndex = cart.findIndex((item: any) => item.id === product.id);
        
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
        
        // Show added animation
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 1500);
      } catch (error) {
        console.error('Error adding to cart:', error);
      } finally {
        setNavigationLoading(false);
      }
    }, 600);
  };

  const handleClick = () => {
    setIsProcessing(true);
    setNavigationLoading(true);
  };

  return (
    <motion.div
      className="card group h-full flex flex-col"
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Link href={`/products/${product.id}`} onClick={handleClick} className="block h-full">
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            width={400}
            height={400}
            className="object-contain transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          
          {/* Category Badge */}
          <div className="absolute top-2 left-2 bg-zenith-orange/90 text-white text-xs px-2 py-1 rounded-md">
            {product.category}
          </div>
          
          {/* Quick Add Button */}
          <div 
            className={`absolute bottom-0 left-0 right-0 bg-zenith-black/80 backdrop-blur-sm py-3 px-4 transition-all duration-300 ${
              isHovered ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
            }`}
          >
            <button 
              onClick={handleQuickAdd}
              disabled={isLoading || !product.inStock || isAdded || product.comingSoon}
              className={`w-full flex items-center justify-center space-x-2 bg-zenith-orange hover:bg-zenith-light-orange text-white py-2 rounded-md transition-colors ${
                (isLoading || !product.inStock || isAdded || product.comingSoon) ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {isProcessing ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              ) : isAdded ? (
                <>
                  <svg className="h-5 w-5 mr-2 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Added!</span>
                </>
              ) : (
                <>
                  <ShoppingCartIcon className="h-5 w-5 mr-2" />
                  <span>
                    {product.comingSoon 
                      ? 'Coming Soon' 
                      : product.inStock 
                        ? 'Quick Add' 
                        : 'Out of Stock'
                    }
                  </span>
                </>
              )}
            </button>
          </div>
          
          {/* Out of Stock Overlay */}
          {!product.inStock && (
            <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
              <span className="bg-red-600 text-white px-3 py-1 rounded-md font-bold">Out of Stock</span>
            </div>
          )}
          
          {/* New Badge */}
          {product.isNew && (
            <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-md">
              New
            </div>
          )}
          
          {isProcessing && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
              <div className="h-1 w-24 overflow-hidden rounded-full bg-zenith-orange/20">
                <div className="h-full w-full animate-[loading_1s_ease-in-out_infinite] bg-zenith-orange" />
              </div>
            </div>
          )}
        </div>
        
        <div className="p-4 flex-grow flex flex-col">
          <h3 className="font-bold text-zenith-white group-hover:text-zenith-orange transition-colors">
            {product.name}
          </h3>
          
          <p className="text-sm text-gray-400 mt-1 mb-2 line-clamp-2 flex-grow">
            {product.description.substring(0, 60)}...
          </p>
          
          <div className="flex items-center justify-between mt-auto">
            <span className="text-zenith-orange font-bold">₹{product.price.toFixed(2)}</span>
            <span className="text-xs text-gray-400 uppercase">
              {product.type === 'sticker_card' ? 'STICKER CARD' : product.type.toUpperCase()}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard; 
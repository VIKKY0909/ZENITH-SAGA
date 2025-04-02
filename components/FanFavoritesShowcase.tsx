'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { StarIcon, ShoppingCartIcon, HeartIcon, ArrowRightIcon } from '@heroicons/react/24/solid';
import { StarIcon as StarOutlineIcon } from '@heroicons/react/24/outline';
import { allProducts } from '@/data/mockData';

interface FanFavoritesShowcaseProps {
  title: string;
  description: string;
}

// Testimonial data
const testimonials = [
  {
    id: 1,
    name: "Aaditya",
    avatar: "https://i.imgur.com/6YiQMgK.jpg",
    rating: 5,
    productId: allProducts[0]?.id || "",
    text: "The quality of this card is amazing! The colors are vibrant and the finish is premium. Definitely worth every rupee!"
  },
  {
    id: 2,
    name: "Priya Patel",
    avatar: "https://i.imgur.com/8wQYZ9T.jpg",
    rating: 5,
    productId: allProducts[1]?.id || "",
    text: "I've been collecting anime merchandise for years, and these stickers are among the best I've seen. The designs are so detailed!"
  },
  {
    id: 3,
    name: "Vikram Singh",
    avatar: "https://i.imgur.com/JdgXMvs.jpg",
    rating: 4,
    productId: allProducts[2]?.id || "",
    text: "The poster looks even better in person than it does online. The paper quality is excellent and the colors really pop on my wall."
  },
  {
    id: 4,
    name: "Ananya Desai",
    avatar: "https://i.imgur.com/pKn9tGF.jpg",
    rating: 5,
    productId: allProducts[3]?.id || "",
    text: "These bookmarks are perfect! They're sturdy enough to last through many reading sessions and the designs are gorgeous."
  }
];

const FanFavoritesShowcase = ({ title, description }: FanFavoritesShowcaseProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [topProducts, setTopProducts] = useState(allProducts.filter(p => p.isFeatured).slice(0, 4));
  const sliderRef = useRef<HTMLDivElement>(null);
  
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);
  
  useEffect(() => {
    // Simulate loading top-rated products
    setIsLoading(true);
    
    // Get products with highest ratings
    const sortedProducts = [...allProducts]
      .sort((a, b) => (b.rating || 0) - (a.rating || 0))
      .slice(0, 4);
    
    setTimeout(() => {
      setTopProducts(sortedProducts);
      setIsLoading(false);
    }, 300);
  }, []);
  
  // Auto-advance testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
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

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="bg-gradient-to-b from-zenith-black to-zenith-gray/90 py-16">
      <div className="container-custom">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-anime font-bold text-zenith-white mb-4">{title}</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            {description}
          </p>
        </motion.div>
        
        {/* Fan Favorites Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Left Side - Top Products */}
          <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={controls}
            className="bg-zenith-gray/20 backdrop-blur-sm rounded-lg p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-zenith-white">Top-Rated Products</h3>
              <div className="flex items-center">
                <StarIcon className="h-5 w-5 text-yellow-400" />
                <span className="ml-1 text-yellow-400 font-medium">Fan Favorites</span>
              </div>
            </div>
            
            <div className="space-y-4">
              {isLoading ? (
                // Loading skeletons
                [...Array(4)].map((_, index) => (
                  <div key={`skeleton-${index}`} className="flex items-center space-x-4 animate-pulse">
                    <div className="w-16 h-16 bg-zenith-gray/50 rounded-md"></div>
                    <div className="flex-1">
                      <div className="h-4 bg-zenith-gray/50 rounded w-3/4 mb-2"></div>
                      <div className="h-3 bg-zenith-gray/50 rounded w-1/2"></div>
                    </div>
                    <div className="w-20 h-8 bg-zenith-gray/50 rounded-md"></div>
                  </div>
                ))
              ) : (
                topProducts.map((product, index) => (
                  <motion.div 
                    key={product.id}
                    variants={itemVariants} 
                    className="flex items-center space-x-4 bg-zenith-black/30 rounded-lg p-3 hover:bg-zenith-black/50 transition-colors"
                  >
                    <Link href={`/products/${product.id}`} className="block relative w-16 h-16 rounded-md overflow-hidden">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </Link>
                    <div className="flex-1 min-w-0">
                      <Link href={`/products/${product.id}`} className="block">
                        <h4 className="text-zenith-white font-medium truncate hover:text-zenith-orange transition-colors">
                          {product.name}
                        </h4>
                      </Link>
                      <div className="mt-1">
                        <span className="text-xs text-gray-400">
                          {product.type === 'sticker_card' ? 'STICKER CARD' : product.type.toUpperCase()}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-zenith-orange font-bold">₹{product.price}</div>
                      <button
                        onClick={() => handleAddToCart(product.id)}
                        className="mt-1 text-xs text-zenith-white bg-zenith-orange hover:bg-zenith-light-orange px-2 py-1 rounded transition-colors"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
            
            <motion.div 
              variants={itemVariants}
              className="mt-6 text-center"
            >
              <Link 
                href="/products" 
                className="inline-flex items-center text-zenith-orange hover:text-zenith-light-orange transition-colors"
              >
                <span className="mr-2">View All Top Products</span>
                <ArrowRightIcon className="h-4 w-4" />
              </Link>
            </motion.div>
          </motion.div>
          
          {/* Right Side - Customer Testimonials */}
          <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={controls}
            className="bg-zenith-gray/20 backdrop-blur-sm rounded-lg p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-zenith-white">Customer Testimonials</h3>
              <div className="flex space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === activeIndex ? 'bg-zenith-orange' : 'bg-gray-500'
                    }`}
                  />
                ))}
              </div>
            </div>
            
            <div className="relative h-[300px] overflow-hidden">
              <div 
                ref={sliderRef}
                className="absolute inset-0 transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${activeIndex * 100}%)` }}
              >
                <div className="flex h-full">
                  {testimonials.map((testimonial, index) => {
                    const product = allProducts.find(p => p.id === testimonial.productId);
                    
                    return (
                      <div 
                        key={testimonial.id}
                        className="min-w-full h-full px-4 flex flex-col"
                      >
                        <div className="bg-zenith-black/40 rounded-lg p-6 flex-grow flex flex-col">
                          <div className="flex items-start mb-4">
                            <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                              <Image
                                src={testimonial.avatar}
                                alt={testimonial.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div>
                              <h4 className="text-zenith-white font-medium">{testimonial.name}</h4>
                            </div>
                          </div>
                          
                          <p className="text-gray-300 italic mb-6 flex-grow">"{testimonial.text}"</p>
                          
                          {product && (
                            <div className="mt-auto">
                              <div className="text-sm text-gray-400 mb-2">Purchased:</div>
                              <div className="flex items-center bg-zenith-black/30 rounded-lg p-3">
                                <div className="relative w-12 h-12 rounded-md overflow-hidden mr-3">
                                  <Image
                                    src={product.image}
                                    alt={product.name}
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <h5 className="text-zenith-white font-medium truncate">{product.name}</h5>
                                  <div className="flex items-center justify-between mt-1">
                                    <span className="text-xs text-gray-400">
                                      {product.type === 'sticker_card' ? 'STICKER CARD' : product.type.toUpperCase()}
                                    </span>
                                    <span className="text-zenith-orange font-bold">₹{product.price}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            
            <motion.div 
              variants={itemVariants}
              className="mt-6 text-center"
            >
              <Link 
                href="/products" 
                className="inline-flex items-center text-zenith-orange hover:text-zenith-light-orange transition-colors"
              >
                <span className="mr-2">Shop Our Collection</span>
                <ArrowRightIcon className="h-4 w-4" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Stats Section - Modified */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center"
        >
          <div className="bg-zenith-black/50 backdrop-blur-sm rounded-lg p-4">
            <div className="text-3xl font-bold text-zenith-orange mb-2">100+</div>
            <div className="text-sm text-gray-300">Happy Customers</div>
          </div>
          <div className="bg-zenith-black/50 backdrop-blur-sm rounded-lg p-4">
            <div className="text-3xl font-bold text-zenith-orange mb-2">200+</div>
            <div className="text-sm text-gray-300">Products</div>
          </div>
          <div className="bg-zenith-black/50 backdrop-blur-sm rounded-lg p-4">
            <div className="text-3xl font-bold text-zenith-orange mb-2">6</div>
            <div className="text-sm text-gray-300">Product Categories</div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FanFavoritesShowcase; 
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import ProductCard from '@/components/ProductCard';
import CategoryCard from '@/components/CategoryCard';
import Newsletter from '@/components/Newsletter';
import FanFavoritesShowcase from '@/components/FanFavoritesShowcase';
import { featuredProducts, productCategories } from '@/data/mockData';

export default function Home() {
  const [mounted, setMounted] = useState(false);
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  const [featuredRef, featuredInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [categoriesRef, categoriesInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <main className="min-h-screen">
      <Header />
      
      <HeroSection />
      
      {/* Featured Products */}
      <section className="py-16 bg-zenith-black">
        <div className="container-custom">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="section-title">Featured Products</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Discover our most popular anime and pop culture merchandise, handpicked for true fans.
            </p>
          </motion.div>
          
          <motion.div 
            ref={featuredRef}
            variants={containerVariants}
            initial="hidden"
            animate={featuredInView ? "visible" : "hidden"}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {featuredProducts.map((product, index) => (
              <motion.div key={product.id} variants={itemVariants}>
                <ProductCard product={{
                  ...product,
                  type: product.type as "card" | "sticker" | "poster" | "bookmark"
                }} index={index} />
              </motion.div>
            ))}
          </motion.div>
          
          <div className="text-center mt-10">
            <Link href="/products" className="btn-primary inline-block">
              View All Products
            </Link>
          </div>
        </div>
      </section>
      
      {/* Replace 3D Showcase Section with Fan Favorites Showcase */}
      {/* <FanFavoritesShowcase 
        title="Fan Favorites Collection" 
        description="Discover what our community loves most. Browse top-rated products with authentic customer reviews and join thousands of satisfied fans."
      /> */}
      
      {/* Categories Section */}
      <section className="py-16 bg-zenith-gray">
        <div className="container-custom">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="section-title">Browse Categories</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Explore our wide range of merchandise categories for every fandom.
            </p>
          </motion.div>
          
          <motion.div 
            ref={categoriesRef}
            variants={containerVariants}
            initial="hidden"
            animate={categoriesInView ? "visible" : "hidden"}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {productCategories.map((category) => (
              <motion.div key={category.id} variants={itemVariants}>
                <CategoryCard category={category} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* Newsletter Section */}
      {/* <Newsletter /> */}
      
      {/* Coming Soon Section */}
      <section className="py-16 bg-zenith-black">
        <div className="container-custom">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="section-title">Coming Soon</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              We're excited to announce our upcoming product line. Stay tuned for these amazing additions!
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-7xl mx-auto">
            {/* T-Shirts Coming Soon */}
            <div className="bg-zenith-gray/30 backdrop-blur-sm rounded-lg p-8">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="relative w-full md:w-1/2 aspect-square md:aspect-auto md:h-96 rounded-lg overflow-hidden">
                  <Image 
                    src="/images/WhatsApp Image 2025-04-02 at 00.36.45_f655f89a.jpg" 
                    alt="T-Shirts Coming Soon" 
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                  <div className="absolute top-4 right-4 bg-zenith-orange text-white text-xs px-3 py-1 rounded-full">
                    Coming Soon
                  </div>
                </div>
                
                <div className="w-full md:w-1/2">
                  <h3 className="text-3xl font-anime font-bold text-zenith-white mb-4">Premium Graphic T-Shirts</h3>
                  <p className="text-gray-300 mb-6 text-lg">
                    We're working on a new line of high-quality graphic t-shirts featuring your favorite characters and designs from anime, movies, series, and more. Made from 100% premium cotton for maximum comfort.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="bg-zenith-gray/50 text-gray-300 text-sm px-4 py-1.5 rounded-full">Anime</span>
                    <span className="bg-zenith-gray/50 text-gray-300 text-sm px-4 py-1.5 rounded-full">Movies</span>
                    <span className="bg-zenith-gray/50 text-gray-300 text-sm px-4 py-1.5 rounded-full">Series</span>
                    <span className="bg-zenith-gray/50 text-gray-300 text-sm px-4 py-1.5 rounded-full">Gaming</span>
                    <span className="bg-zenith-gray/50 text-gray-300 text-sm px-4 py-1.5 rounded-full">Music Bands</span>
                  </div>
                  <button className="btn-secondary opacity-70 cursor-not-allowed text-lg px-8 py-3">
                    Notify Me When Available
                  </button>
                </div>
              </div>
            </div>

            {/* Bookmarks Coming Soon */}
            <div className="bg-zenith-gray/30 backdrop-blur-sm rounded-lg p-8">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="relative w-full md:w-1/2 aspect-square md:aspect-auto md:h-96 rounded-lg overflow-hidden">
                  <Image 
                    src="/images/products/cards/Naruto & Jiraiya Wallpaper.jpg" 
                    alt="Bookmarks Coming Soon" 
                    fill 
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                  <div className="absolute top-4 right-4 bg-zenith-orange text-white text-xs px-3 py-1 rounded-full">
                    Coming Soon
                  </div>
                </div>
                
                <div className="w-full md:w-1/2">
                  <h3 className="text-3xl font-anime font-bold text-zenith-white mb-4">Anime & Pop Culture Bookmarks</h3>
                  <p className="text-gray-300 mb-6 text-lg">
                    Get ready for our collection of beautifully designed bookmarks featuring your favorite characters from anime, movies, and series. Made from premium materials with stunning artwork.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="bg-zenith-gray/50 text-gray-300 text-sm px-4 py-1.5 rounded-full">Anime</span>
                    <span className="bg-zenith-gray/50 text-gray-300 text-sm px-4 py-1.5 rounded-full">Movies</span>
                    <span className="bg-zenith-gray/50 text-gray-300 text-sm px-4 py-1.5 rounded-full">Series</span>
                    <span className="bg-zenith-gray/50 text-gray-300 text-sm px-4 py-1.5 rounded-full">Books</span>
                  </div>
                  <button className="btn-secondary opacity-70 cursor-not-allowed text-lg px-8 py-3">
                    Notify Me When Available
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  );
} 
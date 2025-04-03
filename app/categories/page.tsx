'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CategoryCard from '@/components/CategoryCard';
import LoadingSpinner from '@/components/LoadingSpinner';
import ClientWrapper from '@/components/ClientWrapper';
import { productCategories } from '@/data/mockData';

export default function CategoriesPage() {
  return (
    <ClientWrapper>
      {(searchParams) => (
        <CategoriesContent searchParams={searchParams} />
      )}
    </ClientWrapper>
  );
}

interface CategoriesContentProps {
  searchParams: URLSearchParams;
}

function CategoriesContent({ searchParams }: CategoriesContentProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20
      }
    },
    hover: {
      scale: 1.05,
      y: -5,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    },
    tap: {
      scale: 0.98,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };
  
  const handleCategoryHover = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-zenith-black flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-zenith-black">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container-custom">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.5,
              type: "spring",
              stiffness: 100
            }}
          >
            <motion.h1 
              className="text-4xl md:text-5xl font-anime font-bold text-zenith-white mb-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Browse Categories
            </motion.h1>
            <motion.p 
              className="text-gray-400 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Explore our wide range of anime and pop culture merchandise across different categories. 
              Find the perfect collectibles for your favorite fandoms.
            </motion.p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {productCategories.map((category, index) => (
              <motion.div
                key={category.id}
                variants={itemVariants}
                whileHover="hover"
                whileTap="tap"
                onHoverStart={() => handleCategoryHover(category.id)}
                onHoverEnd={() => setSelectedCategory(null)}
                className="relative overflow-hidden rounded-lg transform-gpu will-change-transform"
              >
                <div className="relative h-full">
                  <CategoryCard 
                    category={category} 
                    index={index}
                  />
                  
                  {/* Animated highlight effect when hovering */}
                  <AnimatePresence>
                    {selectedCategory === category.id && (
                      <motion.div 
                        className="absolute inset-0 bg-zenith-orange/10 pointer-events-none"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      />
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div 
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.5, 
              delay: 0.2,
              type: "spring",
              stiffness: 100
            }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-2xl md:text-3xl font-anime font-bold text-zenith-white mb-6">Can't Find What You're Looking For?</h2>
            <p className="text-gray-400 max-w-2xl mx-auto mb-8">
              We're constantly expanding our collection. If you can't find your favorite fandom, let us know and we'll try to add it to our inventory.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Link href="/contact" className="btn-primary inline-flex items-center group">
                <span>Contact Us</span>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </motion.div>
          </motion.div>
          
          {/* Decorative elements */}
          <div className="hidden md:block">
            <motion.div 
              className="absolute top-1/4 right-10 w-32 h-32 bg-zenith-orange/10 rounded-full blur-3xl"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.2, 0.3],
              }}
              transition={{ 
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            <motion.div 
              className="absolute bottom-1/3 left-10 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl"
              animate={{ 
                scale: [1, 1.3, 1],
                opacity: [0.2, 0.3, 0.2],
              }}
              transition={{ 
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
} 
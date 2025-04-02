'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

// Updated interface to match the actual data structure
interface CategoryProps {
  id: string;
  name: string;
  image: string;
  description: string;
  productCount?: number;
  count?: number;
}

interface CategoryCardProps {
  category: CategoryProps;
  index?: number;
}

const CategoryCard = ({ category, index = 0 }: CategoryCardProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  
  // Get the count value from either productCount or count
  const productCount = category.productCount || category.count || 0;
  
  const handleCategoryClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Navigate to the category page
    setTimeout(() => {
      router.push(`/products?category=${category.name}`);
    }, 400);
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="card overflow-hidden h-full relative"
    >
      {isLoading && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 bg-zenith-black/80 flex items-center justify-center z-10 backdrop-blur-sm"
        >
          <div className="w-10 h-10 border-4 border-zenith-orange border-t-transparent rounded-full animate-spin"></div>
        </motion.div>
      )}
      
      <a href={`/products?category=${category.name}`} onClick={handleCategoryClick} className="block h-full">
        <div className="relative h-48 overflow-hidden">
          <Image
            src={category.image}
            alt={category.name}
            fill
            className="object-cover transition-transform duration-500 hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zenith-black to-transparent"></div>
          <motion.div 
            className="absolute bottom-0 left-0 right-0 p-4"
            initial={{ y: 10, opacity: 0.8 }}
            whileHover={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-xl font-anime font-bold text-zenith-white">
              {category.name}
            </h3>
            <div className="flex items-center justify-between">
              <span className="text-sm text-zenith-orange">
                {productCount} Products
              </span>
              <motion.span 
                className="text-sm text-zenith-white/70 flex items-center"
                whileHover={{ x: 3 }}
                transition={{ duration: 0.2 }}
              >
                Explore 
                <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </motion.span>
            </div>
          </motion.div>
        </div>
        <motion.div 
          className="p-4"
          initial={{ opacity: 0.8 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <p className="text-gray-400 text-sm line-clamp-2">
            {category.description}
          </p>
        </motion.div>
      </a>
    </motion.div>
  );
};

export default CategoryCard; 
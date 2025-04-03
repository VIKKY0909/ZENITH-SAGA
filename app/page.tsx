import { Suspense } from 'react';
import { featuredProducts, productCategories } from '@/data/mockData';
import HomeClient from '@/components/HomeClient';

// Server component for static generation
export default function Home() {
  // Pass data to client component from server
  return (
    <Suspense fallback={<div className="min-h-screen bg-zenith-black flex items-center justify-center">
      <div className="w-16 h-16 border-4 border-zenith-orange border-t-transparent rounded-full animate-spin"></div>
    </div>}>
      <HomeClient 
        featuredProducts={featuredProducts} 
        productCategories={productCategories} 
      />
    </Suspense>
  );
} 
import { Suspense } from 'react';
import { allProducts } from '@/data/mockData';
import ProductDetailClient from './ProductDetailClient';

// Generate static params for all product pages
export function generateStaticParams() {
  return allProducts.map((product) => ({
            id: product.id,
  }));
}

// Server component that handles the static generation
export default function ProductPage({ params }: { params: { id: string } }) {
  // Server-side product lookup (could be from a database in a real app)
  const product = allProducts.find(p => p.id === params.id);

  return (
    <Suspense fallback={<div className="min-h-screen bg-zenith-black flex items-center justify-center">
      <div className="w-16 h-16 border-4 border-zenith-orange border-t-transparent rounded-full animate-spin"></div>
    </div>}>
      <ProductDetailClient id={params.id} productData={product} />
    </Suspense>
  );
} 
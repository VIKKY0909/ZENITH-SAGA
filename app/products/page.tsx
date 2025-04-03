import { Suspense } from 'react';
import ProductsClient from './ProductsClient';
import { allProducts, productCategories, productTypes } from '@/data/mockData';

export default function ProductsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-zenith-black flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-zenith-orange border-t-transparent rounded-full animate-spin"></div>
      </div>
    }>
      <ProductsClient 
        allProducts={allProducts}
        productCategories={productCategories}
        productTypes={productTypes}
      />
    </Suspense>
  );
} 
// /orders/[id]/page.tsx (Server Component)
import { Suspense } from 'react';
import { allProducts } from '@/data/mockData';
import OrderDetailsPage from "./OrderDetailsPage"; // Import the client component

// Generate static params for all orders
export function generateStaticParams() {
  // Generate static params for pre-rendering
  const orderIds = Array.from({ length: 100 }, (_, i) => ({
    id: `order-${i + 1}`,
  }));

  return orderIds;
}

export default function OrderPage({ params }: { params: { id: string } }) {
  return (
    <Suspense fallback={<div>Loading order details...</div>}>
      <OrderDetailsPage orderId={params.id} />
    </Suspense>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  total: number;
}

interface Order {
  orderId: string;
  customerInfo: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  items: OrderItem[];
  totals: {
    subtotal: number;
    tax: number;
    shipping: number;
    total: number;
  };
  date: string;
  status: string;
}

const OrderDetailsPage = () => {
  const params = useParams();
  const router = useRouter();
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In a real application, this would fetch order details from an API
    // For this MVP, we'll create a mock order based on the ID
    const fetchOrder = () => {
      setTimeout(() => {
        // Mock order data
        const mockOrder: Order = {
          orderId: params.id as string,
          customerInfo: {
            name: 'John Doe',
            email: 'john.doe@example.com',
            phone: '(555) 123-4567',
            address: '123 Anime Street',
            city: 'Tokyo',
            state: 'TK',
            zipCode: '12345',
            country: 'JP'
          },
          items: [
            {
              id: 'prod-001',
              name: 'Demon Slayer Tanjiro Card',
              price: 12.99,
              quantity: 1,
              total: 12.99
            },
            {
              id: 'prod-002',
              name: 'Attack on Titan Poster',
              price: 24.99,
              quantity: 2,
              total: 49.98
            }
          ],
          totals: {
            subtotal: 62.97,
            tax: 6.30,
            shipping: 5.99,
            total: 75.26
          },
          date: new Date().toISOString(),
          status: 'Processing'
        };
        
        setOrder(mockOrder);
        setIsLoading(false);
      }, 1000); // Simulate network delay
    };

    fetchOrder();
  }, [params.id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-zenith-black flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-zenith-orange border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-zenith-black">
        <Header />
        <div className="container-custom py-20 text-center">
          <h1 className="text-3xl font-bold text-zenith-white mb-4">Order Not Found</h1>
          <p className="text-gray-400 mb-8">We couldn't find the order you're looking for.</p>
          <Link href="/" className="btn-primary">
            Return to Home
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  // Format date
  const orderDate = new Date(order.date);
  const formattedDate = orderDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  const formattedTime = orderDate.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div className="min-h-screen bg-zenith-black">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container-custom">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-anime font-bold text-zenith-white">Order Details</h1>
            <Link href="/" className="text-zenith-white hover:text-zenith-orange transition-colors">
              ← Back to Home
            </Link>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Order Header */}
            <div className="bg-zenith-gray/30 backdrop-blur-sm rounded-lg p-6 mb-6">
              <div className="flex flex-col md:flex-row justify-between">
                <div>
                  <h2 className="text-xl font-bold text-zenith-white mb-2">Order #{order.orderId}</h2>
                  <p className="text-gray-400">Placed on {formattedDate} at {formattedTime}</p>
                </div>
                <div className="mt-4 md:mt-0">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                    order.status === 'Processing' ? 'bg-blue-900/50 text-blue-300' :
                    order.status === 'Shipped' ? 'bg-green-900/50 text-green-300' :
                    order.status === 'Delivered' ? 'bg-green-900/50 text-green-300' :
                    'bg-gray-700 text-gray-300'
                  }`}>
                    {order.status}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Order Items */}
              <div className="md:col-span-2">
                <div className="bg-zenith-gray/30 backdrop-blur-sm rounded-lg p-6 mb-6">
                  <h2 className="text-xl font-bold text-zenith-white mb-4">Items</h2>
                  
                  <div className="space-y-4">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex items-start justify-between border-b border-gray-700 pb-4">
                        <div>
                          <h3 className="text-zenith-white font-bold">{item.name}</h3>
                          <p className="text-gray-400 text-sm">Quantity: {item.quantity}</p>
                          <p className="text-gray-400 text-sm">Price: ${item.price.toFixed(2)}</p>
                        </div>
                        <div className="text-zenith-orange font-bold">
                          ${item.total.toFixed(2)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Shipping Information */}
                <div className="bg-zenith-gray/30 backdrop-blur-sm rounded-lg p-6">
                  <h2 className="text-xl font-bold text-zenith-white mb-4">Shipping Information</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-zenith-white font-bold mb-2">Shipping Address</h3>
                      <p className="text-gray-300">{order.customerInfo.name}</p>
                      <p className="text-gray-300">{order.customerInfo.address}</p>
                      <p className="text-gray-300">
                        {order.customerInfo.city}, {order.customerInfo.state} {order.customerInfo.zipCode}
                      </p>
                      <p className="text-gray-300">{order.customerInfo.country}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-zenith-white font-bold mb-2">Contact Information</h3>
                      <p className="text-gray-300">{order.customerInfo.email}</p>
                      <p className="text-gray-300">{order.customerInfo.phone}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Order Summary */}
              <div className="md:col-span-1">
                <div className="bg-zenith-gray/30 backdrop-blur-sm rounded-lg p-6 sticky top-24">
                  <h2 className="text-xl font-bold text-zenith-white mb-4">Order Summary</h2>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between">
                      <span className="text-gray-300">Subtotal</span>
                      <span className="text-zenith-white">${order.totals.subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Tax</span>
                      <span className="text-zenith-white">${order.totals.tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Shipping</span>
                      <span className="text-zenith-white">${order.totals.shipping.toFixed(2)}</span>
                    </div>
                    <div className="border-t border-gray-700 pt-3 flex justify-between">
                      <span className="text-zenith-white font-bold">Total</span>
                      <span className="text-zenith-orange text-xl font-bold">${order.totals.total.toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <button 
                      onClick={() => window.print()}
                      className="w-full btn-secondary"
                    >
                      Print Receipt
                    </button>
                    <Link href="/" className="block w-full btn-primary text-center">
                      Continue Shopping
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default OrderDetailsPage; 
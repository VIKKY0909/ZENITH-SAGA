'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { CheckCircleIcon, ClockIcon, TruckIcon, ArrowLeftIcon, PhoneIcon } from '@heroicons/react/24/solid';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  type: string;
  category: string;
}

interface CustomerInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
}

interface Order {
  orderId: string;
  customerInfo: CustomerInfo;
  items: CartItem[];
  subtotal: number;
  orderDate: string;
}

export default function OrderConfirmationPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get('id');
  
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // In a real app, you would fetch the order from your backend
    // For demo purposes, we'll get it from localStorage
    try {
      const storedOrder = localStorage.getItem('lastOrder');
      if (storedOrder) {
        setOrder(JSON.parse(storedOrder));
      }
    } catch (error) {
      console.error('Error loading order:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-zenith-black flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-zenith-orange border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  
  if (!order || !orderId) {
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
  const orderDate = new Date(order.orderDate);
  const formattedDate = orderDate.toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  
  // Estimate delivery date (7 days from order)
  const deliveryDate = new Date(orderDate);
  deliveryDate.setDate(deliveryDate.getDate() + 7);
  const formattedDeliveryDate = deliveryDate.toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  
  return (
    <div className="min-h-screen bg-zenith-black">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container-custom">
          <div className="flex items-center text-sm text-gray-400 mb-8">
            <Link href="/" className="hover:text-zenith-orange transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-zenith-orange">Order Confirmation</span>
          </div>
          
          <div className="bg-zenith-gray/30 backdrop-blur-sm rounded-lg p-8 mb-8">
            <div className="flex flex-col items-center text-center mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-green-500/20 rounded-full p-3 mb-4"
              >
                <CheckCircleIcon className="h-16 w-16 text-green-500" />
              </motion.div>
              <h1 className="text-3xl font-anime font-bold text-zenith-white mb-2">Order Confirmed!</h1>
              <p className="text-gray-300 max-w-lg">
                Thank you for your order. We've received your purchase request and our team will contact you shortly.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-zenith-black/50 rounded-lg p-6">
                <h2 className="text-xl font-bold text-zenith-white mb-4">Order Information</h2>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Order ID:</span>
                    <span className="text-zenith-white font-medium">{order.orderId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Date:</span>
                    <span className="text-zenith-white">{formattedDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Total:</span>
                    <span className="text-zenith-orange font-bold">₹{order.subtotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-zenith-black/50 rounded-lg p-6">
                <h2 className="text-xl font-bold text-zenith-white mb-4">Shipping Information</h2>
                <div className="space-y-3">
                  <div>
                    <span className="text-gray-400 block">Name:</span>
                    <span className="text-zenith-white">{order.customerInfo.name}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block">Address:</span>
                    <span className="text-zenith-white">
                      {order.customerInfo.address}, {order.customerInfo.city}, {order.customerInfo.state} - {order.customerInfo.pincode}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-400 block">Contact:</span>
                    <span className="text-zenith-white">{order.customerInfo.phone}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-zenith-black/50 rounded-lg p-6 mb-8">
              <h2 className="text-xl font-bold text-zenith-white mb-4">Next Steps</h2>
              <div className="relative">
                {/* Status Timeline */}
                <div className="absolute left-[15px] top-0 bottom-0 w-[2px] bg-gray-700"></div>
                
                <div className="space-y-8">
                  <div className="flex items-start">
                    <div className="bg-green-500 rounded-full w-8 h-8 flex items-center justify-center z-10 mr-4">
                      <CheckCircleIcon className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-zenith-white font-medium">Order Placed</h3>
                      <p className="text-gray-400 text-sm">{formattedDate}</p>
                      <p className="text-gray-300 text-sm mt-1">Your order has been received and is being processed.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-zenith-gray rounded-full w-8 h-8 flex items-center justify-center z-10 mr-4">
                      <PhoneIcon className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-zenith-white font-medium">Team Contact</h3>
                      <p className="text-gray-400 text-sm">Within 24 hours</p>
                      <p className="text-gray-300 text-sm mt-1">Our team will contact you to confirm your order and discuss payment options.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-zenith-gray rounded-full w-8 h-8 flex items-center justify-center z-10 mr-4">
                      <TruckIcon className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-zenith-white font-medium">Shipping</h3>
                      <p className="text-gray-400 text-sm">Estimated: {formattedDeliveryDate}</p>
                      <p className="text-gray-300 text-sm mt-1">After payment confirmation, your order will be shipped to your address.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-zenith-black/50 rounded-lg p-6">
              <h2 className="text-xl font-bold text-zenith-white mb-4">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4">
                    <div className="relative w-16 h-16 flex-shrink-0 rounded-md overflow-hidden bg-zenith-gray">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-zenith-white font-medium truncate">{item.name}</h3>
                      <p className="text-gray-400 text-sm">Qty: {item.quantity} × ₹{item.price.toFixed(2)}</p>
                    </div>
                    <div className="text-zenith-orange font-bold">
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="border-t border-gray-700 pt-4 space-y-2">
                <div className="flex justify-between text-gray-300">
                  <span>Subtotal</span>
                  <span>₹{order.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between text-zenith-white font-bold text-lg pt-2 border-t border-gray-700 mt-2">
                  <span>Total</span>
                  <span>₹{order.subtotal.toFixed(2)}</span>
                </div>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <Link href="/" className="btn-primary inline-flex items-center">
                <ArrowLeftIcon className="h-5 w-5 mr-2" />
                Return to Home
              </Link>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
} 
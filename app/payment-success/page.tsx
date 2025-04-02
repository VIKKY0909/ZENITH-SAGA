'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const PaymentSuccessPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [paymentStatus, setPaymentStatus] = useState<'success' | 'processing' | 'error'>('processing');
  const [paymentId, setPaymentId] = useState<string | null>(null);
  const [orderId, setOrderId] = useState<string | null>(null);

  useEffect(() => {
    // Get payment_intent and payment_intent_client_secret from URL
    const paymentIntent = searchParams.get('payment_intent');
    const paymentIntentClientSecret = searchParams.get('payment_intent_client_secret');
    
    if (paymentIntent) {
      setPaymentId(paymentIntent);
      
      // In a real application, you would verify the payment status with your backend
      // For this demo, we'll simulate a successful payment
      setTimeout(() => {
        setPaymentStatus('success');
        setOrderId('ZS' + Math.random().toString(36).substring(2, 10).toUpperCase());
        setIsLoading(false);
        
        // Clear cart after successful payment
        localStorage.removeItem('cart');
      }, 2000);
    } else {
      setPaymentStatus('error');
      setIsLoading(false);
    }
  }, [searchParams]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-zenith-black">
        <Header />
        <div className="container-custom py-20 flex flex-col items-center justify-center">
          <div className="w-16 h-16 border-4 border-zenith-orange border-t-transparent rounded-full animate-spin mb-6"></div>
          <h1 className="text-2xl font-bold text-zenith-white mb-2">Processing Payment</h1>
          <p className="text-gray-400">Please wait while we confirm your payment...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (paymentStatus === 'error') {
    return (
      <div className="min-h-screen bg-zenith-black">
        <Header />
        <div className="container-custom py-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-zenith-gray/30 backdrop-blur-sm rounded-lg p-8 max-w-2xl mx-auto text-center"
          >
            <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h1 className="text-3xl font-anime font-bold text-zenith-white mb-4">Payment Failed</h1>
            <p className="text-gray-300 mb-6">We couldn't process your payment. Please try again or use a different payment method.</p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/checkout" className="btn-primary">
                Return to Checkout
              </Link>
              <Link href="/cart" className="btn-secondary">
                Review Cart
              </Link>
            </div>
          </motion.div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zenith-black">
      <Header />
      <div className="container-custom py-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-zenith-gray/30 backdrop-blur-sm rounded-lg p-8 max-w-2xl mx-auto text-center"
        >
          <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-3xl font-anime font-bold text-zenith-white mb-4">Payment Successful!</h1>
          <p className="text-gray-300 mb-6">Thank you for your purchase. Your payment has been processed successfully.</p>
          
          <div className="bg-zenith-black/50 rounded-lg p-4 mb-8">
            <p className="text-zenith-orange font-bold mb-2">Order ID: #{orderId}</p>
            <p className="text-gray-400 text-sm">A confirmation email will be sent shortly with your order details.</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/" className="btn-primary">
              Continue Shopping
            </Link>
            {orderId && (
              <button 
                onClick={() => router.push(`/orders/${orderId}`)}
                className="btn-secondary"
              >
                View Order Details
              </button>
            )}
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default PaymentSuccessPage; 
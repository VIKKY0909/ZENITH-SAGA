'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { TrashIcon, ShoppingBagIcon, ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/solid';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ClientWrapper from '@/components/ClientWrapper';

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  type: string;
  category: string;
}

export default function CartPage() {
  return (
    <ClientWrapper>
      {(searchParams) => (
        <CartContent searchParams={searchParams} />
      )}
    </ClientWrapper>
  );
}

interface CartContentProps {
  searchParams: URLSearchParams;
}

function CartContent({ searchParams }: CartContentProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isRemoving, setIsRemoving] = useState<string | null>(null);
  const [isClearingCart, setIsClearingCart] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [feedbackType, setFeedbackType] = useState<'success' | 'error'>('success');

  useEffect(() => {
    // Load cart from localStorage
    const loadCart = () => {
      try {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
          setCartItems(JSON.parse(savedCart));
        }
      } catch (error) {
        console.error('Error loading cart:', error);
      } finally {
        // Simulate loading delay
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      }
    };

    loadCart();
  }, []);

  const showTemporaryFeedback = (message: string, type: 'success' | 'error') => {
    setFeedbackMessage(message);
    setFeedbackType(type);
    setShowFeedback(true);
    setTimeout(() => {
      setShowFeedback(false);
    }, 3000);
  };

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1 || newQuantity > 10) return;
    
    setIsUpdating(true);
    
    // Simulate network delay
    setTimeout(() => {
      try {
        const updatedCart = cartItems.map(item => 
          item.id === id ? { ...item, quantity: newQuantity } : item
        );
        
        setCartItems(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        showTemporaryFeedback('Cart updated successfully!', 'success');
      } catch (error) {
        console.error('Error updating cart:', error);
        showTemporaryFeedback('Failed to update cart. Please try again.', 'error');
      } finally {
        setIsUpdating(false);
      }
    }, 500);
  };

  const removeItem = (id: string) => {
    setIsRemoving(id);
    
    // Simulate network delay
    setTimeout(() => {
      try {
        const updatedCart = cartItems.filter(item => item.id !== id);
        setCartItems(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        showTemporaryFeedback('Item removed from cart!', 'success');
      } catch (error) {
        console.error('Error removing item:', error);
        showTemporaryFeedback('Failed to remove item. Please try again.', 'error');
      } finally {
        setIsRemoving(null);
      }
    }, 700);
  };

  const clearCart = () => {
    setIsClearingCart(true);
    
    // Simulate network delay
    setTimeout(() => {
      try {
        setCartItems([]);
        localStorage.removeItem('cart');
        showTemporaryFeedback('Cart cleared successfully!', 'success');
      } catch (error) {
        console.error('Error clearing cart:', error);
        showTemporaryFeedback('Failed to clear cart. Please try again.', 'error');
      } finally {
        setIsClearingCart(false);
      }
    }, 800);
  };

  const proceedToCheckout = () => {
    setIsCheckingOut(true);
    
    // We'll simulate a delay before redirecting
    setTimeout(() => {
      window.location.href = '/checkout';
    }, 800);
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-zenith-black flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-zenith-orange border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zenith-black">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container-custom">
          <h1 className="text-3xl font-anime font-bold text-zenith-white mb-8">Your Cart</h1>
          
          {cartItems.length === 0 ? (
            <div className="bg-zenith-gray/30 backdrop-blur-sm rounded-lg p-8 text-center">
              <div className="flex justify-center mb-6">
                <ShoppingBagIcon className="h-24 w-24 text-gray-500" />
              </div>
              <h2 className="text-2xl font-bold text-zenith-white mb-4">Your cart is empty</h2>
              <p className="text-gray-400 mb-8">Looks like you haven't added any items to your cart yet.</p>
              <Link href="/products" className="btn-primary inline-flex items-center">
                <ArrowLeftIcon className="h-5 w-5 mr-2" />
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="bg-zenith-gray/30 backdrop-blur-sm rounded-lg p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-zenith-white">
                      {cartItems.length} {cartItems.length === 1 ? 'Item' : 'Items'}
                    </h2>
                    <button 
                      onClick={clearCart}
                      disabled={isClearingCart}
                      className={`text-gray-400 hover:text-red-500 transition-colors text-sm flex items-center ${isClearingCart ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                      {isClearingCart ? (
                        <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin mr-2"></div>
                      ) : (
                        <TrashIcon className="h-4 w-4 mr-1" />
                      )}
                      Clear Cart
                    </button>
                  </div>
                  
                  <div className="space-y-6">
                    {cartItems.map(item => (
                      <div key={item.id} className="flex flex-col sm:flex-row items-start sm:items-center border-b border-gray-700 pb-6">
                        <div className="relative w-24 h-24 rounded-md overflow-hidden mb-4 sm:mb-0 sm:mr-6">
                          {item.type === 'sticker_card' ? (
                            <div className="relative w-full h-[200px] sm:h-[250px]">
                              <Image
                                src={item.image}
                                alt={item.name}
                                fill
                                className="object-contain"
                              />
                            </div>
                          ) : (
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              className="object-cover"
                            />
                          )}
                        </div>
                        
                        <div className="flex-1">
                          <Link 
                            href={`/products/${item.id}`}
                            className="text-lg font-bold text-zenith-white hover:text-zenith-orange transition-colors"
                          >
                            {item.name}
                          </Link>
                          
                          <div className="flex items-center mt-1 mb-3">
                            <span className="text-sm text-gray-400 mr-2">
                              {item.type === 'sticker_card' ? 'Sticker Card' : item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                            </span>
                            <span className="text-xs text-gray-500">|</span>
                            <span className="text-sm text-gray-400 ml-2">{item.category}</span>
                          </div>
                          
                          <div className="flex flex-wrap items-center justify-between gap-4">
                            <div className="flex items-center">
                              <button 
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                disabled={isUpdating || isRemoving === item.id}
                                className={`bg-zenith-gray hover:bg-gray-700 text-white w-8 h-8 flex items-center justify-center rounded-l-md transition-colors ${(isUpdating || isRemoving === item.id) ? 'opacity-70 cursor-not-allowed' : ''}`}
                              >
                                -
                              </button>
                              <input 
                                type="number" 
                                min="1" 
                                max="10"
                                value={item.quantity}
                                onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                                disabled={isUpdating || isRemoving === item.id}
                                className={`bg-zenith-black border-y border-zenith-gray text-center text-white w-12 h-8 focus:outline-none ${(isUpdating || isRemoving === item.id) ? 'opacity-70 cursor-not-allowed' : ''}`}
                              />
                              <button 
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                disabled={isUpdating || isRemoving === item.id}
                                className={`bg-zenith-gray hover:bg-gray-700 text-white w-8 h-8 flex items-center justify-center rounded-r-md transition-colors ${(isUpdating || isRemoving === item.id) ? 'opacity-70 cursor-not-allowed' : ''}`}
                              >
                                +
                              </button>
                            </div>
                            
                            <div className="flex items-center">
                              <span className="text-zenith-orange font-bold mr-4">
                                ₹{(item.price * item.quantity).toFixed(2)}
                              </span>
                              
                              <button 
                                onClick={() => removeItem(item.id)}
                                disabled={isRemoving === item.id}
                                className={`text-gray-400 hover:text-red-500 transition-colors ${isRemoving === item.id ? 'opacity-70 cursor-not-allowed' : ''}`}
                              >
                                {isRemoving === item.id ? (
                                  <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                                ) : (
                                  <TrashIcon className="h-5 w-5" />
                                )}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-zenith-gray/30 backdrop-blur-sm rounded-lg p-6 sticky top-24">
                  <h2 className="text-xl font-bold text-zenith-white mb-6">Order Summary</h2>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Subtotal</span>
                      <span className="text-zenith-white">₹{calculateSubtotal().toFixed(2)}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-400">Shipping</span>
                      <span className="text-zenith-white">Free</span>
                    </div>
                    
                    <div className="border-t border-gray-700 pt-4 flex justify-between">
                      <span className="text-lg font-bold text-zenith-white">Total</span>
                      <span className="text-lg font-bold text-zenith-orange">₹{calculateSubtotal().toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <button
                    onClick={proceedToCheckout}
                    disabled={isCheckingOut}
                    className={`btn-primary w-full flex items-center justify-center ${isCheckingOut ? 'opacity-70 cursor-not-allowed' : ''}`}
                  >
                    {isCheckingOut ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    ) : (
                      <ArrowRightIcon className="h-5 w-5 mr-2" />
                    )}
                    Proceed to Checkout
                  </button>
                  
                  <Link 
                    href="/products" 
                    className="mt-4 text-center block text-gray-400 hover:text-zenith-orange transition-colors"
                  >
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      
      {/* Feedback Toast */}
      <AnimatePresence>
        {showFeedback && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-lg shadow-lg ${
              feedbackType === 'success' ? 'bg-green-600' : 'bg-red-600'
            } text-white font-medium z-50`}
          >
            {feedbackMessage}
          </motion.div>
        )}
      </AnimatePresence>
      
      <Footer />
    </div>
  );
} 
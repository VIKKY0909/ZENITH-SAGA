'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeftIcon, CheckCircleIcon, PhoneIcon, ShoppingBagIcon } from '@heroicons/react/24/solid';
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

export default function CheckoutPage() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [feedbackType, setFeedbackType] = useState<'success' | 'error'>('success');
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
  });
  
  // Form validation
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  useEffect(() => {
    // Load cart from localStorage
    try {
      const storedCart = localStorage.getItem('cart');
      if (storedCart) {
        const parsedCart = JSON.parse(storedCart);
        if (parsedCart.length === 0) {
          // Redirect to cart if empty
          router.push('/cart');
          return;
        }
        setCartItems(parsedCart);
      } else {
        // Redirect to cart if no cart exists
        router.push('/cart');
      }
    } catch (error) {
      console.error('Error loading cart:', error);
    } finally {
      setIsLoading(false);
    }
  }, [router]);
  
  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    
    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };
  
  const showTemporaryFeedback = (message: string, type: 'success' | 'error') => {
    setFeedbackMessage(message);
    setFeedbackType(type);
    setShowFeedback(true);
    setTimeout(() => {
      setShowFeedback(false);
    }, 5000);
  };
  
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    // Required fields
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';
    if (!formData.pincode.trim()) newErrors.pincode = 'PIN code is required';
    
    // Email validation
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    // Phone validation
    if (formData.phone && !/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }
    
    // PIN code validation
    if (formData.pincode && !/^\d{6}$/.test(formData.pincode)) {
      newErrors.pincode = 'Please enter a valid 6-digit PIN code';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      showTemporaryFeedback('Please fix the errors in the form', 'error');
      return;
    }
    
    if (cartItems.length === 0) {
      showTemporaryFeedback('Your cart is empty', 'error');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Generate a random order ID
      const orderId = `ZS-${Math.floor(100000 + Math.random() * 900000)}`;
      setOrderId(orderId);
      
      // Prepare order data
      const orderData = {
        orderId,
        customerInfo: formData,
        items: cartItems,
        subtotal: calculateSubtotal(),
        orderDate: new Date().toISOString(),
      };
      
      // For demo purposes, we'll use Web3Forms to send an email notification
      const formData2 = new FormData();
      formData2.append('access_key', 'dfdaed8b-d0c4-4207-acc6-148cebf6b455');
      formData2.append('subject', `New Order: ${orderId}`);
      formData2.append('from_name', 'Zenith Saga Store');
      formData2.append('name', formData.name);
      formData2.append('email', formData.email);
      formData2.append('message', `
        New order received!
        
        Order ID: ${orderId}
        Customer: ${formData.name}
        Email: ${formData.email}
        Phone: ${formData.phone}
        Address: ${formData.address}, ${formData.city}, ${formData.state} - ${formData.pincode}
        
        Order Summary:
        ${cartItems.map(item => `${item.name} (${item.quantity}) - ₹${(item.price * item.quantity).toFixed(2)}`).join('\n')}
        
        Total: ₹${calculateSubtotal().toFixed(2)}
      `);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // For demo, we'll just log the order data and simulate success
      console.log('Order placed:', orderData);
      
      // Store order in localStorage for order confirmation page
      localStorage.setItem('lastOrder', JSON.stringify(orderData));
      
      // Clear cart
      localStorage.setItem('cart', JSON.stringify([]));
      
      // Show success message
      setOrderPlaced(true);
      
    } catch (error) {
      console.error('Error placing order:', error);
      showTemporaryFeedback('Failed to place order. Please try again.', 'error');
      setIsSubmitting(false);
    }
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-zenith-black flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-zenith-orange border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  
  if (cartItems.length === 0 && !orderPlaced) {
    return (
      <div className="min-h-screen bg-zenith-black">
        <Header />
        <div className="container-custom py-20 text-center">
          <h1 className="text-3xl font-bold text-zenith-white mb-4">Your Cart is Empty</h1>
          <p className="text-gray-400 mb-8">Add some products to your cart before proceeding to checkout.</p>
          <Link href="/products" className="btn-primary">
            Browse Products
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-zenith-black">
        <Header />
        
        <main className="pt-24 pb-16">
          <div className="container-custom">
            <div className="max-w-2xl mx-auto bg-zenith-gray/30 backdrop-blur-sm rounded-lg p-8 text-center">
              <div className="flex justify-center mb-6">
                <CheckCircleIcon className="h-24 w-24 text-green-500" />
              </div>
              
              <h1 className="text-3xl font-anime font-bold text-zenith-white mb-4">Order Placed Successfully!</h1>
              <p className="text-gray-300 mb-6">Thank you for your order. Your order ID is <span className="text-zenith-orange font-bold">{orderId}</span></p>
              
              <div className="bg-zenith-black/50 rounded-lg p-6 mb-8">
                <div className="flex items-center justify-center mb-4">
                  <PhoneIcon className="h-6 w-6 text-zenith-orange flex-shrink-0 mt-0.5 mr-3" />
                  <div>
                    <h3 className="font-bold mb-1">Our Team Will Contact You</h3>
                    <p className="text-sm text-gray-300">
                      After placing your order, our team will contact you within 24 hours to confirm your order details and discuss payment options.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/" className="btn-primary">
                  Return to Home
                </Link>
                <Link href="/products" className="btn-secondary">
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-zenith-black">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container-custom">
          <div className="flex items-center text-sm text-gray-400 mb-8">
            <Link href="/" className="hover:text-zenith-orange transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/cart" className="hover:text-zenith-orange transition-colors">Cart</Link>
            <span className="mx-2">/</span>
            <span className="text-zenith-orange">Checkout</span>
          </div>
          
          <h1 className="text-3xl font-anime font-bold text-zenith-white mb-8">Checkout</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="bg-zenith-gray/30 backdrop-blur-sm rounded-lg p-6">
                  <h2 className="text-xl font-bold text-zenith-white mb-4">Contact Information</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-zenith-white mb-2">Full Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className={`w-full bg-zenith-black border ${errors.name ? 'border-red-500' : 'border-gray-700'} rounded-md px-4 py-2 text-white focus:outline-none focus:border-zenith-orange`}
                        placeholder="John Doe"
                      />
                      {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-zenith-white mb-2">Email Address</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full bg-zenith-black border ${errors.email ? 'border-red-500' : 'border-gray-700'} rounded-md px-4 py-2 text-white focus:outline-none focus:border-zenith-orange`}
                        placeholder="john@example.com"
                      />
                      {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className="block text-zenith-white mb-2">Phone Number</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={`w-full bg-zenith-black border ${errors.phone ? 'border-red-500' : 'border-gray-700'} rounded-md px-4 py-2 text-white focus:outline-none focus:border-zenith-orange`}
                        placeholder="9876543210"
                      />
                      {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                    </div>
                  </div>
                </div>
                
                <div className="bg-zenith-gray/30 backdrop-blur-sm rounded-lg p-6">
                  <h2 className="text-xl font-bold text-zenith-white mb-4">Shipping Address</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="address" className="block text-zenith-white mb-2">Address</label>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className={`w-full bg-zenith-black border ${errors.address ? 'border-red-500' : 'border-gray-700'} rounded-md px-4 py-2 text-white focus:outline-none focus:border-zenith-orange`}
                        placeholder="123 Main St, Apt 4B"
                      />
                      {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label htmlFor="city" className="block text-zenith-white mb-2">City</label>
                        <input
                          type="text"
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          className={`w-full bg-zenith-black border ${errors.city ? 'border-red-500' : 'border-gray-700'} rounded-md px-4 py-2 text-white focus:outline-none focus:border-zenith-orange`}
                          placeholder="Mumbai"
                        />
                        {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                      </div>
                      
                      <div>
                        <label htmlFor="state" className="block text-zenith-white mb-2">State</label>
                        <input
                          type="text"
                          id="state"
                          name="state"
                          value={formData.state}
                          onChange={handleInputChange}
                          className={`w-full bg-zenith-black border ${errors.state ? 'border-red-500' : 'border-gray-700'} rounded-md px-4 py-2 text-white focus:outline-none focus:border-zenith-orange`}
                          placeholder="Maharashtra"
                        />
                        {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
                      </div>
                      
                      <div>
                        <label htmlFor="pincode" className="block text-zenith-white mb-2">PIN Code</label>
                        <input
                          type="text"
                          id="pincode"
                          name="pincode"
                          value={formData.pincode}
                          onChange={handleInputChange}
                          className={`w-full bg-zenith-black border ${errors.pincode ? 'border-red-500' : 'border-gray-700'} rounded-md px-4 py-2 text-white focus:outline-none focus:border-zenith-orange`}
                          placeholder="400001"
                        />
                        {errors.pincode && <p className="text-red-500 text-sm mt-1">{errors.pincode}</p>}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-zenith-gray/30 backdrop-blur-sm rounded-lg p-6">
                  <div className="bg-zenith-orange/20 text-zenith-white p-4 rounded-lg mb-6">
                    <div className="flex items-start">
                      <PhoneIcon className="h-6 w-6 text-zenith-orange flex-shrink-0 mt-0.5 mr-3" />
                      <div>
                        <h3 className="font-bold mb-1">Our Team Will Contact You</h3>
                        <p className="text-sm text-gray-300">
                          After placing your order, our team will contact you within 24 hours to confirm your order details and discuss payment options.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 border-t border-gray-700 pt-6">
                    <p className="text-gray-400 text-sm mb-4">
                      By placing your order, you agree to Zenith Saga Store's terms and conditions and privacy policy.
                    </p>
                    
                    <button 
                      type="submit" 
                      className={`btn-primary w-full flex items-center justify-center ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                          Processing Order...
                        </>
                      ) : (
                        <>
                          <ShoppingBagIcon className="h-5 w-5 mr-2" />
                          Place Order
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>
            
            {/* Order Summary */}
            <div>
              <div className="bg-zenith-gray/30 backdrop-blur-sm rounded-lg p-6 sticky top-24">
                <h2 className="text-xl font-bold text-zenith-white mb-4">Order Summary</h2>
                
                <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 mb-4">
                  {cartItems.map((item) => (
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
                        <p className="text-gray-400 text-sm">Qty: {item.quantity}</p>
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
                    <span>₹{calculateSubtotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>
                  <div className="flex justify-between text-zenith-white font-bold text-lg pt-2 border-t border-gray-700 mt-2">
                    <span>Total</span>
                    <span>₹{calculateSubtotal().toFixed(2)}</span>
                  </div>
                </div>
                
                <div className="mt-6 space-y-4">
                  <div className="flex items-start space-x-3 text-sm text-gray-300">
                    <PhoneIcon className="h-5 w-5 text-zenith-orange flex-shrink-0" />
                    <p>Our team will contact you to confirm your order</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
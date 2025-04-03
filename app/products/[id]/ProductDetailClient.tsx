'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { StarIcon, ShoppingCartIcon, BoltIcon } from '@heroicons/react/24/solid';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { allProducts } from '@/data/mockData';

// Define the Product interface to match the actual structure in mockData
type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  type: 'sticker' | 'card' | 'poster' | 'bookmark' | 'sticker_card' | 'tshirt';
  stock: number;
  rating: number;
  numReviews: number;
  isNew: boolean;
  isPopular: boolean;
  isFeatured: boolean;
  fandom: string;
  inStock: boolean;
};

export default function ProductDetailClient({ id, productData }: { id: string; productData: Product | undefined }) {
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [feedbackType, setFeedbackType] = useState<'success' | 'error'>('success');

  // If productData is undefined, render loading or not found
  if (!productData) {
    return (
      <div className="min-h-screen bg-zenith-black">
        <Header />
        <div className="container-custom py-20 text-center">
          <h1 className="text-3xl font-bold text-zenith-white mb-4">Product Not Found</h1>
          <p className="text-gray-400 mb-8">The product you are looking for does not exist or has been removed.</p>
          <Link href="/products" className="btn-primary">
            Browse Products
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const product = productData;

  const handleQuantityChange = (value: number) => {
    if (value < 1) return;
    if (product && product.inStock && value <= 10) {
      setQuantity(value);
    }
  };

  const showTemporaryFeedback = (message: string, type: 'success' | 'error') => {
    setFeedbackMessage(message);
    setFeedbackType(type);
    setShowFeedback(true);
    setTimeout(() => {
      setShowFeedback(false);
    }, 3000);
  };

  const addToCart = () => {
    if (!product) return;
    
    setIsButtonLoading(true);
    
    // Simulate network delay
    setTimeout(() => {
      try {
        // Get existing cart from localStorage
        const existingCart = localStorage.getItem('cart');
        const cart = existingCart ? JSON.parse(existingCart) : [];
        
        // Check if product already exists in cart
        const existingItemIndex = cart.findIndex((item: any) => item.id === product.id);
        
        if (existingItemIndex >= 0) {
          // Update quantity if product already in cart
          cart[existingItemIndex].quantity += quantity;
        } else {
          // Add new product to cart
          cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: quantity,
            type: product.type,
            category: product.category
          });
        }
        
        // Save updated cart to localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
        
        // Show success feedback
        setAddedToCart(true);
        showTemporaryFeedback('Added to cart successfully!', 'success');
        
        // Reset added state after 3 seconds
        setTimeout(() => {
          setAddedToCart(false);
        }, 3000);
      } catch (error) {
        console.error('Error adding to cart:', error);
        showTemporaryFeedback('Failed to add to cart. Please try again.', 'error');
      } finally {
        setIsButtonLoading(false);
      }
    }, 800);
  };

  const buyNow = () => {
    if (!product) return;
    
    setIsButtonLoading(true);
    
    // Simulate network delay
    setTimeout(() => {
      try {
        // Create a cart with just this item
        const cart = [{
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity: quantity,
          type: product.type,
          category: product.category
        }];
        
        // Save to localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
        
        // Navigate to checkout
        router.push('/checkout');
      } catch (error) {
        console.error('Error proceeding to checkout:', error);
        showTemporaryFeedback('Failed to proceed to checkout. Please try again.', 'error');
        setIsButtonLoading(false);
      }
    }, 800);
  };

  return (
    <div className="min-h-screen bg-zenith-black">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container-custom">
          {/* Breadcrumb */}
          <div className="flex items-center text-sm text-gray-400 mb-8">
            <Link href="/" className="hover:text-zenith-orange transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/products" className="hover:text-zenith-orange transition-colors">Products</Link>
            <span className="mx-2">/</span>
            <Link href={`/products?category=${product.category}`} className="hover:text-zenith-orange transition-colors">{product.category}</Link>
            <span className="mx-2">/</span>
            <span className="text-zenith-orange">{product.name}</span>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Image */}
            <div>
              <div className="bg-zenith-gray/30 backdrop-blur-sm rounded-lg overflow-hidden mb-6">
                <div className="relative aspect-square flex items-center justify-center">
                  {product.type === 'sticker_card' ? (
                    <div className="relative w-full h-[400px] sm:h-[500px]">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                  ) : (
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={400}
                      height={400}
                      className="object-contain transition-transform duration-500 group-hover:scale-110 mx-auto"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  )}
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 bg-zenith-orange/90 text-white text-xs px-2 py-1 rounded-md">
                    {product.category}
                  </div>
                  
                  {/* Out of Stock Overlay */}
                  {!product.inStock && (
                    <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                      <span className="bg-red-600 text-white px-4 py-2 rounded-md font-bold">Out of Stock</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Product Details */}
            <div>
              <div className="mb-6">
                <h1 className="text-3xl font-anime font-bold text-zenith-white mb-2">{product.name}</h1>
                
                <div className="flex items-center mb-4">
                  {/* Rating Stars */}
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon 
                        key={i} 
                        className={`h-5 w-5 ${
                          i < Math.floor(product.rating) 
                            ? 'text-yellow-400' 
                            : i < product.rating 
                              ? 'text-gradient-to-r from-yellow-400 to-gray-400' 
                              : 'text-gray-400'
                        }`} 
                      />
                    ))}
                  </div>
                  <span className="text-gray-400 text-sm ml-2">({product.rating})</span>
                  
                  <span className="mx-4 text-gray-500">|</span>
                  
                  <span className={`text-sm ${product.inStock ? 'text-green-500' : 'text-red-500'}`}>
                    {product.inStock ? 'In Stock' : 'Out of Stock'}
                  </span>
                  
                  {product.isNew && (
                    <>
                      <span className="mx-4 text-gray-500">|</span>
                      <span className="bg-zenith-orange/20 text-zenith-orange text-xs px-2 py-1 rounded-full">
                        New Arrival
                      </span>
                    </>
                  )}
                </div>
                
                <div className="text-2xl font-bold text-zenith-orange mb-6">
                  ₹{product.price.toFixed(2)}
                </div>
                
                <div className="text-gray-300 mb-8">
                  <p>{product.description}</p>
                </div>
                
                <div className="mb-8">
                  <div className="flex items-center mb-2">
                    <span className="text-zenith-white mr-4">Category:</span>
                    <Link 
                      href={`/products?category=${product.category}`}
                      className="text-zenith-orange hover:underline"
                    >
                      {product.category}
                    </Link>
                  </div>
                  
                  <div className="flex items-center mb-2">
                    <span className="text-zenith-white mr-4">Type:</span>
                    <Link 
                      href={`/products?type=${product.type}`}
                      className="text-zenith-orange hover:underline"
                    >
                      {product.type === 'sticker_card' ? 'Sticker Card' : product.type.charAt(0).toUpperCase() + product.type.slice(1)}
                    </Link>
                  </div>
                  
                  <div className="flex items-center">
                    <span className="text-zenith-white mr-4">Fandom:</span>
                    <span className="text-gray-300">{product.fandom}</span>
                  </div>
                </div>
                
                {product.inStock && (
                  <div className="mb-8">
                    <div className="flex items-center mb-6">
                      <span className="text-zenith-white mr-4">Quantity:</span>
                      <div className="flex items-center">
                        <button 
                          onClick={() => handleQuantityChange(quantity - 1)}
                          disabled={isButtonLoading}
                          className={`bg-zenith-gray hover:bg-gray-700 text-white w-10 h-10 flex items-center justify-center rounded-l-md transition-colors ${isButtonLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                          -
                        </button>
                        <input 
                          type="number" 
                          min="1" 
                          max="10"
                          value={quantity}
                          onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                          disabled={isButtonLoading}
                          className={`bg-zenith-black border-y border-zenith-gray text-center text-white w-16 h-10 focus:outline-none ${isButtonLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                        />
                        <button 
                          onClick={() => handleQuantityChange(quantity + 1)}
                          disabled={isButtonLoading}
                          className={`bg-zenith-gray hover:bg-gray-700 text-white w-10 h-10 flex items-center justify-center rounded-r-md transition-colors ${isButtonLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-4">
                      <button
                        onClick={addToCart}
                        disabled={isButtonLoading}
                        className={`btn-secondary flex-1 flex items-center justify-center ${isButtonLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                      >
                        {isButtonLoading ? (
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        ) : (
                          <ShoppingCartIcon className="h-5 w-5 mr-2" />
                        )}
                        Add to Cart
                      </button>
                      
                      <button
                        onClick={buyNow}
                        disabled={isButtonLoading}
                        className={`btn-primary flex-1 flex items-center justify-center ${isButtonLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                      >
                        {isButtonLoading ? (
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        ) : (
                          <BoltIcon className="h-5 w-5 mr-2" />
                        )}
                        Buy Now
                      </button>
                    </div>
                  </div>
                )}
                
                <div className="bg-zenith-gray/30 backdrop-blur-sm rounded-lg p-6">
                  <h3 className="text-xl font-bold text-zenith-white mb-4">Product Details</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Premium quality {product.type === 'sticker_card' ? 'Sticker Card' : product.type}</li>
                    <li>• Official licensed merchandise</li>
                    <li>• Perfect for {product.fandom} fans</li>
                    {product.type === 'card' && (
                      <>
                        <li>• Holographic finish</li>
                        <li>• Collectible item</li>
                      </>
                    )}
                    {product.type === 'sticker' && (
                      <>
                        <li>• Waterproof vinyl material</li>
                        <li>• Durable and long-lasting</li>
                      </>
                    )}
                    {product.type === 'poster' && (
                      <>
                        <li>• High-quality print</li>
                        <li>• Premium matte paper</li>
                      </>
                    )}
                    {product.type === 'bookmark' && (
                      <>
                        <li>• Durable laminated cardstock</li>
                        <li>• Elegant design</li>
                      </>
                    )}
                    {product.type === 'sticker_card' && (
                      <>
                        <li>• Premium quality card with sticker finish</li>
                        <li>• Vibrant colors and detailed artwork</li>
                      </>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          {/* Related Products Section */}
          <div className="mt-16">
            <h2 className="text-2xl font-anime font-bold text-zenith-white mb-8">You May Also Like</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {allProducts
                .filter(p => 
                  (p.category === product.category || p.fandom === product.fandom) && 
                  p.id !== product.id
                )
                .slice(0, 4)
                .map(relatedProduct => (
                  <Link 
                    key={relatedProduct.id} 
                    href={`/products/${relatedProduct.id}`}
                    className="bg-zenith-gray/30 backdrop-blur-sm rounded-lg overflow-hidden group"
                  >
                    <div className="relative aspect-square">
                      <Image
                        src={relatedProduct.image}
                        alt={relatedProduct.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <h3 className="text-lg font-bold text-zenith-white group-hover:text-zenith-orange transition-colors line-clamp-1">
                          {relatedProduct.name}
                        </h3>
                        <div className="flex justify-between items-center mt-1">
                          <span className="text-zenith-orange font-bold">₹{relatedProduct.price.toFixed(2)}</span>
                          <span className="text-xs text-gray-400 uppercase">
                            {relatedProduct.type === 'sticker_card' ? 'STICKER CARD' : relatedProduct.type.toUpperCase()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
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
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ShoppingCartIcon, Bars3Icon, XMarkIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const Header = () => {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    // Get cart count from localStorage
    const getCartCount = () => {
      try {
        const cart = localStorage.getItem('cart');
        if (cart) {
          const cartItems = JSON.parse(cart);
          setCartCount(cartItems.length);
        }
      } catch (error) {
        console.error('Error getting cart count:', error);
      }
    };

    window.addEventListener('scroll', handleScroll);
    getCartCount();
    
    // Set up storage event listener to update cart count when it changes
    window.addEventListener('storage', getCartCount);
    
    // Custom event for cart updates
    window.addEventListener('cartUpdated', getCartCount);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('storage', getCartCount);
      window.removeEventListener('cartUpdated', getCartCount);
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearching(true);
      // Close mobile menu if open
      setIsMobileMenuOpen(false);
      
      // Navigate to products page with search query
      setTimeout(() => {
        router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
        setIsSearching(false);
      }, 300);
    }
  };

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-zenith-black/90 backdrop-blur-md shadow-lg py-2' 
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container-custom flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <div className="relative h-20 w-20 rounded-full border-4 border-zenith-orange/20 hover:border-zenith-orange/40 transition-colors duration-300 overflow-hidden shadow-lg">
            <Image 
              src="/images/zenith logo.jpg" 
              alt="Zenith Saga Store" 
              fill
              className="object-cover rounded-full hover:scale-105 transition-transform duration-300"
              priority
            />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link href="/" className="text-zenith-white hover:text-zenith-orange transition-colors">
            Home
          </Link>
          <Link href="/products" className="text-zenith-white hover:text-zenith-orange transition-colors">
            Products
          </Link>
          <Link href="/categories" className="text-zenith-white hover:text-zenith-orange transition-colors">
            Categories
          </Link>
          <Link href="/about" className="text-zenith-white hover:text-zenith-orange transition-colors">
            About
          </Link>
          <Link href="/contact" className="text-zenith-white hover:text-zenith-orange transition-colors">
            Contact
          </Link>
        </nav>

        {/* Search and Cart */}
        <div className="hidden md:flex items-center space-x-4">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-zenith-gray/50 border border-gray-700 rounded-full py-2 pl-4 pr-10 text-zenith-white focus:outline-none focus:ring-2 focus:ring-zenith-orange w-48 transition-all duration-300 focus:w-64"
            />
            <button 
              type="submit" 
              className="absolute right-3 top-2.5"
              disabled={isSearching}
            >
              {isSearching ? (
                <div className="w-5 h-5 border-2 border-zenith-orange border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 hover:text-zenith-orange transition-colors" />
              )}
            </button>
          </form>
          <Link href="/cart" className="relative">
            <ShoppingCartIcon className="h-6 w-6 text-zenith-white hover:text-zenith-orange transition-colors" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-zenith-orange text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center space-x-4 md:hidden">
          <Link href="/cart" className="relative">
            <ShoppingCartIcon className="h-6 w-6 text-zenith-white" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-zenith-orange text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
          <button 
            onClick={toggleMobileMenu}
            className="text-zenith-white focus:outline-none"
          >
            {isMobileMenuOpen ? (
              <XMarkIcon className="h-7 w-7" />
            ) : (
              <Bars3Icon className="h-7 w-7" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-zenith-gray border-t border-gray-700"
          >
            <div className="container-custom py-4">
              <nav className="flex flex-col space-y-4">
                <Link 
                  href="/" 
                  className="text-zenith-white hover:text-zenith-orange transition-colors py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <Link 
                  href="/products" 
                  className="text-zenith-white hover:text-zenith-orange transition-colors py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Products
                </Link>
                <Link 
                  href="/categories" 
                  className="text-zenith-white hover:text-zenith-orange transition-colors py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Categories
                </Link>
                <Link 
                  href="/about" 
                  className="text-zenith-white hover:text-zenith-orange transition-colors py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  About
                </Link>
                <Link 
                  href="/contact" 
                  className="text-zenith-white hover:text-zenith-orange transition-colors py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Contact
                </Link>
              </nav>
              <form onSubmit={handleSearch} className="mt-4 relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-zenith-black border border-gray-700 rounded-md py-2 px-4 text-zenith-white focus:outline-none focus:ring-2 focus:ring-zenith-orange"
                />
                <button 
                  type="submit" 
                  className="absolute right-3 top-2.5"
                  disabled={isSearching}
                >
                  {isSearching ? (
                    <div className="w-5 h-5 border-2 border-zenith-orange border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header; 
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { faqs } from '@/data/mockData';

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  
  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  
  // Additional FAQs specific to the page
  const additionalFAQs = [
    {
      id: 'faq-006',
      question: 'How can I track my order?',
      answer: 'You can track your order by logging into your account and visiting the "My Orders" section. Alternatively, you can use the tracking number provided in your order confirmation email to check the status on our website or the courier\'s website.'
    },
    {
      id: 'faq-007',
      question: 'Do you offer Cash on Delivery (COD)?',
      answer: 'Yes, we offer Cash on Delivery for orders under ₹2000 in select cities across India. This option will be available at checkout if your delivery address is eligible for COD.'
    },
    {
      id: 'faq-008',
      question: 'How do I cancel my order?',
      answer: 'You can cancel your order within 24 hours of placing it by contacting our customer service team. Once the order has been shipped, it cannot be cancelled, but you can return it after delivery according to our return policy.'
    },
    {
      id: 'faq-009',
      question: 'Are the products authentic and officially licensed?',
      answer: 'Yes, all products sold on Zenith Saga Store are 100% authentic and officially licensed merchandise. We work directly with authorized distributors and licensors to ensure the authenticity of all our products.'
    },
    {
      id: 'faq-010',
      question: 'Do you offer gift wrapping services?',
      answer: 'Yes, we offer gift wrapping services for an additional fee of ₹99. You can select this option during checkout and even include a personalized message for the recipient.'
    },
    {
      id: 'faq-011',
      question: 'How can I get updates about new products and promotions?',
      answer: 'You can subscribe to our newsletter at the bottom of our website to receive updates about new products, promotions, and exclusive offers. You can also follow us on social media platforms like Instagram, Facebook, and Twitter for the latest updates.'
    },
    {
      id: 'faq-012',
      question: 'What if I receive a damaged or defective product?',
      answer: 'If you receive a damaged or defective product, please contact our customer service team within 48 hours of delivery with photos of the damaged item. We will arrange for a replacement or refund as per your preference.'
    }
  ];
  
  // Combine all FAQs
  const allFAQs = [...faqs, ...additionalFAQs];
  
  // Group FAQs by category
  const faqCategories = {
    'Orders & Shipping': allFAQs.filter(faq => 
      faq.question.includes('order') || 
      faq.question.includes('shipping') || 
      faq.question.includes('delivery') ||
      faq.question.includes('track')
    ),
    'Products & Authenticity': allFAQs.filter(faq => 
      faq.question.includes('product') || 
      faq.question.includes('authentic') || 
      faq.question.includes('licensed')
    ),
    'Payment & Pricing': allFAQs.filter(faq => 
      faq.question.includes('payment') || 
      faq.question.includes('Cash on Delivery') || 
      faq.question.includes('COD') ||
      faq.question.includes('price')
    ),
    'Returns & Refunds': allFAQs.filter(faq => 
      faq.question.includes('return') || 
      faq.question.includes('refund') || 
      faq.question.includes('cancel') ||
      faq.question.includes('damaged')
    ),
    'Other Questions': allFAQs.filter(faq => 
      !faq.question.includes('order') && 
      !faq.question.includes('shipping') && 
      !faq.question.includes('delivery') &&
      !faq.question.includes('track') &&
      !faq.question.includes('product') && 
      !faq.question.includes('authentic') && 
      !faq.question.includes('licensed') &&
      !faq.question.includes('payment') && 
      !faq.question.includes('Cash on Delivery') && 
      !faq.question.includes('COD') &&
      !faq.question.includes('price') &&
      !faq.question.includes('return') && 
      !faq.question.includes('refund') && 
      !faq.question.includes('cancel') &&
      !faq.question.includes('damaged')
    )
  };
  
  return (
    <div className="min-h-screen bg-zenith-black">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-anime font-bold text-zenith-white mb-4">Frequently Asked Questions</h1>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Find answers to common questions about our products, shipping, returns, and more. 
              If you can't find what you're looking for, feel free to contact our support team.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* FAQ Categories Sidebar */}
            <div className="md:col-span-1">
              <div className="bg-zenith-gray/30 backdrop-blur-sm rounded-lg p-6 sticky top-24">
                <h2 className="text-xl font-bold text-zenith-white mb-6">Categories</h2>
                <nav className="space-y-2">
                  {Object.keys(faqCategories).map((category, index) => (
                    <a 
                      key={index}
                      href={`#${category.toLowerCase().replace(/\s+/g, '-')}`}
                      className="block py-2 px-4 rounded-md text-gray-300 hover:bg-zenith-gray hover:text-zenith-white transition-colors"
                    >
                      {category} ({faqCategories[category as keyof typeof faqCategories].length})
                    </a>
                  ))}
                </nav>
                
                <div className="mt-8 p-4 bg-zenith-orange/10 rounded-lg">
                  <h3 className="text-zenith-orange font-bold mb-2">Need More Help?</h3>
                  <p className="text-gray-300 text-sm mb-4">
                    Can't find the answer you're looking for? Contact our customer support team.
                  </p>
                  <Link href="/contact" className="btn-primary w-full text-center text-sm">
                    Contact Support
                  </Link>
                </div>
              </div>
            </div>
            
            {/* FAQ Content */}
            <div className="md:col-span-3">
              {Object.entries(faqCategories).map(([category, categoryFaqs], categoryIndex) => (
                <div 
                  key={categoryIndex}
                  id={category.toLowerCase().replace(/\s+/g, '-')}
                  className="mb-12 scroll-mt-32"
                >
                  <h2 className="text-2xl font-anime font-bold text-zenith-white mb-6 border-b border-gray-700 pb-2">
                    {category}
                  </h2>
                  
                  <div className="space-y-4">
                    {categoryFaqs.map((faq, faqIndex) => {
                      const index = categoryIndex * 100 + faqIndex;
                      return (
                        <div 
                          key={faq.id}
                          className="bg-zenith-gray/30 backdrop-blur-sm rounded-lg overflow-hidden"
                        >
                          <button
                            onClick={() => toggleFAQ(index)}
                            className="w-full flex justify-between items-center p-4 text-left focus:outline-none"
                          >
                            <h3 className="text-lg font-bold text-zenith-white">{faq.question}</h3>
                            {openIndex === index ? (
                              <ChevronUpIcon className="h-5 w-5 text-zenith-orange" />
                            ) : (
                              <ChevronDownIcon className="h-5 w-5 text-zenith-orange" />
                            )}
                          </button>
                          
                          <AnimatePresence>
                            {openIndex === index && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                              >
                                <div className="p-4 pt-0 border-t border-gray-700">
                                  <p className="text-gray-300">{faq.answer}</p>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-16 text-center">
            <h2 className="text-2xl font-anime font-bold text-zenith-white mb-6">Still Have Questions?</h2>
            <p className="text-gray-400 max-w-2xl mx-auto mb-8">
              Our customer support team is always ready to help you with any questions or concerns you may have.
              Feel free to reach out to us through our contact page.
            </p>
            <Link href="/contact" className="btn-primary">
              Contact Us
            </Link>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
} 
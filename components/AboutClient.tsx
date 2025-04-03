'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function AboutClient() {
  const [mounted, setMounted] = useState(false);
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  const [missionRef, missionInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [teamRef, teamInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Team members data
  const teamMembers = [
    {
      name: "Parmar Varsha",
      image: "/images/vars.jpg",
      bio: "Anime enthusiast and entrepreneur with a passion for bringing quality merchandise to fans across India."
    },
    {
      name: "Vahane Vivek",
      image: "/images/vikky.jpg",
      bio: "Ensures smooth operations and strategic planning to deliver exceptional merchandise experiences to our valued customers."
    },
  ];

  return (
    <main className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 bg-zenith-black">
        <div className="absolute inset-0 bg-[url('/images/anime-pattern.png')] opacity-10 bg-repeat"></div>
        <div className="container-custom relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-anime font-bold text-zenith-white mb-4">About Zenith Saga Store</h1>
            <p className="text-xl text-gray-300">Your premier destination for anime, series, movies, and pop culture merchandise in India.</p>
          </motion.div>
        </div>
      </section>
      
      {/* Our Story Section */}
      <section className="py-16 bg-zenith-gray">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="relative h-[400px] rounded-lg overflow-hidden">
                <Image 
                  src="/images/a-vibrant-and-engaging-illustration-for-_dPPTlTcBTo6BHzZ4kbhNNA_9IXnwf7VRWWzTo-h8w_SQA.jpeg" 
                  alt="Zenith Saga Store Story" 
                  fill 
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h2 className="text-3xl font-anime font-bold text-zenith-white mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-300">
                <p>
                Welcome to Zenith Saga Store, where fandom meets creativity! Our journey began with a simple idea: to celebrate the characters we love through unique, high-quality products. Founded by a group of passionate fans, our mission is to bring a piece of that magic into your everyday life.
                </p>
                <p>
               
From stickers and posters to cards and more, we curate and create items that resonate with fans of all ages. Our products are designed to inspire and connect, turning everyday moments into extraordinary experiences.
</p>
                <p>
Join us as we explore, create, and share the stories that inspire us all. Thank you for being a part of the Zenith Saga family!

</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Our Mission Section */}
      <section className="py-16 bg-zenith-black">
        <div className="container-custom">
          <motion.div 
            ref={missionRef}
            variants={containerVariants}
            initial="hidden"
            animate={missionInView ? "visible" : "hidden"}
            className="max-w-3xl mx-auto text-center"
          >
            <motion.h2 variants={itemVariants} className="text-3xl font-anime font-bold text-zenith-white mb-6">Our Mission</motion.h2>
            <motion.div variants={itemVariants} className="space-y-6 text-gray-300">
              <p className="text-xl">
                To bring joy to fans by providing high-quality, authentic merchandise that celebrates their favorite stories and characters.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                <div className="bg-zenith-gray/20 backdrop-blur-sm rounded-lg p-6">
                  <div className="w-16 h-16 bg-zenith-orange/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-zenith-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-zenith-white mb-2">Quality</h3>
                  <p className="text-gray-400">We never compromise on the quality of our products, ensuring you receive merchandise that exceeds your expectations.</p>
                </div>
                
                <div className="bg-zenith-gray/20 backdrop-blur-sm rounded-lg p-6">
                  <div className="w-16 h-16 bg-zenith-orange/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-zenith-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-zenith-white mb-2">Authenticity</h3>
                  <p className="text-gray-400">All our products are officially licensed, ensuring you receive authentic merchandise that supports the creators.</p>
                </div>
                
                <div className="bg-zenith-gray/20 backdrop-blur-sm rounded-lg p-6">
                  <div className="w-16 h-16 bg-zenith-orange/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-zenith-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-zenith-white mb-2">Community</h3>
                  <p className="text-gray-400">We're building a community of fans who share our passion for anime, movies, series, and pop culture.</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      {/* Our Team Section */}
      <section className="py-16 bg-zenith-gray">
        <div className="container-custom">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-anime font-bold text-zenith-white mb-4">Meet Our Team</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              The passionate people behind Zenith Saga Store who work tirelessly to bring you the best merchandise.
            </p>
          </motion.div>
          
          <motion.div 
            ref={teamRef}
            variants={containerVariants}
            initial="hidden"
            animate={teamInView ? "visible" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {teamMembers.map((member, index) => (
              <motion.div 
                key={index}
                variants={itemVariants}
                className="bg-zenith-black/30 backdrop-blur-sm rounded-lg overflow-hidden"
              >
                <div className="relative h-64">
                  <Image 
                    src={member.image} 
                    alt={member.name} 
                    fill 
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-zenith-white mb-1">{member.name}</h3>
                  <p className="text-gray-400">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-zenith-black">
        <div className="container-custom">
          <div className="bg-zenith-gray/20 backdrop-blur-sm rounded-lg p-8 max-w-4xl mx-auto">
            <div className="text-center">
              <h2 className="text-2xl font-anime font-bold text-zenith-white mb-4">Join Our Community</h2>
              <p className="text-gray-300 mb-6">
                Become a part of the Zenith Saga family and stay updated on new products, exclusive offers, and community events.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/products" className="btn-primary">
                  Explore Products
                </Link>
                <Link href="/contact" className="btn-secondary">
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  );
} 
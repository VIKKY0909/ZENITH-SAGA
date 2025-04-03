'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Footer = () => {
  const [footerRef, footerInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4
      }
    }
  };

  const linkVariants = {
    hover: {
      color: '#FF6B00',
      x: 5,
      transition: {
        duration: 0.2
      }
    }
  };

  const socialVariants = {
    hover: {
      scale: 1.15,
      rotate: 5,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };

  return (
    <footer className="bg-zenith-black border-t border-gray-800 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div 
          className="absolute -top-20 -right-20 w-64 h-64 bg-zenith-orange/5 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div 
          className="absolute -bottom-32 -left-20 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ 
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
      
      <motion.div 
        ref={footerRef}
        variants={containerVariants}
        initial="hidden"
        animate={footerInView ? "visible" : "hidden"}
        className="container-custom py-12 relative z-10"
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and About */}
          <motion.div variants={itemVariants} className="col-span-1 md:col-span-1">
            
          <div className="relative h-14 w-14 rounded-full border-4 border-zenith-orange/20 hover:border-zenith-orange/40 transition-colors duration-300 overflow-hidden shadow-lg">
              <Link href="/">
                <Image 
                  src="/images/zenith logo.jpg" 
                  alt="Zenith Saga Store" 
                  fill
                  className="object-contain"
                  priority
                />
              </Link>
            </div>
            <motion.p variants={itemVariants} className="text-gray-400 mb-4">
              Your ultimate destination for anime, TV series, music, and sports merchandise. Discover unique collectibles that showcase your passion.
            </motion.p>
            <motion.div variants={itemVariants} className="flex space-x-4">
              {/*   */}
              {/* <motion.a 
                href="#" 
                className="text-gray-400 hover:text-zenith-orange"
                variants={socialVariants}
                whileHover="hover"
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </motion.a>
              <motion.a 
                href="#" 
                className="text-gray-400 hover:text-zenith-orange"
                variants={socialVariants}
                whileHover="hover"
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" />
                </svg> */}
              {/* </motion.a> */}
            </motion.div>
          </motion.div>
          
          {/* Quick Links */}
          <motion.div variants={itemVariants} className="col-span-1">
            <h3 className="text-zenith-orange font-bold text-lg mb-4 relative inline-block">
              Quick Links
              <motion.span 
                className="absolute -bottom-1 left-0 w-0 h-0.5 bg-zenith-orange"
                animate={{ width: "100%" }}
                transition={{ duration: 0.5, delay: 0.5 }}
              />
            </h3>
            <ul className="space-y-2">
              {[
                { name: 'Home', path: '/' },
                { name: 'Products', path: '/products' },
                { name: 'Categories', path: '/categories' },
                { name: 'About Us', path: '/about' },
                { name: 'Contact', path: '/contact' },
                // { name: 'FAQ', path: '/faq' }
              ].map((link, index) => (
                <motion.li key={link.path} variants={itemVariants} custom={index}>
                  <motion.div whileHover="hover">
                    <Link href={link.path} className="text-gray-400 hover:text-zenith-orange transition-colors flex items-center group">
                      <motion.span variants={linkVariants}>
                        {link.name}
                      </motion.span>
                      <motion.svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-4 w-0 ml-1 text-zenith-orange opacity-0 group-hover:w-4 group-hover:opacity-100 transition-all duration-200" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </motion.svg>
                    </Link>
                  </motion.div>
                </motion.li>
              ))}
            </ul>
          </motion.div>
          
          {/* Categories */}
          <motion.div variants={itemVariants} className="col-span-1">
            <h3 className="text-zenith-orange font-bold text-lg mb-4 relative inline-block">
              Categories
              <motion.span 
                className="absolute -bottom-1 left-0 w-0 h-0.5 bg-zenith-orange"
                animate={{ width: "100%" }}
                transition={{ duration: 0.5, delay: 0.6 }}
              />
            </h3>
            <ul className="space-y-2">
              {[
                { name: 'Anime', path: '/categories' },
                { name: 'Series', path: '/categories' },
                { name: 'Movies', path: '/categories' },
                { name: 'Music Bands', path: '/categories' },
                { name: 'Sports', path: '/categories' },
                { name: 'Gaming', path: '/categories' }
              ].map((category, index) => (
                <motion.li key={category.name} variants={itemVariants} custom={index}>
                  <motion.div whileHover="hover">
                    <Link href={category.path} className="text-gray-400 hover:text-zenith-orange transition-colors flex items-center group">
                      <motion.span variants={linkVariants}>
                        {category.name}
                      </motion.span>
                      <motion.svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-4 w-0 ml-1 text-zenith-orange opacity-0 group-hover:w-4 group-hover:opacity-100 transition-all duration-200" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </motion.svg>
                    </Link>
                  </motion.div>
                </motion.li>
              ))}
            </ul>
          </motion.div>
          
          {/* Contact */}
          <motion.div variants={itemVariants} className="col-span-1">
            <h3 className="text-zenith-orange font-bold text-lg mb-4 relative inline-block">
              Contact Us
              <motion.span 
                className="absolute -bottom-1 left-0 w-0 h-0.5 bg-zenith-orange"
                animate={{ width: "100%" }}
                transition={{ duration: 0.5, delay: 0.7 }}
              />
            </h3>
            <ul className="space-y-2 text-gray-400">
              {/* <motion.li variants={itemVariants} className="flex items-start">
                <svg className="h-6 w-6 mr-2 text-zenith-orange flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>123 Anime Street, Koramangala, Bangalore, India</span>
              </motion.li> */}
              <motion.li variants={itemVariants} className="flex items-start">
                <svg className="h-6 w-6 mr-2 text-zenith-orange flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <Link href="mailto:zenithsagastor@gmail.com" className="hover:text-zenith-orange transition-colors hover-lift inline-block">
                  zenithsagastor@gmail.com
                </Link>
              </motion.li>
              <motion.li variants={itemVariants} className="flex items-start">
                <svg className="h-6 w-6 mr-2 text-zenith-orange flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <Link href="tel:+918511822796" className="hover:text-zenith-orange transition-colors hover-lift inline-block">
                  +91 85118 22796
                </Link>
              </motion.li>
            </ul>
          </motion.div>

          {/* Social Media */}
          <motion.div variants={itemVariants} className="col-span-1">
            <h3 className="text-zenith-orange font-bold text-lg mb-4 relative inline-block">
              Follow Us
              <motion.span 
                className="absolute -bottom-1 left-0 w-0 h-0.5 bg-zenith-orange"
                animate={{ width: "100%" }}
                transition={{ duration: 0.5, delay: 0.7 }}
              />
            </h3>
            <motion.div variants={itemVariants} className="flex space-x-4">
              <motion.a 
                href="https://instagram.com/zenith.saga.store" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-zenith-orange"
                variants={socialVariants}
                whileHover="hover"
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
                </svg>
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
        
        
      </motion.div>
    </footer>
  );
};

export default Footer; 
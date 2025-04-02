'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useTexture, PerspectiveCamera, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

// Import this dynamically to avoid SSR issues
const Scene = dynamic(() => Promise.resolve(SceneComponent), { ssr: false });

const LoadingScreen = () => (
  <div className="absolute inset-0 flex items-center justify-center bg-black">
    <div className="text-2xl text-white">Loading...</div>
  </div>
);

// Update the products array to use actual card images
const products = [
  { id: 1, image: '/images/products/cards/4.jpg' },
  { id: 2, image: '/images/products/cards/● ASH & PIKACHU.jpg' },
  { id: 3, image: '/images/products/cards/2c1a857cd7b900e8aac99468cfd76cef.jpg' },
  { id: 4, image: '/images/products/cards/54.jpg' },
  { id: 5, image: '/images/products/cards/_Nezuko Kamado_ The Adorable Demon Slayer Sister 💕_.jpg' },

];

function Card({ position, image, scale = 1, index }: { position: THREE.Vector3; image: string; scale?: number; index: number }) {
  const texture = useTexture(image);
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const { camera } = useThree();
  
  // Hover effect
  useFrame((state) => {
    if (meshRef.current) {
      // Add subtle floating animation
      meshRef.current.position.y = position.y + Math.sin(state.clock.elapsedTime * 0.5 + index) * 0.1;
      
      // Scale up slightly when hovered
      if (hovered) {
        meshRef.current.scale.lerp(new THREE.Vector3(1.1, 1.1, 1.1), 0.1);
      } else {
        meshRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);
      }
    }
  });

  const handleClick = () => {
    // Animate camera to focus on this card
    if (camera instanceof THREE.PerspectiveCamera) {
      const targetPosition = new THREE.Vector3(
        position.x * 0.7, 
        position.y, 
        position.z * 0.7
      );
      
      // Create a temporary animation
      const startPosition = camera.position.clone();
      let startTime = Date.now();
      const duration = 1000; // 1 second
      
      const animate = () => {
        const now = Date.now();
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Ease in-out function
        const easeProgress = progress < 0.5
          ? 2 * progress * progress
          : -1 + (4 - 2 * progress) * progress;
        
        camera.position.lerpVectors(startPosition, targetPosition, easeProgress);
        camera.lookAt(0, 0, 0);
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      
      animate();
    }
  };

  return (
    <mesh 
      ref={meshRef} 
      position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={handleClick}
    >
      <planeGeometry args={[3 * scale, 4 * scale]} />
      <meshBasicMaterial 
        map={texture} 
        side={THREE.DoubleSide} 
        transparent={true}
        opacity={1}
      />
    </mesh>
  );
}

function SceneComponent() {
  const groupRef = useRef<THREE.Group>(null);
  const [scale, setScale] = useState(1);
  const [rotationSpeed, setRotationSpeed] = useState(0.003); // Slower rotation speed
  const [autoRotate, setAutoRotate] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Adjust scale based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) { // sm breakpoint
        setScale(0.7);
      } else if (window.innerWidth < 768) { // md breakpoint
        setScale(0.8);
      } else if (window.innerWidth < 1024) { // lg breakpoint
        setScale(0.9);
      } else {
        setScale(1);
      }
    };
    
    handleResize(); // Initialize on mount
    window.addEventListener('resize', handleResize);
    
    // Track mouse position for interactive effects
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse position between -1 and 1
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Handle auto-rotation and interactive effects
  useFrame((state) => {
    if (groupRef.current) {
      if (autoRotate) {
        // Auto-rotate the group
        groupRef.current.rotation.y += rotationSpeed;
      } else {
        // Gradually slow down rotation when auto-rotate is disabled
        groupRef.current.rotation.y += rotationSpeed * 0.95;
        if (rotationSpeed > 0.0001) {
          setRotationSpeed(prev => prev * 0.95);
        }
      }
      
      // Subtle tilt based on mouse position
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        mousePosition.y * 0.1,
        0.05
      );
      
      // Subtle horizontal adjustment based on mouse position
      const targetRotationY = groupRef.current.rotation.y + mousePosition.x * 0.01;
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        targetRotationY,
        0.05
      );
    }
  });

  // Toggle auto-rotation on click
  const handleGroupClick = () => {
    setAutoRotate(prev => !prev);
    if (!autoRotate) {
      // Reset rotation speed when enabling auto-rotate
      setRotationSpeed(0.003);
    }
  };

  return (
    <group ref={groupRef} onClick={handleGroupClick}>
      {products.map((product, index) => {
        const angle = (index / products.length) * Math.PI * 2;
        // Adjust radius based on screen size
        const radius = 6 * scale;
        const x = Math.sin(angle) * radius;
        const z = Math.cos(angle) * radius;
        const position = new THREE.Vector3(x, 0, z);
        position.y = Math.sin(angle * 2) * 0.5; // Slight vertical offset

        return (
          <Card
            key={product.id}
            position={position}
            image={product.image}
            scale={scale}
            index={index}
          />
        );
      })}
    </group>
  );
}

const HeroSection = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background with animated gradient */}
      <div className="absolute inset-0 bg-zenith-black">
        <div className="absolute inset-0 bg-[url('/images/anime-pattern.png')] opacity-10 bg-repeat"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-zenith-black"></div>
        
        {/* Animated background elements */}
        <motion.div 
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-zenith-orange/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.2, 0.3],
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div 
          className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{ 
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
      
      {/* Hero Content */}
      <div className="container-custom relative z-10 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center lg:text-left"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-anime font-bold mb-4">
              <span className="text-zenith-white">Welcome to</span>
              <br />
              <span className="text-zenith-orange">Zenith Saga Store</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-xl mx-auto lg:mx-0">
              Discover unique anime, series, music, and sports merchandise. 
              From collectible cards to stunning posters, express your passion with our premium products.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="/products" className="btn-primary">
                Explore Products
              </Link>
              <Link href="/categories" className="btn-secondary">
                Browse Categories
              </Link>
            </div>
            <p className="text-gray-400 text-sm mt-4 lg:mt-6">
              <span className="text-zenith-orange">Tip:</span> Click on the carousel to pause rotation. Click on a card to focus on it.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative h-[400px] md:h-[450px] lg:h-[500px] flex items-center justify-center"
          >
            {/* 3D Carousel */}
            <div className="w-full h-full lg:w-[120%] lg:-mr-[20%]">
              <Canvas dpr={[1, 2]} className="touch-none">
                <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={50} />
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} />
                <Scene />
                <OrbitControls 
                  enableZoom={false}
                  enablePan={false}
                  rotateSpeed={0.5}
                  minPolarAngle={Math.PI / 2 - 0.5}
                  maxPolarAngle={Math.PI / 2 + 0.5}
                />
              </Canvas>
            </div>
            
            {/* Decorative elements */}
            <motion.div 
              className="absolute top-10 right-10 w-16 h-16 bg-zenith-orange/30 rounded-lg"
              animate={{ 
                y: [0, -15, 0],
                rotate: [0, 5, 0]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              
            />
            
            <motion.div 
              className="absolute bottom-20 left-10 w-12 h-12 bg-zenith-white/20 rounded-full"
              animate={{ 
                y: [0, 20, 0],
                x: [0, 10, 0]
              }}
              transition={{ 
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>
        </div>
        
        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.5, 
            delay: 1.2,
            repeat: Infinity,
            repeatType: "reverse",
            repeatDelay: 0.5
          }}
        >
          <div className="flex flex-col items-center">
            <span className="text-zenith-white/70 text-sm mb-2">Scroll Down</span>
            <svg className="w-6 h-6 text-zenith-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection; 
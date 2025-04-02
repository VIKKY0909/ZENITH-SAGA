'use client';

import { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, useGLTF, Html, PresentationControls } from '@react-three/drei';
import { motion } from 'framer-motion';

interface ModelViewerProps {
  modelPath?: string;
  scale?: number;
  position?: [number, number, number];
  rotation?: [number, number, number];
  autoRotate?: boolean;
}

// Fallback model when no specific model is provided or when there's an error
const DEFAULT_MODEL = 'https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/low-poly-spaceship/model.gltf';

// Loading component shown while the 3D model loads
const Loader = () => {
  return (
    <Html center>
      <div className="flex flex-col items-center justify-center">
        <div className="w-12 h-12 border-4 border-zenith-orange border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-zenith-white text-sm">Loading 3D Model...</p>
      </div>
    </Html>
  );
};

// Error component shown when model fails to load
const ErrorDisplay = () => {
  return (
    <Html center>
      <div className="flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mb-4">
          <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <p className="text-zenith-white text-sm mb-2">Failed to load 3D model</p>
        <p className="text-zenith-white/60 text-xs">Using fallback model instead</p>
      </div>
    </Html>
  );
};

// Fallback model component
const FallbackModel = ({ scale = 1, position = [0, 0, 0], rotation = [0, 0, 0], autoRotate = true }: ModelViewerProps) => {
  const groupRef = useRef<THREE.Group>(null);
  
  // Load the fallback model
  const { scene } = useGLTF(DEFAULT_MODEL);
  
  // Animate the model rotation
  useFrame(() => {
    if (groupRef.current && autoRotate) {
      groupRef.current.rotation.y += 0.005;
    }
  });
  
  return (
    <group ref={groupRef} position={position} rotation={rotation} scale={[scale, scale, scale]}>
      <primitive object={scene} />
      <ErrorDisplay />
    </group>
  );
};

// The actual 3D model component
const Model = ({ modelPath = DEFAULT_MODEL, scale = 1, position = [0, 0, 0], rotation = [0, 0, 0], autoRotate = true }: ModelViewerProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const [hasError, setHasError] = useState(false);
  
  // Use a safer approach with useEffect and state
  useEffect(() => {
    // Reset error state when model path changes
    setHasError(false);
  }, [modelPath]);
  
  // Handle errors with a custom error boundary approach
  if (hasError) {
    return <FallbackModel scale={scale} position={position} rotation={rotation} autoRotate={autoRotate} />;
  }
  
  try {
    // Attempt to load the model
    const { scene } = useGLTF(modelPath);
    
    // Animate the model rotation
    useFrame(() => {
      if (groupRef.current && autoRotate) {
        groupRef.current.rotation.y += 0.005;
      }
    });
    
    return (
      <group ref={groupRef} position={position} rotation={rotation} scale={[scale, scale, scale]}>
        <primitive object={scene} />
      </group>
    );
  } catch (error) {
    console.error(`Error loading model: ${modelPath}`, error);
    setHasError(true);
    return <FallbackModel scale={scale} position={position} rotation={rotation} autoRotate={autoRotate} />;
  }
};

// Main ModelViewer component
const ModelViewer = ({ modelPath, scale = 2.5, position = [0, 0, 0], rotation = [0, 0, 0], autoRotate = true }: ModelViewerProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div 
      className="w-full h-full rounded-lg overflow-hidden"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Canvas 
        shadows 
        dpr={[1, 2]} 
        camera={{ position: [0, 0, 5], fov: 50 }}
        className="bg-zenith-gray/30 backdrop-blur-sm"
      >
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        
        <Suspense fallback={<Loader />}>
          <PresentationControls
            global
            rotation={[0, 0, 0]}
            polar={[-Math.PI / 4, Math.PI / 4]}
            azimuth={[-Math.PI / 4, Math.PI / 4]}
            config={{ mass: 2, tension: 500 }}
            snap={{ mass: 4, tension: 1500 }}
          >
            <Model 
              modelPath={modelPath} 
              scale={scale} 
              position={position} 
              rotation={rotation} 
              autoRotate={autoRotate && !isHovered} 
            />
          </PresentationControls>
          <Environment preset="city" />
        </Suspense>
        
        <OrbitControls 
          enablePan={false} 
          enableZoom={true} 
          minPolarAngle={Math.PI / 6} 
          maxPolarAngle={Math.PI - Math.PI / 6} 
        />
      </Canvas>
      
      {/* Overlay with instructions */}
      <div className="absolute bottom-2 left-2 right-2 text-center text-xs text-zenith-white/70 bg-zenith-black/50 backdrop-blur-sm py-1 px-2 rounded-md">
        Drag to rotate • Scroll to zoom
      </div>
    </motion.div>
  );
};

export default ModelViewer; 
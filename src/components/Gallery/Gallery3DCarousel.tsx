import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Environment, Image as DreiImage, Preload } from '@react-three/drei';
import * as THREE from 'three';
import { galleryImages, type GalleryImage } from './gallery-images';

interface ImageCardProps {
  image: GalleryImage;
  index: number;
  totalImages: number;
  selectedIndex: number;
  onSelect: (index: number) => void;
}

function ImageCard({ image, index, totalImages, selectedIndex, onSelect }: ImageCardProps) {
  const ref = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  
  const radius = 7;
  const angle = (index / totalImages) * Math.PI * 2;
  const x = Math.sin(angle) * radius;
  const z = Math.cos(angle) * radius;
  
  const isSelected = selectedIndex === index;
  
  useFrame((state, delta) => {
    if (ref.current) {
      const targetScale = isSelected ? 1.3 : hovered ? 1.1 : 1;
      ref.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
      
      const targetY = isSelected ? 0.5 : 0;
      ref.current.position.y = THREE.MathUtils.lerp(ref.current.position.y, targetY, 0.1);
    }
  });
  
  return (
    <group
      ref={ref}
      position={[x, 0, z]}
      rotation={[0, -angle, 0]}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(index);
      }}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <DreiImage
        url={image.src}
        scale={[4, 2.5]}
        radius={0.1}
      />
      {isSelected && (
        <mesh position={[0, -1.4, 0]}>
          <planeGeometry args={[4, 0.3]} />
          <meshBasicMaterial color="#d6a554" transparent opacity={0.8} />
        </mesh>
      )}
    </group>
  );
}

function GalleryScene({ 
  selectedIndex, 
  onSelect 
}: { 
  selectedIndex: number; 
  onSelect: (index: number) => void;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const { camera } = useThree();
  
  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.03;
    }
    
    camera.position.lerp(new THREE.Vector3(0, 0, 12), 0.02);
    camera.lookAt(0, 0, 0);
  });
  
  return (
    <>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />
      
      <group ref={groupRef}>
        {galleryImages.map((image, index) => (
          <ImageCard
            key={image.id}
            image={image}
            index={index}
            totalImages={galleryImages.length}
            selectedIndex={selectedIndex}
            onSelect={onSelect}
          />
        ))}
      </group>
      
      <Environment preset="city" />
      <Preload all />
    </>
  );
}

interface Gallery3DCarouselProps {
  className?: string;
}

export function Gallery3DCarousel({ className = '' }: Gallery3DCarouselProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  
  const handleSelect = (index: number) => {
    setSelectedIndex(index);
  };
  
  return (
    <div className={`relative w-full h-[70vh] min-h-[500px] ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 12], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <color attach="background" args={['#0b1222']} />
        <fog attach="fog" args={['#0b1222', 10, 25]} />
        <GalleryScene selectedIndex={selectedIndex} onSelect={handleSelect} />
        <OrbitControls 
          enableZoom={true}
          enablePan={false}
          minDistance={8}
          maxDistance={20}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 1.5}
        />
      </Canvas>
      
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex items-center gap-3">
        {galleryImages.map((image, index) => (
          <button
            key={image.id}
            onClick={() => setSelectedIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === selectedIndex
                ? 'bg-[#d6a554] scale-125'
                : 'bg-white/30 hover:bg-white/60'
            }`}
            aria-label={`View image ${index + 1}`}
          />
        ))}
      </div>
      
      <div className="absolute top-6 left-1/2 -translate-x-1/2 z-10 text-center pointer-events-none">
        <h3 className="text-white text-lg font-bold font-headline tracking-wide">
          {galleryImages[selectedIndex].title}
        </h3>
        <p className="text-white/60 text-sm font-body max-w-md mt-1">
          {galleryImages[selectedIndex].description}
        </p>
      </div>
      
      <div className="absolute top-1/2 left-4 -translate-y-1/2 z-10">
        <button
          onClick={() => setSelectedIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)}
          className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-[#d6a554] hover:border-[#d6a554] hover:text-black transition-all duration-300"
          aria-label="Previous image"
        >
          <span className="material-symbols-outlined">chevron_left</span>
        </button>
      </div>
      
      <div className="absolute top-1/2 right-4 -translate-y-1/2 z-10">
        <button
          onClick={() => setSelectedIndex((prev) => (prev + 1) % galleryImages.length)}
          className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-[#d6a554] hover:border-[#d6a554] hover:text-black transition-all duration-300"
          aria-label="Next image"
        >
          <span className="material-symbols-outlined">chevron_right</span>
        </button>
      </div>
    </div>
  );
}

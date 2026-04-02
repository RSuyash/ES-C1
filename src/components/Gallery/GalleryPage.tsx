import React, { useRef, useState } from 'react';
import { motion, useInView } from 'motion/react';
import { SymbolIcon } from '../SymbolIcon';
import { galleryImages } from './gallery-images';

interface GalleryPageProps {
  onNavigateHome: () => void;
  onOpenWizard: () => void;
}

function GalleryImageCard({ 
  image, 
  index 
}: { 
  image: typeof galleryImages[0]; 
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const isInView = useInView(cardRef, { once: true, margin: '-60px' });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setMousePos({ x, y });
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative overflow-hidden rounded-[1.25rem] border border-white/[0.06] bg-[#080d15]/90 backdrop-blur-xl"
    >
      {/* Image Container */}
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={image.src}
          alt={image.alt}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0b1222] via-[#0b1222]/40 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500"></div>

      {/* Hover Glow Effect */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: isHovered
            ? `radial-gradient(400px circle at ${mousePos.x * 100}% ${mousePos.y * 100}%, rgba(214,165,84,0.15), transparent 50%)`
            : 'transparent',
        }}
      />

      {/* Content Overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex items-center gap-3 mb-3">
            <span className="font-mono text-[#d6a554] font-bold tracking-widest text-xs">
              {String(image.id).padStart(2, '0')}
            </span>
            <div className="h-[1px] w-8 bg-[#d6a554]"></div>
          </div>
          <h3 className="font-headline text-xl lg:text-2xl font-bold text-white mb-2">
            {image.title}
          </h3>
          <p className="font-body text-sm lg:text-base text-white/70 leading-relaxed">
            {image.description}
          </p>
        </motion.div>
      </div>

      {/* Top Accent Border */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#d6a554]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    </motion.div>
  );
}

export function GalleryPage({ onNavigateHome, onOpenWizard }: GalleryPageProps) {
  return (
    <div className="bg-[var(--color-black-200)] font-body text-white antialiased min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 px-6 md:px-12 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[var(--color-sandybrown-100)]/10 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[var(--color-darkslategray)]/20 rounded-full blur-[100px]"></div>
        </div>
        
        {/* Header */}
        <div className="relative z-10 max-w-[1400px] mx-auto text-center mb-16 lg:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1 className="font-headline text-[36px] sm:text-[42px] lg:text-[56px] font-extrabold text-white tracking-tight mb-6 leading-[1.1]">
              Explore <span className="text-[var(--color-sandybrown-100)]">Wagholi Highstreet</span>
            </h1>
            <div className="w-24 h-1 bg-[var(--color-sandybrown-100)] mx-auto mb-8"></div>
            <p className="font-body text-[16px] lg:text-[18px] text-white/70 leading-relaxed max-w-3xl mx-auto">
              Experience the future of commercial real estate through our curated gallery. 
              Discover premium infrastructure, strategic location advantages, and world-class amenities.
            </p>
          </motion.div>
        </div>
      </section>
      
      {/* Image Grid Section */}
      <section className="py-12 lg:py-20 px-6 md:px-12 bg-[var(--color-black-200)] border-t border-white/5">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {galleryImages.map((image, index) => (
              <React.Fragment key={image.id}>
                <GalleryImageCard image={image} index={index} />
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="relative py-20 lg:py-32 px-6 md:px-12 bg-gradient-to-b from-[var(--color-black-200)] to-[#000000] border-t border-white/5 overflow-hidden">
        {/* Background Glow */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--color-sandybrown-100)]/5 rounded-full blur-[150px]"></div>
        </div>
        
        <div className="max-w-[1000px] mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="font-headline text-[32px] sm:text-[42px] lg:text-[56px] font-extrabold text-white tracking-tight mb-6">
              Ready to Experience <span className="text-[var(--color-sandybrown-100)]">In Person?</span>
            </h2>
            <p className="font-body text-[16px] lg:text-[18px] text-white/70 leading-relaxed max-w-2xl mx-auto mb-10">
              Schedule a site visit and witness the architectural excellence of Wagholi Highstreet firsthand.
            </p>
            <button
              onClick={onOpenWizard}
              className="group inline-flex items-center gap-3 bg-[var(--color-sandybrown-100)] text-black font-bold uppercase tracking-[0.08em] py-4 px-10 rounded-full hover:bg-[#e5b565] hover:shadow-[0_0_30px_rgba(214,165,84,0.4)] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] text-[13px] sm:text-[14px]"
            >
              Schedule Site Visit
              <SymbolIcon
                name="arrow_forward"
                className="h-5 w-5 font-normal transition-transform group-hover:translate-x-1"
              />
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

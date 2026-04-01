import React from 'react';
import { Gallery3DCarousel } from './Gallery3DCarousel';
import { galleryImages } from './gallery-images';

interface GalleryPageProps {
  onNavigateHome: () => void;
  onOpenWizard: () => void;
}

export function GalleryPage({ onNavigateHome, onOpenWizard }: GalleryPageProps) {
  return (
    <div className="bg-[#0b1222] min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 px-6 md:px-12 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#d6a554]/10 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#1c5481]/20 rounded-full blur-[100px]"></div>
        </div>
        
        {/* Header */}
        <div className="relative z-10 max-w-[1400px] mx-auto text-center mb-16">
          <h1 className="font-headline text-[36px] sm:text-[48px] lg:text-[64px] font-extrabold text-white tracking-tight mb-4">
            Explore <span className="text-[#d6a554]">Wagholi Highstreet</span>
          </h1>
          <div className="w-32 h-1 bg-[#d6a554] mx-auto mb-8"></div>
          <p className="font-body text-[16px] lg:text-[20px] text-white/70 leading-relaxed max-w-3xl mx-auto">
            Experience the future of commercial real estate through our immersive gallery. 
            Discover premium infrastructure, strategic location advantages, and world-class amenities.
          </p>
        </div>
        
        {/* 3D Carousel */}
        <div className="relative z-10 max-w-[1400px] mx-auto">
          <Gallery3DCarousel />
        </div>
      </section>
      
      {/* Image Grid Section */}
      <section className="py-20 lg:py-32 px-6 md:px-12 bg-[#0b1222] border-t border-white/5">
        <div className="max-w-[1400px] mx-auto">
          <h2 className="font-headline text-[28px] sm:text-[36px] lg:text-[48px] font-extrabold text-white tracking-tight mb-4 text-center">
            Visual <span className="text-[#d6a554]">Journey</span>
          </h2>
          <p className="text-white/70 max-w-xl mx-auto text-[15px] lg:text-[18px] text-center mb-16">
            A curated collection of Wagholi Highstreet's finest moments
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {galleryImages.map((image) => (
              <div
                key={image.id}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b1222] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="font-headline text-xl font-bold text-white mb-2">
                      {image.title}
                    </h3>
                    <p className="font-body text-sm text-white/70">
                      {image.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 lg:py-32 px-6 md:px-12 bg-gradient-to-b from-[#0b1222] to-[#000000] border-t border-white/5">
        <div className="max-w-[1000px] mx-auto text-center">
          <h2 className="font-headline text-[32px] sm:text-[42px] lg:text-[56px] font-extrabold text-white tracking-tight mb-6">
            Ready to Experience <span className="text-[#d6a554]">In Person?</span>
          </h2>
          <p className="font-body text-[16px] lg:text-[18px] text-white/70 leading-relaxed max-w-2xl mx-auto mb-10">
            Schedule a site visit and witness the architectural excellence of Wagholi Highstreet firsthand.
          </p>
          <button
            onClick={onOpenWizard}
            className="inline-flex items-center gap-3 bg-[#d6a554] text-black font-bold uppercase tracking-[0.05em] py-4 px-10 rounded-full hover:bg-[#e5b869] transition-all duration-300 shadow-[0_4px_20px_rgba(229,184,105,0.3)] text-[15px]"
          >
            Schedule Site Visit
            <span className="material-symbols-outlined">arrow_forward</span>
          </button>
        </div>
      </section>
    </div>
  );
}

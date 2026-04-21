/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React, { useState, Suspense, useEffect } from 'react';
import { motion } from 'motion/react';
import { LeadCaptureForm } from './LeadCaptureForm';
import { DeferredSection } from './components/DeferredSection';
import { EarlyBirdBenefit } from './components/EarlyBirdBenefit';
import Footer from './components/Footer';
import { GsGroupLogo } from './components/GsGroupLogo';
import { HeroBrandMomentumStrip } from './components/HeroBrandMomentumStrip';
import { SiteLogo } from './components/SiteLogo';
import { SymbolIcon } from './components/SymbolIcon';
import ThankYouPage from './components/ThankYouPage';
import HeroBackgroundCarousel from './components/HeroBackgroundCarousel';
import { GalleryPage } from './components/Gallery/GalleryPage';
import { readLandingPath } from './lib/landing-navigation';

// Lazy load below-the-fold components for extreme Lighthouse TTFB/FCP speed
const InteractiveAmenities = React.lazy(() => import('./components/InteractiveAmenities'));
const LocationSection = React.lazy(() => import('./components/LocationSection'));
const PricingSection = React.lazy(() => import('./components/PricingSection'));
const WhyActNow = React.lazy(() => import('./components/WhyActNow'));
const LeadWizardModal = React.lazy(() => import('./components/LeadWizardModal'));
const WhyBusinessesSection = React.lazy(() => import('./components/WhyBusinessesSection'));
const FAQSection = React.lazy(() => import('./components/FAQSection'));

export default function App({ initialPath }: { initialPath?: string }) {
  const [currentPage, setCurrentPage] = useState<'home' | 'gallery'>('home');
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [hasAutoTriggered, setHasAutoTriggered] = useState(false);
  const [resolvedPath, setResolvedPath] = useState(() => readLandingPath(initialPath));

  const scrollToLeadForm = () => {
    document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const navigateToGallery = () => {
    setCurrentPage('gallery');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToHome = () => {
    setCurrentPage('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openWizard = () => setIsWizardOpen(true);
  const closeWizard = () => setIsWizardOpen(false);

  useEffect(() => {
    if (initialPath || typeof window === 'undefined') return;

    const syncRouteState = () => {
      setResolvedPath(readLandingPath());
      setIsWizardOpen(false);
    };

    window.addEventListener('popstate', syncRouteState);
    window.addEventListener('pageshow', syncRouteState);

    return () => {
      window.removeEventListener('popstate', syncRouteState);
      window.removeEventListener('pageshow', syncRouteState);
    };
  }, [initialPath]);

  // Auto-trigger wizard at 30-35% scroll (only on home page)
  useEffect(() => {
    if (resolvedPath === '/thank-you') return;
    if (currentPage !== 'home') return;
    
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = scrollTop / docHeight;

      // Trigger at 30% scroll, only once per session
      if (scrollPercent >= 0.30 && !hasAutoTriggered) {
        setIsWizardOpen(true);
        setHasAutoTriggered(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentPage, hasAutoTriggered, resolvedPath]);

  if (resolvedPath === '/thank-you') {
    return <ThankYouPage />;
  }

  // Render Gallery Page
  if (currentPage === 'gallery') {
    return (
      <div className="bg-[#0b1222] font-body text-white antialiased min-h-screen">
        {/* Top Navigation Bar - Gallery Page */}
        <nav className="fixed top-0 w-full z-50 bg-[#0b1222]/90 backdrop-blur-md border-b border-white/10">
          <div className="flex justify-between items-center w-full px-6 md:px-12 max-w-[1400px] mx-auto py-4">
            <div
              className="flex items-center gap-4 md:gap-6 cursor-pointer"
              onClick={navigateToHome}
            >
              <GsGroupLogo className="w-[68px] sm:w-[76px] md:w-[82px] lg:w-[78px]" />
              <div className="hidden h-6 w-px bg-white/15 xs:block" />
              <SiteLogo
                loading="eager"
                fetchPriority="high"
                imageClassName="w-[132px] sm:w-[148px] md:w-[188px] lg:w-[176px]"
              />
            </div>
            <div className="flex items-center gap-4">
              <button 
                onClick={navigateToHome} 
                className="text-white text-[14px] font-body tracking-wide hover:text-[var(--color-sandybrown-100)] transition-colors"
              >
                Home
              </button>
              <button
                type="button"
                onClick={openWizard}
                className="flex items-center gap-2 bg-[var(--color-sandybrown-100)] text-black font-bold uppercase tracking-[0.08em] px-5 py-2.5 rounded-full text-[11px] hover:bg-[#e5b565] hover:shadow-[0_0_25px_rgba(214,165,84,0.4)] transition-all duration-300"
              >
                <SymbolIcon name="calendar_today" className="h-4 w-4" />
                Schedule Visit
              </button>
            </div>
          </div>
        </nav>
        
        <div className="pt-20">
          <GalleryPage onNavigateHome={navigateToHome} onOpenWizard={openWizard} />
        </div>
        
        {/* Footer */}
        <Footer />
      </div>
    );
  }

  // Render Home Page
  return (
    <div className="bg-[var(--color-black-200)] font-body text-white antialiased">
      {isWizardOpen ? (
        <Suspense fallback={null}>
          <LeadWizardModal isOpen={isWizardOpen} onClose={closeWizard} />
        </Suspense>
      ) : null}

      {/* Top Navigation Bar */}
      <nav className="absolute top-0 w-full z-50 bg-transparent pt-6 pb-6 lg:pt-8 bg-gradient-to-b from-black/80 to-transparent">
        <div className="flex justify-between items-center w-full px-6 md:px-12 max-w-[1400px] mx-auto">
          <div className="flex items-center gap-4 md:gap-6">
            <GsGroupLogo className="w-[68px] sm:w-[78px] md:w-[88px] lg:w-[82px]" />
            <div className="hidden h-6 w-px bg-white/15 xs:block" />
            <SiteLogo
              loading="eager"
              fetchPriority="high"
              imageClassName="w-[134px] sm:w-[152px] md:w-[196px] lg:w-[212px]"
            />
          </div>
          <div className="flex items-center gap-4">
            {/* Desktop Nav Links - Right Aligned */}
            <div className="hidden lg:flex items-center gap-8 text-white text-[14px] font-body tracking-wide">
              <button onClick={() => scrollToSection('overview')} className="hover:text-[var(--color-sandybrown-100)] transition-colors drop-shadow-md">Overview</button>
              <button onClick={navigateToGallery} className="hover:text-[var(--color-sandybrown-100)] transition-colors drop-shadow-md">Gallery</button>
              <button onClick={() => scrollToSection('amenities')} className="hover:text-[var(--color-sandybrown-100)] transition-colors drop-shadow-md">Amenities</button>
              <button onClick={() => scrollToSection('pricing')} className="hover:text-[var(--color-sandybrown-100)] transition-colors drop-shadow-md">Pricing</button>
              <button onClick={() => scrollToSection('location')} className="hover:text-[var(--color-sandybrown-100)] transition-colors drop-shadow-md">Location</button>
            </div>
            {/* Desktop CTA - Yellow Button */}
            <button
              type="button"
              onClick={openWizard}
              className="hidden lg:flex items-center gap-2 bg-[var(--color-sandybrown-100)] text-black font-bold uppercase tracking-[0.08em] px-5 py-2.5 rounded-full text-[11px] hover:bg-[#e5b565] hover:shadow-[0_0_25px_rgba(214,165,84,0.4)] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            >
              <SymbolIcon name="calendar_today" className="h-4 w-4" />
              Schedule a Site Visit
            </button>
            {/* Tablet CTA - Yellow Button (no icon) */}
            <button
              type="button"
              onClick={openWizard}
              className="hidden md:flex lg:hidden items-center gap-2 bg-[var(--color-sandybrown-100)] text-black font-bold uppercase tracking-[0.08em] px-4 py-2 rounded-full text-[9px] hover:bg-[#e5b565] hover:shadow-[0_0_20px_rgba(214,165,84,0.4)] transition-all duration-300"
            >
              Site Visit
            </button>
            {/* Mobile CTA - Compact */}
            <button
              type="button"
              onClick={openWizard}
              className="lg:hidden border border-[var(--color-sandybrown-100)] text-[var(--color-sandybrown-100)] bg-[var(--color-sandybrown-100)]/10 px-4 py-2 rounded-full text-[9px] uppercase tracking-widest font-bold backdrop-blur-md shadow-[0_0_10px_rgba(214,165,84,0.1)]"
            >
              Visit
            </button>
          </div>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section className="relative min-h-[100dvh] w-full flex flex-col justify-center overflow-hidden bg-[var(--color-black-200)] pt-28 lg:pt-32 pb-12 lg:pb-16">
          {/* Background Carousel & Gradients */}
          <div className="absolute inset-0 z-0 origin-top">
            {/* Hero Background Carousel */}
            <HeroBackgroundCarousel />
            {/* Dark gradient from left for text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-black-200)] via-[var(--color-black-200)]/60 to-transparent md:to-[var(--color-black-200)]/30"></div>
            {/* Bottom gradient to blend with next section */}
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-black-200)] via-[var(--color-black-200)]/40 lg:via-transparent to-transparent"></div>
          </div>

          <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8 mt-8 lg:mt-0">

            {/* Left Column: Text Content */}
            <div className="w-full lg:w-[55%] flex flex-col items-center lg:items-start text-center lg:text-left">
              {/* Mobile Badge */}
              <div className="lg:hidden border border-white/10 bg-white/5 backdrop-blur-md rounded-full px-4 py-1.5 text-[9px] font-bold tracking-[0.2em] uppercase text-white/70 mb-5">
                Premium Commercial Destination
              </div>

              <h1 className="font-headline text-[26px] sm:text-[32px] lg:text-[54px] font-extrabold text-white leading-[1.3] lg:leading-[1.15] tracking-tight mb-4 lg:mb-6">
                Give Your Business a <br className="hidden lg:block" />
                <span className="text-[var(--color-sandybrown-100)]" style={{ textShadow: '0px 4px 15px rgba(214, 165, 84, 0.4)' }}>
                  Future-Ready
                </span> Address on <br className="hidden lg:block" />
                Wagholi Link Road, <br className="hidden lg:block" />
                Wagholi with <span className="text-[var(--color-sandybrown-100)] italic">45,000+ <br className="hidden lg:block" />
                Expected Footfall.</span>
              </h1>
              <p className="font-body text-[13px] sm:text-[15px] lg:text-[17px] text-white/80 leading-relaxed max-w-2xl mb-2 lg:mb-0 px-2 lg:px-0">
                Premium 5.5-acre commercial destination with shops, showrooms, and offices, offering high ROI potential in Pune's fastest-growing corridor.
              </p>
            </div>

            {/* Right Column: Glass Card (Desktop) / Stacked (Mobile) */}
            <div className="w-full lg:w-[45%] max-w-[550px]">
              <div className="bg-white/[0.02] backdrop-blur-[40px] border border-white/[0.08] shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] rounded-[2.5rem] p-8 lg:p-10 flex flex-col items-center text-center relative overflow-hidden">
                {/* Subtle top glare effect for apple premium feel */}
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

                {/* Pricing */}
                <h2 className="font-headline text-[18px] sm:text-[22px] lg:text-[32px] font-bold text-white mb-5 leading-tight tracking-tight">
                  Shops from ₹60 Lakhs <span className="text-white/30 mx-1">|</span> <br className="block lg:hidden" />
                  Showrooms from ₹1.10 Cr.
                </h2>

                {/* Divider 1 */}
                <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent mb-5"></div>

                {/* Early Bird */}
                {/* Change variant: 'original' | 'motion' | 'gsap' | 'spline' | 'particles' */}
                <EarlyBirdBenefit variant="gsap" />

                {/* Divider 2 */}
                <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent mb-6"></div>

                {/* Trust Box */}
                <div className="w-full bg-black/20 border border-white/5 rounded-2xl p-4 md:p-5 mb-8 shadow-inner">
                  {/* Two column layout: Brands on left, Stats on right */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">

                    {/* Left: Trusted By Label + Brand Logos */}
                    <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full sm:w-auto">
                      {/* Trusted By Label */}
                      <div className="flex flex-col items-center sm:items-start text-center sm:text-left shrink-0">
                        <span className="text-white/50 text-[7px] uppercase tracking-[0.15em] font-medium">Trusted</span>
                        <span className="text-white/70 text-[9px] font-bold tracking-wide">By Brands</span>
                      </div>

                      {/* Brand Logos - Horizontal row with space for CinePro */}
                      <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                        {/* McDonald's Official Logo */}
                        <div className="group relative shrink-0">
                          <div className="bg-white backdrop-blur-md w-10 h-8 sm:w-11 sm:h-9 rounded-[8px] flex items-center justify-center px-1.5 shadow-lg border border-white/30 transition-transform duration-300 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(255,255,255,0.25)]">
                            <img
                              src="https://upload.wikimedia.org/wikipedia/commons/3/36/McDonald%27s_Golden_Arches.svg"
                              alt="McDonald's official logo"
                              className="h-full w-auto object-contain"
                              loading="lazy"
                            />
                          </div>
                        </div>
                        {/* Barbeque Nation Wordmark */}
                        <div className="group relative shrink-0">
                          <div className="bg-[#2b120c] backdrop-blur-md h-8 sm:h-9 rounded-[8px] flex items-center justify-center px-3 shadow-lg border border-[#f59e0b]/20 transition-transform duration-300 group-hover:scale-105 group-hover:shadow-[0_0_18px_rgba(245,158,11,0.18)]">
                            <span className="font-black text-[9px] sm:text-[10px] tracking-[0.18em] uppercase text-[#f5a623] whitespace-nowrap">
                              Barbeque Nation
                            </span>
                          </div>
                        </div>
                        {/* CinePro Logo - Horizontal film strip design */}
                        <div className="group relative shrink-0">
                          <div className="bg-white/90 backdrop-blur-md h-[24px] sm:h-[26px] rounded-[6px] flex items-center justify-center px-1.5 shadow-lg border border-white/30 transition-transform duration-300 group-hover:scale-105 group-hover:shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                            <img
                              src="/cine-pro-brand-logo-transparent.png"
                              alt="CinePro"
                              className="h-full w-auto object-contain"
                              loading="lazy"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Divider - Horizontal on mobile, vertical on desktop */}
                    <div className="w-full sm:w-[1px] h-[1px] sm:h-10 bg-gradient-to-r sm:bg-gradient-to-b from-transparent via-white/20 to-transparent"></div>

                    {/* Right: Stats */}
                    <div className="flex items-center justify-center gap-4 sm:gap-6 w-full sm:w-auto">
                      {/* Bookings Stat */}
                      <div className="flex items-center gap-2">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-[var(--color-sandybrown-100)] shrink-0">
                          <path d="M12 2L14.5 4.5L18 4.5L18.5 8L21.5 10L20 13L21.5 16L18.5 18L18 21.5L14.5 21.5L12 24L9.5 21.5L6 21.5L5.5 18L2.5 16L4 13L2.5 10L5.5 8L6 4.5L9.5 4.5L12 2Z" fill="currentColor" />
                          <path d="M10 15.5L6.5 12L7.9 10.6L10 12.7L16.1 6.6L17.5 8L10 15.5Z" fill="var(--color-black-400)" />
                        </svg>
                          <div className="text-left">
                            <span className="text-white/80 text-[13px] sm:text-[14px] font-bold leading-tight">300+</span>
                            <span className="text-white/60 text-[9px] sm:text-[10px] font-medium block">bookings</span>
                          </div>
                        </div>

                      {/* Vertical Divider */}
                      <div className="hidden sm:block h-10 w-[1px] bg-gradient-to-b from-transparent via-white/20 to-transparent"></div>

                      {/* Possession Stat */}
                      <div className="text-left">
                        <span className="text-white/60 text-[9px] sm:text-[10px] font-medium block leading-tight">Possession in</span>
                        <span className="text-white/90 font-bold text-[13px] sm:text-[14px] block leading-tight">December 2026</span>
                      </div>
                    </div>

                  </div>
                </div>

                <HeroBrandMomentumStrip />

                {/* CTA Premium Yellow Button */}
                <button
                  type="button"
                  onClick={openWizard}
                  className="relative group overflow-hidden bg-[var(--color-sandybrown-100)] text-black font-bold uppercase tracking-[0.1em] py-4 w-full rounded-full flex items-center justify-center gap-3 transition-all duration-300 hover:bg-[#e5b565] hover:shadow-[0_0_30px_rgba(214,165,84,0.4)] hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span className="relative z-10 flex items-center gap-2 text-[13px] sm:text-[14px]">
                    SCHEDULE A SITE VISIT
                    <SymbolIcon
                      name="arrow_forward"
                      className="h-5 w-5 font-normal transition-transform group-hover:translate-x-1"
                    />
                  </span>
                </button>

              </div>
            </div>

          </div>
        </section>

        <DeferredSection id="overview" minHeight={900} initiallyVisible>
          <Suspense fallback={<div className="min-h-[50vh] bg-[#020408]" />}>
            <WhyBusinessesSection onOpenWizard={openWizard} />
          </Suspense>
        </DeferredSection>
        <DeferredSection id="amenities" minHeight={780}>
          <Suspense fallback={<div className="min-h-[60vh] bg-[#0b1222]" />}>
            <InteractiveAmenities />
          </Suspense>
        </DeferredSection>
        <DeferredSection id="location" minHeight={1800}>
          <Suspense fallback={<div className="min-h-[100vh] bg-[#020408]" />}>
            <LocationSection />
          </Suspense>
        </DeferredSection>
        <DeferredSection id="pricing" minHeight={760}>
          <Suspense fallback={<div className="min-h-[55vh] bg-[#020408]" />}>
            <PricingSection onOpenWizard={openWizard} />
          </Suspense>
        </DeferredSection>
        <DeferredSection id="act-now" minHeight={980}>
          <Suspense fallback={<div className="min-h-[70vh] bg-[#020408]" />}>
            <WhyActNow onOpenWizard={openWizard} />
          </Suspense>
        </DeferredSection>
        <DeferredSection id="faqs" minHeight={920}>
          <Suspense fallback={<div className="min-h-[55vh] bg-[#020408]" />}>
            <FAQSection />
          </Suspense>
        </DeferredSection>

        {/* Final CTA: Bottom Lead Form */}
        <section id="lead-form" className="relative py-32 lg:py-40 bg-[#0b1222] overflow-hidden border-t border-white/5">
          <div className="absolute inset-0 z-0">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#d6a554]/5 rounded-full blur-[150px]"></div>
          </div>
          <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10 text-center">
            <h2 className="font-headline text-[36px] sm:text-[48px] lg:text-[64px] font-extrabold text-white mb-6 lg:mb-8 tracking-tight italic">Secure Your <span className="text-[#d6a554]">Future.</span></h2>
            <p className="text-white/70 font-body text-[16px] lg:text-[20px] mb-10 lg:mb-12 max-w-2xl mx-auto leading-relaxed">
              Limited inventory remaining. Join the roster of forward-thinking businesses and investors at Wagholi Highstreet.
            </p>
            <LeadCaptureForm className="mx-auto max-w-2xl" />
          </div>
        </section>
      </main>

      {/* Footer with Legal Modals */}
      <Footer />
    </div>
  );
}

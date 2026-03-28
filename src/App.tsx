/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React, { useState, Suspense } from 'react';
import { motion } from 'motion/react';
import { LeadCaptureForm } from './LeadCaptureForm';

// Lazy load below-the-fold components for extreme Lighthouse TTFB/FCP speed
const InteractiveAmenities = React.lazy(() => import('./components/InteractiveAmenities'));
const LocationSection = React.lazy(() => import('./components/LocationSection'));
const PricingSection = React.lazy(() => import('./components/PricingSection'));
const WhyActNow = React.lazy(() => import('./components/WhyActNow'));
const LeadWizardModal = React.lazy(() => import('./components/LeadWizardModal'));
const WhyBusinessesSection = React.lazy(() => import('./components/WhyBusinessesSection'));
const FAQSection = React.lazy(() => import('./components/FAQSection'));

export default function App() {
  const [isWizardOpen, setIsWizardOpen] = useState(false);

  const scrollToLeadForm = () => {
    document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const openWizard = () => setIsWizardOpen(true);
  const closeWizard = () => setIsWizardOpen(false);

  return (
    <div className="bg-[var(--color-black-200)] font-body text-white antialiased">
      <Suspense fallback={null}>
        <LeadWizardModal isOpen={isWizardOpen} onClose={closeWizard} />
      </Suspense>

      {/* Top Navigation Bar */}
      <nav className="absolute top-0 w-full z-50 bg-transparent pt-6 pb-6 lg:pt-8 bg-gradient-to-b from-black/80 to-transparent">
        <div className="flex justify-between items-center w-full px-6 md:px-12 max-w-[1400px] mx-auto">
          <div className="flex items-center">
            <img
              src="/logo.png"
              alt="Wagholi Highstreet Logo"
              className="h-10 w-auto max-w-[200px] object-contain md:h-14 md:max-w-[300px]"
            />
          </div>
          <div className="hidden md:flex items-center gap-10 text-white text-[15px] font-body tracking-wide">
            <button onClick={() => scrollToSection('overview')} className="hover:text-[var(--color-sandybrown-100)] transition-colors drop-shadow-md">Overview</button>
            <button onClick={() => scrollToSection('amenities')} className="hover:text-[var(--color-sandybrown-100)] transition-colors drop-shadow-md">Amenities</button>
            <button onClick={() => scrollToSection('pricing')} className="hover:text-[var(--color-sandybrown-100)] transition-colors drop-shadow-md">Pricing</button>
            <button onClick={() => scrollToSection('location')} className="hover:text-[var(--color-sandybrown-100)] transition-colors drop-shadow-md">Location</button>
            <button
              type="button"
              onClick={openWizard}
              className="ml-2 border border-[var(--color-sandybrown-100)]/80 text-[var(--color-sandybrown-100)] px-7 py-2.5 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-[var(--color-sandybrown-100)] hover:text-black transition-all shadow-[0_0_15px_rgba(214,165,84,0.15)] backdrop-blur-sm"
            >
              Enquire
            </button>
          </div>
          <button
            type="button"
            onClick={openWizard}
            className="md:hidden border border-[var(--color-sandybrown-100)] text-[var(--color-sandybrown-100)] bg-[var(--color-sandybrown-100)]/10 px-5 py-2 rounded-full text-[11px] uppercase tracking-widest font-bold backdrop-blur-md shadow-[0_0_10px_rgba(214,165,84,0.1)]"
          >
            Enquire
          </button>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section className="relative min-h-[100dvh] w-full flex flex-col justify-center overflow-hidden bg-[var(--color-black-200)] pt-28 lg:pt-32 pb-12 lg:pb-16 px-4 sm:px-6 md:px-12">
          {/* Background Image & Gradients */}
          <div className="absolute inset-0 z-0 origin-top">
            <img
              className="w-full h-full object-cover opacity-60"
              alt="Wagholi Highstreet Cityscape Sunset"
              src="/hero.jpeg"
            />
            {/* Dark gradient from left for text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-black-200)] via-[var(--color-black-200)]/80 to-transparent md:to-[var(--color-black-200)]/40"></div>
            {/* Bottom gradient to blend with next section */}
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-black-200)] via-[var(--color-black-200)]/60 lg:via-transparent to-transparent"></div>
          </div>

          <div className="relative z-10 w-full max-w-[1400px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8 mt-8 lg:mt-0">

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
                Prime Kesnand Road, <br className="hidden lg:block" />
                Wagholi with 45,000+ <br className="hidden lg:block" />
                Expected Footfall.
              </h1>
              <p className="font-body text-[13px] sm:text-[15px] lg:text-[17px] text-white/80 leading-relaxed max-w-2xl mb-2 lg:mb-0 px-2 lg:px-0">
                Premium 5.5-acre commercial destination with shops, showrooms, and offices, offering high ROI potential in Pune's fastest-growing corridor.
              </p>
            </div>

            {/* Right Column: Glass Card (Desktop) / Stacked (Mobile) */}
            <div className="w-full lg:w-[45%] max-w-[550px]">
              <div className="lg:bg-[var(--color-black-400)]/40 lg:backdrop-blur-2xl lg:border lg:border-white/10 lg:rounded-[2rem] lg:p-8 flex flex-col items-center text-center lg:shadow-2xl">

                {/* Pricing */}
                <h2 className="font-headline text-[18px] sm:text-[22px] lg:text-[32px] font-bold text-white mb-4 leading-tight">
                  Shops from ₹60 Lakhs <span className="text-white/50 mx-1">|</span> <br className="block lg:hidden" />
                  Showrooms from ₹1.10 Cr.
                </h2>

                {/* Divider 1 */}
                <div className="hidden lg:block w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent mb-4"></div>

                {/* Early Bird */}
                <div className="flex items-center justify-center gap-1.5 lg:gap-2 mb-4 lg:mb-4">
                  <span className="material-symbols-outlined text-[var(--color-sandybrown-100)] text-sm lg:text-lg transform -rotate-90">local_offer</span>
                  <p className="text-white/90 font-medium text-[12px] sm:text-sm lg:text-[15px]">
                    Early Bird Benefit up to <span className="text-[var(--color-sandybrown-100)] font-bold">₹5 Lakhs</span>
                  </p>
                </div>

                {/* Divider 2 */}
                <div className="hidden lg:block w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent mb-6"></div>

                {/* Trust Box */}
                <div className="w-full bg-[var(--color-black-400)]/60 lg:bg-black/30 border border-white/10 lg:border-white/5 rounded-xl lg:rounded-2xl p-3 sm:p-4 lg:p-4 mb-6 lg:mb-6 flex flex-row items-center justify-between gap-1 sm:gap-2 lg:gap-4 backdrop-blur-md">
                  <div className="flex items-center gap-1 sm:gap-2">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-[var(--color-sandybrown-100)]">
                      <path d="M12 2L14.5 4.5L18 4.5L18.5 8L21.5 10L20 13L21.5 16L18.5 18L18 21.5L14.5 21.5L12 24L9.5 21.5L6 21.5L5.5 18L2.5 16L4 13L2.5 10L5.5 8L6 4.5L9.5 4.5L12 2Z" fill="currentColor" />
                      <path d="M10 15.5L6.5 12L7.9 10.6L10 12.7L16.1 6.6L17.5 8L10 15.5Z" fill="var(--color-black-400)" />
                    </svg>
                    <span className="text-white/90 text-[9px] sm:text-[10px] lg:text-[12px] text-left leading-tight font-medium">250+ bookings<br />already done</span>
                  </div>

                  <div className="flex items-center gap-1.5 sm:gap-3 lg:gap-3">
                    <div className="bg-[#DA291C] w-7 h-7 sm:w-8 sm:h-8 lg:w-10 lg:h-10 rounded-lg flex items-center justify-center shadow-sm">
                      <img src="https://upload.wikimedia.org/wikipedia/commons/3/36/McDonald%27s_Golden_Arches.svg" alt="McDonald's" className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5" />
                    </div>
                    <div className="bg-white w-10 h-7 sm:w-12 sm:h-8 lg:w-12 lg:h-10 rounded-lg flex items-center justify-center px-1 shadow-sm">
                      <span className="text-black font-extrabold text-[7px] sm:text-[8px] lg:text-[10px] tracking-tighter">CinePro</span>
                    </div>
                  </div>

                  <div className="text-white/90 text-[9px] sm:text-[10px] lg:text-[12px] text-left leading-tight font-medium">
                    Possession in<br />just 9 Months
                  </div>
                </div>

                {/* CTA */}
                <button
                  type="button"
                  onClick={openWizard}
                  className="bg-[#d6a554] text-black font-bold uppercase tracking-[0.05em] py-3.5 sm:py-4 lg:py-4 w-full rounded-full flex items-center justify-center gap-2 hover:bg-[var(--color-tan-100)] transition-colors text-[13px] sm:text-[14px] lg:text-[15px] shadow-[0_4px_20px_rgba(229,184,105,0.3)]"
                >
                  SCHEDULE A SITE VISIT
                  <span className="material-symbols-outlined font-bold text-lg lg:text-xl">arrow_forward</span>
                </button>

              </div>
            </div>

          </div>
        </section>

        <Suspense fallback={<div className="min-h-[50vh] flex items-center justify-center bg-[#020408]"><div className="w-8 h-8 rounded-full border-t-2 border-[var(--color-sandybrown-100)] border-white/10 animate-spin"></div></div>}>
          <div id="overview"><WhyBusinessesSection /></div>
          <div id="amenities"><InteractiveAmenities /></div>
          <div id="location"><LocationSection /></div>
          <div id="pricing"><PricingSection onOpenWizard={openWizard} /></div>
          <WhyActNow onOpenWizard={openWizard} />
          <div id="faqs"><FAQSection /></div>
        </Suspense>

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

      {/* Premium Footer */}
      <footer className="w-full relative border-t border-white/5 bg-[#020408] overflow-hidden">
        {/* Subtle top edge glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-[var(--color-sandybrown-100)]/30 to-transparent"></div>
        
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-16 lg:py-20 flex flex-col md:flex-row justify-between items-start gap-12 lg:gap-16">
          <div className="flex flex-col gap-5 items-start max-w-sm">
            <img
              src="/logo.png"
              alt="Wagholi Highstreet Logo"
              className="h-12 lg:h-14 w-auto object-contain opacity-90"
            />
            <p className="text-white/40 text-[13px] lg:text-[14px] font-body leading-relaxed mt-1">
              A premium 5.5-acre commercial destination on prime Kesnand Road. Setting the benchmark for future-ready infrastructure and elite investment returns.
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-12 lg:gap-24 w-full md:w-auto">
            <div className="flex flex-col gap-4">
              <h4 className="text-white font-bold tracking-widest uppercase text-xs mb-1">Quick Links</h4>
              <button onClick={() => scrollToSection('overview')} className="text-left text-white/50 text-sm font-body hover:text-[var(--color-sandybrown-100)] hover:translate-x-1 transition-all">Overview</button>
              <button onClick={() => scrollToSection('amenities')} className="text-left text-white/50 text-sm font-body hover:text-[var(--color-sandybrown-100)] hover:translate-x-1 transition-all">Amenities</button>
              <button onClick={() => scrollToSection('pricing')} className="text-left text-white/50 text-sm font-body hover:text-[var(--color-sandybrown-100)] hover:translate-x-1 transition-all">Pricing</button>
              <button onClick={() => scrollToSection('faqs')} className="text-left text-white/50 text-sm font-body hover:text-[var(--color-sandybrown-100)] hover:translate-x-1 transition-all">FAQs</button>
            </div>
            
            <div className="flex flex-col gap-4">
              <h4 className="text-white font-bold tracking-widest uppercase text-xs mb-1">Legal</h4>
              <a href="#" className="text-white/50 text-sm font-body hover:text-[var(--color-sandybrown-100)] hover:translate-x-1 transition-all">Privacy Policy</a>
              <a href="#" className="text-white/50 text-sm font-body hover:text-[var(--color-sandybrown-100)] hover:translate-x-1 transition-all">Terms of Service</a>
              <a href="#" className="text-white/50 text-sm font-body hover:text-[var(--color-sandybrown-100)] hover:translate-x-1 transition-all">Sustainability</a>
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-white/[0.03] bg-[#020408]">
          <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/30 text-xs font-body antialiased text-center md:text-left">
              &copy; {new Date().getFullYear()} Wagholi Highstreet. All rights reserved.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-9 h-9 flex items-center justify-center rounded-full bg-white/5 border border-white/5 hover:bg-[var(--color-sandybrown-100)] hover:text-black hover:scale-110 text-white/60 transition-all">
                <span className="material-symbols-outlined text-[16px]">public</span>
              </a>
              <a href="#" className="w-9 h-9 flex items-center justify-center rounded-full bg-white/5 border border-white/5 hover:bg-[var(--color-sandybrown-100)] hover:text-black hover:scale-110 text-white/60 transition-all">
                <span className="material-symbols-outlined text-[16px]">share</span>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

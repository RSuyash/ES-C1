/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { useState } from 'react';
import { LeadCaptureForm } from './LeadCaptureForm';
import InteractiveAmenities from './components/InteractiveAmenities';
import LocationSection from './components/LocationSection';
import PricingSection from './components/PricingSection';
import WhyActNow from './components/WhyActNow';
import LeadWizardModal from './components/LeadWizardModal';
import WhyBusinessesSection from './components/WhyBusinessesSection';

export default function App() {
  const [isWizardOpen, setIsWizardOpen] = useState(false);

  const scrollToLeadForm = () => {
    document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const openWizard = () => setIsWizardOpen(true);
  const closeWizard = () => setIsWizardOpen(false);

  return (
    <div className="bg-[var(--color-black-200)] font-body text-white antialiased">
      {/* Floating Lead Wizard Modal */}
      <LeadWizardModal isOpen={isWizardOpen} onClose={closeWizard} />

      {/* Top Navigation Bar */}
      <nav className="absolute top-0 w-full z-50 bg-transparent pt-6">
        <div className="flex justify-between items-center w-full px-6 md:px-12 max-w-[1400px] mx-auto">
          <div className="flex items-center">
            <img
              src="/logo.png"
              alt="Wagholi Highstreet Logo"
              className="h-11 w-auto max-w-[220px] object-contain md:h-16 md:max-w-[320px]"
            />
          </div>
          <div className="hidden md:flex items-center gap-8 text-white text-sm font-body">
            <a href="#" className="hover:text-[var(--color-sandybrown-100)] transition-colors">Gallery</a>
            <a href="#" className="hover:text-[#d6a554] transition-colors">Plans</a>
            <button
              type="button"
              onClick={openWizard}
              className="border border-[#d6a554] text-[#d6a554] px-6 py-2 rounded-md font-medium hover:bg-[#d6a554] hover:text-black transition-colors"
            >
              Enquire Now
            </button>
          </div>
          <button
            type="button"
            onClick={openWizard}
            className="md:hidden border border-[#d6a554] text-[#d6a554] px-4 py-2 rounded-md text-xs font-medium"
          >
            Enquire Now
          </button>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section className="relative min-h-[100dvh] w-full flex flex-col justify-center overflow-hidden bg-[var(--color-black-200)] pt-28 lg:pt-32 pb-12 lg:pb-16 px-4 sm:px-6 md:px-12">
          {/* Background Image & Gradients */}
          <div className="absolute inset-0 z-0">
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

        <WhyBusinessesSection />

        <InteractiveAmenities />
        <LocationSection />
        <PricingSection onOpenWizard={openWizard} />
        <WhyActNow onOpenWizard={openWizard} />

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

      {/* Footer */}
      <footer className="w-full border-t border-white/10 bg-[#000000]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-12 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col gap-2 items-center md:items-start">
            <img
              src="/logo.png"
              alt="Wagholi Highstreet Logo"
              className="mb-2 h-10 w-auto max-w-[180px] object-contain md:h-12 md:max-w-[240px]"
            />
            <p className="text-white/50 text-sm font-body antialiased max-w-xs text-center md:text-left">
              © 2024 Wagholi Highstreet. Premium Commercial Destination on Kesnand Road, Wagholi.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-6 lg:gap-8">
            <a className="text-white/50 text-sm font-body hover:text-[#d6a554] transition-colors" href="#">Privacy Policy</a>
            <a className="text-white/50 text-sm font-body hover:text-[#d6a554] transition-colors" href="#">Terms of Service</a>
            <a className="text-white/50 text-sm font-body hover:text-[#d6a554] transition-colors" href="#">Investor Relations</a>
            <a className="text-white/50 text-sm font-body hover:text-[#d6a554] transition-colors" href="#">Sustainability</a>
          </div>
          <div className="flex gap-4">
            <button className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 hover:bg-[#d6a554] hover:text-black hover:border-[#d6a554] text-white transition-all">
              <span className="material-symbols-outlined text-sm">public</span>
            </button>
            <button className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 hover:bg-[#d6a554] hover:text-black hover:border-[#d6a554] text-white transition-all">
              <span className="material-symbols-outlined text-sm">share</span>
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

import { useState } from 'react';
import LegalModal from './LegalModal';

type ModalType = 'privacy' | 'terms' | 'disclaimer' | null;

export default function Footer() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<ModalType>(null);

  const openModal = (type: ModalType) => {
    setModalType(type);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setModalType(null), 300);
  };

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      <footer className="relative bg-[#020408] pt-20 pb-10 overflow-hidden border-t border-white/5">
        {/* Ambient background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-[var(--color-sandybrown-100)]/30 to-transparent"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[var(--color-sandybrown-100)]/5 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
            
            {/* Column 1: Brand & Identity */}
            <div className="flex flex-col gap-6">
              <img 
                src="/logo-light-text.png" 
                alt="Wagholi Highstreet" 
                className="h-12 lg:h-14 w-auto object-contain self-start"
              />
              <p className="text-white/50 text-[14px] leading-relaxed max-w-xs">
                A premium 5.5-acre commercial destination setting new benchmarks for infrastructure and business growth in Pune's fastest-growing corridor.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-[var(--color-sandybrown-100)] hover:border-[var(--color-sandybrown-100)]/30 hover:bg-[var(--color-sandybrown-100)]/5 transition-all duration-300">
                  <span className="material-symbols-outlined text-xl">public</span>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-[var(--color-sandybrown-100)] hover:border-[var(--color-sandybrown-100)]/30 hover:bg-[var(--color-sandybrown-100)]/5 transition-all duration-300">
                  <span className="material-symbols-outlined text-xl">share</span>
                </a>
              </div>
            </div>

            {/* Column 2: Quick Navigation */}
            <div className="flex flex-col gap-6">
              <h4 className="text-white font-bold uppercase tracking-widest text-[11px]">Quick Links</h4>
              <nav className="flex flex-col gap-3">
                {['Overview', 'Amenities', 'Pricing', 'Location'].map((item) => (
                  <button 
                    key={item}
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className="text-white/40 text-[14px] hover:text-[var(--color-sandybrown-100)] transition-colors text-left flex items-center group"
                  >
                    <span className="w-0 group-hover:w-4 h-[1px] bg-[var(--color-sandybrown-100)] transition-all duration-300 mr-0 group-hover:mr-2"></span>
                    {item}
                  </button>
                ))}
              </nav>
            </div>

            {/* Column 3: Legal & Support */}
            <div className="flex flex-col gap-6">
              <h4 className="text-white font-bold uppercase tracking-widest text-[11px]">Transparency</h4>
              <nav className="flex flex-col gap-3">
                {[
                  { label: 'Privacy Policy', type: 'privacy' as ModalType },
                  { label: 'Terms of Service', type: 'terms' as ModalType },
                  { label: 'Disclaimer', type: 'disclaimer' as ModalType }
                ].map((item) => (
                  <button 
                    key={item.label}
                    onClick={() => openModal(item.type)}
                    className="text-white/40 text-[14px] hover:text-[var(--color-sandybrown-100)] transition-colors text-left"
                  >
                    {item.label}
                  </button>
                ))}
              </nav>
            </div>

            {/* Column 4: Contact Information */}
            <div className="flex flex-col gap-6">
              <h4 className="text-white font-bold uppercase tracking-widest text-[11px]">Get In Touch</h4>
              <div className="flex flex-col gap-5">
                <div className="flex gap-4 group">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[var(--color-sandybrown-100)] group-hover:bg-[var(--color-sandybrown-100)] group-hover:text-black transition-all duration-500 shrink-0">
                    <span className="material-symbols-outlined text-xl">location_on</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-white/30 text-[10px] uppercase font-bold tracking-tighter">Sales Office</span>
                    <address className="text-white/60 text-[13px] not-italic leading-relaxed group-hover:text-white transition-colors">
                      GS Crown Plaza, Kesnand,<br />Pune, Maharashtra 412207
                    </address>
                  </div>
                </div>

                <div className="flex gap-4 group">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[var(--color-sandybrown-100)] group-hover:bg-[var(--color-sandybrown-100)] group-hover:text-black transition-all duration-500 shrink-0">
                    <span className="material-symbols-outlined text-xl">call</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-white/30 text-[10px] uppercase font-bold tracking-tighter">Priority Line</span>
                    <a href="tel:+917742080757" className="text-white/60 text-[14px] font-bold group-hover:text-[var(--color-sandybrown-100)] transition-colors">
                      +91 77420 80757
                    </a>
                  </div>
                </div>

                <div className="flex gap-4 group">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[var(--color-sandybrown-100)] group-hover:bg-[var(--color-sandybrown-100)] group-hover:text-black transition-all duration-500 shrink-0">
                    <span className="material-symbols-outlined text-xl">mail</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-white/30 text-[10px] uppercase font-bold tracking-tighter">Official Email</span>
                    <a href="mailto:wagholihighstreet12@gmail.com" className="text-white/60 text-[13px] break-all group-hover:text-white transition-colors">
                      wagholihighstreet12@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-white/[0.03] flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <p className="text-white/30 text-[12px]">
                Authorized Channel Partner Marketing
              </p>
            </div>
            <p className="text-white/20 text-[12px] text-center md:text-right">
              &copy; {new Date().getFullYear()} Wagholi Highstreet. All Rights Reserved. <br className="md:hidden" />
              <span className="hidden md:inline"> | </span> Designed for Elite Performance.
            </p>
          </div>
        </div>
      </footer>

      {/* Legal Modal */}
      <LegalModal
        isOpen={isModalOpen}
        onClose={closeModal}
        modalType={modalType}
      />
    </>
  );
}

import { useState } from 'react';
import { GsGroupLogo } from './GsGroupLogo';
import LegalModal from './LegalModal';
import { SiteLogo } from './SiteLogo';
import { SymbolIcon } from './SymbolIcon';

type ModalType = 'privacy' | 'terms' | 'disclaimer' | null;

export default function Footer() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<ModalType>(null);
  const [isQrEnlarged, setIsQrEnlarged] = useState(false);
  const bTowerReraUrl =
    'https://maharera.maharashtra.gov.in/projects-search-result?certificate_no=P52100056495';
  const cTowerReraUrl =
    'https://maharera.maharashtra.gov.in/projects-search-result?certificate_no=P52100079202';

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

  const toggleQr = () => {
    setIsQrEnlarged(!isQrEnlarged);
    if (!isQrEnlarged) {
      setTimeout(() => setIsQrEnlarged(false), 5000);
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: 'Wagholi Highstreet',
      text: 'Premium Commercial Destination on Wagholi Link Road. Shops, Showrooms & Offices.',
      url: window.location.href
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback: Copy to clipboard
      try {
        await navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
      } catch (err) {
        console.error('Could not copy text: ', err);
      }
    }
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
              <div className="flex w-full max-w-[360px] flex-col gap-4 rounded-[24px] border border-white/8 bg-white/[0.04] px-5 py-5 shadow-[0_20px_50px_rgba(0,0,0,0.16)]">
                <span className="text-[9px] font-semibold uppercase tracking-[0.32em] text-white/38">
                  GS Group x Wagholi Highstreet
                </span>
                <div className="flex items-center justify-between gap-4">
                  <GsGroupLogo className="w-[84px] sm:w-[92px] md:w-[96px]" />
                  <div className="h-10 w-px shrink-0 bg-gradient-to-b from-transparent via-white/14 to-transparent" />
                  <SiteLogo
                    wrapperClassName="justify-end"
                    imageClassName="w-[142px] sm:w-[156px] lg:w-[170px]"
                  />
                </div>
              </div>
              <p className="text-white/50 text-[14px] leading-relaxed max-w-xs">
                A premium 5.5-acre commercial destination setting new benchmarks for infrastructure and business growth in Pune's fastest-growing corridor.
              </p>
              
              {/* RERA Section */}
              <div className="flex flex-col gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/5 w-fit relative">
                <div className="grid gap-3 sm:grid-cols-2">
                  <a
                    href={bTowerReraUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 rounded-lg border border-white/8 bg-white/[0.04] px-3 py-3 transition hover:border-[var(--color-sandybrown-100)]/30 hover:bg-white/[0.06] min-w-0"
                    onClick={(event) => {
                      event.preventDefault();
                      toggleQr();
                    }}
                  >
                    <div className="relative shrink-0 bg-white p-0.5 rounded">
                      <img src="/qr-code.jpeg" alt="B Tower RERA QR" className="w-12 h-12 rounded transition-transform md:group-hover:scale-110" />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity rounded">
                        <span className="material-symbols-outlined text-white text-[10px]">zoom_in</span>
                      </div>
                    </div>
                    <div className="flex min-w-0 flex-col">
                      <span className="text-[9px] uppercase tracking-tighter text-white/30 font-bold leading-tight">B Tower MahaRERA</span>
                      <span className="text-[11px] text-white/70 font-mono font-bold leading-tight break-all">P52100056495</span>
                    </div>
                  </a>
                  <a
                    href={cTowerReraUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 rounded-lg border border-white/8 bg-white/[0.04] px-3 py-3 transition hover:border-[var(--color-sandybrown-100)]/30 hover:bg-white/[0.06] min-w-0"
                  >
                    <div className="relative shrink-0 bg-white p-0.5 rounded">
                      <img src="/qr-code-c-tower.png" alt="C Tower RERA QR" className="w-12 h-12 rounded transition-transform md:group-hover:scale-110" />
                    </div>
                    <div className="flex min-w-0 flex-col">
                      <span className="text-[9px] uppercase tracking-tighter text-white/30 font-bold leading-tight">C Tower MahaRERA</span>
                      <span className="text-[11px] text-white/70 font-mono font-bold leading-tight break-all">P52100079202</span>
                    </div>
                  </a>
                </div>
                <p className="text-[10px] text-white/26 leading-relaxed">
                  Scan either tower code to open the official MahaRERA project page.
                </p>
                
                {/* QR Enlarged Overlay */}
                {isQrEnlarged && (
                  <div 
                    className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/90 backdrop-blur-md p-6"
                    onClick={(e) => { e.stopPropagation(); setIsQrEnlarged(false); }}
                  >
                    <div className="relative bg-white p-4 rounded-3xl animate-in zoom-in-95 duration-300 max-w-xs w-full shadow-[0_0_50px_rgba(255,255,255,0.1)]">
                      <button 
                        className="absolute -top-12 right-0 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white"
                        onClick={() => setIsQrEnlarged(false)}
                      >
                        <span className="material-symbols-outlined">close</span>
                      </button>
                      
                      <img src="/qr-code.jpeg" alt="MahaRERA QR Code Large" className="w-full h-auto rounded-xl shadow-inner" />
                      
                      <div className="mt-6 flex flex-col gap-3">
                        <p className="text-black text-center text-xs font-bold uppercase tracking-tight">Scan to verify registration</p>
                        
                        <a 
                          href="https://maharerait.mahaonline.gov.in/ProjectSummaryView/ProjectSummaryQRCodeView?id=Q2VydGlmaWNhdGVObz1QNTIxMDAwNTY0OTUmU2NhbnR5cGU9UHJvbW90ZXJMb2dpblFSQ29kZQ=="
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full py-3 bg-black text-white text-[11px] font-bold uppercase tracking-widest rounded-xl text-center hover:bg-neutral-800 transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          Verify on MahaRERA Website
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex gap-4">
                <a 
                  href="https://wagholihighstreet.in" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-[var(--color-sandybrown-100)] hover:border-[var(--color-sandybrown-100)]/30 hover:bg-[var(--color-sandybrown-100)]/5 transition-all duration-300"
                >
                  <SymbolIcon name="public" className="h-5 w-5" />
                </a>
                <button 
                  onClick={handleShare}
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-[var(--color-sandybrown-100)] hover:border-[var(--color-sandybrown-100)]/30 hover:bg-[var(--color-sandybrown-100)]/5 transition-all duration-300"
                >
                  <SymbolIcon name="share" className="h-5 w-5" />
                </button>
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
                    <SymbolIcon name="location_on" className="h-5 w-5" />
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
                    <SymbolIcon name="call" className="h-5 w-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-white/30 text-[10px] uppercase font-bold tracking-tighter">Priority Line</span>
                    <a href="tel:+919049187577" className="text-white/60 text-[14px] font-bold group-hover:text-[var(--color-sandybrown-100)] transition-colors">
                      +91 90491 87577
                    </a>
                  </div>
                </div>

                <div className="flex gap-4 group">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[var(--color-sandybrown-100)] group-hover:bg-[var(--color-sandybrown-100)] group-hover:text-black transition-all duration-500 shrink-0">
                    <SymbolIcon name="mail" className="h-5 w-5" />
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

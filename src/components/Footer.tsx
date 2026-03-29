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

  return (
    <>
      <footer className="bg-[#020408] border-t border-[var(--color-sandybrown-100)]/10">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 md:px-12 py-12 lg:py-16">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 mb-10">
            {/* Brand */}
            <div>
              <h3 className="font-headline text-2xl font-bold text-white mb-3">
                WAGHOLI <span className="text-[var(--color-sandybrown-100)]">HIGHSTREET</span>
              </h3>
              <p className="text-white/60 text-[15px] leading-relaxed mb-4">
                Premium Commercial Spaces in the Heart of Wagholi's Business Corridor.
              </p>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-headline text-sm font-bold text-[var(--color-sandybrown-100)] tracking-widest uppercase mb-4">
                Contact
              </h4>
              <div className="space-y-2 text-white/70 text-[15px]">
                <p>📍 Survey No. 659, Wagholi, Pune - 412207</p>
                <p>📞 <a href="tel:+91XXXXXXXXXX" className="hover:text-[var(--color-sandybrown-100)] transition-colors">+91 XX XXXXX XXXXX</a></p>
                <p>✉️ <a href="mailto:info@wagholihighstreet.com" className="hover:text-[var(--color-sandybrown-100)] transition-colors">info@wagholihighstreet.com</a></p>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-headline text-sm font-bold text-[var(--color-sandybrown-100)] tracking-widest uppercase mb-4">
                Quick Links
              </h4>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => openModal('privacy')}
                  className="text-white/70 hover:text-[var(--color-sandybrown-100)] transition-colors text-[15px] border-b border-transparent hover:border-[var(--color-sandybrown-100)]/50 pb-0.5"
                >
                  Privacy Policy
                </button>
                <span className="text-white/30">•</span>
                <button
                  onClick={() => openModal('terms')}
                  className="text-white/70 hover:text-[var(--color-sandybrown-100)] transition-colors text-[15px] border-b border-transparent hover:border-[var(--color-sandybrown-100)]/50 pb-0.5"
                >
                  Terms & Conditions
                </button>
                <span className="text-white/30">•</span>
                <button
                  onClick={() => openModal('disclaimer')}
                  className="text-white/70 hover:text-[var(--color-sandybrown-100)] transition-colors text-[15px] border-b border-transparent hover:border-[var(--color-sandybrown-100)]/50 pb-0.5"
                >
                  Disclaimer
                </button>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="h-[1px] bg-gradient-to-r from-transparent via-[var(--color-sandybrown-100)]/20 to-transparent mb-8"></div>

          {/* Short Disclaimer */}
          <div className="mb-8">
            <div className="flex items-start gap-3 p-4 bg-[var(--color-sandybrown-100)]/5 rounded-lg border border-[var(--color-sandybrown-100)]/10">
              <span className="text-[var(--color-sandybrown-100)] text-lg flex-shrink-0">⚠️</span>
              <p className="text-white/50 text-[13px] leading-relaxed">
                Prices, availability, offers, possession timelines, and project details are subject to change as per current availability and developer terms. Images, visuals, and amenities shown are for presentation purposes only.
              </p>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center">
            <p className="text-white/40 text-[14px]">
              © {new Date().getFullYear()} Wagholi Highstreet. All Rights Reserved.
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

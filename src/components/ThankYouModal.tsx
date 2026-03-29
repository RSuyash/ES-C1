import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SymbolIcon } from './SymbolIcon';

interface ThankYouModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Confetti particle component
const Confetti: React.FC<{ delay: number }> = ({ delay }) => {
  const colors = ['#d6a554', '#fcd99a', '#ee6e25', '#ffffff', '#4dc247'];
  const color = colors[Math.floor(Math.random() * colors.length)];
  const left = Math.random() * 100;
  const animationDuration = 2 + Math.random() * 2;
  const size = 6 + Math.random() * 8;

  return (
    <motion.div
      initial={{ y: -20, opacity: 0, rotate: 0 }}
      animate={{
        y: '100vh',
        opacity: [0, 1, 1, 0],
        rotate: [0, 360, 720],
        x: [0, Math.random() * 100 - 50, 0],
      }}
      transition={{
        duration: animationDuration,
        delay: delay,
        ease: 'easeOut',
      }}
      className="absolute top-0 w-2 h-2 rounded-sm"
      style={{
        left: `${left}%`,
        backgroundColor: color,
        width: `${size}px`,
        height: `${size}px`,
      }}
    />
  );
}

// Floating badge component
function AchievementBadge({ icon, text, delay }: { icon: string; text: string; delay: number }) {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay, duration: 0.5, type: 'spring', bounce: 0.5 }}
      className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-gradient-to-r from-[var(--color-sandybrown-100)]/20 to-[var(--color-sandybrown-100)]/5 border border-[var(--color-sandybrown-100)]/30 backdrop-blur-sm"
    >
      <SymbolIcon name={icon} className="h-6 w-6 text-[var(--color-sandybrown-100)]" />
      <span className="text-white/90 font-medium text-sm">{text}</span>
    </motion.div>
  );
}

export default function ThankYouModal({ isOpen, onClose }: ThankYouModalProps) {
  const [confettiPieces, setConfettiPieces] = useState(60);

  useEffect(() => {
    if (isOpen) {
      setConfettiPieces(60);
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Full-screen backdrop with gradient */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[10000] bg-gradient-to-br from-[#0a0f18] via-[#0b1222] to-[#020408]"
            onClick={onClose}
          >
            {/* Animated background grid pattern */}
            <div className="absolute inset-0 opacity-10">
              <div
                className="w-full h-full"
                style={{
                  backgroundImage: `
                    linear-gradient(rgba(214, 165, 84, 0.1) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(214, 165, 84, 0.1) 1px, transparent 1px)
                  `,
                  backgroundSize: '50px 50px',
                  animation: 'gridMove 20s linear infinite',
                }}
              />
            </div>

            {/* Radial glow effect */}
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-sandybrown-100)]/5 via-transparent to-transparent" />

            {/* Confetti container */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {Array.from({ length: confettiPieces }).map((_, i) => (
                <Confetti key={i} delay={i * 0.05} />
              ))}
            </div>

            {/* Main content container */}
            <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-12">
              <motion.div
                initial={{ scale: 0.8, opacity: 0, y: 40 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6, type: 'spring', bounce: 0.4 }}
                className="max-w-2xl w-full text-center"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Success icon with pulse rings */}
                <div className="relative mb-8 flex justify-center">
                  {/* Pulse rings */}
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1.5, opacity: 0 }}
                    transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 0.5 }}
                    className="absolute inset-0 w-32 h-32 rounded-full border-2 border-[var(--color-sandybrown-100)]/30"
                  />
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1.5, opacity: 0 }}
                    transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 0.5, delay: 0.3 }}
                    className="absolute inset-0 w-32 h-32 rounded-full border-2 border-[var(--color-sandybrown-100)]/20"
                  />

                  {/* Main checkmark icon */}
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.3, duration: 0.6, type: 'spring', bounce: 0.5 }}
                    className="relative w-24 h-24 rounded-full bg-gradient-to-br from-[var(--color-sandybrown-100)] to-[#fcd99a] flex items-center justify-center shadow-[0_0_60px_rgba(214,165,84,0.4)]"
                  >
                    <SymbolIcon name="check" className="h-12 w-12 text-black" />
                  </motion.div>
                </div>

                {/* Main headline */}
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="font-headline text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-4 tracking-tight leading-[1.1]"
                >
                  Thank You!{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-sandybrown-100)] via-[#fcd99a] to-[var(--color-sandybrown-100)]">
                    You're In!
                  </span>
                </motion.h2>

                {/* Subtitle */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                  className="font-body text-lg sm:text-xl text-white/70 mb-10 leading-relaxed max-w-xl mx-auto"
                >
                  Your enquiry has been received. Our priority sales team will contact you within{' '}
                  <span className="text-[var(--color-sandybrown-100)] font-semibold">24 hours</span> with
                  pricing, availability, and exclusive offers.
                </motion.p>

                {/* Achievement badges grid */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.5 }}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10 max-w-lg mx-auto"
                >
                  <AchievementBadge icon="schedule" text="Response within 24 hours" delay={0.8} />
                  <AchievementBadge icon="verified" text="Verified project details" delay={0.9} />
                  <AchievementBadge icon="trending_up" text="Priority investment insights" delay={1.0} />
                  <AchievementBadge icon="celebration" text="Exclusive booking benefits" delay={1.1} />
                </motion.div>

                {/* What happens next section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2, duration: 0.5 }}
                  className="bg-gradient-to-r from-[var(--color-sandybrown-100)]/10 to-[var(--color-sandybrown-100)]/5 border border-[var(--color-sandybrown-100)]/20 rounded-3xl p-6 mb-8 backdrop-blur-sm"
                >
                  <h3 className="font-headline text-lg font-bold text-[var(--color-sandybrown-100)] mb-4 uppercase tracking-widest text-xs">
                    What Happens Next
                  </h3>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[var(--color-sandybrown-100)]/20 flex items-center justify-center">
                        <SymbolIcon name="call" className="h-5 w-5 text-[var(--color-sandybrown-100)]" />
                      </div>
                      <div className="text-left">
                        <p className="text-white/90 font-semibold text-sm">Priority Call</p>
                        <p className="text-white/50 text-xs">Within 24 hours</p>
                      </div>
                    </div>
                    <div className="hidden sm:block w-12 h-[1px] bg-[var(--color-sandybrown-100)]/30" />
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[var(--color-sandybrown-100)]/20 flex items-center justify-center">
                        <SymbolIcon name="calendar_month" className="h-5 w-5 text-[var(--color-sandybrown-100)]" />
                      </div>
                      <div className="text-left">
                        <p className="text-white/90 font-semibold text-sm">Site Visit</p>
                        <p className="text-white/50 text-xs">Schedule at convenience</p>
                      </div>
                    </div>
                    <div className="hidden sm:block w-12 h-[1px] bg-[var(--color-sandybrown-100)]/30" />
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[var(--color-sandybrown-100)]/20 flex items-center justify-center">
                        <SymbolIcon name="contract" className="h-5 w-5 text-[var(--color-sandybrown-100)]" />
                      </div>
                      <div className="text-left">
                        <p className="text-white/90 font-semibold text-sm">Investment</p>
                        <p className="text-white/50 text-xs">Secure your future</p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* CTA buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.4, duration: 0.5 }}
                  className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                >
                  <a
                    href="tel:+91XXXXXXXXXX"
                    className="w-full sm:w-auto px-8 py-4 rounded-full bg-[var(--color-sandybrown-100)] text-black font-bold text-sm uppercase tracking-widest hover:bg-[#e5b565] hover:shadow-[0_0_30px_rgba(214,165,84,0.4)] transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <SymbolIcon name="phone" className="h-5 w-5" />
                    Call Now
                  </a>
                  <button
                    onClick={onClose}
                    className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/5 border border-white/10 text-white font-bold text-sm uppercase tracking-widest hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                  >
                    Back to Site
                  </button>
                </motion.div>

                {/* Contact info */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.6, duration: 0.5 }}
                  className="mt-8 text-white/40 text-sm"
                >
                  Questions? Reach us at{' '}
                  <a href="mailto:info@wagholihighstreet.com" className="text-[var(--color-sandybrown-100)] hover:underline">
                    info@wagholihighstreet.com
                  </a>
                </motion.p>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

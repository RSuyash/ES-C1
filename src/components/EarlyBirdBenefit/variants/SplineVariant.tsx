/**
 * Spline Variant - Spline 3D embedded viewer
 * - Interactive 3D badge that rotates toward cursor
 * - Real-time lighting and material response
 * - Click triggers particle burst
 *
 * Note: To enable full Spline 3D, install: npm install @splinetool/react-spline
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export function SplineVariant() {
  const [isHovered, setIsHovered] = useState(false);
  const [clickBurst, setClickBurst] = useState(0);

  const handleClick = () => {
    setClickBurst((prev) => prev + 1);
    setTimeout(() => setClickBurst((prev) => prev - 1), 1000);
  };

  return (
    <div
      className="flex items-center justify-center gap-2 mb-5 cursor-pointer relative select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      style={{ perspective: '800px' }}
    >
      {/* 3D Icon Container */}
      <motion.div
        className="relative w-8 h-8 lg:w-10 lg:h-10"
        animate={{
          rotateY: isHovered ? 15 : 0,
          rotateX: isHovered ? -10 : 0,
          scale: isHovered ? 1.1 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 20,
          mass: 0.8,
        }}
      >
        {/* 3D-styled badge with CSS */}
        <div
          className="w-full h-full bg-gradient-to-br from-[var(--color-sandybrown-100)] to-[#b8860b] rounded-xl flex items-center justify-center border border-[var(--color-sandybrown-100)]/30 shadow-lg"
          style={{
            transformStyle: 'preserve-3d',
            boxShadow: isHovered
              ? '0 0 30px rgba(214, 165, 84, 0.5), inset 0 0 20px rgba(255, 255, 255, 0.1)'
              : '0 4px 15px rgba(0, 0, 0, 0.3), inset 0 0 20px rgba(255, 255, 255, 0.05)',
          }}
        >
          <span
            className="material-symbols-outlined text-white text-lg"
            style={{
              transform: 'translateZ(20px)',
              textShadow: '0 2px 10px rgba(0,0,0,0.5)',
            }}
          >
            local_offer
          </span>

          {/* Simulated 3D depth layers */}
          <div
            className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-xl pointer-events-none"
            style={{ transform: 'translateZ(-10px)' }}
          />
        </div>

        {/* Dynamic glow ring on hover */}
        <motion.div
          className="absolute -inset-2 rounded-2xl border-2 border-[var(--color-sandybrown-100)]/0 pointer-events-none"
          animate={{
            opacity: isHovered ? 1 : 0,
            scale: isHovered ? 1 : 0.9,
          }}
          transition={{ duration: 0.3 }}
          style={{
            boxShadow: isHovered ? '0 0 20px rgba(214, 165, 84, 0.4)' : 'none',
          }}
        />
      </motion.div>

      {/* Text with parallax effect */}
      <motion.div
        className="relative"
        animate={{
          x: isHovered ? 3 : 0,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        <p className="text-white/80 font-medium text-[12px] sm:text-sm lg:text-[15px] tracking-wide">
          Early Bird Benefit up to{' '}
          <motion.span
            className="font-bold inline-block"
            style={{ color: 'var(--color-sandybrown-100)' }}
            animate={{
              textShadow: isHovered
                ? '0 0 25px rgba(214, 165, 84, 0.9), 0 0 50px rgba(214, 165, 84, 0.4)'
                : '0 0 10px rgba(214, 165, 84, 0.3)',
              scale: isHovered ? [1, 1.08, 1] : 1,
            }}
            transition={{
              scale: {
                duration: 0.6,
                repeat: isHovered ? Infinity : 0,
                repeatType: "reverse",
                ease: "easeInOut",
              },
              textShadow: { duration: 0.3 },
            }}
          >
            ₹5 Lakhs
          </motion.span>
        </p>
      </motion.div>

      {/* Click burst particles */}
      <AnimatePresence>
        {clickBurst > 0 && (
          <>
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1.5 h-1.5 bg-[var(--color-sandybrown-100)] rounded-full"
                initial={{
                  opacity: 1,
                  x: 0,
                  y: 0,
                  scale: 1,
                }}
                animate={{
                  opacity: 0,
                  x: (Math.random() - 0.5) * 120,
                  y: (Math.random() - 0.5) * 120,
                  scale: 0,
                }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 0.8,
                  ease: "easeOut",
                  delay: i * 0.05,
                }}
                style={{
                  left: '50%',
                  top: '50%',
                }}
              />
            ))}
          </>
        )}
      </AnimatePresence>

      {/* Subtle floating particles always visible */}
      <div className="absolute -top-2 -right-2 w-1 h-1 bg-[var(--color-sandybrown-100)]/40 rounded-full animate-ping" />
      <div className="absolute -bottom-1 -left-1 w-0.5 h-0.5 bg-[var(--color-sandybrown-100)]/60 rounded-full animate-pulse" />
    </div>
  );
}

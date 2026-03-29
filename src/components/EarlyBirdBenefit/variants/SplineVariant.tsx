/**
 * Spline Variant - lightweight 3D-styled badge without external icon font
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SymbolIcon } from '../../SymbolIcon';

export function SplineVariant() {
  const [isHovered, setIsHovered] = useState(false);
  const [clickBurst, setClickBurst] = useState(0);

  const handleClick = () => {
    setClickBurst((prev) => prev + 1);
    setTimeout(() => setClickBurst((prev) => prev - 1), 1000);
  };

  return (
    <div
      className="relative flex cursor-pointer select-none items-center justify-center gap-2 mb-5"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      style={{ perspective: '800px' }}
    >
      <motion.div
        className="relative h-8 w-8 lg:h-10 lg:w-10"
        animate={{
          rotateY: isHovered ? 15 : 0,
          rotateX: isHovered ? -10 : 0,
          scale: isHovered ? 1.1 : 1,
        }}
        transition={{ type: 'spring', stiffness: 200, damping: 20, mass: 0.8 }}
      >
        <div
          className="flex h-full w-full items-center justify-center rounded-xl border border-[var(--color-sandybrown-100)]/30 bg-gradient-to-br from-[var(--color-sandybrown-100)] to-[#b8860b] shadow-lg"
          style={{
            transformStyle: 'preserve-3d',
            boxShadow: isHovered
              ? '0 0 30px rgba(214, 165, 84, 0.5), inset 0 0 20px rgba(255, 255, 255, 0.1)'
              : '0 4px 15px rgba(0, 0, 0, 0.3), inset 0 0 20px rgba(255, 255, 255, 0.05)',
          }}
        >
          <SymbolIcon
            name="local_offer"
            className="h-5 w-5 text-white"
            style={{
              transform: 'translateZ(20px)',
              textShadow: '0 2px 10px rgba(0,0,0,0.5)',
            }}
          />
          <div
            className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-t from-black/30 to-transparent"
            style={{ transform: 'translateZ(-10px)' }}
          />
        </div>
      </motion.div>

      <motion.div
        className="relative"
        animate={{ x: isHovered ? 3 : 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      >
        <p className="text-white/80 font-medium text-[12px] tracking-wide sm:text-sm lg:text-[15px]">
          Early Bird Benefit up to{' '}
          <motion.span
            className="inline-block font-bold"
            style={{ color: 'var(--color-sandybrown-100)' }}
            animate={{
              textShadow: isHovered
                ? '0 0 25px rgba(214, 165, 84, 0.9), 0 0 50px rgba(214, 165, 84, 0.4)'
                : '0 0 10px rgba(214, 165, 84, 0.3)',
              scale: isHovered ? [1, 1.08, 1] : 1,
            }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
          >
            Rs. 5 Lakhs
          </motion.span>
        </p>
      </motion.div>

      <AnimatePresence>
        {clickBurst > 0
          ? [...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute h-1.5 w-1.5 rounded-full bg-[var(--color-sandybrown-100)]"
                initial={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                animate={{
                  opacity: 0,
                  x: (Math.random() - 0.5) * 120,
                  y: (Math.random() - 0.5) * 120,
                  scale: 0,
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut', delay: i * 0.05 }}
                style={{ left: '50%', top: '50%' }}
              />
            ))
          : null}
      </AnimatePresence>
    </div>
  );
}

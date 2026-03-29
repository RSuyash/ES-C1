/**
 * Motion Variant - Framer Motion hover effects (MEDIUM INTENSITY)
 * - Idle: Static (no continuous animation)
 * - Hover: Animates on hover, returns to normal after
 * - Mobile: Animates on tap, auto-resets after 2 seconds
 */

import { motion } from 'motion/react';
import { useState, useEffect } from 'react';

export function MotionVariant() {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobileAnimating, setIsMobileAnimating] = useState(false);

  // Auto-reset mobile animation after 2 seconds
  useEffect(() => {
    if (isMobileAnimating) {
      const timer = setTimeout(() => {
        setIsMobileAnimating(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isMobileAnimating]);

  const isActive = isHovered || isMobileAnimating;

  const handleTap = () => {
    // Only trigger on mobile (touch devices)
    setIsMobileAnimating(true);
  };

  return (
    <motion.div
      className="flex items-center justify-center gap-2 mb-5 cursor-pointer relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleTap}
      // No idle animation - static by default
      animate={{
        y: 0,
        scale: isActive ? 1.05 : 1,
      }}
      transition={{
        scale: {
          duration: 0.3,
          ease: "easeOut",
        },
      }}
    >
      {/* Icon with 3D tilt on hover */}
      <motion.div
        animate={{
          rotate: isActive ? [0, -10, 10, 0] : -90,
          scale: isActive ? 1.3 : 1,
        }}
        transition={{
          rotate: {
            duration: 0.4,
            ease: "easeOut",
          },
          scale: {
            duration: 0.3,
            ease: "easeOut",
          },
        }}
      >
        <span
          className="material-symbols-outlined text-[var(--color-sandybrown-100)] text-sm lg:text-lg"
          style={{
            filter: isActive ? 'drop-shadow(0 0 8px rgba(214, 165, 84, 0.6))' : 'none',
          }}
        >
          local_offer
        </span>
      </motion.div>

      {/* Text with glow effect */}
      <motion.p
        className="text-white/80 font-medium text-[12px] sm:text-sm lg:text-[15px] tracking-wide"
        animate={{
          color: isActive ? '#fff' : 'rgba(255, 255, 255, 0.8)',
        }}
        transition={{ duration: 0.2 }}
      >
        Early Bird Benefit up to{' '}
        <motion.span
          className="font-bold"
          style={{ color: 'var(--color-sandybrown-100)' }}
          animate={{
            scale: isActive ? [1, 1.1, 1] : 1,
            textShadow: isActive
              ? '0 0 20px rgba(214, 165, 84, 0.8)'
              : '0 0 10px rgba(214, 165, 84, 0.3)',
          }}
          transition={{
            scale: {
              duration: 0.5,
              repeat: isActive ? 1 : 0, // Only pulse once
              repeatType: "reverse",
              ease: "easeInOut",
            },
            textShadow: { duration: 0.3 },
          }}
        >
          ₹5 Lakhs
        </motion.span>
      </motion.p>

      {/* Subtle sparkle particles on hover */}
      {isActive && (
        <>
          <motion.div
            className="absolute w-1 h-1 bg-[var(--color-sandybrown-100)] rounded-full"
            initial={{ opacity: 1, x: -20, y: -10 }}
            animate={{ opacity: 0, x: -30, y: -20 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
          <motion.div
            className="absolute w-1 h-1 bg-[var(--color-sandybrown-100)] rounded-full"
            initial={{ opacity: 1, x: 20, y: -10 }}
            animate={{ opacity: 0, x: 30, y: -20 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          />
        </>
      )}
    </motion.div>
  );
}

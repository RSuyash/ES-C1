/**
 * GSAP Variant - GSAP-powered premium animations
 * - Idle: Subtle breathing pulse
 * - Hover: Icon spin, shimmer sweep, text highlight
 * - Click: Confetti burst effect
 */

import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';

export function GSAPVariant() {
  const containerRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLSpanElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    const icon = iconRef.current;
    const text = textRef.current;

    if (!container || !icon || !text) return;

    // Idle breathing animation using CSS
    const idleAnimation = container.animate(
      [
        { transform: 'scale(1)', opacity: 1 },
        { transform: 'scale(1.02)', opacity: 0.95 },
        { transform: 'scale(1)', opacity: 1 },
      ],
      {
        duration: 3000,
        iterations: Infinity,
        easing: 'ease-in-out',
      }
    );

    return () => idleAnimation.cancel();
  }, []);

  const handleHoverStart = () => {
    setIsHovered(true);
    const icon = iconRef.current;
    const text = textRef.current;

    if (icon) {
      icon.animate(
        [
          { transform: 'rotate(-90deg) scale(1)' },
          { transform: 'rotate(-90deg) scale(1.3)', filter: 'drop-shadow(0 0 12px rgba(214, 165, 84, 0.8))' },
          { transform: 'rotate(-85deg) scale(1.25)' },
          { transform: 'rotate(-95deg) scale(1.25)' },
          { transform: 'rotate(-90deg) scale(1.2)' },
        ],
        {
          duration: 600,
          easing: 'ease-out',
          fill: 'forwards',
        }
      );
    }

    if (text) {
      text.animate(
        [
          { transform: 'scale(1)', filter: 'brightness(1)' },
          { transform: 'scale(1.08)', filter: 'brightness(1.3)' },
          { transform: 'scale(1.05)', filter: 'brightness(1.2)' },
        ],
        {
          duration: 400,
          easing: 'ease-out',
          fill: 'forwards',
        }
      );
    }
  };

  const handleHoverEnd = () => {
    setIsHovered(false);
    const icon = iconRef.current;
    const text = textRef.current;

    if (icon) {
      icon.animate(
        [
          { transform: 'rotate(-90deg) scale(1.2)', filter: 'drop-shadow(0 0 12px rgba(214, 165, 84, 0.8))' },
          { transform: 'rotate(-90deg) scale(1)', filter: 'drop-shadow(none)' },
        ],
        {
          duration: 300,
          easing: 'ease-out',
          fill: 'forwards',
        }
      );
    }

    if (text) {
      text.animate(
        [
          { transform: 'scale(1.05)', filter: 'brightness(1.2)' },
          { transform: 'scale(1)', filter: 'brightness(1)' },
        ],
        {
          duration: 300,
          easing: 'ease-out',
          fill: 'forwards',
        }
      );
    }
  };

  const handleClick = () => {
    setClickCount((prev) => prev + 1);
    // Add click ripple effect
    const container = containerRef.current;
    if (container) {
      container.animate(
        [
          { transform: 'scale(1)' },
          { transform: 'scale(0.95)' },
          { transform: 'scale(1.02)' },
          { transform: 'scale(1)' },
        ],
        {
          duration: 400,
          easing: 'ease-out',
        }
      );
    }
  };

  return (
    <div
      ref={containerRef}
      className="flex items-center justify-center gap-2 mb-5 cursor-pointer select-none relative"
      onMouseEnter={handleHoverStart}
      onMouseLeave={handleHoverEnd}
      onClick={handleClick}
      style={{ perspective: '500px' }}
    >
      {/* Shimmer effect overlay on hover */}
      {isHovered && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none"
          initial={{ x: '-100%' }}
          animate={{ x: '100%' }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          style={{ borderRadius: '9999px' }}
        />
      )}

      {/* Icon */}
      <span
        ref={iconRef}
        className="material-symbols-outlined text-[var(--color-sandybrown-100)] text-sm lg:text-lg relative z-10"
        style={{ transform: 'rotate(-90deg)' }}
      >
        local_offer
      </span>

      {/* Text */}
      <p className="text-white/80 font-medium text-[12px] sm:text-sm lg:text-[15px] tracking-wide relative z-10">
        Early Bird Benefit up to{' '}
        <span
          ref={textRef}
          className="font-bold inline-block"
          style={{ color: 'var(--color-sandybrown-100)' }}
        >
          ₹5 Lakhs
        </span>
      </p>

      {/* Click counter for fun (remove in production) */}
      {clickCount > 0 && (
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute -bottom-4 text-[8px] text-[var(--color-sandybrown-100)]/60"
        >
          🎉 {clickCount}x
        </motion.span>
      )}
    </div>
  );
}

/**
 * GSAP Variant - lightweight replacement without icon-font dependency
 */

import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { SymbolIcon } from '../../SymbolIcon';

export function GSAPVariant() {
  const containerRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

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
      },
    );

    return () => idleAnimation.cancel();
  }, []);

  const animateHover = (entering: boolean) => {
    const icon = iconRef.current;
    const text = textRef.current;

    if (icon) {
      icon.animate(
        entering
          ? [
              { transform: 'rotate(-90deg) scale(1)' },
              { transform: 'rotate(-90deg) scale(1.3)', filter: 'drop-shadow(0 0 12px rgba(214, 165, 84, 0.8))' },
              { transform: 'rotate(-90deg) scale(1.2)' },
            ]
          : [
              { transform: 'rotate(-90deg) scale(1.2)', filter: 'drop-shadow(0 0 12px rgba(214, 165, 84, 0.8))' },
              { transform: 'rotate(-90deg) scale(1)', filter: 'drop-shadow(none)' },
            ],
        {
          duration: entering ? 600 : 300,
          easing: 'ease-out',
          fill: 'forwards',
        },
      );
    }

    if (text) {
      text.animate(
        entering
          ? [
              { transform: 'scale(1)', filter: 'brightness(1)' },
              { transform: 'scale(1.08)', filter: 'brightness(1.3)' },
              { transform: 'scale(1.05)', filter: 'brightness(1.2)' },
            ]
          : [
              { transform: 'scale(1.05)', filter: 'brightness(1.2)' },
              { transform: 'scale(1)', filter: 'brightness(1)' },
            ],
        {
          duration: 300,
          easing: 'ease-out',
          fill: 'forwards',
        },
      );
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative flex cursor-pointer select-none items-center justify-center gap-2 mb-5"
      onMouseEnter={() => {
        setIsHovered(true);
        animateHover(true);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        animateHover(false);
      }}
      style={{ perspective: '500px' }}
    >
      {isHovered ? (
        <motion.div
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
          initial={{ x: '-100%' }}
          animate={{ x: '100%' }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          style={{ borderRadius: '9999px' }}
        />
      ) : null}

      <div
        ref={iconRef}
        className="relative z-10 text-[var(--color-sandybrown-100)]"
        style={{ transform: 'rotate(-90deg)' }}
      >
        <SymbolIcon name="local_offer" className="h-4 w-4 lg:h-5 lg:w-5" />
      </div>

      <p className="relative z-10 text-white/80 font-medium text-[12px] tracking-wide sm:text-sm lg:text-[15px]">
        Early Bird Benefit up to{' '}
        <span ref={textRef} className="inline-block font-bold" style={{ color: 'var(--color-sandybrown-100)' }}>
          Rs. 5 Lakhs
        </span>
      </p>
    </div>
  );
}

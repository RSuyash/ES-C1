/**
 * Motion Variant - hover-led premium motion
 */

import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { SymbolIcon } from '../../SymbolIcon';

export function MotionVariant() {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobileAnimating, setIsMobileAnimating] = useState(false);

  useEffect(() => {
    if (!isMobileAnimating) {
      return;
    }

    const timer = setTimeout(() => setIsMobileAnimating(false), 2000);
    return () => clearTimeout(timer);
  }, [isMobileAnimating]);

  const isActive = isHovered || isMobileAnimating;

  return (
    <motion.div
      className="relative mb-5 flex cursor-pointer items-center justify-center gap-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setIsMobileAnimating(true)}
      animate={{ scale: isActive ? 1.05 : 1 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <motion.div
        animate={{
          rotate: isActive ? [0, -10, 10, 0] : -90,
          scale: isActive ? 1.3 : 1,
        }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        <SymbolIcon
          name="local_offer"
          className="h-4 w-4 text-[var(--color-sandybrown-100)] lg:h-5 lg:w-5"
          style={{
            filter: isActive ? 'drop-shadow(0 0 8px rgba(214, 165, 84, 0.6))' : 'none',
          }}
        />
      </motion.div>

      <motion.p
        className="text-white/80 font-medium text-[12px] tracking-wide sm:text-sm lg:text-[15px]"
        animate={{ color: isActive ? '#fff' : 'rgba(255, 255, 255, 0.8)' }}
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
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        >
          Rs. 5 Lakhs
        </motion.span>
      </motion.p>
    </motion.div>
  );
}

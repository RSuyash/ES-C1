import { motion } from 'motion/react';

export function HeroBrandMomentumStrip() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
      className="relative mb-7 w-full overflow-hidden rounded-[18px] border border-[var(--color-sandybrown-100)]/12 bg-white/[0.025] px-4 py-3 sm:px-5 sm:py-3.5"
    >
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.12)] to-transparent"
        animate={{ x: ['0%', '260%'] }}
        transition={{ duration: 4.8, repeat: Infinity, repeatDelay: 1.2, ease: 'easeInOut' }}
      />

      <div className="relative flex items-center justify-center gap-3 text-center">
        <div className="h-px flex-1 max-w-[56px] bg-gradient-to-r from-transparent to-white/12" />
        <p className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--color-sandybrown-100)]/90">
          Many More Big Brands Coming
        </p>
        <div className="h-px flex-1 max-w-[56px] bg-gradient-to-l from-transparent to-white/12" />
      </div>
    </motion.div>
  );
}

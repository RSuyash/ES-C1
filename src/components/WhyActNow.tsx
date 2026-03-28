import { useRef } from 'react';
import { motion, useInView } from 'motion/react';

const urgencyPoints = [
  {
    id: '01',
    title: 'Early Bird Advantage',
    desc: 'You can unlock up to ₹5 Lakhs in early bird and spot booking benefits.',
    icon: 'local_offer',
  },
  {
    id: '02',
    title: 'Nearing Possession',
    desc: 'With possession approaching, you enter at a stage where decision confidence is stronger and waiting time is lower.',
    icon: 'schedule',
  },
  {
    id: '03',
    title: 'Better Units Move First',
    desc: 'With 250+ bookings already done, the best-matched inventory may not remain available for long.',
    icon: 'trending_up',
  },
  {
    id: '04',
    title: 'A Smarter Entry Point',
    desc: 'This is where pricing, location growth, and project traction come together to create a stronger buying opportunity.',
    icon: 'insights',
  },
];

export default function WhyActNow({ onOpenWizard }: { onOpenWizard: () => void }) {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section
      ref={sectionRef}
      className="py-24 lg:py-32 px-6 md:px-12 bg-[#030710] relative overflow-hidden border-t border-white/5"
    >
      {/* Ambient light */}
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[var(--color-sandybrown-100)]/5 rounded-full blur-[200px] pointer-events-none" />
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-[var(--color-sandybrown-100)]/3 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-[1200px] mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 lg:mb-20"
        >
          <h2 className="font-headline text-[28px] sm:text-[38px] lg:text-[46px] font-extrabold text-white tracking-tight mb-4 leading-[1.1]">
            Why This Is the Right Time to{' '}
            <span className="text-[var(--color-sandybrown-100)]">Act</span>
          </h2>
          <div className="w-20 h-[3px] bg-gradient-to-r from-[var(--color-sandybrown-100)] to-transparent rounded-full" />
        </motion.div>

        {/* Staggered Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {urgencyPoints.map((point, idx) => (
            <motion.div
              key={point.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: 0.15 * idx,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={`group relative ${idx % 2 === 1 ? 'md:translate-y-8' : ''}`}
            >
              <div className="relative rounded-[1.25rem] border border-white/[0.06] bg-[#080d15]/80 backdrop-blur-md p-7 lg:p-9 overflow-hidden hover:border-[var(--color-sandybrown-100)]/20 transition-all duration-500 h-full">
                {/* Hover glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-sandybrown-100)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10">
                  {/* Top row: number + icon */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-[var(--color-sandybrown-100)]/10 border border-[var(--color-sandybrown-100)]/15 flex items-center justify-center group-hover:bg-[var(--color-sandybrown-100)]/20 group-hover:border-[var(--color-sandybrown-100)]/30 transition-all duration-500">
                      <span className="material-symbols-outlined text-[var(--color-sandybrown-100)] text-xl">
                        {point.icon}
                      </span>
                    </div>
                    <span className="font-mono text-xs font-bold tracking-[0.2em] text-white/15 group-hover:text-[var(--color-sandybrown-100)]/30 transition-colors">
                      {point.id}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-headline text-xl lg:text-[22px] font-bold text-white mb-3 leading-tight group-hover:text-[var(--color-sandybrown-100)] transition-colors duration-300">
                    {point.title}
                  </h3>

                  {/* Description */}
                  <p className="font-body text-[14px] lg:text-[15px] text-white/55 leading-relaxed group-hover:text-white/75 transition-colors duration-300">
                    {point.desc}
                  </p>
                </div>

                {/* Giant bg number */}
                <span className="absolute -bottom-6 -right-2 font-mono text-[120px] font-black leading-none text-white/[0.015] pointer-events-none select-none">
                  {point.id}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-14 lg:mt-20 text-center"
        >
          <button
            type="button"
            onClick={onOpenWizard}
            className="inline-flex items-center gap-3 px-10 py-4 rounded-full bg-[var(--color-sandybrown-100)] text-black font-bold text-sm uppercase tracking-[0.12em] hover:bg-white transition-colors duration-300 shadow-[0_0_40px_rgba(214,165,84,0.2)]"
          >
            Begin Your Commercial Inquiry
            <span className="material-symbols-outlined text-lg">arrow_forward</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}

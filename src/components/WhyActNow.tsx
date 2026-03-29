import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { SymbolIcon } from './SymbolIcon';

const urgencyPoints = [
  {
    id: '01',
    title: 'Early Bird Advantage',
    desc: 'You can unlock up to ₹5 Lakhs in early bird and spot booking benefits.',
    icon: 'local_offer',
    colSpan: 'md:col-span-2 lg:col-span-8',
    rowSpan: 'lg:row-span-1',
    // Abstract geometric representation of a tag/discount
    art: (
      <svg viewBox="0 0 200 100" className="absolute -right-10 -bottom-10 w-64 h-32 opacity-20 group-hover:opacity-40 transition-opacity duration-700 pointer-events-none">
        <path d="M50 20L150 20L180 50L150 80L50 80Z" fill="url(#goldGradient)" />
        <circle cx="70" cy="50" r="10" fill="#080d15" />
      </svg>
    )
  },
  {
    id: '02',
    title: 'Possession in 9 Months',
    desc: 'With possession approaching, you enter at a stage where decision confidence is stronger and waiting time is heavily reduced.',
    icon: 'schedule',
    colSpan: 'md:col-span-1 lg:col-span-4',
    rowSpan: 'lg:row-span-2',
    // Abstract representation of an hourglass / time moving
    art: (
      <svg viewBox="0 0 100 200" className="absolute -bottom-20 -right-20 w-64 h-[120%] opacity-15 group-hover:scale-110 group-hover:opacity-30 transition-all duration-700 pointer-events-none">
        <path d="M20 20L80 20L50 100L80 180L20 180L50 100Z" stroke="url(#goldGradient)" strokeWidth="2" fill="none" />
        <circle cx="50" cy="150" r="15" fill="var(--color-sandybrown-100)" opacity="0.5" className="animate-pulse" />
      </svg>
    )
  },
  {
    id: '03',
    title: 'Better Units Move First',
    desc: 'With 250+ bookings already done, the best-matched inventory may not remain available for long. Premium frontage disappears exactly here.',
    icon: 'trending_up',
    colSpan: 'md:col-span-1 lg:col-span-4',
    rowSpan: 'lg:row-span-1',
    // Abstract representation of upward trending blocks
    art: (
      <svg viewBox="0 0 100 100" className="absolute bottom-0 right-0 w-40 h-40 opacity-20 group-hover:-translate-y-4 group-hover:opacity-40 transition-all duration-700 pointer-events-none">
        <rect x="60" y="20" width="20" height="80" fill="url(#goldGradient)" opacity="0.8" />
        <rect x="30" y="50" width="20" height="50" fill="url(#goldGradient)" opacity="0.5" />
        <rect x="0" y="70" width="20" height="30" fill="url(#goldGradient)" opacity="0.3" />
      </svg>
    )
  },
  {
    id: '04',
    title: 'A Smarter Entry Point',
    desc: 'This is where pricing, location growth, and project traction come together to create a mathematically stronger opportunity.',
    icon: 'insights',
    colSpan: 'md:col-span-2 lg:col-span-4',
    rowSpan: 'lg:row-span-1',
    // Abstract intersection graph
    art: (
      <svg viewBox="0 0 150 100" className="absolute -bottom-10 right-0 w-48 h-32 opacity-20 group-hover:opacity-40 group-hover:scale-105 transition-all duration-700 pointer-events-none">
        <path d="M0 80Q50 20 100 50T150 10" stroke="url(#goldGradient)" strokeWidth="3" fill="none" />
        <path d="M0 90Q60 70 90 90T150 40" stroke="white" strokeWidth="1" opacity="0.5" fill="none" />
      </svg>
    )
  },
];

export default function WhyActNow({ onOpenWizard }: { onOpenWizard: () => void }) {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section
      ref={sectionRef}
      className="py-24 lg:py-32 px-6 md:px-12 bg-[#020408] relative overflow-hidden border-t border-white/5"
    >
      {/* Universal SVG Defs for Art */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#d6a554" />
            <stop offset="100%" stopColor="#8c6c37" />
          </linearGradient>
        </defs>
      </svg>

      {/* Ambient lighting architecture */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[var(--color-sandybrown-100)]/5 rounded-full blur-[180px] pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-0 left-[-20%] w-[600px] h-[600px] bg-[#091124] rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto relative z-10">
        
        {/* Header Block */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 lg:mb-24 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex-1"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="h-[1px] w-12 bg-[var(--color-sandybrown-100)]"></div>
              <span className="text-[var(--color-sandybrown-100)] font-bold text-xs tracking-[0.2em] uppercase">The Strategic Window</span>
            </div>
            <h2 className="font-headline text-[36px] sm:text-[48px] lg:text-[64px] font-extrabold text-white tracking-tight leading-[1.05]">
              Why This Is the <br className="hidden lg:block"/>
              Right Time to <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-sandybrown-100)] to-[#fcd99a]">Act.</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="lg:w-[400px]"
          >
            <p className="text-white/60 text-sm lg:text-base leading-relaxed border-l-2 border-white/10 pl-6">
              Market dynamics and project lifecycles create narrow windows of maximum ROI. Entering now specifically leverages the compounding effects of pre-possession pricing and premium availability.
            </p>
          </motion.div>
        </div>

        {/* Premium Asymmetric Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5 lg:gap-6 auto-rows-[320px]">
          {urgencyPoints.map((point, idx) => (
            <motion.div
              key={point.id}
              initial={{ opacity: 0, y: 40, scale: 0.98 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{
                duration: 0.8,
                delay: 0.1 * idx + 0.3,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={`group relative rounded-[2rem] border border-[var(--color-sandybrown-100)]/10 bg-gradient-to-b from-[#0a0f1a] to-[#04060b] overflow-hidden hover:border-[var(--color-sandybrown-100)]/30 transition-all duration-700 hover:shadow-[0_20px_60px_-15px_rgba(214,165,84,0.15)] ${point.colSpan} ${point.rowSpan}`}
            >
              {/* Dynamic glass hover orb */}
              <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[var(--color-sandybrown-100)]/0 rounded-full blur-[80px] group-hover:bg-[var(--color-sandybrown-100)]/10 transition-colors duration-700 pointer-events-none transform -translate-y-1/2 translate-x-1/2" />

              {/* Abstract Artwork Component */}
              {point.art}

              <div className="relative z-10 p-10 lg:p-12 h-full flex flex-col">
                <div className="flex items-start justify-between mb-auto">
                  <div className="w-14 h-14 rounded-2xl bg-[#111724] border border-white/5 flex items-center justify-center group-hover:bg-[var(--color-sandybrown-100)] group-hover:scale-110 transition-all duration-500 shadow-xl">
                    <SymbolIcon
                      name={point.icon}
                      className="h-8 w-8 text-[var(--color-sandybrown-100)] transition-colors duration-500 group-hover:text-[#020408]"
                    />
                  </div>
                  <span className="font-mono text-[40px] font-black tracking-tighter text-white/[0.03] group-hover:text-[var(--color-sandybrown-100)]/20 transition-colors duration-500 leading-none">
                    {point.id}
                  </span>
                </div>

                <div className="mt-8">
                  <h3 className="font-headline text-2xl lg:text-[28px] font-bold text-white mb-4 leading-tight group-hover:text-[var(--color-sandybrown-100)] transition-colors duration-500">
                    {point.title}
                  </h3>
                  <p className="font-body text-[15px] lg:text-[16px] text-white/50 leading-relaxed group-hover:text-white/80 transition-colors duration-500 max-w-[85%]">
                    {point.desc}
                  </p>
                </div>
              </div>

              {/* Bottom accent line on hover */}
              <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-transparent via-[var(--color-sandybrown-100)] to-transparent group-hover:w-full transition-all duration-1000 ease-out opacity-0 group-hover:opacity-100" />
            </motion.div>
          ))}
        </div>

        {/* Action Trigger Block - Golden CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mt-20 flex justify-center"
        >
          <button
            type="button"
            onClick={onOpenWizard}
            className="group relative px-8 py-4 bg-[var(--color-sandybrown-100)] text-black font-bold uppercase tracking-[0.15em] text-[12px] sm:text-[13px] rounded-full overflow-hidden transition-all duration-500 hover:shadow-[0_0_40px_rgba(214,165,84,0.6)] hover:scale-[1.02] active:scale-[0.98]"
          >
            {/* Animated shimmer effect */}
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
            
            {/* Inner glow */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[var(--color-sandybrown-100)] via-[#fcd99a] to-[var(--color-sandybrown-100)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Content */}
            <span className="relative z-10 flex items-center gap-3">
              <SymbolIcon name="calendar_today" className="h-5 w-5 transition-transform duration-300 group-hover:rotate-12" />
              Schedule a Site Visit
              <SymbolIcon name="arrow_forward" className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </span>

            {/* Particle sparkles on hover */}
            <div className="absolute -top-1 -left-1 w-2 h-2 bg-white rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-[ping_1s_ease-in-out_infinite]" />
            <div className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-[var(--color-sandybrown-100)] rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-[ping_1.2s_ease-in-out_infinite]" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}

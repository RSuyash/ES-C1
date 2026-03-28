import React, { useRef, useState } from 'react';
import { motion, useInView } from 'motion/react';

const pricingTiers = [
  {
    id: '01',
    title: 'Premium Showrooms',
    area: '330 – 660 sq.ft.',
    priceRange: '₹90 Lakhs to ₹1.70 Cr',
    icon: 'domain',
    accent: 'from-amber-500/20 to-yellow-600/5',
    features: ['Double-height options', 'Maximum road visibility', 'Premium frontage'],
  },
  {
    id: '02',
    title: 'B-Type Showrooms',
    area: '180 – 200 sq.ft.',
    priceRange: '₹50 Lakhs to ₹70 Lakhs',
    icon: 'storefront',
    accent: 'from-amber-400/15 to-orange-500/5',
    features: ['Compact premium format', 'High footfall zone', 'Ideal for brand outlets'],
  },
  {
    id: '03',
    title: 'Shops',
    area: '250 – 500 sq.ft.',
    priceRange: '₹50 Lakhs to ₹80 Lakhs',
    icon: 'shopping_bag',
    accent: 'from-yellow-500/15 to-amber-600/5',
    features: ['Versatile retail spaces', 'Strategic positioning', 'Customer-facing layout'],
  },
  {
    id: '04',
    title: 'Office Spaces',
    area: '130 – 250 sq.ft.',
    priceRange: '₹35 Lakhs to ₹50 Lakhs',
    icon: 'business_center',
    accent: 'from-orange-400/15 to-amber-500/5',
    features: ['Smart office design', 'High-speed fibre ready', 'Professional environment'],
  },
];

type PricingCardProps = {
  tier: (typeof pricingTiers)[0];
  index: number;
  onEnquire: () => void;
};

function PricingCard({
  tier,
  index,
  onEnquire,
}: PricingCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const isInView = useInView(cardRef, { once: true, margin: '-60px' });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setMousePos({ x, y });
  };

  const rotateX = isHovered ? (mousePos.y - 0.5) * -12 : 0;
  const rotateY = isHovered ? (mousePos.x - 0.5) * 12 : 0;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        perspective: 800,
      }}
      className="group"
    >
      <motion.div
        animate={{
          rotateX,
          rotateY,
          scale: isHovered ? 1.02 : 1,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="relative h-full rounded-[1.5rem] border border-white/[0.06] bg-[#080d15]/90 backdrop-blur-xl overflow-hidden"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Glare effect */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10"
          style={{
            background: isHovered
              ? `radial-gradient(600px circle at ${mousePos.x * 100}% ${mousePos.y * 100}%, rgba(214,165,84,0.12), transparent 50%)`
              : 'none',
          }}
        />

        {/* Top accent gradient */}
        <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${tier.accent} opacity-60 group-hover:opacity-100 transition-opacity duration-500`} />

        {/* Content */}
        <div className="relative z-20 p-7 lg:p-9 flex flex-col h-full">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div className="w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center text-[var(--color-sandybrown-100)]/70 group-hover:text-[var(--color-sandybrown-100)] group-hover:border-[var(--color-sandybrown-100)]/20 group-hover:bg-[var(--color-sandybrown-100)]/10 transition-all duration-500">
              <span className="material-symbols-outlined text-2xl">{tier.icon}</span>
            </div>
            <span className="font-mono text-xs font-bold tracking-[0.25em] text-white/20 group-hover:text-[var(--color-sandybrown-100)]/40 transition-colors duration-500">
              {tier.id}
            </span>
          </div>

          {/* Title */}
          <h3 className="font-headline text-xl lg:text-[22px] font-bold text-white mb-1.5 leading-tight group-hover:text-[var(--color-sandybrown-100)] transition-colors duration-300">
            {tier.title}
          </h3>

          {/* Area */}
          <p className="font-body text-white/40 text-sm mb-6">{tier.area}</p>

          {/* Divider */}
          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent mb-6" />

          {/* Price */}
          <div className="mb-6">
            <span className="text-[10px] font-label uppercase tracking-[0.2em] text-[var(--color-sandybrown-100)]/60 mb-1.5 block">
              Investment Range
            </span>
            <span className="font-headline text-2xl lg:text-[26px] font-extrabold text-white tracking-tight leading-tight drop-shadow-sm">
              {tier.priceRange}
            </span>
          </div>

          {/* Features */}
          <ul className="space-y-2.5 mb-8 flex-1">
            {tier.features.map((f) => (
              <li key={f} className="flex items-center gap-2.5 text-sm text-white/50 group-hover:text-white/70 transition-colors">
                <span className="material-symbols-outlined text-[var(--color-sandybrown-100)]/50 text-[14px]">check</span>
                {f}
              </li>
            ))}
          </ul>

          {/* CTA */}
          <button
            type="button"
            onClick={onEnquire}
            className="w-full py-3.5 rounded-xl border border-white/[0.08] bg-white/[0.02] text-white/80 font-medium text-sm tracking-wide hover:bg-[var(--color-sandybrown-100)] hover:text-black hover:border-[var(--color-sandybrown-100)] transition-all duration-300 group-hover:border-[var(--color-sandybrown-100)]/30"
          >
            Enquire Now
          </button>
        </div>

        {/* Giant watermark number */}
        <span className="absolute -bottom-8 -right-4 font-mono text-[160px] font-black leading-none text-white/[0.015] pointer-events-none select-none">
          {tier.id}
        </span>
      </motion.div>
    </motion.div>
  );
}

export default function PricingSection({ onOpenWizard }: { onOpenWizard: () => void }) {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section
      ref={sectionRef}
      className="py-24 lg:py-32 px-6 md:px-12 bg-[#020408] border-t border-white/5 relative overflow-hidden"
    >
      {/* Ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[var(--color-sandybrown-100)]/8 via-transparent to-transparent pointer-events-none z-0" />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-[1400px] mx-auto relative z-10 text-center mb-14 lg:mb-20"
      >
        <h2 className="font-headline text-[30px] sm:text-[40px] lg:text-[48px] font-extrabold text-white tracking-tight mb-4 leading-[1.1] drop-shadow-lg">
          Pricing That{' '}
          <span className="text-[var(--color-sandybrown-100)]">Rewards</span> Early
          Decision-Makers
        </h2>
        <div className="flex items-center justify-center gap-4 mt-6 mb-2">
          <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[var(--color-sandybrown-100)]/40" />
          <span className="material-symbols-outlined text-[var(--color-sandybrown-100)]/40 text-sm">diamond</span>
          <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[var(--color-sandybrown-100)]/40" />
        </div>
      </motion.div>

      {/* 2x2 Grid */}
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 sm:grid-cols-2 gap-5 lg:gap-7 relative z-10">
        {pricingTiers.map((tier, idx) => (
          <div key={tier.id}>
            <PricingCard tier={tier} index={idx} onEnquire={onOpenWizard} />
          </div>
        ))}
      </div>

      {/* Bottom CTAs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="max-w-[1200px] mx-auto mt-12 lg:mt-16 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 relative z-10"
      >
        <button
          type="button"
          onClick={onOpenWizard}
          className="flex items-center gap-2.5 px-8 py-3.5 rounded-xl bg-[var(--color-sandybrown-100)] text-black font-bold text-sm uppercase tracking-widest hover:bg-white transition-colors duration-300 shadow-[0_0_30px_rgba(214,165,84,0.2)]"
        >
          <span className="material-symbols-outlined text-lg">download</span>
          Download Floor Plan
        </button>
        <button
          type="button"
          onClick={onOpenWizard}
          className="flex items-center gap-2.5 px-8 py-3.5 rounded-xl border border-white/10 text-white/70 font-bold text-sm uppercase tracking-widest hover:border-[var(--color-sandybrown-100)]/40 hover:text-[var(--color-sandybrown-100)] transition-all duration-300"
        >
          <span className="material-symbols-outlined text-lg">menu_book</span>
          Download Brochure
        </button>
      </motion.div>
    </section>
  );
}

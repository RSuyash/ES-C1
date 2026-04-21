import React, { useRef, useState } from 'react';
import { motion, useInView } from 'motion/react';
import { SymbolIcon } from './SymbolIcon';

const businessFeatures = [
  {
    icon: 'groups',
    title: '45,000+ Expected Footfall',
    description: 'At Wagholi Highstreet, you get the advantage of 45,000+ expected footfall, giving your shop, showroom, or office stronger exposure and better business potential.',
  },
  {
    icon: 'storefront',
    title: 'Stronger Brand Presence',
    description: 'The value of the destination rises. With McDonald\'s, Barbeque Nation, and CinePro already signed, you become part of a commercial environment that naturally attracts more attention, stronger confidence, and higher market interest.',
  },
  {
    icon: 'local_parking',
    title: 'Offer Greater Convenience',
    description: 'At Wagholi Highstreet, you get 3.5-acre dedicated parking, so your customers, employees, and visitors experience easier access and a more comfortable business environment.',
  },
  {
    icon: 'trending_up',
    title: 'Invest in Strong ROI Potential',
    description: 'With 9% to 12% expected ROI potential in one of Pune\'s fastest-growing commercial corridors, Wagholi Highstreet offers a lucrative investment opportunity.',
  },
  {
    icon: 'location_on',
    title: 'Wagholi Link Road Location',
    description: 'Positioned strategically on Wagholi Link Road, offering unparalleled connectivity and visibility in one of Pune\'s most rapidly developing commercial hubs.',
  },
  {
    icon: 'architecture',
    title: 'Future-Ready Infrastructure',
    description: 'Designed with modern businesses in mind, featuring state-of-the-art facilities, high-speed connectivity, and sustainable architecture for long-term growth.',
  },
];

function FeatureCard({
  icon,
  title,
  description,
  index,
  onOpenWizard,
}: {
  icon: string;
  title: string;
  description: string;
  index: number;
  onOpenWizard: () => void;
}) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: '-50px' });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        duration: 0.4,
        delay: index * 0.05,
        ease: 'easeOut',
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onOpenWizard}
      className="relative bg-[#070b12] border border-[var(--color-sandybrown-100)]/10 rounded-2xl p-6 lg:p-8 overflow-hidden group h-full flex flex-col hover:border-[var(--color-sandybrown-100)]/30 transition-colors duration-500 shadow-lg will-change-transform cursor-pointer"
    >
      {/* Dynamic Hover Glow Effect */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-500 group-hover:opacity-100"
        animate={{
          background: isHovered
            ? `radial-gradient(500px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(214, 165, 84, 0.12), transparent 40%)`
            : `radial-gradient(500px circle at 0px 0px, rgba(214, 165, 84, 0), transparent 40%)`,
        }}
      />

      {/* Decorative Top Edge Gradient */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[var(--color-sandybrown-100)]/0 to-transparent group-hover:via-[var(--color-sandybrown-100)]/80 transition-all duration-700 opacity-0 group-hover:opacity-100" />

      <div className="relative z-10 flex-1 flex flex-col">
        {/* Animated Icon */}
        <div className="w-14 h-14 bg-gradient-to-br from-[var(--color-black-400)] to-[#111827] rounded-xl flex items-center justify-center mb-6 shadow-inner border border-white/5 group-hover:bg-[var(--color-sandybrown-100)]/10 group-hover:border-[var(--color-sandybrown-100)]/30 transition-all duration-500">
          <motion.div
            animate={isHovered ? { scale: [1, 1.2, 1], rotate: [0, -5, 5, 0] } : {}}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
          >
            <SymbolIcon name={icon} className="h-8 w-8 text-[var(--color-sandybrown-100)]" />
          </motion.div>
        </div>

        {/* Content Typography */}
        <h3 className="font-headline text-[18px] lg:text-[22px] font-bold text-white mb-3 tracking-wide leading-tight group-hover:text-[var(--color-sandybrown-100)] transition-colors duration-300">
          {title}
        </h3>
        <p className="font-body text-[14px] lg:text-[15px] text-white/50 group-hover:text-white/80 leading-relaxed flex-1 transition-colors duration-300">
          {description}
        </p>
      </div>

      {/* Subtle bottom arrow / indicator to show interactivity */}
      <div className="mt-6 flex items-center text-[var(--color-sandybrown-100)]/0 group-hover:text-[var(--color-sandybrown-100)] transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
        <span className="text-[11px] uppercase tracking-widest font-bold">Schedule A Site Visit</span>
        <SymbolIcon name="arrow_forward" className="ml-1 h-4 w-4" />
      </div>
    </motion.div>
  );
}

export default function WhyBusinessesSection({ onOpenWizard }: { onOpenWizard?: () => void }) {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section ref={sectionRef} className="relative h-auto lg:h-auto pt-12 pb-16 lg:pt-16 lg:pb-40 px-6 md:px-12 bg-[#020408] border-t border-white/5 overflow-hidden">
      {/* Top gradient fade from Hero section - smooth dark blue transition */}
      <div className="absolute top-0 left-0 right-0 h-[400px] bg-gradient-to-b from-[var(--color-black-200)]/80 via-[#060a14] to-[#020408] z-0 pointer-events-none"></div>

      {/* Advanced CSS Grid Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.3]"
             style={{
               backgroundImage: 'linear-gradient(var(--color-sandybrown-100) 1px, transparent 1px), linear-gradient(90deg, var(--color-sandybrown-100) 1px, transparent 1px)',
               backgroundSize: '40px 40px',
               maskImage: 'radial-gradient(ellipse 100% 100% at 50% 50%, black 30%, transparent 80%), linear-gradient(to bottom, black 0%, black 60%, transparent 100%)',
               WebkitMaskImage: 'radial-gradient(ellipse 100% 100% at 50% 50%, black 30%, transparent 80%), linear-gradient(to bottom, black 0%, black 60%, transparent 100%)'
             }}
        />
        {/* Diagonal feathered blend transition to next section */}
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-b from-[#020408] via-[#050810] to-[#0b1222] opacity-90"></div>
        {/* Giant ambient color orbs built for premium feel */}
        <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-[var(--color-black-200)] via-[var(--color-sandybrown-100)]/5 to-transparent"></div>
        <div className="absolute -left-1/4 top-1/4 w-[800px] h-[800px] bg-[var(--color-sandybrown-100)]/5 rounded-full blur-[150px]"></div>
        <div className="absolute -right-1/4 bottom-0 w-[600px] h-[600px] bg-[#080d15] rounded-full blur-[150px]"></div>
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto pt-32">
        {/* Section Header with Staggered Entrance */}
        <div className="mb-16 lg:mb-24 w-full flex flex-col items-center text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="flex items-center justify-center gap-3 mb-6"
          >
            <div className="h-[1px] w-8 bg-[var(--color-sandybrown-100)]/40" />
            <span className="text-[10px] uppercase tracking-[0.3em] text-[var(--color-sandybrown-100)] font-bold">The Strategic Advantage</span>
            <div className="h-[1px] w-8 bg-[var(--color-sandybrown-100)]/40" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="font-headline text-[32px] sm:text-[42px] lg:text-[54px] font-extrabold text-white tracking-tight mb-6 leading-[1.1]"
          >
            Why Businesses & Investors<br className="hidden md:block"/> Are Choosing <span className="text-[var(--color-sandybrown-100)] italic">Wagholi Highstreet</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="font-body text-[16px] lg:text-[18px] text-white/50 leading-relaxed max-w-2xl px-4 md:px-0"
          >
            At Wagholi Highstreet, you do not just buy a commercial space — you position your business in a fast-growing corridor with the visibility, convenience, and long-term potential that serious businesses and investors look for.
          </motion.p>
        </div>

        {/* Dynamic Bento/Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 auto-rows-fr">
          {businessFeatures.map((feature, idx) => (
            <div key={feature.title} className="h-full">
              <FeatureCard
                index={idx}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                onOpenWizard={onOpenWizard || (() => {})}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import React, { useRef, useState } from 'react';
import { motion, useInView } from 'motion/react';

const businessFeatures = [
  {
    icon: 'groups',
    title: '45,000+ Expected Footfall',
    description: 'At Wagholi Highstreet, you get the advantage of 45,000+ expected footfall, giving your shop, showroom, or office stronger exposure and better business potential.',
  },
  {
    icon: 'storefront',
    title: 'Stronger Brand Presence',
    description: 'The value of the destination rises. With McDonald\'s and CinePro already signed, you become part of a commercial environment that naturally attracts more attention, stronger confidence, and higher market interest.',
  },
  {
    icon: 'local_parking',
    title: 'Offer Greater Convenience',
    description: 'At Wagholi Highstreet, you get 3 acres of dedicated parking, so your customers, employees, and visitors experience easier access and a more comfortable business environment.',
  },
  {
    icon: 'trending_up',
    title: 'Invest in Strong ROI Potential',
    description: 'With 7%–9% expected ROI potential in one of Pune\'s fastest-growing commercial corridors, Wagholi Highstreet offers a lucrative investment opportunity.',
  },
  {
    icon: 'location_on',
    title: 'Prime Kesnand Road Location',
    description: 'Positioned strategically on Kesnand Road, offering unparalleled connectivity and visibility in one of Pune\'s most rapidly developing commercial hubs.',
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
}: {
  icon: string;
  title: string;
  description: string;
  index: number;
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
        duration: 0.8,
        delay: index * 0.15,
        ease: [0.22, 1, 0.36, 1],
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative bg-[#0b101a]/90 backdrop-blur-2xl border border-[var(--color-sandybrown-100)]/10 rounded-2xl p-6 lg:p-8 overflow-hidden group h-full flex flex-col hover:border-[var(--color-sandybrown-100)]/30 transition-colors duration-500 shadow-lg"
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
          <motion.span
            animate={isHovered ? { scale: [1, 1.2, 1], rotate: [0, -5, 5, 0] } : {}}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            className="material-symbols-outlined text-[var(--color-sandybrown-100)] text-3xl"
          >
            {icon}
          </motion.span>
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
        <span className="text-[11px] uppercase tracking-widest font-bold">Discover More</span>
        <span className="material-symbols-outlined text-sm ml-1">arrow_forward</span>
      </div>
    </motion.div>
  );
}

export default function WhyBusinessesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section ref={sectionRef} className="relative pt-12 pb-28 lg:pt-16 lg:pb-40 px-6 md:px-12 bg-[#020408] border-t border-white/5 overflow-hidden">
      {/* Advanced SVG Topography Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.7] mix-blend-screen">
            <motion.div
            animate={{
              backgroundPosition: ["0px 0px", "100px 0px"],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute inset-[-50%] h-[200%] w-[200%]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='20' viewBox='0 0 100 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M21.184 20c.357-.13.72-.264 1.088-.402l1.768-.661C33.64 15.347 39.647 14 50 14c10.271 0 15.362 1.222 24.629 4.928.955.383 1.869.74 2.75 1.072h6.225c-2.51-.73-5.139-1.691-8.233-2.928C65.888 13.278 60.562 12 50 12c-10.626 0-16.855 1.397-26.66 5.063l-1.767.662c-2.475.923-4.66 1.674-6.724 2.275h6.335zm0-20C13.258 2.892 8.077 4 0 4V2c5.744 0 9.951-.574 14.85-2h6.334zM42.184 20c-1.14-.49-2.326-1.016-3.58-1.58C33.098 15.86 28.163 14 20 14c-7.949 0-12.722 1.815-18.068 4.223l-1.114.502h6.582c2.083-.872 4.098-1.745 6.1-2.529C17.708 14.653 21.353 14 30 14c8.533 0 12.199.653 16.5 2.196 2.001.784 4.016 1.657 6.099 2.53l1.114-.504c-3.616-1.636-7.382-3.324-11.53-5.221zM50 20c-5.918 0-10.364-1.291-17.749-4.305l-1.146-.468c4.25-1.758 8.169-3.415 12.007-4.896C46.945 9.074 51.523 8 60 8c8.533 0 13.111 1.074 16.888 2.33C80.726 11.815 84.665 13.5 89.066 15.333l-1.146.468C80.535 18.815 76.088 20 70 20h-6.225c-1.71-.564-3.472-1.2-5.321-1.928C52.662 15.69 47.96 14 40 14c-7.854 0-12.433 1.619-18.17 4.072h6.225c1.849-.728 3.51-1.364 5.22-1.928C37.162 14.887 41.74 14 50 14v6zm-40-6c-6.792 0-11.38-1.602-18.156-4.085h6.225C-.082 10.45 1.58 11.086 3.29 11.65 6.94 12.887 11.517 14 20 14c7.854 0 12.551-1.69 18.441-3.96h-6.225C30.364 12.56 26.24 14 20 14h-10zm70 0c6.791 0 11.38-1.602 18.155-4.085h-6.225c-1.848.535-3.51 1.171-5.22 1.735C83.06 12.887 78.483 14 70 14c-7.854 0-12.551-1.69-18.441-3.96h6.225C59.636 12.56 63.76 14 70 14h10zm0-14c-8.533 0-13.111-1.074-16.89-2.332h6.226C61.082.233 65.528 1.291 71.446 4.305l1.146.468c-4.25 1.758-8.169 3.415-12.007 4.896C56.945 10.926 52.367 12 43.834 12c-8.533 0-13.111-1.074-16.888-2.33C23.234 8.185 19.295 6.5 14.894 4.667l1.146-.468C23.425 7.185 27.872 8.353 33.79 11.367l1.145.468c-4.249 1.758-8.168 3.415-12.006 4.896C18.945 15.074 14.367 14 5.834 14V8c8.533 0 13.111-1.074 16.888-2.33C26.465 4.185 30.404 2.5 34.805.667l1.146-.468c-5.836-2.583-10.283-3.874-16.488-7.388h-6.225c1.849.728 3.51 1.364 5.22 1.928M50 0v6c-8.533 0-12.199-.653-16.5-2.196-2.001-.784-4.016-1.657-6.099-2.53l-1.114.504c3.616 1.636 7.382 3.324 11.53 5.221 1.14.49 2.326 1.016 3.58 1.58C46.687 11.892 51.524 13 59.574 13c7.95 0 12.723-1.815 18.069-4.223l1.114-.502h-6.582c-2.083.872-4.098 1.745-6.1 2.529C62.078 11.347 58.433 12 49.784 12h.216z'%20fill='%23d6a554'%20fill-opacity='0.2'%20fill-rule='evenodd'/%3E%3C/svg%3E")`,
              backgroundSize: '150px 30px',
              maskImage: 'radial-gradient(ellipse 90% 80% at 50% 50%, black, transparent)',
              WebkitMaskImage: 'radial-gradient(ellipse 90% 80% at 50% 50%, black, transparent)',
            }}
            />
        </div>
        {/* Giant ambient color orbs built for premium feel */}
        <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-[var(--color-black-200)] via-[var(--color-sandybrown-100)]/5 to-transparent"></div>
        <div className="absolute -left-1/4 top-1/4 w-[800px] h-[800px] bg-[var(--color-sandybrown-100)]/5 rounded-full blur-[150px]"></div>
        <div className="absolute -right-1/4 bottom-0 w-[600px] h-[600px] bg-[#080d15] rounded-full blur-[150px]"></div>
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto">
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
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

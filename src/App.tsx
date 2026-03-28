/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useInView, useScroll, useTransform } from 'motion/react';
import { MapPin, Route, Car, Train, Map as MapIcon, Building2, TrendingUp, Navigation } from 'lucide-react';
import { LeadCaptureForm } from './LeadCaptureForm';

const amenitiesData = [
  {
    id: "01",
    title: "Business Lounge",
    desc: "A premium space for meetings and networking.",
    images: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1556761175-5973dc0f32d7?auto=format&fit=crop&q=80&w=1200"
    ]
  },
  {
    id: "02",
    title: "Co-working Spaces",
    desc: "A dynamic environment for collaboration and growth.",
    images: [
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1531973576160-7125cd663d86?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1200"
    ]
  },
  {
    id: "03",
    title: "Yoga Lounge",
    desc: "A wellness-focused space for a balanced workday.",
    images: [
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=1200"
    ]
  },
  {
    id: "04",
    title: "Game Zone",
    desc: "A refreshing lifestyle addition for teams and visitors.",
    images: [
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1553481187-be93c21490a9?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1534423861386-85a16f5d13fd?auto=format&fit=crop&q=80&w=1200"
    ]
  },
  {
    id: "05",
    title: "Café & Sit-Out",
    desc: "Perfect for breaks, casual meetings, and informal discussions.",
    images: [
      "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1453614512568-c4024d13c247?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=1200"
    ]
  },
  {
    id: "06",
    title: "3 Acres Dedicated Parking",
    desc: "Better convenience for customers, staff, and visitors.",
    images: [
      "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1470224114660-3f6686c562eb?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1573348722427-f1d6819fdf98?auto=format&fit=crop&q=80&w=1200"
    ]
  }
];

function InteractiveAmenities() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);
  const [isInteracting, setIsInteracting] = useState(false);
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { margin: "-20% 0px -20% 0px" });
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Auto-cycle amenities
  useEffect(() => {
    if (isInteracting || !isInView) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => {
        const next = (prev + 1) % amenitiesData.length;
        if (window.innerWidth < 1024 && itemRefs.current[next]) {
          itemRefs.current[next]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        return next;
      });
      setImageIndex(0);
    }, 9000); // 9 seconds per amenity (3 images * 3 seconds)
    return () => clearInterval(interval);
  }, [isInteracting, isInView]);

  // Auto-cycle images within active amenity
  useEffect(() => {
    setImageIndex(0);
    const interval = setInterval(() => {
      setImageIndex((prev) => (prev + 1) % amenitiesData[activeIndex].images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [activeIndex]);

  return (
    <section
      ref={containerRef}
      onMouseEnter={() => setIsInteracting(true)}
      onMouseLeave={() => setIsInteracting(false)}
      onTouchStart={() => setIsInteracting(true)}
      onTouchEnd={() => setIsInteracting(false)}
      className="py-20 lg:py-32 bg-[var(--color-black-200)] relative overflow-hidden"
    >
      {/* Header */}
      <div className="relative z-10 max-w-[1600px] mx-auto px-4 sm:px-6 md:px-12 mb-10 lg:mb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="font-headline text-[32px] sm:text-[42px] lg:text-[56px] font-extrabold text-white tracking-tight mb-6 leading-[1.1]">
            Amenities That Add More Value to Your <span className="text-[var(--color-sandybrown-100)]">Business Address</span>
          </h2>
          <div className="w-24 h-1 bg-[var(--color-sandybrown-100)] mb-8"></div>
          <p className="font-body text-[16px] lg:text-[20px] text-white/70 leading-relaxed max-w-4xl">
            At Wagholi Highstreet, you do not just get a commercial space — you get a more premium and future-ready business environment designed for productivity, comfort, and a better everyday experience for you, your team, and your visitors.
          </p>
        </motion.div>
      </div>

      {/* Expanding Cards Gallery */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 md:px-12 h-[75vh] min-h-[600px] max-h-[800px] flex flex-col lg:flex-row gap-3 lg:gap-5">
        {amenitiesData.map((amenity, idx) => {
          const isActive = activeIndex === idx;
          return (
            <div
              key={amenity.id}
              ref={(el) => { itemRefs.current[idx] = el; }}
              onClick={() => setActiveIndex(idx)}
              onMouseEnter={() => window.innerWidth >= 1024 && setActiveIndex(idx)}
              className={`relative overflow-hidden rounded-2xl lg:rounded-[2rem] cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] flex-shrink-0 lg:flex-shrink ${isActive
                ? 'flex-[5_5_0%] lg:flex-[6_6_0%]'
                : 'flex-[1_1_0%] lg:flex-[1_1_0%]'
                }`}
            >
              {/* Images */}
              {amenity.images.map((img, imgIdx) => (
                <img
                  key={imgIdx}
                  src={img}
                  alt={`${amenity.title} ${imgIdx + 1}`}
                  referrerPolicy="no-referrer"
                  className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ${isActive && imageIndex === imgIdx
                    ? 'opacity-100 scale-100'
                    : (imgIdx === 0 && !isActive ? 'opacity-60 grayscale scale-100' : 'opacity-0 scale-105')
                    }`}
                />
              ))}

              {/* Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-t transition-opacity duration-700 ${isActive
                ? 'from-[var(--color-black-200)]/90 via-[var(--color-black-200)]/30 to-transparent opacity-100'
                : 'from-[var(--color-black-200)]/80 to-[var(--color-black-200)]/40 opacity-100'
                }`}></div>

              {/* Active Content */}
              <div className={`absolute bottom-0 left-0 right-0 p-6 lg:p-10 transition-all duration-700 delay-100 flex flex-col justify-end h-full ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
                }`}>
                <div className="mt-auto">
                  <div className="flex items-center gap-4 mb-3 lg:mb-4">
                    <span className="font-mono text-[var(--color-sandybrown-100)] font-bold tracking-widest text-sm lg:text-base">{amenity.id}</span>
                    <div className="h-[2px] w-8 lg:w-12 bg-[var(--color-sandybrown-100)]"></div>
                  </div>
                  <h3 className="font-headline text-2xl sm:text-3xl lg:text-5xl font-bold text-white mb-3 lg:mb-4">{amenity.title}</h3>
                  <p className="font-body text-sm sm:text-base lg:text-xl text-white/90 max-w-2xl leading-relaxed drop-shadow-lg">{amenity.desc}</p>
                </div>
              </div>

              {/* Inactive Content - Desktop (Vertical Text) */}
              <div className={`hidden lg:flex absolute inset-0 flex-col items-center justify-end pb-12 transition-all duration-700 ${isActive ? 'opacity-0 pointer-events-none' : 'opacity-100 delay-200'
                }`}>
                <h3
                  className="font-headline text-2xl font-bold text-white whitespace-nowrap mb-8 tracking-wider"
                  style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
                >
                  {amenity.title}
                </h3>
                <span className="font-mono text-[var(--color-sandybrown-100)] font-bold text-lg">{amenity.id}</span>
              </div>

              {/* Inactive Content - Mobile (Horizontal Text) */}
              <div className={`flex lg:hidden absolute inset-0 flex-row items-center justify-start px-6 transition-all duration-700 ${isActive ? 'opacity-0 pointer-events-none' : 'opacity-100 delay-200'
                }`}>
                <span className="font-mono text-[var(--color-sandybrown-100)] font-bold mr-4">{amenity.id}</span>
                <h3 className="font-headline text-lg font-bold text-white whitespace-nowrap">{amenity.title}</h3>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

const locationData = [
  { id: 1, title: "Prime Kesnand Road Address", desc: "You place your business in a location that offers stronger visibility and better business relevance.", x: 40, y: 35, icon: MapPin },
  { id: 2, title: "Faster Everyday Connectivity", desc: "The 120 ft. link road improves access by connecting Nagar Road to Solapur Road.", x: 65, y: 25, icon: Route },
  { id: 3, title: "Better Traffic Movement", desc: "The three-storey flyover from Wagholi to Shikrapur helps ease congestion and improve flow.", x: 75, y: 45, icon: Car },
  { id: 4, title: "Metro-Led Growth Potential", desc: "The Ramwadi to Wagholi metro extension adds long-term connectivity and future demand.", x: 25, y: 55, icon: Train },
  { id: 5, title: "Stronger City-Wide Access", desc: "The proposed ring road and Samruddhi corridor are set to boost east-side connectivity.", x: 80, y: 70, icon: MapIcon },
  { id: 6, title: "Close to Major IT Hubs", desc: "With EON IT Park and World Trade Center nearby, you benefit from stronger commercial relevance.", x: 30, y: 75, icon: Building2 },
  { id: 7, title: "A Corridor on the Rise", desc: "Wagholi is rapidly emerging as one of Pune’s strongest growth zones for business and investment.", x: 55, y: 85, icon: TrendingUp },
];

const BackgroundImage = ({ loc, idx, total, scrollYProgress }: any) => {
  const peak = idx / (total - 1);
  const spread = 0.15; // Reduced roughly 10% from 0.3 for a tighter crossfade margin

  let domain, range;
  if (idx === 0) {
    domain = [0, spread];
    range = [0.8, 0];
  } else if (idx === total - 1) {
    domain = [1 - spread, 1];
    range = [0, 0.8];
  } else {
    const start = Math.max(0, peak - spread);
    const end = Math.min(1, peak + spread);
    if (start === peak) {
      domain = [peak, end];
      range = [0.8, 0];
    } else if (end === peak) {
      domain = [start, peak];
      range = [0, 0.8];
    } else {
      domain = [start, peak, end];
      range = [0, 0.8, 0];
    }
  }

  const opacity = useTransform(scrollYProgress, domain, range);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const y = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  return (
    <motion.div
      className="absolute inset-0 w-full h-full z-0"
      style={{ opacity }}
    >
      <motion.img
        src={`/images/location/desktop/${loc.id}.png`}
        className="w-full h-full object-cover hidden md:block"
        style={{ scale, y }}
      />
      <motion.img
        src={`/images/location/mobile/${loc.id}.png`}
        className="w-full h-full object-cover md:hidden"
        style={{ scale, y }}
      />
      {/* Light Dreamy Ambient Tint - Keeps Images Highly Visible */}
      <div className="absolute inset-0 bg-[#020408]/40 backdrop-blur-[2px]"></div>
    </motion.div>
  );
};

const TimelineCard = ({ loc, idx, total, scrollYProgress, isEven }: any) => {
  const Icon = loc.icon;
  const peak = idx / (total - 1);
  const spread = 0.25; // Focus spread distance

  let domain, opacityRange, scaleRange;
  if (idx === 0) {
    domain = [0, spread];
    opacityRange = [1, 0.3];
    scaleRange = [1.02, 0.95];
  } else if (idx === total - 1) {
    domain = [1 - spread, 1];
    opacityRange = [0.3, 1];
    scaleRange = [0.95, 1.02];
  } else {
    const start = Math.max(0, peak - spread);
    const end = Math.min(1, peak + spread);
    if (start === peak) {
      domain = [peak, end];
      opacityRange = [1, 0.3];
      scaleRange = [1.02, 0.95];
    } else if (end === peak) {
      domain = [start, peak];
      opacityRange = [0.3, 1];
      scaleRange = [0.95, 1.02];
    } else {
      domain = [start, peak, end];
      opacityRange = [0.3, 1, 0.3];
      scaleRange = [0.95, 1.02, 0.95];
    }
  }

  const cardOpacity = useTransform(scrollYProgress, domain, opacityRange);
  const cardScale = useTransform(scrollYProgress, domain, scaleRange);

  return (
    <div className={`relative flex items-center w-full ${isEven ? 'lg:justify-start' : 'lg:justify-end'}`}>
      {/* Node Dot */}
      <motion.div
        style={{ scale: cardScale, opacity: cardOpacity }}
        className="absolute left-[12px] md:left-[24px] lg:left-1/2 lg:-translate-x-1/2 z-30 w-12 h-12 rounded-full border-4 border-[#020408] bg-gradient-to-br from-[#1a2332] to-[#0a0f18] flex items-center justify-center shadow-[0_0_20px_rgba(0,0,0,0.8)]"
      >
        <div className="w-3 h-3 bg-[var(--color-sandybrown-100)] rounded-full shadow-[0_0_10px_rgba(214,165,84,0.8)]"></div>
      </motion.div>

      {/* Card */}
      <motion.div
        style={{ perspective: 1000, opacity: cardOpacity, scale: cardScale }}
        className={`w-full lg:w-[48%] pl-20 lg:pl-0 ${isEven ? 'lg:pr-10' : 'lg:pl-10'}`}
      >
        <div className="relative bg-[#020408]/80 backdrop-blur-2xl border border-white/5 rounded-3xl p-8 lg:p-10 hover:bg-[#0a0f18]/90 hover:border-[var(--color-sandybrown-100)]/30 transition-all duration-500 group overflow-hidden shadow-2xl">
          <span className="absolute -bottom-6 -right-4 font-mono text-[140px] font-black leading-none text-white/[0.02] group-hover:text-[var(--color-sandybrown-100)]/[0.05] transition-colors duration-500 pointer-events-none select-none">
            0{loc.id}
          </span>

          <div className="absolute -inset-[100px] bg-gradient-to-r from-transparent via-[var(--color-sandybrown-100)]/5 to-transparent opacity-0 group-hover:opacity-100 translate-x-[-100%] group-hover:translate-x-[100%] transition-all duration-1000 ease-in-out pointer-events-none"></div>

          <div className="flex flex-col gap-5 relative z-10">
            <div className="flex justify-between items-start">
              <div className="w-14 h-14 rounded-2xl bg-[#0a0f18]/80 border border-white/5 flex items-center justify-center text-[var(--color-sandybrown-100)] group-hover:scale-110 group-hover:bg-[var(--color-sandybrown-100)] group-hover:text-black transition-all duration-500 shadow-inner">
                <Icon className="w-6 h-6" />
              </div>
              <span className="text-[var(--color-sandybrown-100)] font-mono font-bold tracking-widest text-sm opacity-50 group-hover:opacity-100 transition-opacity drop-shadow-md">0{loc.id}</span>
            </div>

            <h3 className="font-headline text-2xl lg:text-3xl font-bold text-white leading-tight group-hover:text-[var(--color-sandybrown-100)] transition-colors duration-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              {loc.title}
            </h3>

            <p className="font-body text-white/80 text-base leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              {loc.desc}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

function LocationSection() {
  const containerRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start center", "end center"]
  });

  return (
    <section ref={containerRef} className="pt-24 lg:pt-32 pb-32 lg:pb-60 bg-[#020408] relative border-t border-white/5">

      {/* Scroll-Synced Cinematic Background */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
        <div className="sticky top-0 w-full h-screen overflow-hidden bg-[#020408]">
          {locationData.map((loc, idx) => (
            <BackgroundImage key={`bg-${loc.id}`} loc={loc} idx={idx} total={locationData.length} scrollYProgress={scrollYProgress} />
          ))}
          <div className="absolute inset-0 bg-gradient-to-t from-[#020408] via-[#020408]/30 to-[#020408] z-10 w-full h-full"></div>
          <div className="absolute top-0 left-0 w-full h-[500px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[var(--color-sandybrown-100)]/15 via-transparent to-transparent pointer-events-none z-20"></div>
        </div>
      </div>

      {/* Content Layer */}
      <div className="relative z-20">
        {/* Header */}
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 mb-20 lg:mb-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col md:flex-row md:items-start justify-between gap-8 md:gap-12"
          >
            <div className="flex-1">
              <h2 className="font-headline text-[32px] sm:text-[42px] lg:text-[48px] xl:text-[56px] font-extrabold text-white tracking-tight leading-[1.15] mb-6 drop-shadow-lg">
                A Location That Adds More Value to Your <span className="text-[var(--color-sandybrown-100)]">Business</span>
              </h2>
              <div className="w-24 h-1 bg-[var(--color-sandybrown-100)] md:ml-0 shadow-[0_0_15px_rgba(214,165,84,0.5)]"></div>
            </div>
            <div className="md:max-w-md lg:max-w-xl text-left hidden md:block md:pt-4">
              <p className="font-body text-white/80 text-[17px] lg:text-[20px] leading-relaxed border-l-2 border-[var(--color-sandybrown-100)]/50 pl-6 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                Strategic connectivity, exponential growth, and elite commercial clustering make Wagholi an undisputed destination for visionary enterprises.
              </p>
            </div>
          </motion.div>
        </div>

        {/* The Journey Timeline */}
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 relative" ref={timelineRef}>
          {/* Faint Background Line */}
          <div className="absolute left-[35px] md:left-[47px] lg:left-1/2 top-0 bottom-0 w-[2px] bg-white/5 lg:-translate-x-1/2"></div>

          {/* Glowing Scroll Line */}
          <motion.div
            style={{ scaleY: scrollYProgress, transformOrigin: "top" }}
            className="absolute left-[35px] md:left-[47px] lg:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[var(--color-sandybrown-100)]/50 via-[var(--color-sandybrown-100)] to-transparent shadow-[0_0_15px_rgba(214,165,84,0.6)] lg:-translate-x-1/2 z-10"
          ></motion.div>

          <div className="flex flex-col gap-20 lg:gap-32 relative z-20">
            {locationData.map((loc, idx) => (
              <TimelineCard key={loc.id} loc={loc} idx={idx} total={locationData.length} scrollYProgress={scrollYProgress} isEven={idx % 2 === 0} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const FeatureCard = ({ icon, title, description }: { icon: string, title: string, description: string }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

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
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative bg-[var(--color-black-alt)]/80 backdrop-blur-xl border border-[var(--color-sandybrown-100)]/10 rounded-2xl p-6 lg:p-8 overflow-hidden group h-full flex flex-col"
    >
      {/* Hover Glow Effect */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100"
        animate={{
          background: isHovered
            ? `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(214, 165, 84, 0.15), transparent 40%)`
            : `radial-gradient(400px circle at 0px 0px, rgba(214, 165, 84, 0), transparent 40%)`
        }}
      />

      <div className="relative z-10 flex-1 flex flex-col">
        <div className="w-12 h-12 bg-[var(--color-sandybrown-100)]/10 rounded-xl flex items-center justify-center mb-5 border border-[var(--color-sandybrown-100)]/20 group-hover:scale-110 transition-transform duration-500">
          <span className="material-symbols-outlined text-[var(--color-sandybrown-100)] text-2xl">{icon}</span>
        </div>
        <h3 className="font-headline text-[18px] lg:text-[20px] font-bold text-white mb-3">{title}</h3>
        <p className="font-body text-[13px] lg:text-[15px] text-white/70 leading-relaxed flex-1">
          {description}
        </p>
      </div>
    </div>
  );
};

export default function App() {
  const scrollToLeadForm = () => {
    document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="bg-[var(--color-black-200)] font-body text-white antialiased">
      {/* Top Navigation Bar */}
      <nav className="absolute top-0 w-full z-50 bg-transparent pt-6">
        <div className="flex justify-between items-center w-full px-6 md:px-12 max-w-[1400px] mx-auto">
          <div className="flex items-center">
            <img
              src="/logo.png"
              alt="Wagholi Highstreet Logo"
              className="h-11 w-auto max-w-[220px] object-contain md:h-16 md:max-w-[320px]"
            />
          </div>
          <div className="hidden md:flex items-center gap-8 text-white text-sm font-body">
            <a href="#" className="hover:text-[var(--color-sandybrown-100)] transition-colors">Gallery</a>
            <a href="#" className="hover:text-[#d6a554] transition-colors">Plans</a>
            <button
              type="button"
              onClick={scrollToLeadForm}
              className="border border-[#d6a554] text-[#d6a554] px-6 py-2 rounded-md font-medium hover:bg-[#d6a554] hover:text-black transition-colors"
            >
              Contact Us
            </button>
          </div>
          <button
            type="button"
            onClick={scrollToLeadForm}
            className="md:hidden border border-[#d6a554] text-[#d6a554] px-4 py-2 rounded-md text-xs font-medium"
          >
            Contact Us
          </button>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section className="relative min-h-[100dvh] w-full flex flex-col justify-center overflow-hidden bg-[var(--color-black-200)] pt-28 lg:pt-32 pb-12 lg:pb-16 px-4 sm:px-6 md:px-12">
          {/* Background Image & Gradients */}
          <div className="absolute inset-0 z-0">
            <img
              className="w-full h-full object-cover opacity-60"
              alt="Wagholi Highstreet Cityscape Sunset"
              src="/hero.jpeg"
            />
            {/* Dark gradient from left for text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-black-200)] via-[var(--color-black-200)]/80 to-transparent md:to-[var(--color-black-200)]/40"></div>
            {/* Bottom gradient to blend with next section */}
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-black-200)] via-[var(--color-black-200)]/60 lg:via-transparent to-transparent"></div>
          </div>

          <div className="relative z-10 w-full max-w-[1400px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8 mt-8 lg:mt-0">

            {/* Left Column: Text Content */}
            <div className="w-full lg:w-[55%] flex flex-col items-center lg:items-start text-center lg:text-left">
              {/* Mobile Badge */}
              <div className="lg:hidden border border-white/10 bg-white/5 backdrop-blur-md rounded-full px-4 py-1.5 text-[9px] font-bold tracking-[0.2em] uppercase text-white/70 mb-5">
                Premium Commercial Destination
              </div>

              <h1 className="font-headline text-[26px] sm:text-[32px] lg:text-[54px] font-extrabold text-white leading-[1.3] lg:leading-[1.15] tracking-tight mb-4 lg:mb-6">
                Give Your Business a <br className="hidden lg:block" />
                <span className="text-[var(--color-sandybrown-100)]" style={{ textShadow: '0px 4px 15px rgba(214, 165, 84, 0.4)' }}>
                  Future-Ready
                </span> Address on <br className="hidden lg:block" />
                Prime Kesnand Road, <br className="hidden lg:block" />
                Wagholi with 45,000+ <br className="hidden lg:block" />
                Expected Footfall.
              </h1>
              <p className="font-body text-[13px] sm:text-[15px] lg:text-[17px] text-white/80 leading-relaxed max-w-2xl mb-2 lg:mb-0 px-2 lg:px-0">
                Premium 5.5-acre commercial destination with shops, showrooms, and offices, offering high ROI potential in Pune's fastest-growing corridor.
              </p>
            </div>

            {/* Right Column: Glass Card (Desktop) / Stacked (Mobile) */}
            <div className="w-full lg:w-[45%] max-w-[550px]">
              <div className="lg:bg-[var(--color-black-400)]/40 lg:backdrop-blur-2xl lg:border lg:border-white/10 lg:rounded-[2rem] lg:p-8 flex flex-col items-center text-center lg:shadow-2xl">

                {/* Pricing */}
                <h2 className="font-headline text-[18px] sm:text-[22px] lg:text-[32px] font-bold text-white mb-4 leading-tight">
                  Shops from ₹60 Lakhs <span className="text-white/50 mx-1">|</span> <br className="block lg:hidden" />
                  Showrooms from ₹1.10 Cr.
                </h2>

                {/* Divider 1 */}
                <div className="hidden lg:block w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent mb-4"></div>

                {/* Early Bird */}
                <div className="flex items-center justify-center gap-1.5 lg:gap-2 mb-4 lg:mb-4">
                  <span className="material-symbols-outlined text-[var(--color-sandybrown-100)] text-sm lg:text-lg transform -rotate-90">local_offer</span>
                  <p className="text-white/90 font-medium text-[12px] sm:text-sm lg:text-[15px]">
                    Early Bird Benefit up to <span className="text-[var(--color-sandybrown-100)] font-bold">₹5 Lakhs</span>
                  </p>
                </div>

                {/* Divider 2 */}
                <div className="hidden lg:block w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent mb-6"></div>

                {/* Trust Box */}
                <div className="w-full bg-[var(--color-black-400)]/60 lg:bg-black/30 border border-white/10 lg:border-white/5 rounded-xl lg:rounded-2xl p-3 sm:p-4 lg:p-4 mb-6 lg:mb-6 flex flex-row items-center justify-between gap-1 sm:gap-2 lg:gap-4 backdrop-blur-md">
                  <div className="flex items-center gap-1 sm:gap-2">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-[var(--color-sandybrown-100)]">
                      <path d="M12 2L14.5 4.5L18 4.5L18.5 8L21.5 10L20 13L21.5 16L18.5 18L18 21.5L14.5 21.5L12 24L9.5 21.5L6 21.5L5.5 18L2.5 16L4 13L2.5 10L5.5 8L6 4.5L9.5 4.5L12 2Z" fill="currentColor" />
                      <path d="M10 15.5L6.5 12L7.9 10.6L10 12.7L16.1 6.6L17.5 8L10 15.5Z" fill="var(--color-black-400)" />
                    </svg>
                    <span className="text-white/90 text-[9px] sm:text-[10px] lg:text-[12px] text-left leading-tight font-medium">250+ bookings<br />already done</span>
                  </div>

                  <div className="flex items-center gap-1.5 sm:gap-3 lg:gap-3">
                    <div className="bg-[#DA291C] w-7 h-7 sm:w-8 sm:h-8 lg:w-10 lg:h-10 rounded-lg flex items-center justify-center shadow-sm">
                      <img src="https://upload.wikimedia.org/wikipedia/commons/3/36/McDonald%27s_Golden_Arches.svg" alt="McDonald's" className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5" />
                    </div>
                    <div className="bg-white w-10 h-7 sm:w-12 sm:h-8 lg:w-12 lg:h-10 rounded-lg flex items-center justify-center px-1 shadow-sm">
                      <span className="text-black font-extrabold text-[7px] sm:text-[8px] lg:text-[10px] tracking-tighter">CinePro</span>
                    </div>
                  </div>

                  <div className="text-white/90 text-[9px] sm:text-[10px] lg:text-[12px] text-left leading-tight font-medium">
                    Possession in<br />just 9 Months
                  </div>
                </div>

                {/* CTA */}
                <button
                  type="button"
                  onClick={scrollToLeadForm}
                  className="bg-[#d6a554] text-black font-bold uppercase tracking-[0.05em] py-3.5 sm:py-4 lg:py-4 w-full rounded-full flex items-center justify-center gap-2 hover:bg-[var(--color-tan-100)] transition-colors text-[13px] sm:text-[14px] lg:text-[15px] shadow-[0_4px_20px_rgba(229,184,105,0.3)]"
                >
                  SCHEDULE A SITE VISIT
                  <span className="material-symbols-outlined font-bold text-lg lg:text-xl">arrow_forward</span>
                </button>

              </div>
            </div>

          </div>
        </section>

        {/* Why Businesses & Investors Section */}
        <section className="relative py-20 lg:py-32 px-6 md:px-12 bg-[var(--color-black-200)] overflow-hidden">
          {/* Background effects */}
          <div className="absolute inset-0 z-0">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-[var(--color-sandybrown-100)]/10 rounded-full blur-[120px]"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[var(--color-darkslategray)]/20 rounded-full blur-[100px]"></div>
          </div>

          <div className="relative z-10 max-w-[1400px] mx-auto">
            {/* Top: Heading */}
            <div className="mb-16 lg:mb-20 w-full">
              <h2 className="font-headline text-[28px] sm:text-[36px] lg:text-[36px] xl:text-[44px] font-extrabold text-white tracking-tight mb-4 leading-[1.1]">
                Why Businesses & Investors Are Choosing <span className="text-[var(--color-sandybrown-100)]">Wagholi Highstreet</span>
              </h2>
              <div className="w-24 h-1 bg-[var(--color-sandybrown-100)] mb-6"></div>
              <p className="font-body text-[16px] lg:text-[18px] text-white/70 leading-relaxed max-w-3xl">
                At Wagholi Highstreet, you do not just buy a commercial space — you position your business in a fast-growing corridor with the visibility, convenience, and long-term potential that serious businesses and investors look for.
              </p>
            </div>

            {/* Bottom: Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              <FeatureCard
                icon="groups"
                title="45,000+ Expected Footfall"
                description="At Wagholi Highstreet, you get the advantage of 45,000+ expected footfall, giving your shop, showroom, or office stronger exposure and better business potential."
              />
              <FeatureCard
                icon="storefront"
                title="Stronger Brand Presence"
                description="The value of the destination rises. With McDonald’s and CinePro already signed, you become part of a commercial environment that naturally attracts more attention, stronger confidence, and higher market interest."
              />
              <FeatureCard
                icon="local_parking"
                title="Offer Greater Convenience"
                description="At Wagholi Highstreet, you get 3 acres of dedicated parking, so your customers, employees, and visitors experience easier access and a more comfortable business environment."
              />
              <FeatureCard
                icon="trending_up"
                title="Invest in Strong ROI Potential"
                description="With 7%–9% expected ROI potential in one of Pune’s fastest-growing commercial corridors, Wagholi Highstreet offers a lucrative investment opportunity."
              />
              <FeatureCard
                icon="location_on"
                title="Prime Kesnand Road Location"
                description="Positioned strategically on Kesnand Road, offering unparalleled connectivity and visibility in one of Pune's most rapidly developing commercial hubs."
              />
              <FeatureCard
                icon="architecture"
                title="Future-Ready Infrastructure"
                description="Designed with modern businesses in mind, featuring state-of-the-art facilities, high-speed connectivity, and sustainable architecture for long-term growth."
              />
            </div>
          </div>
        </section>

        <InteractiveAmenities />
        <LocationSection />

        {/* Pricing/Inventory: High-Fidelity Cards */}
        <section className="py-20 lg:py-32 px-6 md:px-12 bg-[#0b1222] border-t border-white/5">
          <div className="max-w-[1400px] mx-auto text-center mb-16 lg:mb-20">
            <h2 className="font-headline text-[28px] sm:text-[36px] lg:text-[48px] font-extrabold text-white tracking-tight mb-4">Investment <span className="text-[#d6a554]">Tiers</span></h2>
            <p className="text-white/70 max-w-xl mx-auto text-[15px] lg:text-[18px]">Scalable footprints designed for boutique firms and multinational conglomerates alike.</p>
          </div>
          <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {/* Tier 1 */}
            <div className="bg-white/5 backdrop-blur-md p-8 lg:p-12 border border-white/10 rounded-2xl flex flex-col items-center hover:bg-white/10 transition-colors">
              <span className="font-label text-xs uppercase tracking-[0.2em] mb-6 lg:mb-8 text-[#d6a554]">The Studio</span>
              <h3 className="font-headline text-2xl lg:text-3xl font-bold mb-4 text-white">Core Office</h3>
              <div className="text-4xl lg:text-5xl font-headline font-extrabold mb-2 text-white">₹60<span className="text-lg text-white/70">L*</span></div>
              <p className="text-white/50 font-label mb-8 lg:mb-12 text-sm">Starting Investment</p>
              <ul className="w-full space-y-4 mb-8 lg:mb-12 text-left">
                <li className="flex items-center gap-3 text-sm text-white/80">
                  <span className="material-symbols-outlined text-[#d6a554] text-lg">check_circle</span>
                  Smart Office Spaces
                </li>
                <li className="flex items-center gap-3 text-sm text-white/80">
                  <span className="material-symbols-outlined text-[#d6a554] text-lg">check_circle</span>
                  High-Speed Fibre Ready
                </li>
                <li className="flex items-center gap-3 text-sm text-white/80">
                  <span className="material-symbols-outlined text-[#d6a554] text-lg">check_circle</span>
                  Premium Common Areas
                </li>
              </ul>
              <button
                type="button"
                onClick={scrollToLeadForm}
                className="w-full border border-[#d6a554] text-[#d6a554] py-3 lg:py-4 rounded-full font-headline font-bold hover:bg-[#d6a554] hover:text-black transition-all"
              >
                Download Brochure
              </button>
            </div>
            {/* Tier 2 (Featured) */}
            <div className="bg-[#d6a554] text-black p-8 lg:p-12 rounded-2xl relative transform md:-translate-y-4 lg:-translate-y-8 shadow-[0_20px_40px_rgba(229,184,105,0.15)] flex flex-col items-center">
              <div className="absolute top-0 right-0 bg-black text-[#d6a554] font-label text-[10px] font-bold px-4 py-2 uppercase tracking-tighter rounded-bl-xl rounded-tr-2xl">Recommended</div>
              <span className="font-label text-xs uppercase tracking-[0.2em] mb-6 lg:mb-8 text-black/70">The Floor</span>
              <h3 className="font-headline text-2xl lg:text-3xl font-bold mb-4">Showrooms</h3>
              <div className="text-4xl lg:text-5xl font-headline font-extrabold mb-2">₹1.10<span className="text-lg text-black/70">Cr*</span></div>
              <p className="text-black/60 font-label mb-8 lg:mb-12 text-sm">Premium Frontage</p>
              <ul className="w-full space-y-4 mb-8 lg:mb-12 text-left">
                <li className="flex items-center gap-3 text-sm font-medium">
                  <span className="material-symbols-outlined text-black text-lg">check_circle</span>
                  Maximum Visibility
                </li>
                <li className="flex items-center gap-3 text-sm font-medium">
                  <span className="material-symbols-outlined text-black text-lg">check_circle</span>
                  High Footfall Zone
                </li>
                <li className="flex items-center gap-3 text-sm font-medium">
                  <span className="material-symbols-outlined text-black text-lg">check_circle</span>
                  Double Height Options
                </li>
                <li className="flex items-center gap-3 text-sm font-medium">
                  <span className="material-symbols-outlined text-black text-lg">check_circle</span>
                  Dedicated Signage
                </li>
              </ul>
              <button
                type="button"
                onClick={scrollToLeadForm}
                className="w-full bg-black text-[#d6a554] py-3 lg:py-4 rounded-full font-headline font-bold hover:bg-black/90 transition-all"
              >
                Contact Advisor
              </button>
            </div>
            {/* Tier 3 */}
            <div className="bg-white/5 backdrop-blur-md p-8 lg:p-12 border border-white/10 rounded-2xl flex flex-col items-center hover:bg-white/10 transition-colors">
              <span className="font-label text-xs uppercase tracking-[0.2em] mb-6 lg:mb-8 text-[#d6a554]">The Anchor</span>
              <h3 className="font-headline text-2xl lg:text-3xl font-bold mb-4 text-white">Signature HQ</h3>
              <div className="text-3xl lg:text-4xl font-headline font-extrabold mb-2 uppercase text-white mt-2">Custom</div>
              <p className="text-white/50 font-label mb-8 lg:mb-12 text-sm">Bespoke Standalone Block</p>
              <ul className="w-full space-y-4 mb-8 lg:mb-12 text-left">
                <li className="flex items-center gap-3 text-sm text-white/80">
                  <span className="material-symbols-outlined text-[#d6a554] text-lg">check_circle</span>
                  50,000+ Sq. Ft.
                </li>
                <li className="flex items-center gap-3 text-sm text-white/80">
                  <span className="material-symbols-outlined text-[#d6a554] text-lg">check_circle</span>
                  Naming Rights Available
                </li>
                <li className="flex items-center gap-3 text-sm text-white/80">
                  <span className="material-symbols-outlined text-[#d6a554] text-lg">check_circle</span>
                  Custom Architectural Facade
                </li>
              </ul>
              <button
                type="button"
                onClick={scrollToLeadForm}
                className="w-full border border-[#d6a554] text-[#d6a554] py-3 lg:py-4 rounded-full font-headline font-bold hover:bg-[#d6a554] hover:text-black transition-all"
              >
                Submit RFP
              </button>
            </div>
          </div>
        </section>

        {/* Final CTA: Minimalist Full Width */}
        <section id="lead-form" className="relative py-32 lg:py-40 bg-[#0b1222] overflow-hidden border-t border-white/5">
          <div className="absolute inset-0 z-0">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#d6a554]/5 rounded-full blur-[150px]"></div>
          </div>
          <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10 text-center">
            <h2 className="font-headline text-[36px] sm:text-[48px] lg:text-[64px] font-extrabold text-white mb-6 lg:mb-8 tracking-tight italic">Secure Your <span className="text-[#d6a554]">Authority.</span></h2>
            <p className="text-white/70 font-body text-[16px] lg:text-[20px] mb-10 lg:mb-12 max-w-2xl mx-auto leading-relaxed">
              Limited inventory remains for our Q4 release. Join the roster of elite global tenants at Wagholi Highstreet.
            </p>
            <LeadCaptureForm className="mx-auto max-w-2xl" />
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-white/10 bg-[#000000]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-12 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col gap-2 items-center md:items-start">
            <img
              src="/logo.png"
              alt="Wagholi Highstreet Logo"
              className="mb-2 h-10 w-auto max-w-[180px] object-contain md:h-12 md:max-w-[240px]"
            />
            <p className="text-white/50 text-sm font-body antialiased max-w-xs text-center md:text-left">
              © 2024 Wagholi Highstreet. Architectural Authority in Corporate Real Estate.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-6 lg:gap-8">
            <a className="text-white/50 text-sm font-body hover:text-[#d6a554] transition-colors" href="#">Privacy Policy</a>
            <a className="text-white/50 text-sm font-body hover:text-[#d6a554] transition-colors" href="#">Terms of Service</a>
            <a className="text-white/50 text-sm font-body hover:text-[#d6a554] transition-colors" href="#">Investor Relations</a>
            <a className="text-white/50 text-sm font-body hover:text-[#d6a554] transition-colors" href="#">Sustainability</a>
          </div>
          <div className="flex gap-4">
            <button className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 hover:bg-[#d6a554] hover:text-black hover:border-[#d6a554] text-white transition-all">
              <span className="material-symbols-outlined text-sm">public</span>
            </button>
            <button className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 hover:bg-[#d6a554] hover:text-black hover:border-[#d6a554] text-white transition-all">
              <span className="material-symbols-outlined text-sm">share</span>
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

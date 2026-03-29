import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { MapPin, Route, Car, Train, Map as MapIcon, Building2, TrendingUp } from 'lucide-react';

const locationData = [
  { id: 1, title: "Prime Kesnand Road Address", desc: "You place your business in a location that offers stronger visibility and better business relevance.", x: 40, y: 35, icon: MapPin },
  { id: 2, title: "Faster Everyday Connectivity", desc: "The 120 ft. link road improves access by connecting Nagar Road to Solapur Road.", x: 65, y: 25, icon: Route },
  { id: 3, title: "Better Traffic Movement", desc: "The three-storey flyover from Wagholi to Shikrapur helps ease congestion and improve flow.", x: 75, y: 45, icon: Car },
  { id: 4, title: "Metro-Led Growth Potential", desc: "The Ramwadi to Wagholi metro extension adds long-term connectivity and future demand.", x: 25, y: 55, icon: Train },
  { id: 5, title: "Stronger City-Wide Access", desc: "The proposed ring road and Samruddhi corridor are set to boost east-side connectivity.", x: 80, y: 70, icon: MapIcon },
  { id: 6, title: "Close to Major IT Hubs", desc: "With EON IT Park and World Trade Center nearby, you benefit from stronger commercial relevance.", x: 30, y: 75, icon: Building2 },
  { id: 7, title: "A Corridor on the Rise", desc: "Wagholi is rapidly emerging as one of Pune's strongest growth zones for business and investment.", x: 55, y: 85, icon: TrendingUp },
];



const BackgroundImage = ({ loc, idx, total, scrollYProgress }: any) => {
  const peak = idx / (total - 1);
  const spread = 0.26;

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
      className="absolute inset-0 w-full h-full z-0 will-change-transform"
      style={{ opacity }}
    >
      <motion.img
        src={`/images/location/desktop/${loc.id}.webp`}
        className="w-full h-full object-cover hidden md:block will-change-transform"
        style={{ scale, y }}
      />
      <motion.img
        src={`/images/location/mobile/${loc.id}.webp`}
        className="w-full h-full object-cover md:hidden will-change-transform"
        style={{ scale, y }}
      />
      <div className="absolute inset-0 bg-[#020408]/60 backdrop-blur-sm"></div>
    </motion.div>
  );
};

const TimelineCard = ({ loc, idx, total, scrollYProgress, isEven }: any) => {
  const Icon = loc.icon;
  const peak = idx / (total - 1);
  const spread = 0.25;

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
        <div className="relative bg-[#070b12] border border-white/5 rounded-3xl p-8 lg:p-10 hover:bg-[#0a0f18]/90 hover:border-[var(--color-sandybrown-100)]/30 transition-all duration-500 group overflow-hidden shadow-2xl will-change-transform">
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

export default function LocationSection() {
  const containerRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start center", "end center"]
  });

  return (
    <section 
      id="location" 
      className="relative w-full pt-24 pb-16 lg:pt-32 lg:pb-24 bg-gradient-to-b from-black via-neutral-900 to-[#111111] text-white border-t border-white/5"
      style={{
        borderRadius: '48px 48px 0 0',
        marginTop: '-48px',
        position: 'relative',
        zIndex: 30
      }}
    >
      {/* Subtle glowing separator line for a premium transition effect */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gray-700 to-transparent opacity-40"></div>

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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center mb-12 lg:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 leading-tight mb-4">
              A Location That Adds More Value to Your Business
            </h2>
            <p className="mt-4 text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
              Strategic placement designed for maximum footfall and seamless connectivity.
            </p>
            <div className="w-24 h-1 bg-[var(--color-sandybrown-100)] mx-auto mt-8 shadow-[0_0_15px_rgba(214,165,84,0.5)]"></div>
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

import { useState, useRef, useEffect } from 'react';
import { motion, useInView } from 'motion/react';

const amenitiesData = [
  {
    id: "01",
    title: "Business Lounge",
    desc: "A premium space for meetings and networking.",
    images: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1560179707-f14e90ef362b?auto=format&fit=crop&q=80&w=1200"
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

export default function InteractiveAmenities() {
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
    }, 9000);
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
      style={{
        borderRadius: '48px 48px 48px 48px',
        marginTop: '-12px',
        marginBottom: '-12px',
      }}
    >
      {/* Top fade transition from Why Businesses section - starts with same color, fades to blue */}
      <div className="absolute top-0 left-0 right-0 h-[400px] bg-gradient-to-b from-[#020408] via-[#060a14] to-transparent z-10 pointer-events-none"
           style={{
             borderRadius: '48px 48px 0 0',
           }}></div>

      {/* Header */}
      <div className="relative z-10 max-w-[1600px] mx-auto px-4 sm:px-6 md:px-12 mb-10 lg:mb-16 pt-12 lg:pt-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Label with gradient lines - Left Aligned */}
          <div className="flex items-center justify-start gap-3 mb-6">
            <span className="text-[var(--color-sandybrown-100)] font-bold text-[10px] tracking-[0.25em] uppercase">Lifestyle & Convenience</span>
            <div className="h-[1px] w-12 bg-gradient-to-r from-[var(--color-sandybrown-100)]/40 to-transparent"></div>
          </div>

          <h2 className="font-headline text-[32px] sm:text-[42px] lg:text-[56px] font-extrabold text-white tracking-tight mb-6 leading-[1.1]">
            Amenities That Add More Value to Your <span className="text-[var(--color-sandybrown-100)]">Business Address</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[var(--color-sandybrown-100)] to-transparent mb-8"></div>
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
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200';
                  }}
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

      {/* Bottom curved edge for smooth transition to next section */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#020408] via-[#060a14] to-transparent z-20 pointer-events-none"
        style={{
          borderRadius: '0 0 48px 48px',
          boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.5)',
        }}
      ></div>
    </section>
  );
}

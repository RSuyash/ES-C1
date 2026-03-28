import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'motion/react';

const faqs = [
  {
    q: "What is Wagholi Highstreet offering?",
    a: "Wagholi Highstreet offers premium shops, showrooms, and office spaces within a 5.5-acre commercial development on prime Kesnand Road, Wagholi."
  },
  {
    q: "Where is the project located?",
    a: "The project is located on prime Kesnand Road, Wagholi, one of Pune’s fast-growing commercial corridors with improving connectivity and rising business demand."
  },
  {
    q: "What is the starting price?",
    a: "Current options start from ₹35 Lakhs onwards for shops and go up based on unit type, size, and placement. Showroom options are available from ₹67 Lakhs onwards."
  },
  {
    q: "What unit sizes are available?",
    a: "Available unit sizes currently range from 130 sq.ft. to 386 sq.ft., depending on the unit type and inventory availability."
  },
  {
    q: "What is the possession timeline?",
    a: "The project is in a nearing-possession stage, with Tower B & C possession targeted by December 2026."
  },
  {
    q: "Is there any launch or booking offer available?",
    a: "Yes, buyers can avail up to ₹5 Lakhs in early bird and spot booking benefits, subject to current availability and project terms."
  },
  {
    q: "What makes this project a strong commercial opportunity?",
    a: "Wagholi Highstreet is backed by 45,000+ expected footfall, 3 acres of dedicated parking, strong location growth, and major brand signings, making it relevant for both business use and investment."
  },
  {
    q: "Which brands have already signed in the project?",
    a: "As shared, McDonald’s and CinePro are already signed, with more brands expected to join the commercial ecosystem."
  },
  {
    q: "Is this project suitable for investors?",
    a: "Yes, the project is positioned as a strong opportunity for investors looking at rental yield potential, appreciation potential, and early entry into a fast-growing commercial corridor."
  },
  {
    q: "What amenities are available in the project?",
    a: "The project includes Business Lounge, Co-working Spaces, Yoga Lounge, Game Zone, Café, and 3 acres of dedicated parking."
  },
  {
    q: "Who should consider this project?",
    a: "This project is suitable for shop owners, showroom brands, office buyers, business owners, and investors looking for a premium commercial address in a growth-driven location."
  },
  {
    q: "How can I get pricing, availability, or the best current offer?",
    a: "You can fill out the enquiry form to get current pricing, available unit options, and the best booking offers currently available."
  }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First open by default
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section ref={sectionRef} className="py-24 lg:py-32 px-6 md:px-12 bg-[#020408] relative border-t border-white/5 overflow-hidden">
      {/* Premium ambient glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[var(--color-sandybrown-100)]/5 blur-[150px] pointer-events-none rounded-[100%]" />
      
      <div className="max-w-[800px] mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16 lg:mb-20"
        >
          <div className="flex justify-center items-center gap-3 mb-4">
            <div className="h-[1px] w-8 bg-[var(--color-sandybrown-100)]/40" />
            <span className="text-[10px] uppercase tracking-[0.3em] text-[var(--color-sandybrown-100)] font-bold">Answers & Insights</span>
            <div className="h-[1px] w-8 bg-[var(--color-sandybrown-100)]/40" />
          </div>
          <h2 className="font-headline text-[32px] sm:text-[40px] lg:text-[48px] font-extrabold text-white tracking-tight leading-[1.1]">
            Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-sandybrown-100)] to-[#fcd99a] italic">Questions.</span>
          </h2>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 * (index % 5) }}
                className={`overflow-hidden rounded-2xl border transition-all duration-500 backdrop-blur-md ${
                  isOpen 
                    ? 'border-[var(--color-sandybrown-100)]/30 bg-[var(--color-sandybrown-100)]/5 shadow-[0_10px_40px_-10px_rgba(214,165,84,0.1)]' 
                    : 'border-white/5 bg-[#0a0f1a]/80 hover:border-white/15 hover:bg-[#111724]/80'
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between p-6 lg:p-8 text-left focus:outline-none"
                >
                  <h3 className={`font-headline text-[16px] sm:text-[18px] lg:text-[20px] font-bold tracking-wide pr-8 transition-colors duration-300 ${isOpen ? 'text-[var(--color-sandybrown-100)]' : 'text-white'}`}>
                    {faq.q}
                  </h3>
                  <div className={`shrink-0 flex items-center justify-center w-8 h-8 rounded-full border transition-all duration-500 ${isOpen ? 'bg-[var(--color-sandybrown-100)] border-[var(--color-sandybrown-100)] text-black rotate-180' : 'border-white/20 text-white/50 bg-transparent'}`}>
                    <span className="material-symbols-outlined text-xl">expand_more</span>
                  </div>
                </button>
                
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <div className="px-6 lg:px-8 pb-6 lg:pb-8 text-white/60 font-body text-[14px] lg:text-[16px] leading-relaxed border-t border-white/5 mt-2 pt-6">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';

export default function FeatureCard({ icon, title, description }: { icon: string; title: string; description: string }) {
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
}

import { useEffect, useState, useRef } from 'react';
import { motion } from 'motion/react';

const HERO_SLIDES = [
  { filename: 'hero-1', priority: 'high' as const },
  { filename: 'hero-2', priority: 'normal' as const },
  { filename: 'hero-3', priority: 'normal' as const },
  { filename: 'hero-4', priority: 'normal' as const },
  { filename: 'hero-5', priority: 'normal' as const },
];

const FADE_DURATION = 1.4;
const INTERVAL_MS = 7000;
const ZOOM_MIN = 1;
const ZOOM_MAX = 1.08;

export default function HeroBackgroundCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const prefersReducedMotion = useRef(
    typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ).current;

  const startTimer = () => {
    if (prefersReducedMotion || isPaused) return;

    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, INTERVAL_MS);
  };

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  useEffect(() => {
    if (!prefersReducedMotion) {
      startTimer();
    }

    const handleVisibilityChange = () => {
      if (document.hidden) {
        stopTimer();
      } else {
        startTimer();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      stopTimer();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isPaused, prefersReducedMotion]);

  useEffect(() => {
    const handlePause = () => setIsPaused(true);
    const handleResume = () => setIsPaused(false);

    window.addEventListener('blur', handlePause);
    window.addEventListener('focus', handleResume);

    return () => {
      window.removeEventListener('blur', handlePause);
      window.removeEventListener('focus', handleResume);
    };
  }, []);

  return (
    <>
      {HERO_SLIDES.map((slide, index) => {
        const isActive = index === currentIndex;
        const isNext = index === (currentIndex + 1) % HERO_SLIDES.length;

        return (
          <motion.img
            key={slide.filename}
            src={`/images/location/hero-background/${slide.filename}.jpeg`}
            alt={`Wagholi Highstreet Hero Background ${index + 1}`}
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ opacity: 0, scale: ZOOM_MIN }}
            animate={{
              opacity: isActive ? 0.8 : 0,
              scale: isActive ? ZOOM_MAX : ZOOM_MIN,
            }}
            transition={{
              opacity: {
                duration: FADE_DURATION,
                ease: 'easeInOut',
              },
              scale: {
                duration: INTERVAL_MS / 1000,
                ease: 'easeOut',
              },
            }}
            loading={index === 0 ? 'eager' : 'lazy'}
            fetchPriority={slide.priority}
            decoding={index === 0 ? 'sync' : 'async'}
            style={{
              willChange: 'opacity, transform',
              contain: 'layout paint',
            }}
          />
        );
      })}
    </>
  );
}

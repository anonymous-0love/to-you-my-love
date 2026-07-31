import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

const SECTION_IDS = [
  'hero',
  'our-story',
  'gallery',
  'reasons',
  'video',
  'stats',
  'letter',
  'future',
  'final',
];

const SECTION_LABELS = [
  'Beginning',
  'Our Story',
  'Gallery',
  'Reasons',
  'Memories',
  'Us in Numbers',
  'A Letter',
  'Future',
  'Always',
];

export default function Navigation() {
  const [activeSection, setActiveSection] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    SECTION_IDS.forEach((id, index) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(index);
        },
        { threshold: 0.3, rootMargin: '-10% 0px -60% 0px' }
      );
      observer.observe(el);
      observers.push(observer);
    });

    const onScroll = () => {
      setShowBackToTop(window.scrollY > window.innerHeight * 0.8);
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      observers.forEach(o => o.disconnect());
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Progress dots — visible on medium+ screens on the right side */}
      <nav
        className="fixed right-4 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-3"
        aria-label="Section navigation"
      >
        {SECTION_IDS.map((id, i) => (
          <button
            key={id}
            onClick={() => scrollToSection(id)}
            aria-label={`Go to ${SECTION_LABELS[i]}`}
            title={SECTION_LABELS[i]}
            className="group relative flex items-center justify-end gap-2"
          >
            {/* Tooltip label */}
            <motion.span
              initial={{ opacity: 0, x: 8 }}
              whileHover={{ opacity: 1, x: 0 }}
              className="absolute right-6 text-xs text-cream/60 whitespace-nowrap bg-dark-3/90 px-2 py-1 rounded pointer-events-none"
            >
              {SECTION_LABELS[i]}
            </motion.span>

            <motion.div
              animate={{
                scale: activeSection === i ? 1.4 : 1,
                backgroundColor: activeSection === i ? '#C2748A' : 'rgba(245,240,232,0.2)',
              }}
              transition={{ duration: 0.2 }}
              className="w-2 h-2 rounded-full transition-colors"
            />
          </button>
        ))}
      </nav>

      {/* Mobile bottom progress bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden">
        <div className="h-0.5 bg-dark-3">
          <motion.div
            className="h-full bg-gradient-to-r from-burgundy to-rose"
            animate={{ width: `${((activeSection + 1) / SECTION_IDS.length) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Back to top */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            aria-label="Back to top"
            className="fixed bottom-6 left-4 sm:left-6 z-50 flex items-center justify-center
                       w-10 h-10 glass-card rounded-full text-cream/60 hover:text-rose
                       transition-colors active:scale-95"
          >
            <ArrowUp size={16} />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}

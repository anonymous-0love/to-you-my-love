import { useCallback } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ChevronDown, Heart } from 'lucide-react';
import FloatingParticles from '../components/FloatingParticles';
import { config } from '../data/config';
import { handleImageError } from '../utils/helpers';

interface HeroSectionProps {
  onHeartClick: (e: React.MouseEvent) => void;
}

export default function HeroSection({ onHeartClick }: HeroSectionProps) {
  const prefersReduced = useReducedMotion();
  const name = config.girlfriendName === 'HER_NAME' ? 'You' : config.girlfriendName;

  const scrollDown = useCallback(() => {
    document.getElementById('our-story')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const subtitleLines = config.heroSubtitle.split('\n');

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      aria-label="Hero section"
    >
      {/* Background photo with Ken Burns effect */}
      <div className="absolute inset-0">
        <motion.img
          src={config.heroImage}
          alt="Us — the hero photo"
          onError={handleImageError}
          className="w-full h-full object-cover object-center"
          style={{ transformOrigin: 'center center' }}
          animate={prefersReduced ? {} : {
            scale: [1.05, 1.15],
          }}
          transition={{ duration: 20, ease: 'easeInOut', repeat: Infinity, repeatType: 'reverse' }}
        />
        {/* Layered dark overlays */}
        <div className="absolute inset-0 bg-dark/50" />
        <div className="absolute inset-0 bg-overlay-dark" />
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-dark/40" />
      </div>

      {/* Floating particles */}
      <FloatingParticles count={14} className="z-10" />

      {/* Hero content */}
      <div className="relative z-20 flex flex-col items-center text-center px-6 max-w-3xl mx-auto">
        {/* Date label */}
        <motion.p
          className="text-label mb-8 tracking-[0.3em]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          August 1, 2026
        </motion.p>

        {/* Main title */}
        <motion.h1
          className="font-serif italic text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-cream leading-tight mb-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          {config.heroTitle},
        </motion.h1>

        {/* Name with heart click Easter egg */}
        <motion.button
          className="font-serif italic text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-rose leading-tight mb-10
                     hover:text-rose-light transition-colors duration-300 cursor-default select-none"
          onClick={onHeartClick}
          aria-label={`${name} — click for a surprise`}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          whileTap={{ scale: 0.98 }}
        >
          {name}.
        </motion.button>

        {/* Gold divider */}
        <motion.div
          className="gold-divider mb-8 w-24"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
        />

        {/* Subtitle */}
        <motion.div
          className="space-y-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.8 }}
        >
          {subtitleLines.map((line, i) => (
            <p
              key={i}
              className={`font-sans font-light leading-relaxed ${
                i === 0
                  ? 'text-lg sm:text-xl text-cream/90'
                  : 'text-base sm:text-lg text-cream/60'
              }`}
            >
              {line}
            </p>
          ))}
        </motion.div>

        {/* Pulsing heart */}
        <motion.div
          className="mt-12"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.4, type: 'spring', stiffness: 200 }}
          onClick={onHeartClick}
        >
          <motion.div
            animate={prefersReduced ? {} : { scale: [1, 1.15, 1] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Heart
              size={32}
              className="text-burgundy fill-burgundy cursor-pointer hover:text-rose hover:fill-rose transition-colors duration-300"
              aria-hidden="true"
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={scrollDown}
        aria-label="Scroll to our story"
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1
                   text-cream/30 hover:text-cream/60 transition-colors"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <span className="text-xs font-sans tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={prefersReduced ? {} : { y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={20} />
        </motion.div>
      </motion.button>

      {/* Bottom gradient blend */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-dark to-transparent z-10 pointer-events-none" />
    </section>
  );
}

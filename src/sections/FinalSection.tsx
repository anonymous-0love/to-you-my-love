import { useState, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';
import FloatingParticles from '../components/FloatingParticles';
import ScrollReveal from '../components/ScrollReveal';
import { config } from '../data/config';
import { handleImageError, resolveName } from '../utils/helpers';

interface FinalSectionProps {
  onHeartClick: (e: React.MouseEvent) => void;
}

export default function FinalSection({ onHeartClick }: FinalSectionProps) {
  const [answered, setAnswered] = useState(false);
  const [confettiDone, setConfettiDone] = useState(false);
  const prefersReduced = useReducedMotion();

  const name = config.girlfriendName === 'HER_NAME' ? 'You' : config.girlfriendName;
  const closingText = resolveName(config.finalClosingText, name);
  const finalLines = config.finalMessage.split('\n');

  const handleAnswer = useCallback((e: React.MouseEvent) => {
    setAnswered(true);
    onHeartClick(e);
    setTimeout(() => setConfettiDone(true), 3000);
  }, [onHeartClick]);

  return (
    <section
      id="final"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      aria-label="Final message"
    >
      {/* Background photo */}
      <div className="absolute inset-0">
        <motion.img
          src={config.finalPhoto}
          alt="Us — final photo"
          onError={handleImageError}
          className="w-full h-full object-cover object-center"
          animate={prefersReduced ? {} : { scale: [1.05, 1.12] }}
          transition={{ duration: 25, ease: 'easeInOut', repeat: Infinity, repeatType: 'reverse' }}
        />
        <div className="absolute inset-0 bg-dark/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/60 to-dark/40" />
      </div>

      {/* Particles after answer */}
      {answered && !confettiDone && <FloatingParticles count={30} className="z-10" />}

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center text-center px-6 max-w-2xl mx-auto">

        <AnimatePresence mode="wait">
          {!answered ? (
            <motion.div
              key="question"
              className="flex flex-col items-center gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Main quote */}
              <ScrollReveal direction="up" className="space-y-3">
                {finalLines.map((line, i) => (
                  <p
                    key={i}
                    className="font-serif italic text-xl sm:text-2xl md:text-3xl text-cream/90 leading-relaxed"
                  >
                    {line}
                  </p>
                ))}
              </ScrollReveal>

              {/* Gold divider */}
              <ScrollReveal delay={0.2}>
                <div className="gold-divider w-20" />
              </ScrollReveal>

              {/* Question */}
              <ScrollReveal delay={0.3}>
                <p className="font-serif text-2xl sm:text-3xl text-cream leading-snug">
                  Will you keep making beautiful memories with me?
                </p>
              </ScrollReveal>

              {/* Button */}
              <ScrollReveal delay={0.5}>
                <motion.button
                  onClick={handleAnswer}
                  className="btn-primary text-lg px-12 py-5 shadow-xl shadow-burgundy/25"
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.97 }}
                  aria-label="Always — answer the question"
                >
                  <Heart size={20} className="fill-current" />
                  {config.surpriseButtonText}
                </motion.button>
              </ScrollReveal>
            </motion.div>
          ) : (
            <motion.div
              key="answer"
              className="flex flex-col items-center gap-8"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Sparkle icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1, rotate: [0, 15, -15, 0] }}
                transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
              >
                <Sparkles size={48} className="text-gold" />
              </motion.div>

              {/* Final message */}
              <div className="space-y-2">
                {closingText.split('\n').map((line, i) => (
                  <motion.p
                    key={i}
                    className={`font-serif leading-relaxed ${
                      i === 0
                        ? 'text-2xl sm:text-3xl md:text-4xl italic text-cream'
                        : 'text-lg sm:text-xl text-cream/80'
                    }`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + i * 0.2 }}
                  >
                    {line}
                  </motion.p>
                ))}
              </div>

              {/* Pulsing heart */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1, type: 'spring', stiffness: 150 }}
                onClick={onHeartClick}
              >
                <motion.div
                  animate={prefersReduced ? {} : { scale: [1, 1.2, 1] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                >
                  <Heart
                    size={56}
                    className="text-burgundy fill-burgundy cursor-pointer hover:text-rose hover:fill-rose
                               transition-colors duration-300 drop-shadow-lg"
                    aria-hidden="true"
                  />
                </motion.div>
              </motion.div>

              {/* Date */}
              <motion.p
                className="text-label tracking-widest"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
              >
                August 1, 2026 — Girlfriend's Day
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Top gradient blend */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-dark to-transparent z-10 pointer-events-none" />
    </section>
  );
}

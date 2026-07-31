import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollReveal from '../components/ScrollReveal';
import { loveReasons } from '../data/memories';

export default function ReasonsSection() {
  const [flipped, setFlipped] = useState<Set<string>>(new Set());

  const toggle = (id: string) => {
    setFlipped(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <section id="reasons" className="bg-dark-2 section-pad overflow-hidden">
      <div className="section-container">
        {/* Heading */}
        <ScrollReveal className="text-center mb-5">
          <p className="text-label mb-3">From the Heart</p>
          <h2 className="heading-section italic mb-4">Reasons I Love You</h2>
          <div className="gold-divider mb-4" />
          <p className="text-body text-cream/50 max-w-md mx-auto text-sm">
            Tap any card to reveal what's inside.
          </p>
        </ScrollReveal>

        {/* Cards grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mt-12">
          {loveReasons.map((reason, index) => {
            const isFlipped = flipped.has(reason.id);

            return (
              <ScrollReveal
                key={reason.id}
                delay={index * 0.07}
                direction="up"
              >
                <div
                  className="relative h-52 sm:h-56 cursor-pointer"
                  style={{ perspective: 1000 }}
                  onClick={() => toggle(reason.id)}
                  onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') toggle(reason.id); }}
                  tabIndex={0}
                  role="button"
                  aria-pressed={isFlipped}
                  aria-label={`Reason ${index + 1}: ${reason.title}. Click to reveal.`}
                >
                  <motion.div
                    className="relative w-full h-full"
                    style={{ transformStyle: 'preserve-3d' }}
                    animate={{ rotateY: isFlipped ? 180 : 0 }}
                    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {/* Front face */}
                    <div
                      className="absolute inset-0 card-dark rounded-2xl flex flex-col items-center justify-center
                                 gap-3 p-4 border border-rose/10 hover:border-rose/30 transition-colors duration-300"
                      style={{ backfaceVisibility: 'hidden' }}
                    >
                      <span className="text-3xl">{reason.emoji}</span>
                      <p className="font-serif text-sm text-cream text-center leading-snug">
                        {reason.title}
                      </p>
                      <span className="text-xs text-rose/40 font-sans">Tap to reveal</span>
                    </div>

                    {/* Back face */}
                    <div
                      className="absolute inset-0 bg-dark-4 border border-rose/25 rounded-2xl flex items-center
                                 justify-center p-4"
                      style={{
                        backfaceVisibility: 'hidden',
                        transform: 'rotateY(180deg)',
                      }}
                    >
                      <p className="font-sans text-xs text-cream/80 text-center leading-relaxed">
                        {reason.description}
                      </p>
                    </div>
                  </motion.div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Hidden Easter egg — all cards revealed */}
        <AnimatePresence>
          {flipped.size === loveReasons.length && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-center mt-12"
            >
              <p className="font-script text-2xl text-rose">
                And so many more reasons I haven't written yet… ❤️
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

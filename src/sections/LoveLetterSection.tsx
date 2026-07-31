import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SkipForward, Feather } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';
import { useInView } from 'framer-motion';
import { config } from '../data/config';

const CHAR_DELAY = 18; // ms per character for typewriter
const MIN_CHARS_BEFORE_SKIP = 80;

export default function LoveLetterSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [revealed, setRevealed] = useState(0);
  const [skipped, setSkipped] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const letter = config.loveLetter;
  const displayText = skipped ? letter : letter.slice(0, revealed);
  const isDone = skipped || revealed >= letter.length;
  const yourName = config.yourName === 'YOUR_NAME' ? 'Me' : config.yourName;

  useEffect(() => {
    if (!isInView || isDone) return;

    intervalRef.current = setInterval(() => {
      setRevealed(r => {
        if (r >= letter.length) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          return r;
        }
        return r + 1;
      });
    }, CHAR_DELAY);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isInView, isDone, letter.length]);

  const handleSkip = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setSkipped(true);
  };

  const lines = displayText.split('\n');

  return (
    <section id="letter" className="bg-dark section-pad overflow-hidden">
      <div className="section-container max-w-3xl">
        {/* Heading */}
        <ScrollReveal className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-3">
            <Feather size={18} className="text-gold" />
            <p className="text-label tracking-widest">For You</p>
            <Feather size={18} className="text-gold scale-x-[-1]" />
          </div>
          <h2 className="heading-section italic mb-4">A Letter</h2>
          <div className="gold-divider" />
        </ScrollReveal>

        {/* Letter card */}
        <div ref={ref}>
          <ScrollReveal>
            <div className="paper-card p-8 sm:p-12 relative overflow-hidden">
              {/* Decorative corner */}
              <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden opacity-20">
                <div className="absolute top-2 right-2 w-16 h-16 border-t-2 border-r-2 border-gold rounded-tr-xl" />
              </div>
              <div className="absolute bottom-0 left-0 w-20 h-20 overflow-hidden opacity-20">
                <div className="absolute bottom-2 left-2 w-16 h-16 border-b-2 border-l-2 border-gold rounded-bl-xl" />
              </div>

              {/* Letter content */}
              <div className="font-sans text-cream/80 leading-[2] text-base sm:text-[1.05rem] min-h-[200px]">
                {lines.map((line, i) => (
                  <span key={i}>
                    {line || ' '}
                    {i < lines.length - 1 && <br />}
                  </span>
                ))}
                {/* Cursor */}
                {!isDone && (
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.6, repeat: Infinity }}
                    className="inline-block w-0.5 h-5 bg-rose ml-0.5 align-middle"
                    aria-hidden="true"
                  />
                )}
              </div>

              {/* Signature */}
              <AnimatePresence>
                {isDone && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="mt-10 text-right"
                  >
                    <div className="gold-divider mb-6" />
                    <p className="font-sans text-sm text-cream/50 mb-1">With all my love,</p>
                    <p className="font-script text-3xl text-cream">{yourName}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Skip button */}
              {!isDone && revealed > MIN_CHARS_BEFORE_SKIP && (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onClick={handleSkip}
                  className="absolute bottom-4 right-4 flex items-center gap-1.5 text-xs text-cream/30
                             hover:text-cream/60 transition-colors font-sans"
                  aria-label="Skip typewriter animation and show full letter"
                >
                  <SkipForward size={12} />
                  Skip
                </motion.button>
              )}
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={0.2} className="text-center mt-10">
          <p className="font-script text-xl text-cream/35">
            Some things are easier to write than to say.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}

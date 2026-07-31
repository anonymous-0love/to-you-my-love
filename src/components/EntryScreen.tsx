import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';
import FloatingParticles from './FloatingParticles';
import { config } from '../data/config';

interface EntryScreenProps {
  onEnter: () => void;
}

export default function EntryScreen({ onEnter }: EntryScreenProps) {
  const [phase, setPhase] = useState<'idle' | 'loading' | 'done'>('idle');
  const [loadingMsg, setLoadingMsg] = useState('');

  useEffect(() => {
    if (phase !== 'loading') return;

    const msgs = config.loadingMessages;
    let idx = 0;
    setLoadingMsg(msgs[0]);

    const interval = setInterval(() => {
      idx = (idx + 1) % msgs.length;
      setLoadingMsg(msgs[idx]);
    }, 900);

    const timer = setTimeout(() => {
      clearInterval(interval);
      setPhase('done');
    }, msgs.length * 900 + 300);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [phase]);

  useEffect(() => {
    if (phase === 'done') {
      const t = setTimeout(onEnter, 600);
      return () => clearTimeout(t);
    }
  }, [phase, onEnter]);

  const handleClick = () => {
    if (phase === 'idle') setPhase('loading');
  };

  return (
    <AnimatePresence>
      <motion.div
        key="entry"
        className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-dark overflow-hidden"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
      >
        {/* Background gradient orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute w-[600px] h-[600px] rounded-full opacity-5"
            style={{
              background: 'radial-gradient(circle, #8B2635 0%, transparent 70%)',
              top: '20%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute w-[400px] h-[400px] rounded-full opacity-5"
            style={{
              background: 'radial-gradient(circle, #C9A87B 0%, transparent 70%)',
              bottom: '10%',
              right: '10%',
            }}
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          />
        </div>

        <FloatingParticles count={22} />

        {/* Content */}
        <motion.div
          className="relative z-10 flex flex-col items-center gap-10 px-6 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Heart icon */}
          <motion.div
            animate={{
              scale: [1, 1.12, 1],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Heart
              size={48}
              className="text-burgundy fill-burgundy drop-shadow-lg"
              strokeWidth={0}
            />
          </motion.div>

          {/* Date */}
          <motion.p
            className="text-label tracking-[0.3em]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {config.entryLine2}
          </motion.p>

          {/* Main line */}
          <motion.p
            className="font-serif text-2xl sm:text-3xl md:text-4xl text-cream leading-relaxed max-w-md"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            {config.entryLine1}
          </motion.p>

          {/* Button or loading state */}
          <AnimatePresence mode="wait">
            {phase === 'idle' && (
              <motion.button
                key="btn"
                onClick={handleClick}
                className="btn-primary text-base sm:text-lg px-10 py-4 shadow-lg shadow-burgundy/20"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: 0.8 }}
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.97 }}
              >
                <Heart size={18} className="fill-current" />
                {config.entryButtonText}
              </motion.button>
            )}

            {phase === 'loading' && (
              <motion.div
                key="loading"
                className="flex flex-col items-center gap-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {/* Spinner */}
                <div className="w-8 h-8 border-2 border-rose/30 border-t-rose rounded-full animate-spin" />
                <motion.p
                  key={loadingMsg}
                  className="font-script text-xl text-cream/70"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.4 }}
                >
                  {loadingMsg}
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Subtle footer note */}
          <motion.p
            className="text-xs text-cream/25 font-sans mt-4 max-w-xs leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            Made with love — just for you.
          </motion.p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

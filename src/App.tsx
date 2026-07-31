import { useState, useCallback, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

// Components
import EntryScreen from './components/EntryScreen';
import MusicPlayer from './components/MusicPlayer';
import Navigation from './components/Navigation';
import HeartBurst from './components/HeartBurst';

// Sections
import HeroSection from './sections/HeroSection';
import OurStorySection from './sections/OurStorySection';
import GallerySection from './sections/GallerySection';
import ReasonsSection from './sections/ReasonsSection';
import VideoSection from './sections/VideoSection';
import StatsSection from './sections/StatsSection';
import LoveLetterSection from './sections/LoveLetterSection';
import FutureSection from './sections/FutureSection';
import FinalSection from './sections/FinalSection';

// Data & hooks
import { config } from './data/config';
import { useAudio } from './hooks/useAudio';

interface HeartPos {
  x: number;
  y: number;
  id: number;
}

export default function App() {
  const [isEntered, setIsEntered] = useState(false);
  const [hearts, setHearts] = useState<HeartPos[]>([]);
  const [heartCounter, setHeartCounter] = useState(0);
  const [secretNote, setSecretNote] = useState(false);

  const audio = useAudio(config.musicFile);

  // Enter handler — starts music after user interaction
  const handleEnter = useCallback(() => {
    setIsEntered(true);
    audio.fadeIn(2500);
  }, [audio]);

  // Heart burst handler for Easter eggs
  const handleHeartClick = useCallback((e: React.MouseEvent) => {
    const id = heartCounter + 1;
    setHeartCounter(id);
    setHearts(prev => [...prev, { x: e.clientX, y: e.clientY, id }]);
  }, [heartCounter]);

  const removeHeart = useCallback((id: number) => {
    setHearts(prev => prev.filter(h => h.id !== id));
  }, []);

  // Easter egg: press 'L' to reveal a secret love note
  useEffect(() => {
    if (!isEntered) return;
    const handler = (e: KeyboardEvent) => {
      if ((e.key === 'l' || e.key === 'L') && !e.ctrlKey && !e.metaKey) {
        setSecretNote(v => !v);
      }
      if (e.key === 'Escape') setSecretNote(false);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isEntered]);

  return (
    <>
      {/* Entry screen */}
      <AnimatePresence>
        {!isEntered && (
          <motion.div
            key="entry-wrapper"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <EntryScreen onEnter={handleEnter} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main experience */}
      <AnimatePresence>
        {isEntered && (
          <motion.div
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Persistent UI */}
            <Navigation />
            <MusicPlayer
              isPlaying={audio.isPlaying}
              onToggle={audio.toggle}
              isMuted={audio.isMuted}
              onMute={audio.mute}
              volume={audio.volume}
              onVolumeChange={audio.changeVolume}
              hasError={audio.hasError}
            />

            {/* Heart bursts */}
            {hearts.map(h => (
              <HeartBurst
                key={h.id}
                x={h.x}
                y={h.y}
                onDone={() => removeHeart(h.id)}
              />
            ))}

            {/* Secret 'L' key note */}
            <AnimatePresence>
              {secretNote && (
                <motion.div
                  key="secret-note"
                  className="fixed inset-0 z-[150] flex items-center justify-center p-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setSecretNote(false)}
                >
                  <div className="absolute inset-0 bg-dark/85 backdrop-blur-sm" />
                  <motion.div
                    className="relative z-10 paper-card max-w-sm w-full p-8 text-center"
                    initial={{ scale: 0.85, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.85, y: 20 }}
                    onClick={e => e.stopPropagation()}
                  >
                    <p className="font-script text-3xl text-rose mb-4">A hidden note…</p>
                    <p className="font-sans text-sm text-cream/70 leading-relaxed">
                      You found the secret message. That means you're curious — and curiosity
                      is one of the things I love about you. There's no grand secret here,
                      just this: I think about you more than you know. ❤️
                    </p>
                    <p className="font-script text-lg text-cream/40 mt-6">Press Escape or click anywhere to close.</p>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Sections */}
            <main>
              <HeroSection onHeartClick={handleHeartClick} />
              <OurStorySection />
              <GallerySection />
              <ReasonsSection />
              <VideoSection />
              <StatsSection />
              <LoveLetterSection />
              <FutureSection />
              <FinalSection onHeartClick={handleHeartClick} />
            </main>

            {/* Footer */}
            <footer className="bg-dark py-8 text-center">
              <p className="font-script text-lg text-cream/20">
                Made with love, for you. ❤️
              </p>
              <p className="text-xs font-sans text-cream/10 mt-1">
                August 1, 2026 — Girlfriend's Day
              </p>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

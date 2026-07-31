import { useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { handleImageError } from '../utils/helpers';
import type { Memory } from '../data/types';

interface LightboxProps {
  photos: Memory[];
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export default function Lightbox({
  photos,
  currentIndex,
  onClose,
  onPrev,
  onNext,
}: LightboxProps) {
  const touchStartX = useRef<number>(0);
  const photo = photos[currentIndex];

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose, onPrev, onNext]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      diff > 0 ? onNext() : onPrev();
    }
  }, [onNext, onPrev]);

  if (!photo) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="lightbox-overlay"
        className="fixed inset-0 z-[100] flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={onClose}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        role="dialog"
        aria-modal="true"
        aria-label={`Photo: ${photo.caption ?? photo.title}`}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-dark/95 backdrop-blur-md" />

        {/* Content */}
        <div
          className="relative z-10 flex flex-col items-center max-w-4xl w-full mx-4"
          onClick={e => e.stopPropagation()}
        >
          {/* Close */}
          <button
            onClick={onClose}
            aria-label="Close photo viewer"
            className="absolute -top-12 right-0 text-cream/50 hover:text-cream transition-colors z-20 p-2"
          >
            <X size={24} />
          </button>

          {/* Image */}
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.94 }}
            transition={{ duration: 0.3 }}
            className="relative w-full"
          >
            <img
              src={photo.image}
              alt={photo.caption ?? photo.title}
              onError={handleImageError}
              className="w-full max-h-[75vh] object-contain rounded-xl shadow-2xl"
              draggable={false}
            />

            {/* Caption */}
            {photo.caption && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-dark/90 to-transparent rounded-b-xl"
              >
                <p className="font-script text-cream text-lg text-center">{photo.caption}</p>
              </motion.div>
            )}
          </motion.div>

          {/* Counter & navigation */}
          <div className="flex items-center gap-6 mt-4">
            <button
              onClick={onPrev}
              aria-label="Previous photo"
              className="flex items-center justify-center w-10 h-10 glass-card rounded-full
                         text-cream/60 hover:text-cream hover:border-rose/40 transition-all active:scale-95"
            >
              <ChevronLeft size={20} />
            </button>

            <span className="text-caption text-cream/40 font-sans tabular-nums">
              {currentIndex + 1} / {photos.length}
            </span>

            <button
              onClick={onNext}
              aria-label="Next photo"
              className="flex items-center justify-center w-10 h-10 glass-card rounded-full
                         text-cream/60 hover:text-cream hover:border-rose/40 transition-all active:scale-95"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Dot indicators */}
          <div className="flex gap-1.5 mt-3">
            {photos.map((_, i) => (
              <div
                key={i}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
                  i === currentIndex ? 'bg-rose scale-125' : 'bg-cream/20'
                }`}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

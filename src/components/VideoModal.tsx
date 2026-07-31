import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface VideoModalProps {
  youtubeId?: string;
  localSrc?: string;
  title: string;
  onClose: () => void;
}

export default function VideoModal({ youtubeId, localSrc, title, onClose }: VideoModalProps) {
  const localVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        key="video-modal"
        className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-dark/97 backdrop-blur-md" />

        {/* Modal content */}
        <motion.div
          className="relative z-10 w-full max-w-3xl"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          onClick={e => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-3 px-1">
            <p className="text-caption text-cream/50 font-sans">{title}</p>
            <button
              onClick={onClose}
              aria-label="Close video"
              className="text-cream/50 hover:text-cream transition-colors p-1"
            >
              <X size={22} />
            </button>
          </div>

          {/* Video wrapper — 16:9 aspect ratio */}
          <div className="relative w-full overflow-hidden rounded-2xl shadow-2xl"
               style={{ paddingTop: '56.25%' }}>
            {youtubeId && (
              <iframe
                src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1`}
                title={title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full border-0"
              />
            )}
            {localSrc && !youtubeId && (
              <video
                ref={localVideoRef}
                src={localSrc}
                controls
                autoPlay
                playsInline
                className="absolute inset-0 w-full h-full object-contain bg-dark"
                aria-label={title}
              />
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

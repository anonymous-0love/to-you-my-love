import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Music } from 'lucide-react';

interface MusicPlayerProps {
  isPlaying: boolean;
  onToggle: () => void;
  isMuted: boolean;
  onMute: () => void;
  volume: number;
  onVolumeChange: (v: number) => void;
  hasError: boolean;
}

export default function MusicPlayer({
  isPlaying,
  onToggle,
  isMuted,
  onMute,
  volume,
  onVolumeChange,
  hasError,
}: MusicPlayerProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className="fixed bottom-6 right-4 sm:right-6 z-50 flex flex-col items-end gap-2"
      role="region"
      aria-label="Music player"
    >
      {/* Volume panel */}
      <AnimatePresence>
        {expanded && !hasError && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            className="glass-card px-4 py-3 flex items-center gap-3"
          >
            <button
              onClick={onMute}
              aria-label={isMuted ? 'Unmute' : 'Mute'}
              className="text-cream/60 hover:text-rose transition-colors"
            >
              {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </button>
            <input
              type="range"
              min={0}
              max={1}
              step={0.05}
              value={isMuted ? 0 : volume}
              onChange={e => onVolumeChange(parseFloat(e.target.value))}
              aria-label="Volume"
              className="w-20 accent-rose cursor-pointer"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main control pill */}
      <motion.div
        className="glass-card flex items-center gap-3 px-4 py-3"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
      >
        {/* Animated music icon */}
        <div className="relative">
          <Music
            size={14}
            className={`text-gold transition-opacity ${isPlaying ? 'opacity-100' : 'opacity-40'}`}
          />
          {isPlaying && (
            <motion.div
              className="absolute -top-1 -right-1 w-2 h-2 bg-rose rounded-full"
              animate={{ scale: [1, 1.4, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          )}
        </div>

        {/* Volume toggle (expander) */}
        {!hasError && (
          <button
            onClick={() => setExpanded(e => !e)}
            aria-label="Show volume controls"
            aria-expanded={expanded}
            className="text-cream/40 hover:text-cream/80 transition-colors"
          >
            {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
          </button>
        )}

        {/* Play/pause */}
        <button
          onClick={onToggle}
          disabled={hasError}
          aria-label={isPlaying ? 'Pause music' : 'Play music'}
          className={`flex items-center justify-center w-8 h-8 rounded-full transition-all
            ${hasError
              ? 'bg-dark-4 text-cream/20 cursor-not-allowed'
              : 'bg-burgundy text-cream hover:bg-burgundy-light active:scale-95'
            }`}
        >
          {isPlaying ? <Pause size={14} /> : <Play size={14} className="ml-0.5" />}
        </button>

        {hasError && (
          <span className="text-xs text-cream/30 max-w-[80px] leading-tight">
            Add music file
          </span>
        )}
      </motion.div>
    </div>
  );
}

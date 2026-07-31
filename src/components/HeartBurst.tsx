import { useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface HeartBurstProps {
  x: number;
  y: number;
  onDone?: () => void;
}

interface HeartParticle {
  id: number;
  angle: number;
  distance: number;
  size: number;
  char: string;
  color: string;
}

const COLORS = ['#C2748A', '#D4919F', '#C9A87B', '#8B2635', '#F5F0E8'];
const CHARS = ['❤️', '♥', '✦', '♡'];

export default function HeartBurst({ x, y, onDone }: HeartBurstProps) {
  const particles = useMemo<HeartParticle[]>(() =>
    Array.from({ length: 16 }, (_, i) => ({
      id: i,
      angle: (i / 16) * 360,
      distance: Math.random() * 80 + 40,
      size: Math.random() * 14 + 10,
      char: CHARS[Math.floor(Math.random() * CHARS.length)],
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    })),
    []
  );

  useEffect(() => {
    const timer = setTimeout(() => onDone?.(), 1200);
    return () => clearTimeout(timer);
  }, [onDone]);

  return (
    <div
      className="fixed pointer-events-none z-[9999]"
      style={{ left: x, top: y }}
      aria-hidden="true"
    >
      <AnimatePresence>
        {particles.map(p => {
          const rad = (p.angle * Math.PI) / 180;
          const tx = Math.cos(rad) * p.distance;
          const ty = Math.sin(rad) * p.distance;

          return (
            <motion.span
              key={p.id}
              className="absolute select-none"
              style={{
                fontSize: p.size,
                color: p.color,
                left: 0,
                top: 0,
                transformOrigin: 'center',
              }}
              initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
              animate={{
                x: tx,
                y: ty,
                scale: [0, 1.4, 0.8, 0],
                opacity: [1, 1, 0.5, 0],
              }}
              transition={{
                duration: 0.9,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              {p.char}
            </motion.span>
          );
        })}
      </AnimatePresence>
    </div>
  );
}

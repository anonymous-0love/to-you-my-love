import { useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface Particle {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
  char: string;
}

interface FloatingParticlesProps {
  count?: number;
  className?: string;
}

const CHARS = ['♥', '✦', '·', '✿', '♡'];

export default function FloatingParticles({ count = 18, className = '' }: FloatingParticlesProps) {
  const prefersReduced = useReducedMotion();

  const particles = useMemo<Particle[]>(() =>
    Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: Math.random() * 14 + 6,
      duration: Math.random() * 12 + 14,
      delay: Math.random() * 14,
      opacity: Math.random() * 0.25 + 0.05,
      char: CHARS[Math.floor(Math.random() * CHARS.length)],
    })),
    [count]
  );

  if (prefersReduced) return null;

  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      aria-hidden="true"
    >
      {particles.map(p => (
        <motion.span
          key={p.id}
          className="absolute bottom-[-20px] select-none text-rose"
          style={{
            left: `${p.left}%`,
            fontSize: p.size,
            color: p.char === '✦' || p.char === '·'
              ? 'rgba(201,168,123,0.6)'
              : 'rgba(194,116,138,0.5)',
          }}
          initial={{ y: 0, opacity: 0 }}
          animate={{
            y: [0, -1200],
            opacity: [0, p.opacity, p.opacity, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          {p.char}
        </motion.span>
      ))}
    </div>
  );
}

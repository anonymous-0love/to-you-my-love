import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';

type Direction = 'up' | 'down' | 'left' | 'right' | 'none';

interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number;
  direction?: Direction;
  className?: string;
  duration?: number;
  margin?: string;
}

const getInitial = (direction: Direction) => {
  switch (direction) {
    case 'up':    return { opacity: 0, y: 40 };
    case 'down':  return { opacity: 0, y: -40 };
    case 'left':  return { opacity: 0, x: 50 };
    case 'right': return { opacity: 0, x: -50 };
    case 'none':  return { opacity: 0 };
    default:      return { opacity: 0, y: 40 };
  }
};

export default function ScrollReveal({
  children,
  delay = 0,
  direction = 'up',
  className = '',
  duration = 0.75,
  margin = '-60px',
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();
  const isInView = useInView(ref, {
    once: true,
    margin: margin as `${number}px`,
  });

  const initial = prefersReduced ? { opacity: 0 } : getInitial(direction);
  const visible = {
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      duration: prefersReduced ? 0.01 : duration,
      delay: prefersReduced ? 0 : delay,
      ease: [0.22, 1, 0.36, 1],
    },
  };

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={isInView ? visible : initial}
      className={className}
    >
      {children}
    </motion.div>
  );
}

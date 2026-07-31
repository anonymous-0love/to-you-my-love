import { useRef } from 'react';
import { useInView } from 'framer-motion';

interface ScrollRevealOptions {
  margin?: string;
  once?: boolean;
}

export function useScrollReveal(options: ScrollRevealOptions = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    once: options.once ?? true,
    margin: (options.margin ?? '-80px') as `${number}px`,
  });
  return { ref, isInView };
}

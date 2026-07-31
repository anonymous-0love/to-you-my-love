import { useRef, useState, useEffect } from 'react';
import { useInView } from 'framer-motion';
import { formatNumber } from '../utils/helpers';

interface AnimatedCounterProps {
  target: number;
  suffix?: string;
  duration?: number;
  className?: string;
}

export default function AnimatedCounter({
  target,
  suffix = '',
  duration = 2000,
  className = '',
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const [count, setCount] = useState(0);
  const hasStarted = useRef(false);

  useEffect(() => {
    if (!isInView || hasStarted.current || target === 0) return;
    hasStarted.current = true;

    const steps = 60;
    const stepDuration = duration / steps;
    let current = 0;
    const increment = target / steps;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [isInView, target, duration]);

  return (
    <span ref={ref} className={className}>
      {formatNumber(count)}{suffix}
    </span>
  );
}

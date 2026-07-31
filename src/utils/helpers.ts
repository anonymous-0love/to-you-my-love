// Calculate days between two dates
export function daysBetween(startDate: string, endDate: Date = new Date()): number {
  if (!startDate || startDate.includes('YYYY')) return 0;
  const start = new Date(startDate);
  if (isNaN(start.getTime())) return 0;
  const diff = endDate.getTime() - start.getTime();
  return Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)));
}

// Format a number with commas
export function formatNumber(n: number): string {
  return n.toLocaleString();
}

// Clamp a value between min and max
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

// Generate a random number in range [min, max]
export function randomInRange(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

// Check if the user prefers reduced motion
export function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// Stagger delay helper
export function staggerDelay(index: number, base = 0.1): number {
  return index * base;
}

// Replace placeholder text in config strings
export function resolveName(text: string, name: string): string {
  return text.replace(/\[HER_NAME\]/g, name).replace(/HER_NAME/g, name);
}

// Gracefully handle broken images by returning a fallback data URL
export const FALLBACK_IMAGE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%231E1515'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%23C2748A' font-size='48'%3E%E2%9D%A4%3C/text%3E%3C/svg%3E";

export function handleImageError(e: React.SyntheticEvent<HTMLImageElement>) {
  const target = e.currentTarget;
  target.onerror = null;
  target.src = FALLBACK_IMAGE;
}

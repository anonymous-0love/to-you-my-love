import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import ScrollReveal from '../components/ScrollReveal';
import Lightbox from '../components/Lightbox';
import { galleryPhotos } from '../data/memories';
import { handleImageError } from '../utils/helpers';
import type { Memory } from '../data/types';

type Category = 'all' | 'couple' | 'portrait' | 'fun' | 'romantic';

const CATEGORIES: { key: Category; label: string }[] = [
  { key: 'all',      label: 'All' },
  { key: 'couple',   label: 'Us Together' },
  { key: 'portrait', label: 'Her' },
  { key: 'romantic', label: 'Romance' },
  { key: 'fun',      label: 'Fun' },
];

const ASPECT_CLASSES: Record<number, string> = {
  0: 'aspect-[3/4]',
  1: 'aspect-square',
  2: 'aspect-[4/5]',
  3: 'aspect-[3/4]',
  4: 'aspect-square',
  5: 'aspect-[4/3]',
  6: 'aspect-[3/4]',
  7: 'aspect-square',
  8: 'aspect-[4/5]',
};

export default function GallerySection() {
  const [activeCategory, setActiveCategory] = useState<Category>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered: Memory[] =
    activeCategory === 'all'
      ? galleryPhotos
      : galleryPhotos.filter(p => p.category === activeCategory);

  const openLightbox = useCallback((index: number) => setLightboxIndex(index), []);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const prevPhoto = useCallback(() =>
    setLightboxIndex(i => (i !== null ? (i - 1 + filtered.length) % filtered.length : null)),
    [filtered.length]
  );
  const nextPhoto = useCallback(() =>
    setLightboxIndex(i => (i !== null ? (i + 1) % filtered.length : null)),
    [filtered.length]
  );

  return (
    <section id="gallery" className="bg-dark section-pad">
      <div className="section-container">
        {/* Heading */}
        <ScrollReveal className="text-center mb-10">
          <p className="text-label mb-3">In Photos</p>
          <h2 className="heading-section italic mb-4">Moments I Never Want to Forget</h2>
          <div className="gold-divider" />
        </ScrollReveal>

        {/* Category filter */}
        <ScrollReveal delay={0.1} className="flex flex-wrap justify-center gap-2 mb-10">
          {CATEGORIES.map(cat => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              aria-pressed={activeCategory === cat.key}
              className={`px-5 py-2 rounded-full font-sans text-sm transition-all duration-200
                ${activeCategory === cat.key
                  ? 'bg-burgundy text-cream shadow-md shadow-burgundy/20'
                  : 'border border-rose/20 text-cream/50 hover:border-rose/50 hover:text-cream/80'
                }`}
            >
              {cat.label}
            </button>
          ))}
        </ScrollReveal>

        {/* Masonry grid */}
        <motion.div
          layout
          className="columns-2 sm:columns-3 lg:columns-4 gap-3 space-y-3"
        >
          {filtered.map((photo, index) => (
            <motion.div
              key={photo.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, delay: index * 0.04 }}
              className={`break-inside-avoid relative group cursor-pointer rounded-xl overflow-hidden
                          bg-dark-3 ${ASPECT_CLASSES[index % Object.keys(ASPECT_CLASSES).length]}`}
              onClick={() => openLightbox(index)}
              onKeyDown={e => { if (e.key === 'Enter') openLightbox(index); }}
              tabIndex={0}
              role="button"
              aria-label={`View photo: ${photo.caption ?? photo.title}`}
            >
              <img
                src={photo.image}
                alt={photo.caption ?? photo.title}
                onError={handleImageError}
                loading="lazy"
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
              />

              {/* Hover overlay with caption */}
              <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/0 to-transparent
                              opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col
                              justify-end p-3">
                {photo.caption && (
                  <p className="font-script text-cream text-sm leading-snug">{photo.caption}</p>
                )}
                {photo.featured && (
                  <span className="mt-1 text-xs text-gold/70 font-sans">★ Favourite</span>
                )}
              </div>

              {/* Featured badge */}
              {photo.featured && (
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-5 h-5 bg-burgundy rounded-full flex items-center justify-center text-xs">
                    ★
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>

        <ScrollReveal delay={0.2} className="text-center mt-10">
          <p className="font-script text-xl text-cream/40">
            Every photo, a page in our story.
          </p>
        </ScrollReveal>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          photos={filtered}
          currentIndex={lightboxIndex}
          onClose={closeLightbox}
          onPrev={prevPhoto}
          onNext={nextPhoto}
        />
      )}
    </section>
  );
}

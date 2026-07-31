import { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Film } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';
import VideoModal from '../components/VideoModal';
import { config } from '../data/config';
import { photos } from '../data/config';
import { handleImageError } from '../utils/helpers';

export default function VideoSection() {
  const [activeVideo, setActiveVideo] = useState<'youtube' | 'local' | null>(null);

  return (
    <section id="video" className="bg-dark-1 section-pad overflow-hidden">
      <div className="section-container">
        {/* Heading */}
        <ScrollReveal className="text-center mb-14">
          <p className="text-label mb-3">Press Play</p>
          <h2 className="heading-section italic mb-4">
            {config.videoSectionTitle}
          </h2>
          <div className="gold-divider" />
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {/* YouTube / Short card */}
          <ScrollReveal delay={0.1} direction="left">
            <VideoCard
              label="A Song That Reminds Me of You"
              caption="Press play when you want to feel something."
              thumbnail={photos.sweetCafe}
              onPlay={() => setActiveVideo('youtube')}
            />
          </ScrollReveal>

          {/* Local video card */}
          <ScrollReveal delay={0.2} direction="right">
            <VideoCard
              label={config.videoSectionTitle}
              caption={config.videoCaption}
              thumbnail={photos.kiss}
              onPlay={() => setActiveVideo('local')}
            />
          </ScrollReveal>
        </div>

        <ScrollReveal delay={0.3} className="text-center mt-10">
          <p className="font-script text-xl text-cream/40">
            Some moments deserve to be more than just photos.
          </p>
        </ScrollReveal>
      </div>

      {/* Modals */}
      {activeVideo === 'youtube' && (
        <VideoModal
          youtubeId={config.youtubeVideoId}
          title="A Song That Reminds Me of You"
          onClose={() => setActiveVideo(null)}
        />
      )}
      {activeVideo === 'local' && (
        <VideoModal
          localSrc={config.localVideoFile}
          title={config.videoSectionTitle}
          onClose={() => setActiveVideo(null)}
        />
      )}
    </section>
  );
}

interface VideoCardProps {
  label: string;
  caption: string;
  thumbnail: string;
  onPlay: () => void;
}

function VideoCard({ label, caption, thumbnail, onPlay }: VideoCardProps) {
  return (
    <motion.div
      className="group relative cursor-pointer rounded-2xl overflow-hidden bg-dark-3 border border-rose/10
                 hover:border-rose/30 transition-all duration-300"
      whileHover={{ y: -4 }}
      onClick={onPlay}
      onKeyDown={e => { if (e.key === 'Enter') onPlay(); }}
      tabIndex={0}
      role="button"
      aria-label={`Play video: ${label}`}
    >
      {/* Thumbnail */}
      <div className="relative aspect-video">
        <img
          src={thumbnail}
          alt={label}
          onError={handleImageError}
          className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-dark/40 group-hover:bg-dark/20 transition-colors duration-300" />

        {/* Play button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="flex items-center justify-center w-14 h-14 bg-burgundy/90 rounded-full
                       shadow-lg shadow-burgundy/30"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Play size={22} className="text-cream ml-1" />
          </motion.div>
        </div>

        {/* Film strip decoration */}
        <div className="absolute top-3 right-3">
          <Film size={16} className="text-gold/60" />
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="font-serif text-base text-cream mb-1 leading-snug">{label}</h3>
        <p className="text-caption">{caption}</p>
      </div>
    </motion.div>
  );
}

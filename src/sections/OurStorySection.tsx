import ScrollReveal from '../components/ScrollReveal';
import { timeline } from '../data/memories';
import { handleImageError } from '../utils/helpers';
import { MapPin, Calendar } from 'lucide-react';

export default function OurStorySection() {
  return (
    <section id="our-story" className="bg-dark-1 section-pad overflow-hidden">
      <div className="section-container">
        {/* Heading */}
        <ScrollReveal className="text-center mb-16 md:mb-20">
          <p className="text-label mb-3">Chapter One</p>
          <h2 className="heading-section italic mb-4">How It Started</h2>
          <div className="gold-divider" />
        </ScrollReveal>

        {/* Timeline */}
        <div className="relative">
          {/* Central line — hidden on mobile */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-rose/20 to-transparent -translate-x-1/2" />

          <div className="flex flex-col gap-12 md:gap-16">
            {timeline.map((item, index) => {
              const isLeft = index % 2 === 0;

              return (
                <ScrollReveal
                  key={item.id}
                  delay={index * 0.08}
                  direction={isLeft ? 'left' : 'right'}
                >
                  <div
                    className={`flex flex-col md:flex-row items-center gap-8 md:gap-12
                      ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                  >
                    {/* Photo */}
                    <div className="w-full md:w-[45%] flex-shrink-0">
                      <div className="relative group overflow-hidden rounded-2xl aspect-[4/3] bg-dark-3">
                        <img
                          src={item.image}
                          alt={item.title}
                          onError={handleImageError}
                          className="w-full h-full object-cover object-center transition-transform duration-700
                                     group-hover:scale-105"
                          loading="lazy"
                        />
                        {/* Hover overlay */}
                        <div className="absolute inset-0 bg-dark/0 group-hover:bg-dark/20 transition-colors duration-300" />
                        {/* Date badge */}
                        <div className="absolute top-3 left-3 glass-card px-3 py-1.5 flex items-center gap-1.5">
                          <Calendar size={12} className="text-gold" />
                          <span className="text-xs font-sans text-cream/80">{item.date}</span>
                        </div>
                      </div>
                    </div>

                    {/* Center dot — desktop */}
                    <div className="hidden md:flex flex-col items-center flex-shrink-0">
                      <div className="w-4 h-4 rounded-full bg-burgundy border-2 border-rose/40 shadow-lg shadow-burgundy/30" />
                    </div>

                    {/* Text */}
                    <div className="w-full md:w-[45%] flex-shrink-0 text-center md:text-left">
                      {item.location && (
                        <div className="flex items-center justify-center md:justify-start gap-1 mb-3">
                          <MapPin size={12} className="text-rose/60" />
                          <span className="text-xs font-sans text-rose/60 italic">{item.location}</span>
                        </div>
                      )}
                      <h3 className="heading-card italic mb-3">{item.title}</h3>
                      <div className="gold-divider md:mx-0 mb-4 w-10" />
                      <p className="text-body text-cream/70 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

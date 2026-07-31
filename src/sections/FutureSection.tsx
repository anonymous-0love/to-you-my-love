import { motion } from 'framer-motion';
import ScrollReveal from '../components/ScrollReveal';
import { futurePlans } from '../data/memories';

export default function FutureSection() {
  return (
    <section id="future" className="bg-dark-1 section-pad overflow-hidden">
      <div className="section-container">
        {/* Heading */}
        <ScrollReveal className="text-center mb-14">
          <p className="text-label mb-3">What's Next</p>
          <h2 className="heading-section italic mb-4">
            The Best Memories Are Still Ahead
          </h2>
          <div className="gold-divider mb-5" />
          <p className="text-body text-cream/50 max-w-md mx-auto">
            These are the plans I keep thinking about. The ones I want to live with you.
          </p>
        </ScrollReveal>

        {/* Plans grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-14">
          {futurePlans.map((plan, index) => (
            <ScrollReveal key={plan.id} delay={index * 0.1} direction="up">
              <motion.div
                className="card-dark-hover p-6 rounded-2xl flex flex-col gap-4 h-full"
                whileHover={{ y: -4 }}
                transition={{ duration: 0.25 }}
              >
                {/* Icon + Number */}
                <div className="flex items-center justify-between">
                  <span className="text-3xl">{plan.emoji}</span>
                  <span className="font-serif text-5xl text-cream/5 font-bold tabular-nums">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>

                {/* Text */}
                <div>
                  <h3 className="font-serif text-lg text-cream mb-2 leading-snug">{plan.title}</h3>
                  <p className="text-sm font-sans text-cream/60 leading-relaxed">{plan.description}</p>
                </div>

                {/* Bottom accent */}
                <div className="mt-auto pt-4 border-t border-rose/10">
                  <span className="text-xs text-rose/40 font-sans">Coming soon ✦</span>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        {/* Constellation decoration */}
        <ScrollReveal className="text-center">
          <div className="relative inline-flex items-center gap-3">
            {['✦', '✦', '✦', '✦', '✦'].map((s, i) => (
              <motion.span
                key={i}
                className="text-gold/30 text-xs"
                animate={{ opacity: [0.3, 0.8, 0.3] }}
                transition={{ duration: 2, delay: i * 0.3, repeat: Infinity }}
              >
                {s}
              </motion.span>
            ))}
          </div>
          <p className="font-script text-2xl text-cream/40 mt-4">
            The story isn't over — it's just getting started.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}

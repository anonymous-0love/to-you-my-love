import ScrollReveal from '../components/ScrollReveal';
import AnimatedCounter from '../components/AnimatedCounter';
import { staticStats } from '../data/memories';
import { config } from '../data/config';
import { daysBetween } from '../utils/helpers';

export default function StatsSection() {
  const daysCount = daysBetween(config.relationshipStartDate);
  const hasStartDate = !config.relationshipStartDate.includes('YYYY') && daysCount > 0;

  return (
    <section id="stats" className="bg-dark-2 section-pad overflow-hidden">
      <div className="section-container">
        {/* Heading */}
        <ScrollReveal className="text-center mb-14">
          <p className="text-label mb-3">By the Numbers</p>
          <h2 className="heading-section italic mb-4">Us, in Statistics</h2>
          <div className="gold-divider" />
        </ScrollReveal>

        {/* Days together — featured */}
        {hasStartDate && (
          <ScrollReveal className="mb-12" delay={0.05}>
            <div className="max-w-sm mx-auto text-center paper-card px-8 py-10">
              <div className="shimmer-text font-serif font-bold text-6xl sm:text-7xl mb-3">
                <AnimatedCounter target={daysCount} />
              </div>
              <p className="text-label tracking-widest">Days Together</p>
              <div className="gold-divider mt-4" />
              <p className="text-caption mt-4">
                And every single one of them has mattered.
              </p>
            </div>
          </ScrollReveal>
        )}

        {!hasStartDate && (
          <ScrollReveal className="mb-12 text-center" delay={0.05}>
            <div className="max-w-sm mx-auto paper-card px-8 py-10">
              <p className="font-serif italic text-4xl text-cream mb-3">Every day</p>
              <p className="text-label tracking-widest">Together</p>
              <div className="gold-divider mt-4" />
              <p className="text-caption mt-4">
                Update <code className="text-rose text-xs">config.ts</code> with your start date
                to see the counter.
              </p>
            </div>
          </ScrollReveal>
        )}

        {/* Other stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {staticStats.map((stat, index) => (
            <ScrollReveal key={stat.id} delay={index * 0.08} direction="up">
              <div className="card-dark p-6 text-center rounded-2xl hover:border-rose/30 transition-colors">
                <div className="font-serif text-2xl sm:text-3xl text-cream mb-2 leading-none">
                  {stat.isNumeric && typeof stat.value === 'number' ? (
                    <AnimatedCounter target={stat.value} suffix={stat.suffix ?? ''} />
                  ) : (
                    <span className="text-xl sm:text-2xl">{stat.value}</span>
                  )}
                </div>
                <p className="text-xs font-sans text-cream/50 leading-snug">{stat.label}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.3} className="text-center mt-12">
          <p className="font-script text-xl text-cream/40">
            No number could ever be enough.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}

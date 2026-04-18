import { Link } from 'react-router-dom';
import useInView from '../../hooks/useInView';
import useLangStore from '../../store/langStore';

export default function Hero() {
  const [ref, isInView] = useInView({ threshold: 0.1 });
  const { t } = useLangStore();

  return (
    <section id="hero-section" ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img src="/images/hero-desert.png" alt={t.a11y.alt.desertLandscapeSunset} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-dune-950/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-dune-950/60 to-transparent" />
      </div>
      <div className="absolute top-1/4 right-1/4 w-2 h-2 bg-desert-400/30 rounded-full animate-float" />
      <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-amber-400/20 rounded-full animate-float delay-300" />
      <div className="absolute bottom-1/3 left-1/4 w-2 h-2 bg-desert-300/25 rounded-full animate-float delay-500" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className={`transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <span className="inline-block px-4 py-1.5 bg-desert-500/20 backdrop-blur-sm border border-desert-400/30 rounded-full text-desert-200 text-sm font-medium tracking-wider mb-6">
            {t.hero.badge}
          </span>
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-tight mb-6">
            {t.hero.titleLine1}{' '}<br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-desert-300 via-amber-300 to-desert-400 bg-clip-text text-transparent">{t.hero.titleLine2}</span>
          </h1>
          <p className="text-lg sm:text-xl text-sand-200/90 max-w-2xl mx-auto mb-10 leading-relaxed font-light">{t.hero.subtitle}</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/products" id="hero-shop-btn" className="btn-primary text-lg px-8 py-4 rounded-2xl">
              {t.hero.cta}
              <svg className="w-5 h-5 ms-2 rtl-flip" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>
            <Link to="/about" id="hero-story-btn" className="inline-flex items-center gap-2 px-8 py-4 text-white/90 font-medium rounded-2xl border border-white/20 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
              {t.hero.story}
            </Link>
          </div>
        </div>
        <div className={`grid grid-cols-3 gap-8 mt-20 max-w-lg mx-auto transition-all duration-1000 delay-500 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {[
            { number: '500+', label: t.hero.stats.products },
            { number: '50+', label: t.hero.stats.artisans },
            { number: '10K+', label: t.hero.stats.customers },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-2xl sm:text-3xl font-bold text-white">{stat.number}</p>
              <p className="text-xs sm:text-sm text-sand-300/70 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-xs text-sand-300/50 tracking-widest uppercase">{t.hero.scroll}</span>
        <div className="w-6 h-10 rounded-full border-2 border-sand-300/30 flex justify-center pt-2">
          <div className="w-1 h-3 bg-sand-300/50 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}

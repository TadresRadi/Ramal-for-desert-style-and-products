import useInView from '../hooks/useInView';
import useLangStore from '../store/langStore';

export default function About() {
  const [ref1, inView1] = useInView({ threshold: 0.1 });
  const [ref2, inView2] = useInView({ threshold: 0.1 });
  const [ref3, inView3] = useInView({ threshold: 0.1 });
  const { t } = useLangStore();

  const values = [
    { icon: '🤝', ...t.about.values.partnerships },
    { icon: '🌱', ...t.about.values.sustainability },
    { icon: '✨', ...t.about.values.authenticity },
    { icon: '💛', ...t.about.values.community },
  ];

  return (
    <div className="pt-28 pb-16">
      <section ref={ref1} className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-desert-100 via-sand-50 to-sand-100 dark:from-dune-900 dark:via-dune-950 dark:to-dune-900" />
        <div className={`relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center transition-all duration-700 ${inView1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="text-desert-500 font-medium text-sm tracking-widest uppercase">{t.about.label}</span>
          <h1 className="section-heading mt-3 text-4xl md:text-5xl">{t.about.title1}<br /><span className="gradient-text">{t.about.title2}</span></h1>
          <p className="text-lg text-dune-600 dark:text-sand-300 mt-6 leading-relaxed max-w-2xl mx-auto">{t.about.intro}</p>
        </div>
      </section>

      <section ref={ref2} className="py-20">
        <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-700 ${inView2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div><img src="/images/hero-desert.png" alt={t.a11y.alt.desertLandscape} className="rounded-2xl shadow-warm w-full h-80 object-cover" /></div>
            <div>
              <h2 className="section-heading text-2xl mb-6">{t.about.journeyTitle}</h2>
              <div className="space-y-4 text-dune-600 dark:text-sand-300 leading-relaxed">
                <p>{t.about.journeyP1}</p>
                <p>{t.about.journeyP2}</p>
                <p>{t.about.journeyP3}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section ref={ref3} className="py-20 bg-gradient-to-b from-sand-100 to-sand-50 dark:from-dune-900 dark:to-dune-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-14 transition-all duration-700 ${inView3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <span className="text-desert-500 font-medium text-sm tracking-widest uppercase">{t.about.valuesLabel}</span>
            <h2 className="section-heading mt-3">{t.about.valuesTitle}</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <div key={v.title} className="card p-6 text-center opacity-0 animate-fade-in-up" style={{ animationDelay: `${i * 150}ms`, animationFillMode: 'forwards' }}>
                <span className="text-4xl mb-4 block">{v.icon}</span>
                <h3 className="font-display font-semibold text-dune-900 dark:text-sand-100 mb-2">{v.title}</h3>
                <p className="text-sm text-dune-600 dark:text-sand-400 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[{ num: '50+', label: t.about.stats.artisans }, { num: '10K+', label: t.about.stats.sold }, { num: '30+', label: t.about.stats.countries }, { num: '99%', label: t.about.stats.happy }].map((s) => (
              <div key={s.label}>
                <p className="text-3xl md:text-4xl font-bold gradient-text">{s.num}</p>
                <p className="text-sm text-sand-500 dark:text-dune-400 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

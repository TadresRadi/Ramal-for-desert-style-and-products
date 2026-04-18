import { useState } from 'react';
import useInView from '../../hooks/useInView';
import useLangStore from '../../store/langStore';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [ref, isInView] = useInView({ threshold: 0.1 });
  const { t } = useLangStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) { setSubmitted(true); setEmail(''); setTimeout(() => setSubmitted(false), 4000); }
  };

  return (
    <section id="newsletter-section" ref={ref} className="py-20 lg:py-28 bg-gradient-to-br from-desert-600 via-desert-500 to-amber-500 dark:from-desert-900 dark:via-desert-800 dark:to-dune-900 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full translate-x-1/3 translate-y-1/3" />
      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className={`transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="text-desert-200/80 font-medium text-sm tracking-widest uppercase">{t.newsletter.label}</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mt-3 mb-4">{t.newsletter.title}</h2>
          <p className="text-desert-100/80 text-lg mb-8 max-w-xl mx-auto">{t.newsletter.subtitle}</p>
          {submitted ? (
            <div className="animate-scale-in bg-white/20 backdrop-blur-sm rounded-2xl p-6 border border-white/30 max-w-md mx-auto">
              <span className="text-4xl mb-3 block">✨</span>
              <p className="text-white font-semibold text-lg">{t.newsletter.success.title}</p>
              <p className="text-desert-100/80 text-sm mt-1">{t.newsletter.success.subtitle}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input type="email" id="newsletter-email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={t.newsletter.placeholder} className="flex-grow px-5 py-3.5 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/40 focus:bg-white/25 transition-all duration-300" required />
              <button type="submit" id="newsletter-submit" className="px-7 py-3.5 bg-white text-desert-700 font-semibold rounded-xl hover:bg-sand-50 transform hover:-translate-y-0.5 transition-all duration-300 shadow-lg whitespace-nowrap">{t.newsletter.subscribe}</button>
            </form>
          )}
          <p className="text-desert-200/50 text-xs mt-4">{t.newsletter.noSpam}</p>
        </div>
      </div>
    </section>
  );
}

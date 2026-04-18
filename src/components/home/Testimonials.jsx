import { useState } from 'react';
import { testimonials } from '../../data/products';
import useInView from '../../hooks/useInView';
import useLangStore from '../../store/langStore';

export default function Testimonials() {
  const [ref, isInView] = useInView({ threshold: 0.1 });
  const [activeIndex, setActiveIndex] = useState(0);
  const { t } = useLangStore();

  return (
    <section id="testimonials-section" ref={ref} className="py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-14 transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="text-desert-500 font-medium text-sm tracking-widest uppercase">{t.testimonials.label}</span>
          <h2 className="section-heading mt-3">{t.testimonials.title}</h2>
          <p className="section-subheading mx-auto mt-4">{t.testimonials.subtitle}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <div key={testimonial.id} className={`card p-6 cursor-pointer opacity-0 animate-fade-in-up ${activeIndex === index ? 'ring-2 ring-desert-400 shadow-warm' : ''}`} style={{ animationDelay: `${index * 150}ms`, animationFillMode: 'forwards' }} onClick={() => setActiveIndex(index)}>
              <div className="flex gap-0.5 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className={`w-5 h-5 ${i < testimonial.rating ? 'text-amber-400' : 'text-sand-300 dark:text-dune-600'}`} fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-dune-700 dark:text-sand-300 text-sm leading-relaxed mb-6">{t.lang === 'ar' && testimonial.textAr ? testimonial.textAr : testimonial.text}</p>
              <div className="flex items-center gap-3 mt-auto">
                <span className="text-2xl">{testimonial.avatar}</span>
                <div>
                  <p className="font-semibold text-dune-900 dark:text-sand-100 text-sm">{testimonial.name}</p>
                  <p className="text-xs text-sand-500 dark:text-dune-400">{t.lang === 'ar' && testimonial.locationAr ? testimonial.locationAr : testimonial.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

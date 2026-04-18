import { Link } from 'react-router-dom';
import useInView from '../../hooks/useInView';
import useLangStore from '../../store/langStore';

const categoryIcons = {
  'sand-art': '🏜️',
  'handmade-crafts': '🏺',
  'desert-clothing': '👘',
  'accessories': '💍',
};

const categoryImages = {
  'sand-art': '/images/product-sand-art.png',
  'handmade-crafts': '/images/product-craft.png',
  'desert-clothing': '/images/product-clothing.png',
  'accessories': '/images/product-accessory.png',
};

const categoryIds = ['sand-art', 'handmade-crafts', 'desert-clothing', 'accessories'];

export default function Categories() {
  const [ref, isInView] = useInView({ threshold: 0.1 });
  const { t } = useLangStore();

  return (
    <section id="categories-section" ref={ref} className="py-20 lg:py-28 bg-gradient-to-b from-sand-100 to-sand-50 dark:from-dune-900 dark:to-dune-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-14 transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="text-desert-500 font-medium text-sm tracking-widest uppercase">{t.categories.label}</span>
          <h2 className="section-heading mt-3">{t.categories.title}</h2>
          <p className="section-subheading mx-auto mt-4">{t.categories.subtitle}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categoryIds.map((catId, index) => {
            const catInfo = t.categories.items[catId];
            return (
              <Link key={catId} to={`/products?category=${catId}`} className="group relative overflow-hidden rounded-2xl h-72 opacity-0 animate-fade-in-up" style={{ animationDelay: `${index * 150}ms`, animationFillMode: 'forwards' }} id={`category-${catId}`}>
                <img src={categoryImages[catId]} alt={catInfo.name} className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-dune-950/90 via-dune-950/40 to-transparent group-hover:from-desert-900/90 group-hover:via-desert-900/40 transition-all duration-500" />
                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <span className="text-3xl mb-2">{categoryIcons[catId]}</span>
                  <h3 className="font-display text-xl font-bold text-white mb-1">{catInfo.name}</h3>
                  <p className="text-sand-300 text-sm leading-relaxed opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">{catInfo.description}</p>
                  <span className="inline-flex items-center gap-1 text-desert-300 text-sm font-medium mt-3 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 delay-100">
                    {t.categories.shopNow}
                    <svg className="w-4 h-4 rtl-flip" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

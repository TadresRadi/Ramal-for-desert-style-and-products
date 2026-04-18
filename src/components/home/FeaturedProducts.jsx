import { products } from '../../data/products';
import ProductCard from '../ui/ProductCard';
import useInView from '../../hooks/useInView';
import { Link } from 'react-router-dom';
import useLangStore from '../../store/langStore';

export default function FeaturedProducts() {
  const [ref, isInView] = useInView({ threshold: 0.1 });
  const featured = products.filter((p) => p.featured).slice(0, 4);
  const { t } = useLangStore();

  return (
    <section id="featured-products" ref={ref} className="py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-14 transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="text-desert-500 font-medium text-sm tracking-widest uppercase">{t.featured.label}</span>
          <h2 className="section-heading mt-3">{t.featured.title}</h2>
          <p className="section-subheading mx-auto mt-4">{t.featured.subtitle}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((product, index) => <ProductCard key={product.id} product={product} index={index} />)}
        </div>
        <div className="text-center mt-12">
          <Link to="/products" className="btn-secondary text-base px-8 py-3.5">
            {t.featured.viewAll}
            <svg className="w-4 h-4 ms-2 rtl-flip" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

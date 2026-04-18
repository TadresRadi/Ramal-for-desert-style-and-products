import { Link } from 'react-router-dom';
import useCartStore from '../../store/cartStore';
import useLangStore from '../../store/langStore';

export default function ProductCard({ product, index = 0 }) {
  const addItem = useCartStore((s) => s.addItem);
  const { t } = useLangStore();

  const productName = t.lang === 'ar' && product.nameAr ? product.nameAr : product.name;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
  };

  const catName = t.categories.items[product.category]?.name || product.category.replace('-', ' ');

  return (
    <Link
      to={`/products/${product.id}`}
      className="card group overflow-hidden opacity-0 animate-fade-in-up"
      style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
      id={`product-card-${product.id}`}
    >
      <div className="relative overflow-hidden h-64">
        <img src={product.images[0]} alt={productName} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute top-3 left-3 flex gap-2">
          {product.originalPrice && (
            <span className="px-2 py-1 text-xs font-semibold bg-desert-500 text-white rounded-full">
              {Math.round((1 - product.price / product.originalPrice) * 100)}% {t.productCard.off}
            </span>
          )}
          {product.tags?.includes('new') && <span className="px-2 py-1 text-xs font-semibold bg-emerald-500 text-white rounded-full">{t.productCard.new}</span>}
          {product.tags?.includes('bestseller') && <span className="px-2 py-1 text-xs font-semibold bg-amber-500 text-white rounded-full">{t.productCard.bestseller}</span>}
        </div>
        <button onClick={handleAddToCart} className="absolute bottom-3 right-3 w-10 h-10 bg-white dark:bg-dune-800 rounded-full shadow-lg flex items-center justify-center transform translate-y-12 group-hover:translate-y-0 transition-all duration-300 hover:bg-desert-500 hover:text-white text-dune-700 dark:text-sand-200" aria-label={t.productCard.addToCart}>
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
        </button>
      </div>
      <div className="p-5">
        <p className="text-xs font-medium text-desert-500 uppercase tracking-wider mb-1">{catName}</p>
        <h3 className="font-display font-semibold text-dune-900 dark:text-sand-100 group-hover:text-desert-600 dark:group-hover:text-desert-400 transition-colors line-clamp-1">{productName}</h3>
        <div className="flex items-center gap-1 mt-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-amber-400' : 'text-sand-300 dark:text-dune-600'}`} fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-xs text-sand-500 dark:text-dune-400">({product.reviewCount})</span>
        </div>
        <div className="flex items-center gap-2 mt-3">
          <span className="text-xl font-bold text-dune-900 dark:text-sand-100">${product.price.toFixed(2)}</span>
          {product.originalPrice && <span className="text-sm text-sand-400 line-through">${product.originalPrice.toFixed(2)}</span>}
        </div>
      </div>
    </Link>
  );
}

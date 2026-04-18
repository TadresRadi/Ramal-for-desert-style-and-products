import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { products } from '../data/products';
import ProductCard from '../components/ui/ProductCard';
import LoadingSkeleton from '../components/ui/LoadingSkeleton';
import useLangStore from '../store/langStore';

const categoryIds = ['sand-art', 'handmade-crafts', 'desert-clothing', 'accessories'];
const categoryIcons = { 'sand-art': '🏜️', 'handmade-crafts': '🏺', 'desert-clothing': '👘', 'accessories': '💍' };

const priceRangesDef = [
  { key: 'all', min: 0, max: Infinity },
  { key: 'under30', min: 0, max: 30 },
  { key: '30to60', min: 30, max: 60 },
  { key: '60to100', min: 60, max: 100 },
  { key: 'over100', min: 100, max: Infinity },
];

const sortKeys = ['featured', 'priceAsc', 'priceDesc', 'rating'];

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState(searchParams.get('category') || 'all');
  const [activePriceRange, setActivePriceRange] = useState(0);
  const [sortBy, setSortBy] = useState('featured');
  const [loading, setLoading] = useState(true);
  const { t } = useLangStore();

  useEffect(() => { const cat = searchParams.get('category'); if (cat) setActiveCategory(cat); }, [searchParams]);
  useEffect(() => { setLoading(true); const timer = setTimeout(() => setLoading(false), 500); return () => clearTimeout(timer); }, [activeCategory, activePriceRange, search, sortBy]);

  const handleCategoryChange = (catId) => {
    setActiveCategory(catId);
    if (catId === 'all') { searchParams.delete('category'); } else { searchParams.set('category', catId); }
    setSearchParams(searchParams);
  };

  const filteredProducts = useMemo(() => {
    let result = [...products];
    if (activeCategory !== 'all') result = result.filter((p) => p.category === activeCategory);
    const range = priceRangesDef[activePriceRange];
    result = result.filter((p) => p.price >= range.min && p.price < range.max);
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter((p) => {
        const name = (t.lang === 'ar' && p.nameAr ? p.nameAr : p.name).toLowerCase();
        const desc = (t.lang === 'ar' && p.descriptionAr ? p.descriptionAr : p.description).toLowerCase();
        return name.includes(q) || desc.includes(q);
      });
    }
    switch (sortBy) {
      case 'priceAsc': result.sort((a, b) => a.price - b.price); break;
      case 'priceDesc': result.sort((a, b) => b.price - a.price); break;
      case 'rating': result.sort((a, b) => b.rating - a.rating); break;
      default: result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }
    return result;
  }, [activeCategory, activePriceRange, search, sortBy, t.lang]);

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="section-heading">{t.productsPage.title}</h1>
          <p className="section-subheading mx-auto mt-4">{t.productsPage.subtitle}</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-grow">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-sand-400 rtl:left-auto rtl:right-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input type="text" id="product-search" value={search} onChange={(e) => setSearch(e.target.value)} placeholder={t.productsPage.search} className="input-field ps-12" />
          </div>
          <select id="product-sort" value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="input-field w-full sm:w-52">
            {sortKeys.map((k) => <option key={k} value={k}>{t.productsPage.sort[k]}</option>)}
          </select>
        </div>
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-64 flex-shrink-0">
            <div className="card p-6 sticky top-28 space-y-8">
              <div>
                <h3 className="font-display font-semibold text-dune-900 dark:text-sand-100 mb-4 text-sm uppercase tracking-wider">{t.productsPage.categoriesLabel}</h3>
                <div className="space-y-2">
                  <button onClick={() => handleCategoryChange('all')} className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all ${activeCategory === 'all' ? 'bg-desert-500/10 text-desert-600 dark:text-desert-400' : 'text-dune-600 dark:text-sand-400 hover:bg-sand-100 dark:hover:bg-dune-800'}`}>{t.productsPage.allProducts}</button>
                  {categoryIds.map((catId) => (
                    <button key={catId} onClick={() => handleCategoryChange(catId)} className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${activeCategory === catId ? 'bg-desert-500/10 text-desert-600 dark:text-desert-400' : 'text-dune-600 dark:text-sand-400 hover:bg-sand-100 dark:hover:bg-dune-800'}`}>
                      <span>{categoryIcons[catId]}</span>{t.categories.items[catId].name}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-display font-semibold text-dune-900 dark:text-sand-100 mb-4 text-sm uppercase tracking-wider">{t.productsPage.priceRange}</h3>
                <div className="space-y-2">
                  {priceRangesDef.map((range, i) => (
                    <button key={range.key} onClick={() => setActivePriceRange(i)} className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all ${activePriceRange === i ? 'bg-desert-500/10 text-desert-600 dark:text-desert-400' : 'text-dune-600 dark:text-sand-400 hover:bg-sand-100 dark:hover:bg-dune-800'}`}>{t.productsPage.priceRanges[range.key]}</button>
                  ))}
                </div>
              </div>
              <button onClick={() => { setActiveCategory('all'); setActivePriceRange(0); setSearch(''); setSortBy('featured'); searchParams.delete('category'); setSearchParams(searchParams); }} className="w-full text-sm text-desert-500 hover:text-desert-700 font-medium">{t.productsPage.clearFilters}</button>
            </div>
          </aside>
          <div className="flex-grow">
            <p className="text-sm text-sand-500 dark:text-dune-400 mb-6">{t.productsPage.showing} {filteredProducts.length} {filteredProducts.length === 1 ? t.productsPage.product : t.productsPage.products}</p>
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"><LoadingSkeleton type="card" count={6} /></div>
            ) : filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product, index) => <ProductCard key={product.id} product={product} index={index} />)}
              </div>
            ) : (
              <div className="text-center py-20">
                <span className="text-6xl mb-4 block">🏜️</span>
                <h3 className="font-display text-xl font-semibold text-dune-700 dark:text-sand-300 mb-2">{t.productsPage.noResults}</h3>
                <p className="text-sand-500 dark:text-dune-400">{t.productsPage.noResultsSub}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

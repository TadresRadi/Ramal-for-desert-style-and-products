import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { products, reviews } from '../data/products';
import useCartStore from '../store/cartStore';
import useLangStore from '../store/langStore';
import LoadingSkeleton from '../components/ui/LoadingSkeleton';

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const addItem = useCartStore((s) => s.addItem);
  const { t } = useLangStore();

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => { setProduct(products.find((p) => p.id === parseInt(id)) || null); setLoading(false); setSelectedImage(0); setQuantity(1); }, 400);
    return () => clearTimeout(timer);
  }, [id]);

  const handleAddToCart = () => { if (product) { addItem(product, quantity); setAddedToCart(true); setTimeout(() => setAddedToCart(false), 2000); } };
  const productReviews = reviews.filter((r) => r.productId === parseInt(id));

  if (loading) return <div className="pt-28 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><LoadingSkeleton type="detail" /></div>;
  if (!product) return (
    <div className="pt-28 pb-16 text-center">
      <span className="text-6xl block mb-4">🏜️</span>
      <h2 className="section-heading mb-4">{t.productDetails.notFound}</h2>
      <Link to="/products" className="btn-primary">{t.productDetails.backToProducts}</Link>
    </div>
  );

  const catName = t.categories.items[product.category]?.name || product.category.replace('-', ' ');
  const productName = t.lang === 'ar' && product.nameAr ? product.nameAr : product.name;
  const productDescription = t.lang === 'ar' && product.descriptionAr ? product.descriptionAr : product.description;

  return (
    <div className="pt-28 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center gap-2 text-sm text-sand-500 dark:text-dune-400 mb-8">
          <Link to="/" className="hover:text-desert-500 transition-colors">{t.home}</Link><span>/</span>
          <Link to="/products" className="hover:text-desert-500 transition-colors">{t.breadcrumbProducts}</Link><span>/</span>
          <span className="text-dune-900 dark:text-sand-100">{productName}</span>
        </nav>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-4">
            <div className="card overflow-hidden rounded-2xl"><img src={product.images[selectedImage]} alt={productName} className="w-full h-96 lg:h-[500px] object-cover" /></div>
            {product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((img, i) => (
                  <button key={i} onClick={() => setSelectedImage(i)} className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${selectedImage === i ? 'border-desert-500 shadow-warm' : 'border-sand-200 dark:border-dune-700 hover:border-desert-300'}`}>
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>
          <div>
            <span className="text-desert-500 font-medium text-sm uppercase tracking-wider">{catName}</span>
            <h1 className="font-display text-3xl lg:text-4xl font-bold text-dune-900 dark:text-sand-50 mt-2 mb-4">{productName}</h1>
            <div className="flex items-center gap-3 mb-6">
              <div className="flex">{[...Array(5)].map((_, i) => (<svg key={i} className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'text-amber-400' : 'text-sand-300'}`} fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>))}</div>
              <span className="text-sm text-sand-500">{product.rating} ({product.reviewCount})</span>
            </div>
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-3xl font-bold text-dune-900 dark:text-sand-50">${product.price.toFixed(2)}</span>
              {product.originalPrice && <span className="text-lg text-sand-400 line-through">${product.originalPrice.toFixed(2)}</span>}
              {product.originalPrice && <span className="px-2 py-1 bg-desert-500/10 text-desert-600 text-sm font-semibold rounded-lg">{Math.round((1 - product.price / product.originalPrice) * 100)}% {t.productDetails.off}</span>}
            </div>
            <p className="text-dune-600 dark:text-sand-300 leading-relaxed mb-8">{productDescription}</p>
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <div className="flex items-center border border-sand-300 dark:border-dune-600 rounded-xl overflow-hidden">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-4 py-3 text-dune-700 dark:text-sand-300 hover:bg-sand-100 dark:hover:bg-dune-800 transition-colors">−</button>
                <span className="px-6 py-3 font-semibold text-dune-900 dark:text-sand-100 min-w-[3rem] text-center">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="px-4 py-3 text-dune-700 dark:text-sand-300 hover:bg-sand-100 dark:hover:bg-dune-800 transition-colors">+</button>
              </div>
              <button id="add-to-cart-btn" onClick={handleAddToCart} className={`btn-primary flex-grow text-base ${addedToCart ? 'bg-emerald-500 from-emerald-500 to-emerald-600' : ''}`}>
                {addedToCart ? t.productDetails.addedToCart : t.productDetails.addToCart}
              </button>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {[{ icon: '🚚', label: t.productDetails.freeShipping, sub: t.productDetails.freeShippingSub }, { icon: '↩️', label: t.productDetails.easyReturns, sub: t.productDetails.easyReturnsSub }, { icon: '🛡️', label: t.productDetails.securePayment, sub: t.productDetails.securePaymentSub }].map((f) => (
                <div key={f.label} className="text-center p-3 rounded-xl bg-sand-50 dark:bg-dune-800/50">
                  <span className="text-xl">{f.icon}</span>
                  <p className="text-xs font-semibold text-dune-800 dark:text-sand-200 mt-1">{f.label}</p>
                  <p className="text-xs text-sand-500 dark:text-dune-400">{f.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-16">
          <h2 className="section-heading text-2xl mb-8">{t.productDetails.reviews}</h2>
          {productReviews.length > 0 ? (
            <div className="space-y-6">
              {productReviews.map((review) => (
                <div key={review.id} className="card p-6">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="font-semibold text-dune-900 dark:text-sand-100">{review.userName}</p>
                      <div className="flex gap-0.5 mt-1">{[...Array(5)].map((_, i) => (<svg key={i} className={`w-4 h-4 ${i < review.rating ? 'text-amber-400' : 'text-sand-300'}`} fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>))}</div>
                    </div>
                    <span className="text-sm text-sand-400">{review.date}</span>
                  </div>
                  <h4 className="font-semibold text-dune-800 dark:text-sand-200 mb-2">{t.lang === 'ar' && review.titleAr ? review.titleAr : review.title}</h4>
                  <p className="text-dune-600 dark:text-sand-400 text-sm leading-relaxed">{t.lang === 'ar' && review.textAr ? review.textAr : review.text}</p>
                </div>
              ))}
            </div>
          ) : <p className="text-sand-500 dark:text-dune-400">{t.productDetails.noReviews}</p>}
        </div>
      </div>
    </div>
  );
}

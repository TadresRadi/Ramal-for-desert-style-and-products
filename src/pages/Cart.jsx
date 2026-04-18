import { Link } from 'react-router-dom';
import useCartStore from '../store/cartStore';
import useLangStore from '../store/langStore';

export default function Cart() {
  const { items, removeItem, updateQuantity, clearCart, getTotalPrice } = useCartStore();
  const total = getTotalPrice();
  const { t } = useLangStore();

  if (items.length === 0) {
    return (
      <div className="pt-28 pb-16 text-center min-h-screen flex flex-col items-center justify-center">
        <span className="text-7xl mb-6 block">🛒</span>
        <h1 className="section-heading mb-4">{t.cart.empty}</h1>
        <p className="section-subheading mb-8">{t.cart.emptySub}</p>
        <Link to="/products" className="btn-primary text-lg px-8 py-4">{t.cart.startShopping}</Link>
      </div>
    );
  }

  const catName = (cat) => t.categories.items[cat]?.name || cat.replace('-', ' ');
  const freeShipMsg = t.cart.freeShippingMsg.replace('${amount}', `$${(50 - total).toFixed(2)}`);
  const itemName = (item) => (t.lang === 'ar' && item.nameAr ? item.nameAr : item.name);

  return (
    <div className="pt-28 pb-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="section-heading mb-2">{t.cart.title}</h1>
        <p className="text-sand-500 dark:text-dune-400 mb-8">{items.length} {items.length === 1 ? t.cart.item : t.cart.items} {t.cart.inCart}</p>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div key={item.id} className="card p-4 sm:p-6 flex flex-col sm:flex-row gap-4 sm:gap-6">
                <Link to={`/products/${item.id}`} className="w-full sm:w-28 h-28 rounded-xl overflow-hidden flex-shrink-0">
                  <img src={item.images[0]} alt={itemName(item)} className="w-full h-full object-cover hover:scale-105 transition-transform" />
                </Link>
                <div className="flex-grow min-w-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <Link to={`/products/${item.id}`} className="font-display font-semibold text-dune-900 dark:text-sand-100 hover:text-desert-500 transition-colors line-clamp-1">{itemName(item)}</Link>
                      <p className="text-sm text-desert-500 mt-0.5">{catName(item.category)}</p>
                    </div>
                    <button onClick={() => removeItem(item.id)} className="text-sand-400 hover:text-red-500 transition-colors p-1" aria-label={t.cart.remove}>
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center border border-sand-300 dark:border-dune-600 rounded-lg overflow-hidden">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-3 py-1.5 text-sm text-dune-700 dark:text-sand-300 hover:bg-sand-100 dark:hover:bg-dune-800 transition-colors">−</button>
                      <span className="px-4 py-1.5 text-sm font-semibold text-dune-900 dark:text-sand-100">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-3 py-1.5 text-sm text-dune-700 dark:text-sand-300 hover:bg-sand-100 dark:hover:bg-dune-800 transition-colors">+</button>
                    </div>
                    <span className="font-bold text-lg text-dune-900 dark:text-sand-100">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            ))}
            <button onClick={clearCart} className="text-sm text-red-500 hover:text-red-700 font-medium transition-colors">{t.cart.clearCart}</button>
          </div>
          <div className="lg:col-span-1">
            <div className="card p-6 sticky top-28">
              <h2 className="font-display font-bold text-lg text-dune-900 dark:text-sand-100 mb-6">{t.cart.orderSummary}</h2>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm"><span className="text-sand-500 dark:text-dune-400">{t.cart.subtotal}</span><span className="text-dune-900 dark:text-sand-100">${total.toFixed(2)}</span></div>
                <div className="flex justify-between text-sm"><span className="text-sand-500 dark:text-dune-400">{t.cart.shipping}</span><span className="text-emerald-500 font-medium">{total >= 50 ? t.cart.free : '$4.99'}</span></div>
                <div className="border-t border-sand-200 dark:border-dune-700 pt-3">
                  <div className="flex justify-between"><span className="font-semibold text-dune-900 dark:text-sand-100">{t.cart.total}</span><span className="font-bold text-xl text-dune-900 dark:text-sand-100">${(total >= 50 ? total : total + 4.99).toFixed(2)}</span></div>
                </div>
              </div>
              {total < 50 && <p className="text-xs text-sand-500 dark:text-dune-400 mb-4 bg-sand-50 dark:bg-dune-800 p-3 rounded-lg">🚚 {freeShipMsg}</p>}
              <button className="btn-primary w-full text-base py-3.5">{t.cart.checkout}</button>
              <Link to="/products" className="block text-center text-sm text-desert-500 hover:text-desert-700 font-medium mt-4 transition-colors">{t.cart.continueShopping}</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

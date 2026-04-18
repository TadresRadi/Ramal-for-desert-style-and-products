import { Link } from 'react-router-dom';
import useLangStore from '../../store/langStore';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { t } = useLangStore();
  const socialIcons = {
    instagram: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" aria-hidden="true">
        <path d="M7.75 2h8.5A5.76 5.76 0 0 1 22 7.75v8.5A5.76 5.76 0 0 1 16.25 22h-8.5A5.76 5.76 0 0 1 2 16.25v-8.5A5.76 5.76 0 0 1 7.75 2zm8.5 1.8h-8.5A3.95 3.95 0 0 0 3.8 7.75v8.5a3.95 3.95 0 0 0 3.95 3.95h8.5a3.95 3.95 0 0 0 3.95-3.95v-8.5a3.95 3.95 0 0 0-3.95-3.95z" />
        <path d="M12 7.33A4.67 4.67 0 1 1 7.33 12 4.67 4.67 0 0 1 12 7.33zm0 1.8A2.87 2.87 0 1 0 14.87 12 2.87 2.87 0 0 0 12 9.13zM17.17 6.24a1.09 1.09 0 1 1-1.09 1.09 1.09 1.09 0 0 1 1.09-1.09z" />
      </svg>
    ),
    twitter: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" aria-hidden="true">
        <path d="M18.9 2H22l-6.79 7.76L23 22h-6.1l-4.78-6.63L6.26 22H3.13l7.27-8.31L1 2h6.25l4.32 6L18.9 2zm-1.07 18.15h1.69L6.34 3.75H4.52l13.31 16.4z" />
      </svg>
    ),
    facebook: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" aria-hidden="true">
        <path d="M13.5 22v-8h2.7l.4-3.2h-3.1V8.7c0-.9.3-1.5 1.6-1.5h1.7V4.4c-.8-.1-1.6-.2-2.4-.2-2.4 0-4 1.5-4 4.2v2.4H8V14h2.4v8h3.1z" />
      </svg>
    ),
    pinterest: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" aria-hidden="true">
        <path d="M12.04 2C6.6 2 3 5.87 3 10.08c0 2.6.98 4.92 3.1 5.78.35.14.67.01.77-.39.07-.28.23-.98.3-1.28.1-.39.06-.53-.21-.84-.6-.71-.98-1.64-.98-2.95 0-3.8 2.84-7.2 7.4-7.2 4.03 0 6.24 2.46 6.24 5.75 0 4.31-1.9 7.95-4.72 7.95-1.56 0-2.73-1.29-2.36-2.88.45-1.9 1.31-3.96 1.31-5.34 0-1.23-.66-2.25-2.03-2.25-1.61 0-2.9 1.67-2.9 3.9 0 1.42.48 2.39.48 2.39l-1.94 8.23c-.58 2.45-.09 5.46-.05 5.76.03.18.25.22.35.08.14-.18 1.95-2.42 2.56-4.65.17-.63.97-3.89.97-3.89.48.93 1.89 1.75 3.39 1.75 4.46 0 7.48-4.07 7.48-9.51C21 5.83 17.16 2 12.04 2z" />
      </svg>
    ),
  };

  const footerLinks = {
    shop: [
      { label: t.footer.allProducts, path: '/products' },
      { label: t.footer.sandArt, path: '/products?category=sand-art' },
      { label: t.footer.handmadeCrafts, path: '/products?category=handmade-crafts' },
      { label: t.footer.desertClothing, path: '/products?category=desert-clothing' },
      { label: t.footer.accessories, path: '/products?category=accessories' },
    ],
    company: [
      { label: t.footer.aboutUs, path: '/about' },
      { label: t.footer.contactLink, path: '/contact' },
      { label: t.footer.careers, path: '#' },
      { label: t.footer.blog, path: '#' },
    ],
    support: [
      { label: t.footer.shippingInfo, path: '#' },
      { label: t.footer.returns, path: '#' },
      { label: t.footer.faq, path: '#' },
      { label: t.footer.sizeGuide, path: '#' },
    ],
  };

  return (
    <footer id="main-footer" className="bg-dune-950 text-sand-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 group mb-4">
              <span className="text-2xl">🏜️</span>
              <span className="font-display font-bold text-xl text-sand-50 group-hover:text-desert-400 transition-colors">
                {t.lang === 'ar' ? <span className="text-desert-500">رمال</span> : <>Ri<span className="text-desert-500">mal</span></>}
              </span>
            </Link>
            <p className="text-sand-400 text-sm leading-relaxed mb-6">{t.footer.description}</p>
            <div className="flex gap-3">
              {['instagram', 'twitter', 'facebook', 'pinterest'].map((socialKey) => (
                <a
                  key={socialKey}
                  href="#"
                  className="w-10 h-10 rounded-full bg-dune-800 hover:bg-desert-600 flex items-center justify-center transition-all duration-300 hover:-translate-y-1"
                  aria-label={t.a11y.social[socialKey]}
                >
                  {socialIcons[socialKey]}
                </a>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-display font-semibold text-sand-50 mb-4 text-sm uppercase tracking-wider">{t.footer.shop}</h3>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.label}><Link to={link.path} className="text-sm text-sand-400 hover:text-desert-400 transition-colors duration-300">{link.label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-display font-semibold text-sand-50 mb-4 text-sm uppercase tracking-wider">{t.footer.company}</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}><Link to={link.path} className="text-sm text-sand-400 hover:text-desert-400 transition-colors duration-300">{link.label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-display font-semibold text-sand-50 mb-4 text-sm uppercase tracking-wider">{t.footer.support}</h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.label}><Link to={link.path} className="text-sm text-sand-400 hover:text-desert-400 transition-colors duration-300">{link.label}</Link></li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-dune-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-sand-500">© {currentYear} {t.brand}. {t.footer.rights}</p>
          <div className="flex items-center gap-6 text-sm text-sand-500">
            <a href="#" className="hover:text-desert-400 transition-colors">{t.footer.privacy}</a>
            <a href="#" className="hover:text-desert-400 transition-colors">{t.footer.terms}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

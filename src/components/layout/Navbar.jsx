import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import ThemeToggle from '../ui/ThemeToggle';
import useCartStore from '../../store/cartStore';
import useLangStore from '../../store/langStore';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const totalItems = useCartStore((s) => s.getTotalItems());
  const { t, toggleLocale } = useLangStore();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setIsOpen(false); }, [location]);

  const navLinks = [
    { path: '/', label: t.nav.home },
    { path: '/products', label: t.nav.products },
    { path: '/about', label: t.nav.about },
    { path: '/contact', label: t.nav.contact },
  ];

  const linkClasses = ({ isActive }) =>
    `relative font-medium text-sm tracking-wide transition-colors duration-300 
     ${isActive
       ? 'text-desert-600 dark:text-desert-400'
       : 'text-dune-700 dark:text-sand-300 hover:text-desert-500 dark:hover:text-desert-400'
     }
     after:content-[""] after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-0.5 
     after:bg-desert-500 after:transform after:origin-left
     ${isActive ? 'after:scale-x-100' : 'after:scale-x-0 hover:after:scale-x-100'}
     after:transition-transform after:duration-300`;

  return (
    <nav id="main-navbar" className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-white/80 dark:bg-dune-950/80 backdrop-blur-xl shadow-soft py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" id="nav-logo" className="flex items-center gap-2 group">
            <span className="text-2xl">🏜️</span>
            <span className="font-display font-bold text-xl text-dune-900 dark:text-sand-50 group-hover:text-desert-600 dark:group-hover:text-desert-400 transition-colors duration-300">
              {t.lang === 'ar' ? (
                <><span className="text-desert-500">رمال</span></>
              ) : (
                <>Ri<span className="text-desert-500">mal</span></>
              )}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink key={link.path} to={link.path} className={linkClasses} id={`nav-${link.path.replace('/', '') || 'home'}`}>
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-3">
            {/* Language Toggle */}
            <button
              id="lang-toggle"
              onClick={toggleLocale}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium
                         text-dune-700 dark:text-sand-300 hover:bg-sand-100 dark:hover:bg-dune-800 
                         transition-all duration-300 border border-sand-200 dark:border-dune-700"
              aria-label={t.a11y.toggleLanguage}
            >
              <span>{t.langFlag}</span>
              <span className="hidden sm:inline">{t.langLabel}</span>
            </button>

            <ThemeToggle />

            {/* Cart Button */}
            <Link to="/cart" id="nav-cart" className="relative p-2 text-dune-700 dark:text-sand-300 hover:text-desert-500 dark:hover:text-desert-400 transition-colors duration-300" aria-label={t.nav.cart}>
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-desert-500 text-white text-xs font-bold rounded-full flex items-center justify-center animate-scale-in">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button id="mobile-menu-toggle" onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 text-dune-700 dark:text-sand-300 hover:text-desert-500 transition-colors" aria-label={t.a11y.toggleMobileMenu}>
              <div className="w-6 h-5 relative flex flex-col justify-between">
                <span className={`w-full h-0.5 bg-current transform transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
                <span className={`w-full h-0.5 bg-current transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`} />
                <span className={`w-full h-0.5 bg-current transform transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div id="mobile-menu" className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
          <div className="glass-card rounded-2xl p-6 space-y-4">
            {navLinks.map((link) => (
              <NavLink key={link.path} to={link.path}
                className={({ isActive }) => `block py-2 px-4 rounded-lg font-medium transition-all duration-300 ${isActive ? 'bg-desert-500/10 text-desert-600 dark:text-desert-400' : 'text-dune-700 dark:text-sand-300 hover:bg-sand-100 dark:hover:bg-dune-800'}`}>
                {link.label}
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}

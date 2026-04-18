import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import useThemeStore from '../../store/themeStore';
import useLangStore from '../../store/langStore';

export default function Layout() {
  const location = useLocation();
  const initTheme = useThemeStore((s) => s.initTheme);
  const initLang = useLangStore((s) => s.initLang);

  useEffect(() => {
    initTheme();
    initLang();
  }, [initTheme, initLang]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div key={location.pathname} className="page-enter">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
}

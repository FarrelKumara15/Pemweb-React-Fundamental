import { useEffect, useRef } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router';

export default function AppLayout() {
  const { pathname } = useLocation();
  const mainRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    mainRef.current?.focus({ preventScroll: true });
  }, [pathname]);

  const navStyles = ({ isActive }) => `rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors ${
    isActive ? 'bg-blue-50 text-brand' : 'text-slate-600 hover:bg-slate-100 hover:text-ink'
  }`;

  return (
    <>
      <a className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-4 focus:z-20 focus:rounded-lg focus:bg-white focus:p-3" href="#main-content">Lewati ke konten</a>
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-5 py-4 sm:px-8 lg:px-10">
          <Link className="flex items-center gap-3 text-base font-bold tracking-tight text-ink" to="/products">
            <span className="grid size-9 place-items-center rounded-xl bg-brand text-sm font-bold text-white" aria-hidden="true">MP</span>
            Manajemen Produk
          </Link>
          <nav aria-label="Navigasi utama" className="flex items-center gap-1">
            <NavLink to="/products" className={navStyles}>Produk</NavLink>
            <NavLink to="/settings" className={navStyles}>Settings</NavLink>
          </nav>
        </div>
      </header>
      <main id="main-content" ref={mainRef} tabIndex={-1} className="mx-auto max-w-7xl px-5 py-8 focus:outline-none sm:px-8 sm:py-12 lg:px-10">
        <Outlet />
      </main>
    </>
  );
}

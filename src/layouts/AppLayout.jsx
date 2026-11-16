import { useEffect, useRef } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router';

export default function AppLayout() {
  const { pathname } = useLocation();
  const mainRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    mainRef.current?.focus({ preventScroll: true });
  }, [pathname]);

  return (
    <>
      <a className="skip-link" href="#main-content">Lewati ke konten</a>
      <header className="site-header">
        <div className="site-nav">
          <Link className="brand" to="/products">Manajemen Produk</Link>
          <nav aria-label="Navigasi utama">
            <NavLink to="/products" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Produk</NavLink>
            <NavLink to="/settings" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Settings</NavLink>
          </nav>
        </div>
      </header>
      <main id="main-content" ref={mainRef} tabIndex={-1} className="app-shell route-content">
        <Outlet />
      </main>
    </>
  );
}

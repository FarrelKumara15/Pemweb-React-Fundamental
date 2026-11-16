import { Link } from 'react-router';
import { buttonStyles } from '../components/Button.jsx';

export default function NotFoundPage({ productMissing = false }) {
  return (
    <section className="mx-auto max-w-xl py-8 text-center sm:py-12">
      <title>404 Not Found | Manajemen Produk</title>
      <p className="mb-5 text-8xl leading-none font-extrabold tracking-tighter text-blue-200 sm:text-[150px]" aria-hidden="true">404</p>
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">404 Not Found</h1>
      <h2 className="mt-4 text-xl font-semibold">{productMissing ? 'Produk tidak ditemukan' : 'Halaman tidak ditemukan'}</h2>
      <p className="mt-3 mb-8 leading-7 text-slate-600">{productMissing
        ? 'Produk dengan ID ini tidak tersedia atau sudah dihapus. Pilih produk lain dari daftar.'
        : 'Alamat yang Anda buka tidak tersedia. Periksa kembali URL atau kembali ke daftar produk.'}</p>
      <Link className={buttonStyles()} to="/products">Kembali ke produk</Link>
    </section>
  );
}

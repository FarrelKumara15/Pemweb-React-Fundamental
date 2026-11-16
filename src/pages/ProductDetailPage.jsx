import { Link, useParams } from 'react-router';
import { formatPrice } from '../data/products.js';
import { buttonStyles } from '../components/Button.jsx';
import NotFoundPage from './NotFoundPage.jsx';

export default function ProductDetailPage({ products }) {
  const { id } = useParams();
  const product = products.find((item) => String(item.id) === id);

  if (!product) return <NotFoundPage productMissing />;

  return (
    <>
      <title>{product.name} | Manajemen Produk</title>
      <Link className="mb-8 inline-flex min-h-10 items-center gap-2 font-semibold text-brand underline-offset-4 hover:underline" to="/products">← Kembali ke produk</Link>
      <header className="mb-8">
        <p className="mb-3 text-xs font-bold tracking-widest text-brand uppercase">Detail produk</p>
        <h1 className="text-3xl font-bold tracking-tight wrap-anywhere sm:text-4xl">{product.name}</h1>
        <p className="mt-2 text-lg leading-7 text-slate-600">Informasi produk yang Anda pilih.</p>
      </header>
      <section className="max-w-4xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8" aria-label="Informasi produk">
        <div className="flex items-center justify-between gap-4 border-b border-slate-100 pb-6">
          <h2 className="text-xl font-bold">Informasi produk</h2>
          <span className="shrink-0 rounded-lg bg-blue-50 px-3 py-1.5 text-sm font-semibold text-brand">#{product.id}</span>
        </div>
        <dl className="grid gap-7 py-8 sm:grid-cols-2">
          <div><dt className="mb-2 text-sm text-slate-500">ID produk</dt><dd className="text-xl font-semibold">{product.id}</dd></div>
          <div><dt className="mb-2 text-sm text-slate-500">Nama produk</dt><dd className="text-xl font-semibold wrap-anywhere">{product.name}</dd></div>
          <div className="sm:col-span-2"><dt className="mb-2 text-sm text-slate-500">Harga</dt><dd className="text-4xl font-bold tracking-tight text-brand wrap-anywhere">{formatPrice(product.price)}</dd></div>
        </dl>
        <div className="border-t border-slate-100 pt-6">
          <p className="mb-5 max-w-xl text-sm leading-6 text-slate-600">Untuk mengubah informasi atau menghapus produk, kembali ke daftar produk.</p>
          <Link className={buttonStyles('outline')} to="/products">Lihat semua produk</Link>
        </div>
      </section>
    </>
  );
}

import { Link } from 'react-router';

export default function NotFoundPage({ productMissing = false }) {
  return (
    <section className="not-found">
      <title>404 Not Found | Manajemen Produk</title>
      <p className="error-code" aria-hidden="true">404</p>
      <h1>404 Not Found</h1>
      <h2>{productMissing ? 'Produk tidak ditemukan' : 'Halaman tidak ditemukan'}</h2>
      <p>{productMissing
        ? 'Produk dengan ID ini tidak tersedia atau sudah dihapus. Pilih produk lain dari daftar.'
        : 'Alamat yang Anda buka tidak tersedia. Periksa kembali URL atau kembali ke daftar produk.'}</p>
      <Link className="button button-primary" to="/products">Kembali ke produk</Link>
    </section>
  );
}

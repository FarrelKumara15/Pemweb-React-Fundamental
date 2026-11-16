import { Link, useParams } from 'react-router';
import { formatPrice } from '../data/products.js';
import NotFoundPage from './NotFoundPage.jsx';

export default function ProductDetailPage({ products }) {
  const { id } = useParams();
  const product = products.find((item) => String(item.id) === id);

  if (!product) return <NotFoundPage productMissing />;

  return (
    <>
      <title>{product.name} | Manajemen Produk</title>
      <Link className="back-link" to="/products">← Kembali ke produk</Link>
      <header className="page-header">
        <div>
          <p className="eyebrow">Detail produk</p>
          <h1>{product.name}</h1>
          <p className="subtitle">Informasi produk yang Anda pilih.</p>
        </div>
      </header>
      <section className="detail-panel" aria-label="Informasi produk">
        <h2>Informasi produk</h2>
        <dl className="detail-fields">
          <div><dt>ID produk</dt><dd>{product.id}</dd></div>
          <div><dt>Nama produk</dt><dd>{product.name}</dd></div>
          <div><dt>Harga</dt><dd className="product-price">{formatPrice(product.price)}</dd></div>
        </dl>
        <p className="detail-note">Untuk mengubah informasi atau menghapus produk, kembali ke daftar produk.</p>
      </section>
    </>
  );
}

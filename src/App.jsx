import { useState } from 'react';
import { initialProducts } from './data/products.js';
import ProductCard from './components/ProductCard.jsx';
import SearchBar from './components/SearchBar.jsx';

export default function App() {
  const [products] = useState(initialProducts);
  const [query, setQuery] = useState('');
  const filteredProducts = products.filter((product) =>
    product.name.toLocaleLowerCase('id-ID').includes(query.trim().toLocaleLowerCase('id-ID')),
  );

  return (
    <main className="app-shell">
      <header className="page-header">
        <div>
          <h1>Manajemen Produk</h1>
          <p className="subtitle">Kelola daftar produk dan harga dalam satu tempat.</p>
        </div>
      </header>
      <SearchBar query={query} onQueryChange={setQuery} total={products.length} />
      {filteredProducts.length > 0 ? (
        <section className="product-grid" aria-label="Daftar produk">
          {filteredProducts.map((product) => <ProductCard key={product.id} product={product} />)}
        </section>
      ) : (
        <section className="empty-state">
          <h2>Produk tidak ditemukan</h2>
          <p>Coba cari dengan nama produk yang lain.</p>
        </section>
      )}
      <p className="result-count" role="status">
        Menampilkan {filteredProducts.length} dari {products.length} produk
      </p>
    </main>
  );
}

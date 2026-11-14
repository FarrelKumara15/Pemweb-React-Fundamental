import { useRef, useState } from 'react';
import { initialProducts } from './data/products.js';
import ProductCard from './components/ProductCard.jsx';
import SearchBar from './components/SearchBar.jsx';
import ProductForm from './components/ProductForm.jsx';
import DeleteDialog from './components/DeleteDialog.jsx';

export default function App() {
  const [products, setProducts] = useState(initialProducts);
  const [query, setQuery] = useState('');
  const [dialog, setDialog] = useState(null);
  const [message, setMessage] = useState('');
  const nextId = useRef(6);
  const addButtonRef = useRef(null);
  const filteredProducts = products.filter((product) =>
    product.name.toLocaleLowerCase('id-ID').includes(query.trim().toLocaleLowerCase('id-ID')),
  );

  function openDialog(type, product = null) {
    setMessage('');
    setDialog({ type, product });
  }

  function saveProduct(values) {
    if (dialog.type === 'edit') {
      setProducts((current) => current.map((product) =>
        product.id === dialog.product.id ? { ...product, ...values } : product,
      ));
      setMessage(`Produk ${values.name} berhasil diperbarui.`);
    } else {
      const product = { id: nextId.current++, ...values };
      setProducts((current) => [...current, product]);
      setMessage(`Produk ${values.name} berhasil ditambahkan.`);
    }
    setDialog(null);
  }

  function deleteProduct() {
    setProducts((current) => current.filter((product) => product.id !== dialog.product.id));
    setMessage(`Produk ${dialog.product.name} berhasil dihapus.`);
    setDialog(null);
    // Tombol pemicu ikut terhapus, sehingga fokus kembali ke tombol tambah.
    addButtonRef.current.focus();
  }

  return (
    <main className="app-shell">
      <header className="page-header">
        <div>
          <h1>Manajemen Produk</h1>
          <p className="subtitle">Kelola daftar produk dan harga dalam satu tempat.</p>
        </div>
        <button ref={addButtonRef} className="button button-primary add-button" onClick={() => openDialog('add')}>
          <span aria-hidden="true">+</span> Tambah Produk
        </button>
      </header>
      <SearchBar query={query} onQueryChange={setQuery} total={products.length} />
      {filteredProducts.length > 0 ? (
        <section className="product-grid" aria-label="Daftar produk">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product}
              onEdit={(selected) => openDialog('edit', selected)}
              onDelete={(selected) => openDialog('delete', selected)} />
          ))}
        </section>
      ) : (
        <section className="empty-state">
          <h2>{products.length === 0 ? 'Belum ada produk' : 'Produk tidak ditemukan'}</h2>
          <p>{products.length === 0 ? 'Tambahkan produk pertama untuk mulai mengelola daftar Anda.' : 'Coba cari dengan nama produk yang lain.'}</p>
          {query && <button className="button button-outline" onClick={() => setQuery('')}>Hapus pencarian</button>}
        </section>
      )}
      <p className="result-count" role="status">
        Menampilkan {filteredProducts.length} dari {products.length} produk
      </p>
      <p className="notification" role="status">{message}</p>
      {dialog && dialog.type !== 'delete' && (
        <ProductForm product={dialog.product} onSave={saveProduct} onClose={() => setDialog(null)} />
      )}
      {dialog?.type === 'delete' && (
        <DeleteDialog product={dialog.product} onConfirm={deleteProduct} onClose={() => setDialog(null)} />
      )}
    </main>
  );
}

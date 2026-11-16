import { useEffect, useRef, useState } from 'react';
import ProductCard from '../components/ProductCard.jsx';
import SearchBar from '../components/SearchBar.jsx';
import ProductForm from '../components/ProductForm.jsx';
import DeleteDialog from '../components/DeleteDialog.jsx';
import Button from '../components/Button.jsx';

export default function ProductsPage({ products, onAdd, onUpdate, onDelete, viewMode }) {
  const [query, setQuery] = useState('');
  const [dialog, setDialog] = useState(null);
  const [message, setMessage] = useState('');
  const addButtonRef = useRef(null);
  const returnFocusRef = useRef(null);

  useEffect(() => {
    if (!dialog && returnFocusRef.current) {
      const target = returnFocusRef.current.isConnected ? returnFocusRef.current : addButtonRef.current;
      target?.focus();
      returnFocusRef.current = null;
    }
  }, [dialog]);

  const filteredProducts = products.filter((product) =>
    product.name.toLocaleLowerCase('id-ID').includes(query.trim().toLocaleLowerCase('id-ID')),
  );

  function openDialog(type, product = null) {
    returnFocusRef.current = document.activeElement;
    setMessage('');
    setDialog({ type, product });
  }

  function saveProduct(values) {
    if (dialog.type === 'edit') {
      onUpdate(dialog.product.id, values);
      setMessage(`Produk ${values.name} berhasil diperbarui.`);
    } else {
      onAdd(values);
      setMessage(`Produk ${values.name} berhasil ditambahkan.`);
    }
    setDialog(null);
  }

  function deleteProduct() {
    onDelete(dialog.product.id);
    setMessage(`Produk ${dialog.product.name} berhasil dihapus.`);
    setDialog(null);
    returnFocusRef.current = addButtonRef.current;
  }

  return (
    <>
      <title>Produk | Manajemen Produk</title>
      <header className="mb-8 flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Manajemen Produk</h1>
          <p className="mt-2 text-base leading-7 text-slate-600 sm:text-lg">Kelola daftar produk dan harga dalam satu tempat.</p>
        </div>
        <Button ref={addButtonRef} className="shrink-0" onClick={() => openDialog('add')}>
          <span aria-hidden="true" className="text-2xl leading-none font-normal">+</span> Tambah Produk
        </Button>
      </header>
      <SearchBar query={query} onQueryChange={setQuery} total={products.length} />
      {filteredProducts.length > 0 ? (
        <section className={viewMode === 'list' ? 'grid grid-cols-1 gap-4' : 'grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'} aria-label="Daftar produk" data-view={viewMode}>
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} viewMode={viewMode}
              onEdit={(selected) => openDialog('edit', selected)}
              onDelete={(selected) => openDialog('delete', selected)} />
          ))}
        </section>
      ) : (
        <section className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center">
          <h2 className="text-2xl font-bold">{products.length === 0 ? 'Belum ada produk' : 'Produk tidak ditemukan'}</h2>
          <p className="mt-3 mb-6 leading-7 text-slate-600">{products.length === 0 ? 'Tambahkan produk pertama untuk mulai mengelola daftar Anda.' : 'Coba cari dengan nama produk yang lain.'}</p>
          {query && <Button variant="outline" onClick={() => setQuery('')}>Hapus pencarian</Button>}
        </section>
      )}
      <p className="mt-7 text-sm text-slate-600 sm:text-base" role="status">
        Menampilkan {filteredProducts.length} dari {products.length} produk
      </p>
      <p className="mt-3 min-h-6 text-sm text-emerald-800" role="status">{message}</p>
      {dialog && dialog.type !== 'delete' && (
        <ProductForm product={dialog.product} onSave={saveProduct} onClose={() => setDialog(null)} />
      )}
      {dialog?.type === 'delete' && (
        <DeleteDialog product={dialog.product} onConfirm={deleteProduct} onClose={() => setDialog(null)} />
      )}
    </>
  );
}

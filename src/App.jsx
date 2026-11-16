import { useRef, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router';
import { initialProducts } from './data/products.js';
import AppLayout from './layouts/AppLayout.jsx';
import ProductsPage from './pages/ProductsPage.jsx';
import ProductDetailPage from './pages/ProductDetailPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import SettingsPage from './pages/SettingsPage.jsx';

export default function App() {
  // State berada di atas Routes agar perubahan produk bertahan saat navigasi SPA.
  const [products, setProducts] = useState(initialProducts);
  const nextId = useRef(6);
  const [viewMode, setViewMode] = useState('grid');

  function addProduct(values) {
    const product = { id: nextId.current++, ...values };
    setProducts((current) => [...current, product]);
  }

  function updateProduct(id, values) {
    setProducts((current) => current.map((product) =>
      product.id === id ? { ...product, ...values } : product,
    ));
  }

  function deleteProduct(id) {
    setProducts((current) => current.filter((product) => product.id !== id));
  }

  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Navigate to="/products" replace />} />
        <Route path="products" element={
          <ProductsPage viewMode={viewMode} products={products} onAdd={addProduct} onUpdate={updateProduct} onDelete={deleteProduct} />
        } />
        <Route path="products/:id" element={<ProductDetailPage products={products} />} />
        <Route path="settings" element={<SettingsPage viewMode={viewMode} onViewModeChange={setViewMode} />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

import { formatPrice } from '../data/products.js';

export default function ProductCard({ product, onEdit, onDelete }) {
  return (
    <article className="product-card" aria-label={product.name}>
      <p className="product-id">ID: {product.id}</p>
      <h2>{product.name}</h2>
      <p className="product-price">{formatPrice(product.price)}</p>
      <div className="card-actions">
        <button className="button button-outline" onClick={() => onEdit(product)}
          aria-label={`Edit ${product.name}`}>Edit</button>
        <button className="button button-danger-outline" onClick={() => onDelete(product)}
          aria-label={`Hapus ${product.name}`}>Hapus</button>
      </div>
    </article>
  );
}

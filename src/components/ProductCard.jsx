import { formatPrice } from '../data/products.js';

export default function ProductCard({ product }) {
  return (
    <article className="product-card" aria-label={product.name}>
      <p className="product-id">ID: {product.id}</p>
      <h2>{product.name}</h2>
      <p className="product-price">{formatPrice(product.price)}</p>
    </article>
  );
}

import { Link } from 'react-router';
import { formatPrice } from '../data/products.js';
import Button from './Button.jsx';

export default function ProductCard({ product, onEdit, onDelete, viewMode }) {
  return (
    <article className={`min-w-0 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm ${viewMode === 'list' ? 'sm:flex sm:items-center sm:justify-between sm:gap-6' : 'flex h-full flex-col'}`} aria-label={product.name}>
      <div className="min-w-0">
        <p className="mb-3 text-sm font-semibold text-slate-500">ID: {product.id}</p>
        <h2 className="mb-2 text-2xl font-bold tracking-tight wrap-anywhere">{product.name}</h2>
        <p className="text-3xl font-bold tracking-tight text-brand wrap-anywhere">{formatPrice(product.price)}</p>
      </div>
      <div className={viewMode === 'list' ? 'mt-5 shrink-0 sm:mt-0 sm:min-w-60' : 'mt-auto pt-5'}>
        <Link className="inline-flex min-h-10 items-center gap-2 font-semibold text-brand underline-offset-4 hover:underline"
          to={`/products/${product.id}`} aria-label={`Detail ${product.name}`}>
          Lihat detail <span aria-hidden="true">→</span>
        </Link>
        <div className="mt-4 flex gap-3">
          <Button variant="outline" className="flex-1" onClick={() => onEdit(product)} aria-label={`Edit ${product.name}`}>Edit</Button>
          <Button variant="dangerOutline" className="flex-1" onClick={() => onDelete(product)} aria-label={`Hapus ${product.name}`}>Hapus</Button>
        </div>
      </div>
    </article>
  );
}

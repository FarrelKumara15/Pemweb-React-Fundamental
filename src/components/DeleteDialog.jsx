import { formatPrice } from '../data/products.js';
import Modal from './Modal.jsx';
import Button from './Button.jsx';

export default function DeleteDialog({ product, onConfirm, onClose }) {
  return (
    <Modal titleId="delete-title" descriptionId="delete-description" onClose={onClose} className="text-center">
      <div className="mx-auto mt-3 mb-5 grid size-18 place-items-center rounded-2xl bg-red-50 text-4xl font-bold text-red-600" aria-hidden="true">!</div>
      <h2 id="delete-title" className="mb-3 text-2xl font-bold">Hapus Produk?</h2>
      <p className="mb-6 leading-7 text-slate-600" id="delete-description">Produk yang dihapus tidak dapat dikembalikan.</p>
      <div className="rounded-xl border border-slate-300 p-5 text-left">
        <p className="mb-2 text-sm font-semibold text-slate-500">ID: {product.id}</p>
        <h3 className="mb-2 text-2xl font-bold wrap-anywhere">{product.name}</h3>
        <p className="text-3xl font-bold text-brand wrap-anywhere">{formatPrice(product.price)}</p>
      </div>
      <div className="mt-8 flex gap-3">
        <Button variant="outline" className="flex-1" data-initial-focus onClick={onClose}>Batal</Button>
        <Button variant="danger" className="flex-[1.7] px-3" onClick={onConfirm}>Hapus Produk</Button>
      </div>
    </Modal>
  );
}

import { formatPrice } from '../data/products.js';
import Modal from './Modal.jsx';

export default function DeleteDialog({ product, onConfirm, onClose }) {
  return (
    <Modal titleId="delete-title" descriptionId="delete-description" onClose={onClose} className="delete-modal">
      <div className="delete-symbol" aria-hidden="true">!</div>
      <h2 id="delete-title">Hapus Produk?</h2>
      <p className="modal-description" id="delete-description">Produk yang dihapus tidak dapat dikembalikan.</p>
      <div className="delete-preview">
        <p className="product-id">ID: {product.id}</p>
        <h3>{product.name}</h3>
        <p className="product-price">{formatPrice(product.price)}</p>
      </div>
      <div className="modal-actions">
        <button className="button button-outline" type="button" autoFocus onClick={onClose}>Batal</button>
        <button className="button button-danger" type="button" onClick={onConfirm}>Hapus Produk</button>
      </div>
    </Modal>
  );
}

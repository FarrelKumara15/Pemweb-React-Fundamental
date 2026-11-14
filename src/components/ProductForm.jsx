import { useState } from 'react';
import Modal from './Modal.jsx';

export default function ProductForm({ product, onSave, onClose }) {
  const isEditing = Boolean(product);
  const [name, setName] = useState(product?.name ?? '');
  const [price, setPrice] = useState(product ? String(product.price) : '');
  const [errors, setErrors] = useState({});

  function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = {};
    const normalizedName = name.trim();
    const numericPrice = Number(price);
    if (!normalizedName) nextErrors.name = 'Nama produk wajib diisi.';
    if (!Number.isSafeInteger(numericPrice) || numericPrice <= 0) {
      nextErrors.price = 'Harga harus berupa bilangan bulat lebih dari 0 dan dalam batas angka aman.';
    }
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      event.currentTarget.elements.namedItem(nextErrors.name ? 'name' : 'price').focus();
      return;
    }
    onSave({ name: normalizedName, price: numericPrice });
  }

  return (
    <Modal titleId="form-title" descriptionId="form-description" onClose={onClose}>
      <h2 id="form-title">{isEditing ? 'Edit Produk' : 'Tambah Produk'}</h2>
      <p className="modal-description" id="form-description">
        {isEditing ? 'Perbarui informasi produk yang dipilih.' : 'Masukkan informasi produk baru.'}
      </p>
      {isEditing && <p className="form-product-id">ID: {product.id}</p>}
      <form onSubmit={handleSubmit} noValidate>
        <div className="form-field">
          <label htmlFor="product-name">Nama Produk</label>
          <input id="product-name" name="name" value={name} autoFocus required
            placeholder="Contoh: Pulpen" onChange={(event) => setName(event.target.value)}
            aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? 'name-error' : undefined} />
          {errors.name && <p className="field-error" id="name-error">{errors.name}</p>}
        </div>
        <div className="form-field">
          <label htmlFor="product-price">Harga (Rp)</label>
          <input id="product-price" name="price" type="number" inputMode="numeric" min="1" step="1"
            max={Number.MAX_SAFE_INTEGER} required value={price} placeholder="Contoh: 5000"
            onChange={(event) => setPrice(event.target.value)} aria-invalid={Boolean(errors.price)}
            aria-describedby={errors.price ? 'price-hint price-error' : 'price-hint'} />
          <p className="field-hint" id="price-hint">Harga harus lebih dari 0.</p>
          {errors.price && <p className="field-error" id="price-error">{errors.price}</p>}
        </div>
        <div className="modal-actions">
          <button className="button button-outline" type="button" onClick={onClose}>Batal</button>
          <button className="button button-primary" type="submit">
            {isEditing ? 'Simpan Perubahan' : 'Simpan Produk'}
          </button>
        </div>
      </form>
    </Modal>
  );
}

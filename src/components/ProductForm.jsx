import { useState } from 'react';
import Modal from './Modal.jsx';
import Button from './Button.jsx';

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
      <h2 id="form-title" className="mr-7 mb-3 text-2xl font-bold tracking-tight">{isEditing ? 'Edit Produk' : 'Tambah Produk'}</h2>
      <p className="mb-7 leading-7 text-slate-600" id="form-description">
        {isEditing ? 'Perbarui informasi produk yang dipilih.' : 'Masukkan informasi produk baru.'}
      </p>
      {isEditing && <p className="mb-5 text-sm font-semibold text-slate-500">ID: {product.id}</p>}
      <form onSubmit={handleSubmit} noValidate>
        <div className="mb-6">
          <label className="mb-2.5 block font-bold" htmlFor="product-name">Nama Produk</label>
          <input className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-base placeholder:text-slate-500 aria-invalid:border-red-500" id="product-name" name="name" value={name} data-initial-focus required
            placeholder="Contoh: Pulpen" onChange={(event) => setName(event.target.value)}
            aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? 'name-error' : undefined} />
          {errors.name && <p className="mt-2 text-sm text-red-700" id="name-error">{errors.name}</p>}
        </div>
        <div className="mb-6">
          <label className="mb-2.5 block font-bold" htmlFor="product-price">Harga (Rp)</label>
          <input className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-base placeholder:text-slate-500 aria-invalid:border-red-500" id="product-price" name="price" type="number" inputMode="numeric" min="1" step="1"
            max={Number.MAX_SAFE_INTEGER} required value={price} placeholder="Contoh: 5000"
            onChange={(event) => setPrice(event.target.value)} aria-invalid={Boolean(errors.price)}
            aria-describedby={errors.price ? 'price-hint price-error' : 'price-hint'} />
          <p className="mt-2 text-sm text-slate-600" id="price-hint">Harga harus lebih dari 0.</p>
          {errors.price && <p className="mt-2 text-sm text-red-700" id="price-error">{errors.price}</p>}
        </div>
        <div className="mt-8 flex gap-3">
          <Button variant="outline" className="flex-1" type="button" onClick={onClose}>Batal</Button>
          <Button className="flex-[1.7] px-3" type="submit">
            {isEditing ? 'Simpan Perubahan' : 'Simpan Produk'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}

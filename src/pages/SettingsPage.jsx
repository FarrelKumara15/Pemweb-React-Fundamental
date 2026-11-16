import { Link } from 'react-router';

export default function SettingsPage({ viewMode, onViewModeChange }) {
  return (
    <>
      <title>Settings | Manajemen Produk</title>
      <header className="page-header">
        <div>
          <h1>Settings</h1>
          <p className="subtitle">Atur cara daftar produk ditampilkan.</p>
        </div>
      </header>
      <section className="detail-panel">
        <fieldset className="view-options">
          <legend>Tampilan produk</legend>
          <p id="view-help">Pilihan langsung diterapkan saat Anda kembali ke daftar produk.</p>
          <div className="view-choices">
            <label className="view-choice">
              <input type="radio" name="view-mode" value="grid" checked={viewMode === 'grid'}
                onChange={() => onViewModeChange('grid')} aria-describedby="view-help" />
              <span><strong>Grid</strong><small>Kartu dalam kolom yang menyesuaikan lebar layar.</small></span>
            </label>
            <label className="view-choice">
              <input type="radio" name="view-mode" value="list" checked={viewMode === 'list'}
                onChange={() => onViewModeChange('list')} aria-describedby="view-help" />
              <span><strong>List</strong><small>Satu produk per baris untuk membaca daftar berurutan.</small></span>
            </label>
          </div>
        </fieldset>
        <p role="status" className="detail-note">Tampilan aktif: {viewMode === 'grid' ? 'Grid' : 'List'}.</p>
        <Link className="button button-primary settings-return" to="/products">Kembali ke produk</Link>
      </section>
    </>
  );
}

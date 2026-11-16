import { Link } from 'react-router';
import { buttonStyles } from '../components/Button.jsx';

export default function SettingsPage({ viewMode, onViewModeChange }) {
  return (
    <>
      <title>Settings | Manajemen Produk</title>
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Settings</h1>
        <p className="mt-2 text-lg leading-7 text-slate-600">Atur cara daftar produk ditampilkan.</p>
      </header>
      <section className="max-w-4xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <fieldset>
          <legend className="text-xl font-bold">Tampilan produk</legend>
          <p id="view-help" className="mt-2 leading-7 text-slate-600">Pilihan langsung diterapkan saat Anda kembali ke daftar produk.</p>
          <div className="my-7 grid gap-4 sm:grid-cols-2">
            {[
              { value: 'grid', label: 'Grid', description: 'Kartu dalam kolom yang menyesuaikan lebar layar.' },
              { value: 'list', label: 'List', description: 'Satu produk per baris untuk membaca daftar berurutan.' },
            ].map((option) => (
              <label key={option.value} className={`flex cursor-pointer items-start gap-4 rounded-xl border p-5 transition-colors ${viewMode === option.value ? 'border-brand bg-blue-50' : 'border-slate-200 hover:border-slate-400'}`}>
                <input className="mt-1 size-5 shrink-0 accent-brand" type="radio" name="view-mode" value={option.value}
                  checked={viewMode === option.value} onChange={() => onViewModeChange(option.value)} aria-describedby="view-help" />
                <span><strong className="mb-2 block text-lg">{option.label}</strong><span className="block text-sm leading-6 text-slate-600">{option.description}</span></span>
              </label>
            ))}
          </div>
        </fieldset>
        <div className="border-t border-slate-100 pt-6">
          <p role="status" className="mb-5 text-sm text-slate-600">Tampilan aktif: {viewMode === 'grid' ? 'Grid' : 'List'}.</p>
          <Link className={buttonStyles()} to="/products">Kembali ke produk</Link>
        </div>
      </section>
    </>
  );
}

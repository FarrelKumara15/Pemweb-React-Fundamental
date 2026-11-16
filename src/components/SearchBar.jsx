export default function SearchBar({ query, onQueryChange, total }) {
  return (
    <div className="mb-7 flex items-center justify-between gap-3 sm:gap-5">
      <div className="relative w-full max-w-xl">
        <svg className="pointer-events-none absolute top-3.5 left-4 size-5 text-slate-500" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="10.5" cy="10.5" r="7" /><path d="m16 16 5 5" />
        </svg>
        <label className="sr-only" htmlFor="product-search">Cari nama produk</label>
        <input className="w-full rounded-xl border border-slate-300 bg-white py-3 pr-4 pl-12 text-base placeholder:text-slate-500"
          id="product-search" type="search" placeholder="Cari nama produk..."
          value={query} onChange={(event) => onQueryChange(event.target.value)} />
      </div>
      <p className="shrink-0 text-sm text-slate-600 sm:text-base">{total} produk</p>
    </div>
  );
}

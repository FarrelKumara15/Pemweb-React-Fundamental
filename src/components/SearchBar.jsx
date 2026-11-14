export default function SearchBar({ query, onQueryChange, total }) {
  return (
    <div className="toolbar">
      <div className="search-field">
        <span className="search-icon" aria-hidden="true" />
        <label className="sr-only" htmlFor="product-search">Cari nama produk</label>
        <input id="product-search" type="search" placeholder="Cari nama produk..."
          value={query} onChange={(event) => onQueryChange(event.target.value)} />
      </div>
      <p className="total-count">{total} produk</p>
    </div>
  );
}

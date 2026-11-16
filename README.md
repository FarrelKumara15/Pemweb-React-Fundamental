# Manajemen Produk — Tugas 3 Fundamental React

Aplikasi React untuk mengelola daftar produk, mengikuti contoh halaman utama dan pop-up pada materi Fundamental React. Dibuat dengan React dan Vite.

## Menjalankan aplikasi

```bash
npm ci
npm run dev
```

```bash
npm run build
npm run preview
```

`build` menghasilkan versi produksi di folder `dist`. `preview` menjalankan hasil build secara lokal.

## Fitur

- Lima produk awal: Pulpen, Buku Tulis, Spidol, Penggaris, dan Penghapus.
- Pencarian nama tanpa membedakan huruf besar/kecil, dengan jumlah hasil dan keadaan kosong.
- Tambah produk melalui modal dengan ID baru yang tidak dipakai kembali selama sesi.
- Edit nama dan harga dengan mempertahankan ID produk.
- Konfirmasi sebelum menghapus produk dan tombol Batal untuk membatalkan perubahan.
- Validasi nama wajib diisi dan harga berupa bilangan bulat positif dalam batas angka aman JavaScript.
- Format harga rupiah, tata letak responsif, serta navigasi dialog dengan Tab, Shift+Tab, dan Escape.

Data hanya disimpan dalam state React. Memuat ulang halaman mengembalikan lima produk awal. Aplikasi ini belum terhubung ke API, database, atau localStorage.

## Penerapan materi React

| Materi | Implementasi |
|---|---|
| JSX dan ekspresi | Judul, nama, harga, dan jumlah produk dalam komponen |
| Komponen yang dapat digunakan kembali | `ProductCard`, `SearchBar`, `Modal`, `ProductForm`, dan `DeleteDialog` |
| Props | Data produk dan nilai pencarian dikirim dari `App` ke komponen anak |
| Callback props dan event | `onEdit`, `onDelete`, `onSave`, `onClose`, dan `onQueryChange` |
| State dengan `useState` | Daftar produk, pencarian, dialog aktif, notifikasi, nilai form, dan error |
| Conditional rendering | Dialog, pesan validasi, daftar kosong, serta hasil pencarian kosong |
| List dan key | `products.map(...)` dengan `key={product.id}` |
| Pembaruan immutable | Penambahan dengan spread, pengubahan dengan `map`, penghapusan dengan `filter` |

`useRef` menyimpan ID berikutnya dan referensi elemen. `useEffect` mengatur siklus dialog native serta pengembalian fokus keyboard.

## Struktur

```text
src/
  App.jsx
  main.jsx
  styles.css
  components/
    ProductCard.jsx
    SearchBar.jsx
    Modal.jsx
    ProductForm.jsx
    DeleteDialog.jsx
  data/
    products.js
tests/
  products.spec.js
docs/
  TESTING.md
  screenshots/
```

## Pengujian

```bash
npx playwright install chromium
npm test
```

Playwright menjalankan 10 skenario pada viewport desktop dan emulasi ponsel, total 20 pengujian. Server Vite dijalankan otomatis saat pengujian.

Jika Google Chrome sudah terpasang, browser tersebut dapat digunakan untuk pengujian otomatis tanpa mengunduh Chromium. Contoh PowerShell:

```powershell
$env:PLAYWRIGHT_CHANNEL = 'chrome'
npm test -- --workers=2
```

Lihat [skenario dan hasil pengujian](docs/TESTING.md). Screenshot dihasilkan dari aplikasi yang berjalan, bukan mockup.

![Halaman utama](docs/screenshots/desktop-daftar.png)

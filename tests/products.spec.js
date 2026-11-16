import { test, expect } from '@playwright/test';

const card = (page, name) => page.getByRole('article', { name, exact: true });
const add = (page) => page.getByRole('button', { name: 'Tambah Produk', exact: true });

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('menampilkan lima produk awal dan harga rupiah', async ({ page }) => {
  await expect(page.getByRole('heading', { name: 'Manajemen Produk' })).toBeVisible();
  await expect(page.getByRole('article')).toHaveCount(5);
  await expect(card(page, 'Pulpen')).toContainText(/Rp\s*5\.000/);
  await expect(card(page, 'Buku Tulis')).toContainText('ID: 2');
  await expect(page.getByText('Menampilkan 5 dari 5 produk')).toBeVisible();
});

test('pencarian mengabaikan kapital dan spasi tepi serta menangani hasil kosong', async ({ page }) => {
  const search = page.getByRole('searchbox', { name: 'Cari nama produk' });
  await search.fill('  bUkU  ');
  await expect(page.getByRole('article')).toHaveCount(1);
  await expect(card(page, 'Buku Tulis')).toBeVisible();
  await expect(page.getByText('Menampilkan 1 dari 5 produk')).toBeVisible();
  await search.fill('Tidak ada');
  await expect(page.getByRole('heading', { name: 'Produk tidak ditemukan' })).toBeVisible();
  await page.getByRole('button', { name: 'Hapus pencarian' }).click();
  await expect(page.getByRole('article')).toHaveCount(5);
});

test('menambah produk dan mengembalikan fokus setelah menyimpan', async ({ page }) => {
  await add(page).click();
  await page.getByLabel('Nama Produk', { exact: true }).fill('  Pensil  ');
  await page.getByLabel('Harga (Rp)', { exact: true }).fill('4000');
  await page.getByRole('button', { name: 'Simpan Produk', exact: true }).click();
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await expect(card(page, 'Pensil')).toContainText('ID: 6');
  await expect(card(page, 'Pensil')).toContainText(/Rp\s*4\.000/);
  await expect(page.getByText('Menampilkan 6 dari 6 produk')).toBeVisible();
  await expect(add(page)).toBeFocused();
});

test('menolak nama kosong serta harga kosong nol negatif pecahan dan angka tidak aman', async ({ page }) => {
  await add(page).click();
  await page.getByLabel('Nama Produk', { exact: true }).fill('   ');
  await page.getByRole('button', { name: 'Simpan Produk', exact: true }).click();
  await expect(page.getByText('Nama produk wajib diisi.')).toBeVisible();
  await page.getByLabel('Nama Produk', { exact: true }).fill('Pensil');
  for (const price of ['', '0', '-100', '1.5', '9007199254740992']) {
    await page.getByLabel('Harga (Rp)', { exact: true }).fill(price);
    await page.getByRole('button', { name: 'Simpan Produk', exact: true }).click();
    await expect(page.getByText('Harga harus berupa bilangan bulat lebih dari 0 dan dalam batas angka aman.')).toBeVisible();
    await expect(page.getByRole('dialog')).toBeVisible();
    await expect(page.getByRole('article')).toHaveCount(5);
  }
});

test('edit mengisi nilai awal dan mempertahankan ID serta jumlah produk', async ({ page }) => {
  await card(page, 'Buku Tulis').getByRole('button', { name: 'Edit Buku Tulis', exact: true }).click();
  await expect(page.getByLabel('Nama Produk', { exact: true })).toHaveValue('Buku Tulis');
  await expect(page.getByLabel('Harga (Rp)', { exact: true })).toHaveValue('12000');
  await page.getByLabel('Nama Produk', { exact: true }).fill('Buku Gambar');
  await page.getByLabel('Harga (Rp)', { exact: true }).fill('15000');
  await page.getByRole('button', { name: 'Simpan Perubahan' }).click();
  await expect(card(page, 'Buku Gambar')).toContainText('ID: 2');
  await expect(card(page, 'Buku Gambar')).toContainText(/Rp\s*15\.000/);
  await expect(page.getByRole('article')).toHaveCount(5);
});

test('batal tutup dan Escape tidak mengubah data', async ({ page }) => {
  await card(page, 'Pulpen').getByRole('button', { name: 'Edit Pulpen', exact: true }).click();
  await page.getByLabel('Nama Produk', { exact: true }).fill('Tidak Disimpan');
  await page.getByRole('button', { name: 'Batal', exact: true }).click();
  await expect(card(page, 'Pulpen')).toBeVisible();
  await add(page).click();
  await page.getByRole('button', { name: 'Tutup dialog' }).click();
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await add(page).click();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await expect(page.getByRole('article')).toHaveCount(5);
  await expect(add(page)).toBeFocused();
});

test('hapus memerlukan konfirmasi dan ID baru tidak memakai kembali ID terhapus', async ({ page }) => {
  await card(page, 'Penghapus').getByRole('button', { name: 'Hapus Penghapus', exact: true }).click();
  await expect(page.getByRole('dialog')).toContainText('Penghapus');
  await expect(page.getByRole('button', { name: 'Batal', exact: true })).toBeFocused();
  await page.getByRole('button', { name: 'Batal', exact: true }).click();
  await expect(page.getByRole('article')).toHaveCount(5);
  await card(page, 'Penghapus').getByRole('button', { name: 'Hapus Penghapus', exact: true }).click();
  await page.getByRole('button', { name: 'Hapus Produk', exact: true }).click();
  await expect(page.getByRole('article')).toHaveCount(4);
  await expect(card(page, 'Penghapus')).toHaveCount(0);
  await expect(add(page)).toBeFocused();
  await add(page).click();
  await page.getByLabel('Nama Produk', { exact: true }).fill('Pensil');
  await page.getByLabel('Harga (Rp)', { exact: true }).fill('4000');
  await page.getByRole('button', { name: 'Simpan Produk', exact: true }).click();
  await expect(card(page, 'Pensil')).toContainText('ID: 6');
});

test('menghapus semua produk menampilkan keadaan kosong dan data pulih saat reload', async ({ page }) => {
  for (const name of ['Pulpen', 'Buku Tulis', 'Spidol', 'Penggaris', 'Penghapus']) {
    await card(page, name).getByRole('button', { name: `Hapus ${name}`, exact: true }).click();
    await page.getByRole('button', { name: 'Hapus Produk', exact: true }).click();
  }
  await expect(page.getByRole('heading', { name: 'Belum ada produk' })).toBeVisible();
  await expect(page.getByText('Menampilkan 0 dari 0 produk')).toBeVisible();
  await page.reload();
  await expect(page.getByRole('article')).toHaveCount(5);
});

test('dialog menahan fokus keyboard di dalamnya', async ({ page }) => {
  await add(page).click();
  await expect(page.getByLabel('Nama Produk', { exact: true })).toBeFocused();
  for (const key of ['Tab', 'Shift+Tab']) {
    for (let i = 0; i < 8; i++) {
      await page.keyboard.press(key);
      expect(await page.evaluate(() => Boolean(document.activeElement.closest('dialog')))).toBe(true);
    }
  }
});

test('tampilan tidak melebar keluar layar dan menyimpan bukti screenshot', async ({ page }, testInfo) => {
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.reload();
  const prefix = `docs/screenshots/tugas-4/${testInfo.project.name}`;
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  await page.screenshot({ path: `${prefix}-daftar.png`, fullPage: true, scale: 'css', animations: 'disabled' });
  await add(page).click();
  await page.screenshot({ path: `${prefix}-tambah.png`, fullPage: false, scale: 'css', animations: 'disabled' });
  await page.getByRole('button', { name: 'Batal', exact: true }).click();
  await card(page, 'Buku Tulis').getByRole('button', { name: 'Edit Buku Tulis', exact: true }).click();
  await page.screenshot({ path: `${prefix}-edit.png`, fullPage: false, scale: 'css', animations: 'disabled' });
  await page.getByRole('button', { name: 'Batal', exact: true }).click();
  await card(page, 'Spidol').getByRole('button', { name: 'Hapus Spidol', exact: true }).click();
  await page.screenshot({ path: `${prefix}-hapus.png`, fullPage: false, scale: 'css', animations: 'disabled' });
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  expect(errors).toEqual([]);
});


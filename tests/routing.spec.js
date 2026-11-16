import { test, expect } from '@playwright/test';

const card = (page, name) => page.getByRole('article', { name, exact: true });
const products = (page) => page.getByRole('region', { name: 'Daftar produk', exact: true });
const back = (page) => page.getByRole('link', { name: /Kembali ke produk/ });
const settings = (page) => page.getByRole('navigation', { name: 'Navigasi utama' }).getByRole('link', { name: 'Settings' });
const columnCount = (page) => products(page).evaluate((element) => getComputedStyle(element).gridTemplateColumns.split(' ').length);

// Marker ini hilang jika browser memuat ulang dokumen saat klik Link.
test('root redirect dan navigasi detail memakai URL serta Back Forward tanpa reload', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveURL(/\/products$/);
  await page.evaluate(() => { window.spaMarker = 'tetap'; });
  await card(page, 'Buku Tulis').getByRole('link', { name: 'Detail Buku Tulis', exact: true }).click();
  await expect(page).toHaveURL(/\/products\/2$/);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Buku Tulis');
  await expect(page.getByRole('region', { name: 'Informasi produk' })).toContainText(/Rp\s*12\.000/);
  await expect(page).toHaveTitle('Buku Tulis | Manajemen Produk');
  await expect(page.getByRole('navigation').getByRole('link', { name: 'Produk', exact: true })).toHaveAttribute('aria-current', 'page');
  await page.goBack();
  await expect(page).toHaveURL(/\/products$/);
  await expect(page.getByRole('article')).toHaveCount(5);
  await page.goForward();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Buku Tulis');
  await back(page).click();
  await expect(page).toHaveURL(/\/products$/);
  expect(await page.evaluate(() => window.spaMarker)).toBe('tetap');
});

test('URL detail langsung dan reload membaca produk yang sesuai ID', async ({ page }) => {
  for (const [id, name, price] of [[1, 'Pulpen', '5.000'], [2, 'Buku Tulis', '12.000'], [5, 'Penghapus', '3.000']]) {
    await page.goto(`/products/${id}`);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(name);
    await expect(page.getByRole('region', { name: 'Informasi produk' })).toContainText(price);
    await page.reload();
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(name);
  }
});

test('alamat salah dan nested path tidak dikenal menampilkan 404 dan tautan pemulihan', async ({ page }) => {
  for (const path of ['/alamat-salah', '/products/2/edit', '/settings/tidak-ada']) {
    await page.goto(path);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('404 Not Found');
    await expect(page.getByRole('heading', { name: 'Halaman tidak ditemukan' })).toBeVisible();
    await expect(page).toHaveTitle('404 Not Found | Manajemen Produk');
    await back(page).click();
    await expect(page).toHaveURL(/\/products$/);
    await expect(page.getByRole('article')).toHaveCount(5);
  }
});

test('ID tidak tersedia atau tidak cocok persis menampilkan 404 produk', async ({ page }) => {
  for (const id of ['999', 'abc', '2abc', '0', '02']) {
    await page.goto(`/products/${id}`);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('404 Not Found');
    await expect(page.getByRole('heading', { name: 'Produk tidak ditemukan' })).toBeVisible();
  }
  await back(page).click();
  await expect(page.getByRole('article')).toHaveCount(5);
});

test('data tambah edit hapus konsisten antara daftar detail dan Settings', async ({ page }) => {
  await page.goto('/products');
  await page.getByRole('button', { name: 'Tambah Produk', exact: true }).click();
  await page.getByLabel('Nama Produk', { exact: true }).fill('Pensil');
  await page.getByLabel('Harga (Rp)', { exact: true }).fill('4000');
  await page.getByRole('button', { name: 'Simpan Produk', exact: true }).click();
  await settings(page).click();
  await back(page).click();
  await card(page, 'Pensil').getByRole('link', { name: 'Detail Pensil', exact: true }).click();
  await expect(page).toHaveURL(/\/products\/6$/);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Pensil');
  await back(page).click();
  await card(page, 'Pensil').getByRole('button', { name: 'Edit Pensil', exact: true }).click();
  await page.getByLabel('Nama Produk', { exact: true }).fill('Pensil 2B');
  await page.getByLabel('Harga (Rp)', { exact: true }).fill('6000');
  await page.getByRole('button', { name: 'Simpan Perubahan' }).click();
  await card(page, 'Pensil 2B').getByRole('link', { name: 'Detail Pensil 2B', exact: true }).click();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Pensil 2B');
  await expect(page.getByRole('region', { name: 'Informasi produk' })).toContainText(/Rp\s*6\.000/);
  await back(page).click();
  await card(page, 'Pensil 2B').getByRole('button', { name: 'Hapus Pensil 2B', exact: true }).click();
  await page.getByRole('button', { name: 'Hapus Produk', exact: true }).click();
  await expect(page.getByRole('article')).toHaveCount(5);
  await page.goBack();
  await expect(page).toHaveURL(/\/products\/6$/);
  await expect(page.getByRole('heading', { name: 'Produk tidak ditemukan' })).toBeVisible();
});

test('Settings mengubah layout nyata dan mempertahankan pilihan saat navigasi', async ({ page }) => {
  await page.goto('/settings');
  await expect(settings(page)).toHaveAttribute('aria-current', 'page');
  await expect(page.getByRole('radio', { name: /^Grid/ })).toBeChecked();
  await page.getByRole('radio', { name: /^List/ }).check();
  await expect(page.getByRole('status')).toHaveText('Tampilan aktif: List.');
  await back(page).click();
  await expect(products(page)).toHaveAttribute('data-view', 'list');
  expect(await columnCount(page)).toBe(1);
  const first = await card(page, 'Pulpen').boundingBox();
  const second = await card(page, 'Buku Tulis').boundingBox();
  expect(second.y).toBeGreaterThan(first.y + first.height);
  await card(page, 'Pulpen').getByRole('link', { name: 'Detail Pulpen', exact: true }).click();
  await back(page).click();
  await expect(products(page)).toHaveAttribute('data-view', 'list');
  await settings(page).click();
  await expect(page.getByRole('radio', { name: /^List/ })).toBeChecked();
  await page.getByRole('radio', { name: /^Grid/ }).check();
  await back(page).click();
  await expect(products(page)).toHaveAttribute('data-view', 'grid');
  expect(await columnCount(page)).toBe(page.viewportSize().width >= 1024 ? 3 : 1);
});

test('grid Tailwind mengikuti breakpoint ponsel tablet desktop tanpa overflow', async ({ page }) => {
  await page.goto('/products');
  for (const [width, columns] of [[390, 1], [820, 2], [1280, 3]]) {
    await page.setViewportSize({ width, height: 900 });
    expect(await columnCount(page)).toBe(columns);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  }
});

test('CRUD tetap berfungsi dalam mode list dan pencarian tetap menyaring hasil', async ({ page }) => {
  await page.goto('/settings');
  await page.getByRole('radio', { name: /^List/ }).check();
  await back(page).click();
  await card(page, 'Pulpen').getByRole('button', { name: 'Edit Pulpen', exact: true }).click();
  await page.getByLabel('Harga (Rp)', { exact: true }).fill('7000');
  await page.getByRole('button', { name: 'Simpan Perubahan' }).click();
  await expect(card(page, 'Pulpen')).toContainText(/Rp\s*7\.000/);
  await page.getByRole('searchbox').fill('Pulpen');
  await expect(page.getByRole('article')).toHaveCount(1);
  await card(page, 'Pulpen').getByRole('button', { name: 'Hapus Pulpen', exact: true }).click();
  await page.getByRole('button', { name: 'Hapus Produk', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Produk tidak ditemukan' })).toBeVisible();
  await page.getByRole('button', { name: 'Hapus pencarian' }).click();
  await expect(page.getByRole('article')).toHaveCount(4);
  await expect(products(page)).toHaveAttribute('data-view', 'list');
});

test('screenshot detail Settings list dan 404 bebas error JavaScript', async ({ page }, testInfo) => {
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  const prefix = `docs/screenshots/tugas-4/${testInfo.project.name}`;
  await page.goto('/products/2');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Buku Tulis');
  await page.screenshot({ path: `${prefix}-detail.png`, fullPage: true, scale: 'css', animations: 'disabled' });
  await settings(page).click();
  await page.getByRole('radio', { name: /^List/ }).check();
  await expect(page.getByRole('status')).toHaveText('Tampilan aktif: List.');
  await expect(page.getByRole('radio', { name: /^List/ }).locator('..')).toHaveClass(/bg-blue-50/);
  await page.screenshot({ path: `${prefix}-settings.png`, fullPage: true, scale: 'css', animations: 'disabled' });
  await back(page).click();
  await page.screenshot({ path: `${prefix}-list.png`, fullPage: true, scale: 'css', animations: 'disabled' });
  await page.goto('/alamat-salah');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('404 Not Found');
  await page.screenshot({ path: `${prefix}-404.png`, fullPage: true, scale: 'css', animations: 'disabled' });
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.goto('/products/999');
  await expect(page.getByRole('heading', { name: 'Produk tidak ditemukan' })).toBeVisible();
  await page.screenshot({ path: `${prefix}-produk-tidak-ada.png`, fullPage: true, scale: 'css', animations: 'disabled' });
  expect(errors).toEqual([]);
});

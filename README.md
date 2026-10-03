# Free Convert

Konversi dan kompres file langsung di browser. Tanpa upload ke server, cepat, privat.

Live: https://free-convert.web.id

## Fitur

- Gambar: JPG ↔ PNG ↔ WebP (kompres + konversi)
- Resize gambar (batasi lebar maks: 1920/1280/800px)
- Data: CSV ↔ Excel (XLSX) ↔ JSON
- Gambar → PDF (gabung beberapa gambar jadi satu PDF)
- Kompres PDF (render ulang halaman; teks jadi gambar — cocok untuk scan/foto)
- Slider kualitas untuk gambar (JPG/WebP) dan kompres PDF
- Batch (beberapa file sekaligus)
- Semua diproses di browser — file tidak dikirim ke server

Konversi dokumen Office (Word/Excel/PowerPoint → PDF) butuh pemrosesan di
server dan belum tersedia. Ditandai "Segera hadir" di UI.

## Model

Gratis sepenuhnya, didanai iklan. Tanpa langganan, tanpa batas file.

Slot iklan ada di `src/components/AdSlot.tsx` (masih placeholder). Untuk
pasang Google AdSense:

1. Daftar + verifikasi domain `free-convert.web.id` di AdSense.
2. Tambahkan script AdSense di `src/app/layout.tsx` (via `next/script`).
3. Ganti isi `AdSlot.tsx` dengan unit iklan (`<ins class="adsbygoogle">` +
   `(adsbygoogle = window.adsbygoogle || []).push({})`).

AdSense butuh domain yang sudah live dan konten yang memadai sebelum
disetujui.

## Stack

Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS 3

Library konversi: `jspdf` (PDF), `xlsx` (data), `pdfjs-dist` (baca PDF untuk
kompres), Canvas API (gambar).

## Jalankan lokal

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # build produksi
```

## Deploy ke Vercel

1. Push repo ini ke GitHub (sudah dilakukan).
2. Buka https://vercel.com → New Project → import repo `free-convert-claude`.
3. Vercel auto-deteksi Next.js. Biarkan setting default, klik Deploy.
4. Tidak ada environment variable yang wajib.

## Pasang domain free-convert.web.id

1. Di dashboard Vercel project → Settings → Domains → tambah
   `free-convert.web.id`.
2. Vercel kasih target DNS. Di panel domain (Pandi/registrar):
   - Untuk apex `free-convert.web.id`: buat record `A` → `76.76.21.21`,
     atau `CNAME`/`ALIAS` ke `cname.vercel-dns.com` jika registrar
     mendukung CNAME di apex.
   - Untuk `www`: `CNAME` → `cname.vercel-dns.com`.
3. Tunggu propagasi DNS (beberapa menit sampai beberapa jam). Vercel
   terbitkan SSL otomatis.

Cek nilai DNS terbaru di halaman Domains Vercel — angka di atas bisa berubah.

## Rencana lanjutan

- Pasang pembayaran (Midtrans/Lemonsqueezy) untuk aktifkan Pro.
- Konversi dokumen Office via engine server (LibreOffice).
- Kompres PDF.

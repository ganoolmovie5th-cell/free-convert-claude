export interface Post {
  slug: string;
  title: string;
  description: string;
  date: string; // ISO
  // Body is an array of blocks for simple rendering without a markdown dep.
  body: { h?: string; p?: string }[];
}

export const POSTS: Post[] = [
  {
    slug: "cara-kompres-pdf",
    title: "Cara Kompres PDF Tanpa Aplikasi",
    description:
      "Perkecil ukuran PDF langsung di browser, tanpa instal aplikasi. Berguna untuk unggah dokumen dengan batas ukuran.",
    date: "2026-10-04",
    body: [
      {
        p: "Banyak formulir online membatasi ukuran unggahan PDF, misalnya maksimal 1 MB. Dokumen hasil scan sering jauh lebih besar. Berikut cara memperkecilnya tanpa memasang aplikasi apa pun.",
      },
      { h: "Langkah singkat" },
      {
        p: "Buka alat Kompres PDF, pilih file, lalu atur slider kualitas. Semakin rendah kualitas, semakin kecil ukuran file. Unduh hasilnya saat sudah pas.",
      },
      { h: "Kapan hasilnya paling kecil" },
      {
        p: "Kompresi bekerja dengan merender ulang halaman menjadi gambar. Cara ini paling efektif untuk PDF berisi foto atau hasil scan. Efeknya: teks berubah menjadi gambar sehingga tidak bisa diseleksi. Simpan file asli jika kamu masih butuh teks yang bisa dipilih.",
      },
      { h: "Privasi" },
      {
        p: "Seluruh proses berjalan di browser kamu. File tidak diunggah ke server mana pun.",
      },
    ],
  },
  {
    slug: "jpg-vs-png-vs-webp",
    title: "JPG, PNG, atau WebP — Pilih yang Mana?",
    description:
      "Perbedaan singkat tiga format gambar paling umum dan kapan sebaiknya memakai masing-masing.",
    date: "2026-10-04",
    body: [
      {
        p: "Tiga format ini mendominasi web. Memilih yang tepat menghemat ukuran file tanpa mengorbankan tampilan.",
      },
      { h: "JPG" },
      {
        p: "Terbaik untuk foto. Kompresi lossy membuat ukurannya kecil, tetapi tidak mendukung transparansi dan menurun kualitasnya setiap kali disimpan ulang.",
      },
      { h: "PNG" },
      {
        p: "Lossless dan mendukung transparansi. Cocok untuk logo, ikon, dan screenshot dengan teks tajam. Ukurannya cenderung lebih besar dari JPG.",
      },
      { h: "WebP" },
      {
        p: "Format modern yang biasanya lebih kecil dari JPG maupun PNG pada kualitas setara, dan mendukung transparansi. Didukung semua browser terbaru.",
      },
      { h: "Ringkas" },
      {
        p: "Foto untuk web: WebP, atau JPG bila butuh kompatibilitas lama. Grafik dengan transparansi: PNG atau WebP.",
      },
    ],
  },
  {
    slug: "cara-gabung-pdf",
    title: "Cara Gabung Beberapa PDF jadi Satu",
    description:
      "Satukan beberapa file PDF menjadi satu dokumen dengan urutan yang kamu atur, langsung di browser.",
    date: "2026-10-04",
    body: [
      {
        p: "Menggabungkan beberapa PDF berguna saat mengumpulkan lampiran, bukti pembayaran, atau bab-bab terpisah menjadi satu berkas.",
      },
      { h: "Langkah singkat" },
      {
        p: "Buka alat Gabung PDF, tambahkan dua file atau lebih. Urutan halaman mengikuti urutan file ditambahkan. Klik gabung, lalu unduh satu PDF hasilnya.",
      },
      { h: "Isi dokumen tetap utuh" },
      {
        p: "Penggabungan menyalin halaman asli apa adanya, jadi teks tetap bisa diseleksi dan kualitasnya tidak berubah. Berbeda dengan kompres yang merender ulang halaman.",
      },
    ],
  },
];

export function postBySlug(slug: string): Post | undefined {
  return POSTS.find((p) => p.slug === slug);
}

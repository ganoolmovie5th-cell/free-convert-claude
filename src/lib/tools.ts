import { ConvertKind } from "./types";

export interface Faq {
  q: string;
  a: string;
}

export interface Tool {
  slug: string;
  kind: ConvertKind;
  // Locked target for tools where the UI should not offer a choice.
  lockTarget?: string;
  nav: string; // short label for grids/tabs
  title: string; // page H1 + meta title
  description: string; // meta description + intro paragraph
  faq: Faq[];
}

export const TOOLS: Tool[] = [
  {
    slug: "kompres-gambar",
    kind: "image",
    nav: "Kompres Gambar",
    title: "Kompres Gambar Online",
    description:
      "Perkecil ukuran gambar JPG, PNG, dan WebP langsung di browser. Atur kualitas sesuai kebutuhan, tanpa upload ke server.",
    faq: [
      {
        q: "Apakah kualitas gambar turun saat dikompres?",
        a: "Kompresi JPG dan WebP bersifat lossy, jadi makin rendah kualitas yang dipilih, makin kecil ukurannya dan makin berkurang detailnya. Atur slider sampai menemukan keseimbangan yang pas.",
      },
      {
        q: "Apakah file saya diunggah ke server?",
        a: "Tidak. Semua kompresi dilakukan di browser kamu. File tidak pernah dikirim atau disimpan di server.",
      },
      {
        q: "Berapa banyak gambar yang bisa dikompres sekaligus?",
        a: "Tidak ada batas. Jika kamu mengompres beberapa gambar sekaligus, hasilnya diunduh sebagai satu file ZIP.",
      },
    ],
  },
  {
    slug: "jpg-ke-png",
    kind: "image",
    lockTarget: "png",
    nav: "JPG ke PNG",
    title: "Konversi JPG ke PNG",
    description:
      "Ubah gambar JPG menjadi PNG secara gratis di browser. Cepat dan privat, tanpa mengunggah file.",
    faq: [
      {
        q: "Kenapa mengubah JPG ke PNG?",
        a: "PNG mendukung transparansi dan bersifat lossless, cocok untuk logo, screenshot, atau gambar yang akan diedit ulang. File PNG biasanya lebih besar dari JPG.",
      },
      {
        q: "Apakah ada batas ukuran file?",
        a: "Tidak ada batas resmi, tetapi gambar yang sangat besar diproses lebih lambat karena semua dikerjakan di perangkat kamu.",
      },
    ],
  },
  {
    slug: "png-ke-jpg",
    kind: "image",
    lockTarget: "jpeg",
    nav: "PNG ke JPG",
    title: "Konversi PNG ke JPG",
    description:
      "Ubah gambar PNG menjadi JPG dengan ukuran lebih kecil. Diproses di browser, tanpa upload.",
    faq: [
      {
        q: "Apa yang terjadi dengan area transparan?",
        a: "JPG tidak mendukung transparansi, jadi area transparan diisi dengan warna putih saat dikonversi.",
      },
      {
        q: "Apakah ukuran file jadi lebih kecil?",
        a: "Biasanya ya. JPG memakai kompresi lossy sehingga ukurannya umumnya lebih kecil dari PNG, terutama untuk foto.",
      },
    ],
  },
  {
    slug: "gambar-ke-pdf",
    kind: "pdf",
    nav: "Gambar ke PDF",
    title: "Gabung Gambar jadi PDF",
    description:
      "Gabungkan beberapa gambar menjadi satu file PDF. Satu gambar per halaman, langsung di browser.",
    faq: [
      {
        q: "Bagaimana urutan halamannya ditentukan?",
        a: "Halaman mengikuti urutan file ditambahkan. Hapus dan tambahkan ulang untuk mengatur urutan sesuai keinginan.",
      },
      {
        q: "Format gambar apa saja yang didukung?",
        a: "JPG, PNG, dan WebP. Setiap gambar menjadi satu halaman pada ukuran A4.",
      },
    ],
  },
  {
    slug: "pdf-ke-jpg",
    kind: "pdf2img",
    nav: "PDF ke JPG",
    title: "Konversi PDF ke JPG",
    description:
      "Ubah setiap halaman PDF menjadi gambar JPG. Diproses di browser, tanpa upload ke server.",
    faq: [
      {
        q: "Apakah setiap halaman jadi file terpisah?",
        a: "Ya. Setiap halaman PDF menjadi satu gambar JPG. Jika ada beberapa halaman, hasilnya diunduh sebagai satu file ZIP.",
      },
      {
        q: "Kenapa proses pertama agak lambat?",
        a: "Alat ini memuat mesin pembaca PDF sekali di awal. Konversi berikutnya lebih cepat.",
      },
    ],
  },
  {
    slug: "gabung-pdf",
    kind: "pdfmerge",
    nav: "Gabung PDF",
    title: "Gabung PDF",
    description:
      "Gabungkan beberapa file PDF menjadi satu, dengan urutan sesuai pilihan kamu. Isi dokumen tetap utuh.",
    faq: [
      {
        q: "Apakah teks di PDF tetap bisa diseleksi?",
        a: "Ya. Penggabungan menyalin halaman asli apa adanya, jadi teks, tautan, dan kualitasnya tetap utuh.",
      },
      {
        q: "Berapa minimal file untuk digabung?",
        a: "Minimal dua file PDF. Urutannya mengikuti urutan file ditambahkan.",
      },
    ],
  },
  {
    slug: "pisah-pdf",
    kind: "pdfsplit",
    nav: "Pisah PDF",
    title: "Pisah Halaman PDF",
    description:
      "Ambil halaman tertentu dari PDF, misalnya 1-3 atau 5. Hasilnya PDF baru berisi halaman yang kamu pilih.",
    faq: [
      {
        q: "Bagaimana cara menulis rentang halaman?",
        a: "Gunakan tanda hubung untuk rentang dan koma untuk memisah, misalnya 1-3,5 untuk halaman 1, 2, 3, dan 5.",
      },
      {
        q: "Kalau kolom rentang dikosongkan?",
        a: "Semua halaman akan diambil dan disalin ke PDF baru.",
      },
    ],
  },
  {
    slug: "kompres-pdf",
    kind: "pdfcompress",
    nav: "Kompres PDF",
    title: "Kompres PDF",
    description:
      "Perkecil ukuran file PDF dengan render ulang halaman. Cocok untuk hasil scan dan PDF berisi foto.",
    faq: [
      {
        q: "Kenapa teks jadi tidak bisa diseleksi setelah dikompres?",
        a: "Kompresi bekerja dengan merender ulang setiap halaman menjadi gambar. Ini mengecilkan ukuran tetapi mengubah teks menjadi gambar. Cocok untuk hasil scan dan PDF berisi foto.",
      },
      {
        q: "Bagaimana cara memperkecil ukuran lebih jauh?",
        a: "Turunkan slider kualitas. Makin rendah kualitas, makin kecil ukuran file, dengan detail yang berkurang.",
      },
    ],
  },
  {
    slug: "watermark-gambar",
    kind: "watermark",
    nav: "Watermark Gambar",
    title: "Tambah Watermark ke Gambar",
    description:
      "Tambahkan watermark teks berulang ke gambar untuk melindungi karya atau foto produk. Diproses di browser.",
    faq: [
      {
        q: "Apakah watermark bisa dihapus lagi?",
        a: "Tidak. Watermark menyatu dengan gambar pada hasil akhir. Simpan file asli jika kamu masih membutuhkan versi tanpa watermark.",
      },
      {
        q: "Bisakah mengatur posisi atau logo?",
        a: "Saat ini watermark berupa teks berulang secara diagonal. Dukungan logo dan posisi khusus sedang dipertimbangkan.",
      },
    ],
  },
  {
    slug: "buka-proteksi-pdf",
    kind: "pdfunlock",
    nav: "Buka Proteksi PDF",
    title: "Hapus Proteksi PDF",
    description:
      "Hapus pembatasan salin, cetak, dan edit dari PDF yang kamu miliki. Bukan untuk membuka password buka file.",
    faq: [
      {
        q: "Apa bedanya proteksi dan password buka?",
        a: "Proteksi membatasi salin, cetak, atau edit meski file tetap bisa dibuka. Password buka diperlukan untuk melihat isi file. Alat ini hanya menghapus pembatasan, bukan membuka password buka.",
      },
      {
        q: "Apakah ini legal digunakan?",
        a: "Gunakan hanya untuk file yang kamu miliki atau punya izin untuk mengubahnya. Kamu bertanggung jawab atas penggunaan file sendiri.",
      },
    ],
  },
];

export function toolBySlug(slug: string): Tool | undefined {
  return TOOLS.find((t) => t.slug === slug);
}

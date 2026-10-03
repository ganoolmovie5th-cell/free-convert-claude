import { ConvertKind } from "./types";

export interface Tool {
  slug: string;
  kind: ConvertKind;
  // Locked target for tools where the UI should not offer a choice.
  lockTarget?: string;
  nav: string; // short label for grids/tabs
  title: string; // page H1 + meta title
  description: string; // meta description + intro paragraph
}

export const TOOLS: Tool[] = [
  {
    slug: "kompres-gambar",
    kind: "image",
    nav: "Kompres Gambar",
    title: "Kompres Gambar Online",
    description:
      "Perkecil ukuran gambar JPG, PNG, dan WebP langsung di browser. Atur kualitas sesuai kebutuhan, tanpa upload ke server.",
  },
  {
    slug: "jpg-ke-png",
    kind: "image",
    lockTarget: "png",
    nav: "JPG ke PNG",
    title: "Konversi JPG ke PNG",
    description:
      "Ubah gambar JPG menjadi PNG secara gratis di browser. Cepat dan privat, tanpa mengunggah file.",
  },
  {
    slug: "png-ke-jpg",
    kind: "image",
    lockTarget: "jpeg",
    nav: "PNG ke JPG",
    title: "Konversi PNG ke JPG",
    description:
      "Ubah gambar PNG menjadi JPG dengan ukuran lebih kecil. Diproses di browser, tanpa upload.",
  },
  {
    slug: "gambar-ke-pdf",
    kind: "pdf",
    nav: "Gambar ke PDF",
    title: "Gabung Gambar jadi PDF",
    description:
      "Gabungkan beberapa gambar menjadi satu file PDF. Satu gambar per halaman, langsung di browser.",
  },
  {
    slug: "pdf-ke-jpg",
    kind: "pdf2img",
    nav: "PDF ke JPG",
    title: "Konversi PDF ke JPG",
    description:
      "Ubah setiap halaman PDF menjadi gambar JPG. Diproses di browser, tanpa upload ke server.",
  },
  {
    slug: "gabung-pdf",
    kind: "pdfmerge",
    nav: "Gabung PDF",
    title: "Gabung PDF",
    description:
      "Gabungkan beberapa file PDF menjadi satu, dengan urutan sesuai pilihan kamu. Isi dokumen tetap utuh.",
  },
  {
    slug: "pisah-pdf",
    kind: "pdfsplit",
    nav: "Pisah PDF",
    title: "Pisah Halaman PDF",
    description:
      "Ambil halaman tertentu dari PDF, misalnya 1-3 atau 5. Hasilnya PDF baru berisi halaman yang kamu pilih.",
  },
  {
    slug: "kompres-pdf",
    kind: "pdfcompress",
    nav: "Kompres PDF",
    title: "Kompres PDF",
    description:
      "Perkecil ukuran file PDF dengan render ulang halaman. Cocok untuk hasil scan dan PDF berisi foto.",
  },
];

export function toolBySlug(slug: string): Tool | undefined {
  return TOOLS.find((t) => t.slug === slug);
}

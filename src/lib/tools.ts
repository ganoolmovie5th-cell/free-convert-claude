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
  // Longer unique body shown under the tool. Each entry is a heading + one or
  // more paragraphs, rendered as an article section.
  body: { h: string; p: string[] }[];
  // Ordered how-to steps. Also used to emit HowTo structured data.
  steps: string[];
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
    body: [
      {
        h: "Untuk apa kompres gambar",
        p: [
          "Foto dari kamera ponsel sekarang sering berukuran 3-8 MB per file. Ukuran sebesar itu bikin halaman web lambat dimuat, boros kuota saat dikirim lewat chat, dan sering ditolak formulir unggahan yang membatasi ukuran. Mengompres gambar memangkas ukuran file sambil menjaga tampilan tetap layak dilihat.",
          "Alat ini bekerja untuk tiga format paling umum — JPG, PNG, dan WebP — dan memberi kamu kontrol lewat slider kualitas, jadi kamu yang menentukan seberapa jauh ukuran dipangkas.",
        ],
      },
      {
        h: "Lossy vs lossless: kenapa ini penting",
        p: [
          "JPG dan WebP memakai kompresi lossy. Artinya sebagian detail dibuang secara permanen untuk menghemat ukuran, dan makin rendah kualitas yang dipilih makin terasa penurunannya. PNG bersifat lossless sehingga tidak kehilangan detail, tetapi ukurannya cenderung besar untuk foto.",
          "Untuk foto, WebP kualitas 70-80 biasanya memberi keseimbangan terbaik: ukuran turun jauh dan mata sulit membedakannya dari aslinya. Untuk logo atau screenshot berteks tajam, pertahankan PNG agar garis tetap bersih.",
        ],
      },
      {
        h: "Privasi",
        p: [
          "Seluruh kompresi berjalan di dalam browser kamu memakai Canvas API. Gambar tidak pernah dikirim ke server, tidak disimpan, dan hilang dari memori begitu kamu menutup tab.",
        ],
      },
    ],
    steps: [
      "Buka alat Kompres Gambar dan pilih satu atau beberapa gambar.",
      "Atur slider kualitas; makin rendah, makin kecil ukuran file.",
      "Lihat perkiraan ukuran hasil pada setiap file.",
      "Unduh hasilnya. Beberapa file sekaligus akan diunduh sebagai satu ZIP.",
    ],
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
      {
        q: "Format mana yang paling kecil ukurannya?",
        a: "Untuk foto, WebP biasanya menghasilkan ukuran paling kecil pada kualitas yang setara dengan JPG. Untuk grafik dengan transparansi, WebP juga lebih hemat daripada PNG.",
      },
      {
        q: "Kenapa ukuran file saya justru membesar?",
        a: "Ini bisa terjadi jika kamu mengubah JPG menjadi PNG, karena PNG lossless. Untuk memperkecil foto, pertahankan JPG atau WebP dan turunkan kualitasnya.",
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
    body: [
      {
        h: "Kapan JPG sebaiknya diubah ke PNG",
        p: [
          "PNG unggul saat kamu butuh latar transparan atau garis yang tajam tanpa artefak kompresi. Logo, ikon, screenshot antarmuka, dan gambar yang akan diedit ulang lebih cocok disimpan sebagai PNG. JPG, sebaliknya, memperkenalkan artefak di sekitar teks dan tepi tajam setiap kali disimpan ulang.",
          "Perlu dicatat: mengubah JPG ke PNG tidak mengembalikan detail yang sudah hilang saat file disimpan sebagai JPG. Konversi ini berguna untuk langkah berikutnya (misalnya pengeditan lossless), bukan untuk memperbaiki kualitas foto yang sudah turun.",
        ],
      },
      {
        h: "Soal ukuran file",
        p: [
          "PNG hampir selalu lebih besar daripada JPG untuk foto, karena PNG tidak membuang detail. Jika tujuanmu memperkecil file untuk web, konversi ke PNG bukan jalan yang tepat — gunakan WebP atau pertahankan JPG dengan kualitas yang diturunkan.",
        ],
      },
    ],
    steps: [
      "Pilih satu atau beberapa file JPG.",
      "Format tujuan sudah dikunci ke PNG.",
      "Unduh hasil PNG; beberapa file menjadi satu ZIP.",
    ],
    faq: [
      {
        q: "Kenapa mengubah JPG ke PNG?",
        a: "PNG mendukung transparansi dan bersifat lossless, cocok untuk logo, screenshot, atau gambar yang akan diedit ulang. File PNG biasanya lebih besar dari JPG.",
      },
      {
        q: "Apakah ada batas ukuran file?",
        a: "Tidak ada batas resmi, tetapi gambar yang sangat besar diproses lebih lambat karena semua dikerjakan di perangkat kamu.",
      },
      {
        q: "Apakah konversi ini menambah kualitas foto?",
        a: "Tidak. Detail yang hilang saat gambar disimpan sebagai JPG tidak bisa dikembalikan. Konversi hanya mengubah wadah formatnya.",
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
    body: [
      {
        h: "Kenapa ubah PNG ke JPG",
        p: [
          "Screenshot dan ekspor desain sering tersimpan sebagai PNG berukuran besar. Jika gambar itu berupa foto atau tidak butuh transparansi, mengubahnya ke JPG bisa memangkas ukuran file secara drastis — berguna untuk lampiran email, unggahan formulir, atau mempercepat halaman web.",
        ],
      },
      {
        h: "Yang terjadi pada transparansi",
        p: [
          "JPG tidak mengenal area transparan. Saat konversi, bagian transparan pada PNG diisi dengan warna putih. Jika kamu butuh latar transparan, pertahankan PNG atau gunakan WebP.",
        ],
      },
    ],
    steps: [
      "Pilih satu atau beberapa file PNG.",
      "Format tujuan sudah dikunci ke JPG.",
      "Atur kualitas bila perlu, lalu unduh hasilnya.",
    ],
    faq: [
      {
        q: "Apa yang terjadi dengan area transparan?",
        a: "JPG tidak mendukung transparansi, jadi area transparan diisi dengan warna putih saat dikonversi.",
      },
      {
        q: "Apakah ukuran file jadi lebih kecil?",
        a: "Biasanya ya. JPG memakai kompresi lossy sehingga ukurannya umumnya lebih kecil dari PNG, terutama untuk foto.",
      },
      {
        q: "Kapan sebaiknya tetap memakai PNG?",
        a: "Saat gambar butuh transparansi, atau berisi teks dan garis tajam seperti logo dan screenshot antarmuka.",
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
    body: [
      {
        h: "Kegunaan sehari-hari",
        p: [
          "Menggabungkan beberapa foto menjadi satu PDF memudahkan pengiriman dokumen: foto KTP, bukti transfer, lembar formulir, atau halaman buku yang difoto satu per satu. Satu berkas PDF lebih rapi dilampirkan dan lebih mudah dicetak daripada beberapa file gambar terpisah.",
        ],
      },
      {
        h: "Cara mengatur urutan halaman",
        p: [
          "Setiap gambar menjadi satu halaman, dan urutannya mengikuti urutan file ditambahkan. Jika urutannya keliru, hapus file lalu tambahkan kembali sesuai urutan yang kamu inginkan sebelum membuat PDF.",
        ],
      },
    ],
    steps: [
      "Tambahkan dua gambar atau lebih (JPG, PNG, atau WebP).",
      "Periksa urutan; halaman mengikuti urutan file.",
      "Buat PDF, lalu unduh satu berkas hasilnya.",
    ],
    faq: [
      {
        q: "Bagaimana urutan halamannya ditentukan?",
        a: "Halaman mengikuti urutan file ditambahkan. Hapus dan tambahkan ulang untuk mengatur urutan sesuai keinginan.",
      },
      {
        q: "Format gambar apa saja yang didukung?",
        a: "JPG, PNG, dan WebP. Setiap gambar menjadi satu halaman pada ukuran A4.",
      },
      {
        q: "Apakah ukuran PDF-nya besar?",
        a: "Tergantung ukuran gambar sumbernya. Kompres gambar lebih dulu jika kamu ingin PDF yang lebih ringan.",
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
    body: [
      {
        h: "Kapan butuh PDF jadi gambar",
        p: [
          "Mengubah PDF menjadi JPG berguna saat kamu ingin menempel halaman ke dokumen lain, mengunggahnya ke platform yang hanya menerima gambar, atau membagikan satu halaman lewat chat tanpa mengirim seluruh berkas. Setiap halaman menjadi satu file JPG terpisah.",
        ],
      },
      {
        h: "Soal kualitas dan kecepatan",
        p: [
          "Slider kualitas menentukan ketajaman gambar hasil. Kualitas tinggi menghasilkan JPG lebih besar dan lebih tajam. Pemrosesan pertama agak lambat karena mesin pembaca PDF dimuat sekali di awal; halaman dan konversi berikutnya berjalan lebih cepat.",
        ],
      },
    ],
    steps: [
      "Pilih file PDF.",
      "Atur kualitas gambar bila perlu.",
      "Konversi; tiap halaman menjadi satu JPG.",
      "Unduh hasilnya — banyak halaman menjadi satu ZIP.",
    ],
    faq: [
      {
        q: "Apakah setiap halaman jadi file terpisah?",
        a: "Ya. Setiap halaman PDF menjadi satu gambar JPG. Jika ada beberapa halaman, hasilnya diunduh sebagai satu file ZIP.",
      },
      {
        q: "Kenapa proses pertama agak lambat?",
        a: "Alat ini memuat mesin pembaca PDF sekali di awal. Konversi berikutnya lebih cepat.",
      },
      {
        q: "Pilih JPG atau PNG?",
        a: "Pilih JPG untuk ukuran lebih kecil pada halaman berisi foto. Pilih PNG jika halaman berisi teks dan garis tajam yang perlu tetap bersih.",
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
    body: [
      {
        h: "Isi dokumen tetap utuh",
        p: [
          "Berbeda dengan kompres yang merender ulang halaman, penggabungan menyalin halaman asli apa adanya. Teks tetap bisa diseleksi, tautan tetap berfungsi, dan kualitasnya tidak berubah. Cocok untuk menyatukan lampiran, bab-bab laporan, atau kumpulan kuitansi menjadi satu berkas resmi.",
        ],
      },
      {
        h: "Mengatur urutan",
        p: [
          "Urutan halaman pada hasil mengikuti urutan file ditambahkan. Susun file dari yang ingin tampil lebih dulu. Jika keliru, hapus dan tambahkan ulang sebelum menggabung.",
        ],
      },
    ],
    steps: [
      "Tambahkan dua file PDF atau lebih.",
      "Atur urutan dengan menambah file sesuai urutan yang diinginkan.",
      "Gabungkan, lalu unduh satu PDF hasilnya.",
    ],
    faq: [
      {
        q: "Apakah teks di PDF tetap bisa diseleksi?",
        a: "Ya. Penggabungan menyalin halaman asli apa adanya, jadi teks, tautan, dan kualitasnya tetap utuh.",
      },
      {
        q: "Berapa minimal file untuk digabung?",
        a: "Minimal dua file PDF. Urutannya mengikuti urutan file ditambahkan.",
      },
      {
        q: "Apakah ada batas jumlah file?",
        a: "Tidak ada batas resmi, tetapi menggabung banyak PDF besar memakan lebih banyak memori browser.",
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
    body: [
      {
        h: "Untuk apa memisah PDF",
        p: [
          "Sering kali kamu hanya butuh sebagian halaman dari dokumen panjang — misalnya satu bab, lembar tanda tangan, atau halaman tertentu dari kontrak. Memisah PDF menghasilkan berkas baru yang ramping berisi hanya halaman yang kamu pilih, tanpa mengubah file aslinya.",
        ],
      },
      {
        h: "Menulis rentang halaman",
        p: [
          "Gunakan tanda hubung untuk rentang dan koma untuk memisah. Contoh: 1-3,5 mengambil halaman 1, 2, 3, dan 5. Mengosongkan kolom akan menyalin semua halaman ke PDF baru.",
        ],
      },
    ],
    steps: [
      "Pilih file PDF sumber.",
      "Tulis rentang halaman, misalnya 1-3,5.",
      "Proses, lalu unduh PDF baru berisi halaman pilihan.",
    ],
    faq: [
      {
        q: "Bagaimana cara menulis rentang halaman?",
        a: "Gunakan tanda hubung untuk rentang dan koma untuk memisah, misalnya 1-3,5 untuk halaman 1, 2, 3, dan 5.",
      },
      {
        q: "Kalau kolom rentang dikosongkan?",
        a: "Semua halaman akan diambil dan disalin ke PDF baru.",
      },
      {
        q: "Apakah file asli berubah?",
        a: "Tidak. Pemisahan membuat berkas baru; file PDF asli di perangkatmu tetap utuh.",
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
    body: [
      {
        h: "Cara kerja kompresi",
        p: [
          "Alat ini memperkecil PDF dengan merender ulang setiap halaman menjadi gambar lalu menyusunnya kembali menjadi PDF baru. Pendekatan ini paling efektif untuk dokumen hasil scan dan PDF yang didominasi foto, yang biasanya menyumbang ukuran file terbesar.",
          "Konsekuensinya: teks yang tadinya bisa diseleksi berubah menjadi gambar. Jika kamu masih butuh teks yang bisa dipilih atau dicari, simpan file aslinya sebelum mengompres.",
        ],
      },
      {
        h: "Kapan paling berguna",
        p: [
          "Banyak formulir online membatasi ukuran unggahan PDF, misalnya 1 MB. Hasil scan sering jauh melebihi batas itu. Menurunkan slider kualitas memangkas ukuran hingga di bawah batas tanpa perlu aplikasi tambahan.",
        ],
      },
    ],
    steps: [
      "Pilih file PDF.",
      "Atur slider kualitas; makin rendah, makin kecil ukuran.",
      "Kompres, lalu unduh PDF hasilnya.",
    ],
    faq: [
      {
        q: "Kenapa teks jadi tidak bisa diseleksi setelah dikompres?",
        a: "Kompresi bekerja dengan merender ulang setiap halaman menjadi gambar. Ini mengecilkan ukuran tetapi mengubah teks menjadi gambar. Cocok untuk hasil scan dan PDF berisi foto.",
      },
      {
        q: "Bagaimana cara memperkecil ukuran lebih jauh?",
        a: "Turunkan slider kualitas. Makin rendah kualitas, makin kecil ukuran file, dengan detail yang berkurang.",
      },
      {
        q: "Apakah cocok untuk PDF yang isinya teks saja?",
        a: "Kurang ideal. Untuk PDF berisi teks murni, kompresi ini mengubah teks jadi gambar dan hasilnya belum tentu lebih kecil. Metode ini paling efektif untuk scan dan foto.",
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
    body: [
      {
        h: "Kenapa memberi watermark",
        p: [
          "Watermark menandai kepemilikan dan mempersulit orang lain memakai ulang gambarmu tanpa izin. Berguna untuk foto produk toko online, karya desain yang dibagikan sebagai pratinjau, atau dokumen yang hanya boleh dilihat tetapi tidak disalin bebas.",
        ],
      },
      {
        h: "Sifatnya permanen",
        p: [
          "Watermark menyatu dengan piksel gambar pada hasil akhir dan tidak bisa dihapus lagi. Selalu simpan file asli tanpa watermark jika kamu masih membutuhkannya.",
        ],
      },
    ],
    steps: [
      "Pilih satu atau beberapa gambar.",
      "Masukkan teks watermark dan atur kerapatannya.",
      "Terapkan, lalu unduh gambar ber-watermark.",
    ],
    faq: [
      {
        q: "Apakah watermark bisa dihapus lagi?",
        a: "Tidak. Watermark menyatu dengan gambar pada hasil akhir. Simpan file asli jika kamu masih membutuhkan versi tanpa watermark.",
      },
      {
        q: "Bisakah mengatur posisi atau logo?",
        a: "Saat ini watermark berupa teks berulang secara diagonal. Dukungan logo dan posisi khusus sedang dipertimbangkan.",
      },
      {
        q: "Apakah gambar dikirim ke server?",
        a: "Tidak. Watermark digambar di browser memakai Canvas API dan gambar tidak pernah diunggah.",
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
    body: [
      {
        h: "Proteksi vs password buka",
        p: [
          "Ada dua jenis pengamanan pada PDF. Pertama, pembatasan izin: file tetap bisa dibuka, tetapi salin teks, cetak, atau edit dilarang. Kedua, password buka: file sama sekali tidak bisa dibuka tanpa kata sandi. Alat ini hanya menghapus jenis pertama — pembatasan izin — bukan membuka password buka.",
        ],
      },
      {
        h: "Gunakan dengan bertanggung jawab",
        p: [
          "Hapus pembatasan hanya pada file yang kamu miliki atau yang kamu punya izin untuk mengubahnya. Kamu bertanggung jawab penuh atas penggunaan file sendiri.",
        ],
      },
    ],
    steps: [
      "Pilih PDF yang memiliki pembatasan izin.",
      "Proses untuk menyalin isinya ke PDF tanpa pembatasan.",
      "Unduh PDF hasilnya.",
    ],
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
  {
    slug: "crop-gambar",
    kind: "crop",
    nav: "Crop Gambar",
    title: "Crop Gambar Online",
    description:
      "Potong gambar ke rasio 1:1, 16:9, atau 4:3 dari tengah. Diproses di browser, tanpa upload.",
    body: [
      {
        h: "Memilih rasio yang tepat",
        p: [
          "Setiap platform punya rasio favorit. 1:1 cocok untuk foto profil dan feed persegi, 16:9 untuk thumbnail video dan banner lebar, dan 4:3 untuk foto bergaya klasik. Memotong ke rasio yang pas membuat gambar tampil utuh tanpa terpotong otomatis oleh platform.",
        ],
      },
      {
        h: "Pemotongan dari tengah",
        p: [
          "Alat ini memotong gambar ke rasio pilihan dari bagian tengah. Pastikan subjek utama berada di tengah agar tidak ikut terpangkas. Pemotongan area bebas sedang dipertimbangkan.",
        ],
      },
    ],
    steps: [
      "Pilih gambar.",
      "Tentukan rasio: 1:1, 16:9, atau 4:3.",
      "Potong, lalu unduh hasilnya.",
    ],
    faq: [
      {
        q: "Bisakah memilih area potong sendiri?",
        a: "Saat ini pemotongan dilakukan dari tengah ke rasio yang dipilih. Pemotongan area bebas sedang dipertimbangkan.",
      },
      {
        q: "Format hasilnya apa?",
        a: "Hasil crop disimpan sebagai JPG dengan kualitas yang bisa kamu atur.",
      },
    ],
  },
  {
    slug: "gabung-gambar",
    kind: "imgmerge",
    nav: "Gabung Gambar",
    title: "Gabung Gambar jadi Satu",
    description:
      "Tumpuk beberapa gambar menjadi satu gambar, secara vertikal atau horizontal. Cocok untuk menggabung screenshot.",
    body: [
      {
        h: "Kegunaan",
        p: [
          "Menggabung beberapa gambar menjadi satu berguna untuk menyatukan screenshot percakapan yang panjang, membuat perbandingan sebelum-sesudah secara berdampingan, atau menyusun beberapa foto menjadi satu gambar yang mudah dibagikan.",
        ],
      },
      {
        h: "Vertikal atau horizontal",
        p: [
          "Pilih vertikal untuk menumpuk gambar dari atas ke bawah (cocok untuk screenshot chat), atau horizontal untuk berjajar ke samping (cocok untuk perbandingan). Gambar otomatis diseragamkan lebarnya saat vertikal atau tingginya saat horizontal, jadi ukuran sumber tidak harus sama.",
        ],
      },
    ],
    steps: [
      "Tambahkan dua gambar atau lebih.",
      "Pilih arah gabung: vertikal atau horizontal.",
      "Gabungkan, lalu unduh satu gambar hasilnya.",
    ],
    faq: [
      {
        q: "Bagaimana urutan gambarnya?",
        a: "Gambar disusun sesuai urutan ditambahkan. Hapus dan tambahkan ulang untuk mengatur urutan.",
      },
      {
        q: "Apakah ukuran gambar harus sama?",
        a: "Tidak. Gambar otomatis diseragamkan lebarnya (vertikal) atau tingginya (horizontal) saat digabung.",
      },
    ],
  },
  {
    slug: "pdf-ke-png",
    kind: "pdf2png",
    nav: "PDF ke PNG",
    title: "Konversi PDF ke PNG",
    description:
      "Ubah setiap halaman PDF menjadi gambar PNG. Diproses di browser, tanpa upload ke server.",
    body: [
      {
        h: "PNG atau JPG untuk halaman PDF",
        p: [
          "PNG bersifat lossless dan menjaga ketajaman garis serta teks lebih baik, cocok untuk halaman berisi diagram, tabel, atau tulisan tajam. Ukurannya umumnya lebih besar daripada JPG. Pilih JPG bila halaman didominasi foto dan kamu mengutamakan ukuran kecil.",
        ],
      },
    ],
    steps: [
      "Pilih file PDF.",
      "Konversi; tiap halaman menjadi satu PNG.",
      "Unduh hasilnya — banyak halaman menjadi satu ZIP.",
    ],
    faq: [
      {
        q: "Apa bedanya dengan PDF ke JPG?",
        a: "PNG bersifat lossless dan mendukung ketajaman garis lebih baik, tetapi ukurannya umumnya lebih besar dari JPG.",
      },
      {
        q: "Apakah tiap halaman jadi file terpisah?",
        a: "Ya. Jika ada beberapa halaman, hasilnya diunduh sebagai satu file ZIP.",
      },
    ],
  },
  {
    slug: "tambah-teks-pdf",
    kind: "pdftext",
    nav: "Teks ke PDF",
    title: "Tambah Teks ke PDF",
    description:
      "Stempel satu baris teks ke PDF di posisi atas, tengah, atau bawah. Cocok untuk menandai dokumen.",
    body: [
      {
        h: "Untuk apa menstempel teks",
        p: [
          "Menambahkan teks ke PDF berguna untuk menandai dokumen dengan label seperti \"SALINAN\", \"DRAFT\", tanggal, atau nama. Ini stempel sederhana untuk menandai berkas, bukan editor penuh untuk mengubah isi dokumen.",
        ],
      },
      {
        h: "Posisi preset",
        p: [
          "Teks ditempatkan di posisi preset — atas, tengah, atau bawah — pada halaman pertama. Pilih posisi yang tidak menutupi isi penting dokumen.",
        ],
      },
    ],
    steps: [
      "Pilih file PDF.",
      "Tulis teks dan pilih posisi: atas, tengah, atau bawah.",
      "Terapkan, lalu unduh PDF hasilnya.",
    ],
    faq: [
      {
        q: "Bisakah menaruh teks di posisi bebas?",
        a: "Saat ini teks ditempatkan di posisi preset (atas, tengah, bawah) dan di halaman pertama. Ini stempel sederhana, bukan editor penuh.",
      },
      {
        q: "Apakah teks bisa dihapus lagi?",
        a: "Teks menyatu dengan PDF hasil. Simpan file asli jika masih kamu butuhkan tanpa teks.",
      },
    ],
  },
  {
    slug: "ocr-gambar",
    kind: "ocr",
    nav: "OCR Gambar",
    title: "Ekstrak Teks dari Gambar (OCR)",
    description:
      "Baca teks dari gambar atau hasil scan menjadi teks yang bisa disalin. Mendukung bahasa Indonesia dan Inggris, diproses di browser.",
    body: [
      {
        h: "Apa itu OCR",
        p: [
          "OCR (Optical Character Recognition) mengenali huruf pada gambar dan mengubahnya menjadi teks yang bisa disalin, dicari, dan diedit. Berguna untuk menyalin tulisan dari foto dokumen, screenshot, struk, atau papan pengumuman tanpa mengetik ulang.",
        ],
      },
      {
        h: "Tips agar hasil akurat",
        p: [
          "Hasil terbaik didapat dari gambar yang tajam, terang, dan kontras tinggi dengan teks tegak lurus. Foto yang buram, miring, atau remang akan menurunkan akurasi. Alat ini mendukung bahasa Indonesia dan Inggris.",
          "Pemrosesan pertama agak lama karena mesin OCR dan data bahasa dimuat sekali di awal, lalu seluruh pengenalan berjalan di perangkatmu.",
        ],
      },
    ],
    steps: [
      "Pilih gambar atau hasil scan berisi teks.",
      "Tunggu mesin OCR memproses gambar.",
      "Salin teks hasil ekstraksi.",
    ],
    faq: [
      {
        q: "Kenapa proses OCR agak lama?",
        a: "Mesin OCR dan data bahasa dimuat sekali di awal, lalu memproses gambar di perangkat kamu. Gambar yang jelas dan kontras tinggi memberi hasil terbaik.",
      },
      {
        q: "Apakah gambar saya dikirim ke server?",
        a: "Tidak. OCR berjalan sepenuhnya di browser kamu.",
      },
      {
        q: "Bahasa apa yang didukung?",
        a: "Bahasa Indonesia dan Inggris. Teks campuran kedua bahasa umumnya tetap terbaca.",
      },
    ],
  },
  {
    slug: "hapus-background",
    kind: "removebg",
    nav: "Hapus Background",
    title: "Hapus Background Gambar",
    description:
      "Hapus latar belakang foto secara otomatis dan dapatkan PNG transparan. Diproses di browser, tanpa upload ke server.",
    body: [
      {
        h: "Untuk apa hapus background",
        p: [
          "Menghapus latar belakang berguna untuk foto produk toko online, pas foto, logo, atau gambar yang mau ditempel ke desain lain. Hasil PNG dengan latar transparan bisa langsung dipasang di atas warna atau gambar apa pun tanpa kotak putih yang mengganggu.",
          "Alat ini mengenali subjek utama di foto secara otomatis, lalu memotongnya dari latar belakang. Tidak perlu menyeleksi manual.",
        ],
      },
      {
        h: "Diproses di perangkat kamu",
        p: [
          "Berbeda dengan kebanyakan layanan hapus background yang mengunggah foto ke server mereka, alat ini menjalankan model AI langsung di browser. Gambar tidak pernah dikirim ke mana pun. Pemrosesan pertama agak lama karena model dimuat sekali di awal, lalu gambar berikutnya lebih cepat.",
        ],
      },
      {
        h: "Agar hasil rapi",
        p: [
          "Hasil terbaik didapat saat subjek terlihat jelas dan kontras dengan latar belakang, misalnya orang atau produk dengan tepi yang tegas. Rambut halus, benda transparan, atau latar yang warnanya mirip subjek bisa menyisakan tepi yang kurang rapi.",
        ],
      },
    ],
    steps: [
      "Pilih gambar dengan subjek yang jelas.",
      "Tunggu model memproses dan memotong latar belakang.",
      "Unduh hasilnya sebagai PNG transparan.",
    ],
    faq: [
      {
        q: "Apakah foto saya diunggah ke server?",
        a: "Tidak. Penghapusan background berjalan sepenuhnya di browser kamu memakai model AI yang dimuat ke perangkat. Foto tidak pernah dikirim atau disimpan di server.",
      },
      {
        q: "Kenapa proses pertama agak lama?",
        a: "Model AI dimuat sekali di awal (beberapa MB). Setelah itu, gambar berikutnya diproses lebih cepat.",
      },
      {
        q: "Format hasilnya apa?",
        a: "PNG dengan latar transparan, sehingga bisa ditempel di atas warna atau gambar lain tanpa kotak putih.",
      },
      {
        q: "Kenapa tepi hasilnya kurang rapi?",
        a: "Rambut halus, benda transparan, atau latar yang warnanya mirip subjek paling sulit dipisah. Foto dengan subjek yang kontras dan tepi tegas memberi hasil paling bersih.",
      },
    ],
  },
  {
    slug: "qr-code",
    kind: "qr",
    nav: "Buat QR Code",
    title: "Buat QR Code Online",
    description:
      "Buat QR code dari teks atau URL, lalu unduh sebagai PNG. Gratis dan langsung di browser.",
    body: [
      {
        h: "Kegunaan QR code",
        p: [
          "QR code memudahkan orang membuka tautan, menyimpan kontak, atau membaca pesan singkat hanya dengan memindai lewat kamera ponsel. Cocok untuk menu, kartu nama, poster, atau link pembayaran.",
        ],
      },
      {
        h: "QR statis yang dibuat di sini",
        p: [
          "QR yang dibuat di sini bersifat statis: isinya tertanam langsung di dalam pola, tidak kedaluwarsa, dan tidak melacak siapa pun. Karena statis, isi QR tidak bisa diubah setelah dibuat — buat ulang jika tujuannya berganti.",
        ],
      },
    ],
    steps: [
      "Ketik teks atau tempel URL.",
      "QR code terbentuk otomatis.",
      "Unduh sebagai PNG.",
    ],
    faq: [
      {
        q: "Apakah QR code ini kedaluwarsa?",
        a: "Tidak. QR code statis yang dibuat di sini tidak kedaluwarsa dan tidak melacak siapa pun.",
      },
      {
        q: "Apa yang bisa dimasukkan ke QR?",
        a: "Teks apa pun, termasuk URL, nomor telepon, atau pesan singkat.",
      },
    ],
  },
  {
    slug: "base64",
    kind: "base64",
    nav: "Base64",
    title: "Encode & Decode Base64",
    description:
      "Ubah teks menjadi base64 atau sebaliknya. Mendukung karakter non-Latin dengan aman, diproses di browser.",
    body: [
      {
        h: "Apa itu Base64",
        p: [
          "Base64 adalah cara mengkodekan data biner atau teks menjadi karakter ASCII yang aman ditempel di URL, email, atau berkas konfigurasi. Pengembang sering memakainya untuk menyisipkan data kecil langsung ke dalam kode.",
        ],
      },
      {
        h: "Bukan enkripsi",
        p: [
          "Base64 hanya pengkodean, bukan enkripsi. Siapa pun bisa mendekodenya kembali dengan mudah. Jangan pakai Base64 untuk menyembunyikan kata sandi atau data sensitif.",
        ],
      },
    ],
    steps: [
      "Tempel teks biasa atau string Base64.",
      "Pilih encode atau decode.",
      "Salin hasilnya.",
    ],
    faq: [
      {
        q: "Apa itu base64?",
        a: "Base64 adalah cara mengkodekan data menjadi teks ASCII, sering dipakai untuk menyisipkan data di URL, email, atau konfigurasi.",
      },
      {
        q: "Apakah base64 itu enkripsi?",
        a: "Bukan. Base64 hanya pengkodean, bukan enkripsi. Siapa pun bisa mendekodenya kembali.",
      },
    ],
  },
];

export function toolBySlug(slug: string): Tool | undefined {
  return TOOLS.find((t) => t.slug === slug);
}

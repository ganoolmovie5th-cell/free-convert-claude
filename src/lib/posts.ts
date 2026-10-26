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
  {
    slug: "memperkecil-ukuran-foto-untuk-lamaran-kerja",
    title: "Memperkecil Ukuran Foto untuk Lamaran Kerja Online",
    description:
      "Portal lowongan sering membatasi ukuran foto dan dokumen. Begini cara menyesuaikannya tanpa membuat foto pecah.",
    date: "2026-10-06",
    body: [
      {
        p: "Hampir semua portal lowongan dan sistem rekrutmen online menetapkan batas ukuran unggahan — biasanya antara 200 KB sampai 2 MB untuk foto, dan batas terpisah untuk CV atau ijazah. Foto dari kamera ponsel modern dengan mudah menembus angka itu, sehingga unggahan ditolak tepat saat kamu buru-buru melamar.",
      },
      { h: "Tentukan dulu batasnya" },
      {
        p: "Baca persyaratan unggahan sebelum menyesuaikan file. Catat dua hal: ukuran maksimum (misalnya 500 KB) dan dimensi yang diminta (misalnya 400x600 piksel untuk pas foto). Keduanya berbeda — ukuran file soal berat berkas, dimensi soal lebar dan tinggi.",
      },
      { h: "Kecilkan dimensi lebih dulu, baru kualitas" },
      {
        p: "Jika dimensi foto jauh lebih besar dari yang diminta, perkecil dimensinya dulu. Foto 4000 piksel yang dipakai sebagai pas foto 400 piksel hanya memboroskan ukuran. Setelah dimensi pas, turunkan kualitas lewat kompresi sampai ukuran file masuk batas.",
      },
      { h: "Pilih format yang sesuai" },
      {
        p: "Kebanyakan portal meminta JPG untuk foto. Pertahankan JPG dan hindari mengubahnya ke PNG, karena PNG justru memperbesar ukuran file foto. Kompres gambar dengan kualitas 70-80 biasanya sudah cukup kecil tanpa terlihat pecah.",
      },
      { h: "Periksa hasil sebelum unggah" },
      {
        p: "Buka hasilnya dan pastikan wajah masih jelas serta teks pada dokumen masih terbaca. Simpan juga versi asli beresolusi penuh — kamu mungkin membutuhkannya untuk cetak atau keperluan lain.",
      },
    ],
  },
  {
    slug: "apa-itu-webp-dan-kapan-memakainya",
    title: "Apa Itu WebP dan Kapan Sebaiknya Dipakai",
    description:
      "WebP sering muncul sebagai pilihan format gambar. Kenali kelebihannya dan kapan format ini tepat untuk website kamu.",
    date: "2026-10-08",
    body: [
      {
        p: "WebP adalah format gambar yang dikembangkan untuk web. Tujuannya sederhana: menghasilkan file lebih kecil daripada JPG dan PNG pada kualitas yang setara, sehingga halaman memuat lebih cepat dan hemat kuota.",
      },
      { h: "Kenapa ukurannya lebih kecil" },
      {
        p: "WebP memakai metode kompresi yang lebih efisien daripada JPG. Pada kualitas visual yang mirip, file WebP sering 25-35 persen lebih ringan. Untuk situs dengan banyak gambar, penghematan sebesar itu terasa nyata pada kecepatan muat dan skor performa.",
      },
      { h: "Mendukung transparansi" },
      {
        p: "Berbeda dari JPG, WebP bisa menyimpan area transparan seperti PNG. Jadi untuk logo atau ikon dengan latar transparan, WebP menggabungkan keunggulan PNG (transparansi) dengan ukuran yang jauh lebih kecil.",
      },
      { h: "Dukungan browser" },
      {
        p: "Semua browser utama versi terbaru — Chrome, Firefox, Safari, dan Edge — sudah mendukung WebP. Masalah kompatibilitas hanya muncul pada perangkat sangat lama. Untuk sebagian besar pengunjung web saat ini, WebP aman dipakai.",
      },
      { h: "Kapan tetap pakai JPG atau PNG" },
      {
        p: "Gunakan JPG jika file akan dibuka di aplikasi lama yang belum mengenal WebP, atau jika platform tujuan hanya menerima JPG. Gunakan PNG bila kamu butuh kualitas lossless mutlak untuk pengarsipan. Untuk kebutuhan web sehari-hari, WebP umumnya pilihan terbaik.",
      },
    ],
  },
  {
    slug: "cara-pisah-halaman-pdf",
    title: "Cara Mengambil Halaman Tertentu dari PDF",
    description:
      "Butuh satu bab atau beberapa halaman saja dari dokumen PDF yang panjang? Begini cara memisahnya dengan rapi.",
    date: "2026-10-10",
    body: [
      {
        p: "Dokumen PDF sering berisi puluhan halaman, padahal kamu hanya butuh beberapa di antaranya — misalnya lembar tanda tangan pada kontrak, satu bab dari buku, atau halaman tertentu dari laporan. Memisah PDF menghasilkan berkas baru yang ramping berisi hanya halaman yang kamu butuhkan.",
      },
      { h: "Menulis rentang halaman" },
      {
        p: "Gunakan tanda hubung untuk rentang berurutan dan koma untuk memisah bagian yang terpisah. Contoh: 1-3,5 berarti halaman 1, 2, 3, dan 5. Kamu bisa menggabung keduanya sesuka hati, seperti 2,4-6,9.",
      },
      { h: "File asli tidak berubah" },
      {
        p: "Pemisahan selalu membuat berkas baru. File PDF asli di perangkatmu tetap utuh, jadi kamu bisa mengulang dengan rentang berbeda tanpa khawatir kehilangan dokumen sumber.",
      },
      { h: "Tip: gabungkan dengan alat lain" },
      {
        p: "Setelah memisah, kamu bisa menggabungkan beberapa potongan dari dokumen berbeda menjadi satu PDF baru lewat alat Gabung PDF. Kombinasi pisah lalu gabung berguna untuk menyusun ulang dokumen sesuai kebutuhan.",
      },
    ],
  },
  {
    slug: "tips-foto-untuk-ocr-yang-akurat",
    title: "Tips Memotret Dokumen agar Hasil OCR Akurat",
    description:
      "OCR mengubah foto tulisan menjadi teks yang bisa disalin. Kualitas foto sangat menentukan keakuratannya.",
    date: "2026-10-13",
    body: [
      {
        p: "OCR mengenali huruf pada gambar dan mengubahnya menjadi teks. Teknologinya sudah matang, tetapi hasilnya sangat bergantung pada kualitas gambar sumber. Foto yang buruk membuat OCR salah membaca huruf, dan membetulkannya secara manual sering lebih lama daripada mengetik ulang.",
      },
      { h: "Cahaya merata" },
      {
        p: "Potret dokumen di tempat terang dengan cahaya yang merata. Hindari bayangan tangan atau ponsel yang jatuh ke atas kertas, dan jangan memakai flash langsung yang membuat pantulan menyilaukan. Cahaya dari samping atau cahaya ruangan yang lembut biasanya paling baik.",
      },
      { h: "Tegak lurus dan tidak miring" },
      {
        p: "Posisikan kamera sejajar dengan kertas, bukan menyudut. Teks yang miring atau terdistorsi perspektif menurunkan akurasi. Pastikan seluruh tepi dokumen masuk dalam bingkai dan garis teks tampak lurus.",
      },
      { h: "Fokus dan kontras" },
      {
        p: "Pastikan foto tajam, bukan buram. Ketuk layar pada area teks agar kamera mengunci fokus. Dokumen dengan tulisan hitam di atas kertas putih memberi kontras terbaik; tulisan tipis atau kertas berwarna lebih sulit dibaca mesin.",
      },
      { h: "Periksa hasilnya" },
      {
        p: "Setelah OCR selesai, baca cepat teksnya untuk menangkap kesalahan umum — angka 0 tertukar dengan huruf O, atau angka 1 dengan huruf l. Mengoreksi beberapa titik ini jauh lebih cepat daripada menulis ulang semuanya.",
      },
    ],
  },
  {
    slug: "kenapa-file-diproses-di-browser",
    title: "Kenapa Memproses File di Browser Lebih Aman",
    description:
      "Banyak alat konversi mengunggah file ke server. Memproses langsung di browser menawarkan privasi dan kecepatan yang berbeda.",
    date: "2026-10-16",
    body: [
      {
        p: "Saat kamu memakai alat konversi online biasa, file kamu dikirim ke server milik penyedia, diproses di sana, lalu hasilnya dikembalikan untuk diunduh. Cara ini bekerja, tetapi menimbulkan pertanyaan: ke mana file pergi, berapa lama disimpan, dan siapa yang bisa mengaksesnya.",
      },
      { h: "Apa artinya diproses di browser" },
      {
        p: "Pemrosesan di browser berarti seluruh konversi terjadi di dalam perangkatmu sendiri, memakai kemampuan yang sudah ada di browser modern. File tidak pernah meninggalkan komputermu. Begitu kamu menutup tab, file hilang dari memori — tidak ada salinan yang tertinggal di server mana pun.",
      },
      { h: "Keuntungan privasi" },
      {
        p: "Untuk dokumen sensitif seperti KTP, slip gaji, kontrak, atau data pelanggan, perbedaan ini penting. File yang tidak pernah diunggah tidak bisa bocor dari server, tidak tersimpan di log, dan tidak terpapar pihak ketiga.",
      },
      { h: "Keuntungan kecepatan" },
      {
        p: "Tanpa unggah dan unduh, tidak ada waktu tunggu transfer jaringan dan tidak ada antrean server. File besar yang akan lama diunggah bisa langsung diproses secara lokal. Satu-satunya batas adalah kemampuan perangkatmu.",
      },
      { h: "Keterbatasan yang jujur" },
      {
        p: "Pemrosesan di browser tidak cocok untuk semua hal. Konversi berat seperti dokumen Office ke PDF membutuhkan mesin yang hanya praktis dijalankan di server. Untuk tugas semacam itu, pendekatan server masih diperlukan. Tetapi untuk gambar, PDF, dan data umum, browser sudah lebih dari cukup.",
      },
    ],
  },
  {
    slug: "format-data-csv-excel-json",
    title: "CSV, Excel, atau JSON — Memahami Format Data",
    description:
      "Tiga format data yang sering saling dikonversi. Kenali perbedaan dan kapan masing-masing paling berguna.",
    date: "2026-10-20",
    body: [
      {
        p: "Saat bekerja dengan data tabel, kamu akan sering bertemu tiga format: CSV, Excel (XLSX), dan JSON. Ketiganya menyimpan informasi yang sama tetapi dengan cara dan tujuan berbeda. Memilih yang tepat menghemat waktu dan menghindari data yang rusak.",
      },
      { h: "CSV: sederhana dan universal" },
      {
        p: "CSV (Comma-Separated Values) adalah teks biasa dengan nilai dipisah koma. Ringan, mudah dibaca program apa pun, dan cocok untuk memindahkan data antar aplikasi. Kekurangannya: tidak menyimpan rumus, format sel, atau beberapa lembar sekaligus.",
      },
      { h: "Excel (XLSX): kaya fitur" },
      {
        p: "Format Excel menyimpan rumus, format warna, beberapa sheet, dan grafik. Cocok untuk pekerjaan analisis dan laporan yang butuh perhitungan. Sebagai gantinya, file lebih kompleks dan hanya nyaman dibuka di aplikasi spreadsheet.",
      },
      { h: "JSON: untuk aplikasi dan API" },
      {
        p: "JSON menyusun data sebagai pasangan nama dan nilai, mendukung struktur bertingkat. Ini bahasa standar untuk pertukaran data antar aplikasi dan API web. Pengembang memakainya saat data perlu diproses program, bukan dibaca manusia di spreadsheet.",
      },
      { h: "Memilih arah konversi" },
      {
        p: "Dari Excel ke CSV saat butuh file ringan yang diterima banyak sistem. Dari CSV atau Excel ke JSON saat data akan dipakai aplikasi atau API. Dari JSON ke Excel saat kamu ingin melihat dan mengolah data dalam tabel yang akrab.",
      },
    ],
  },
];

export function postBySlug(slug: string): Post | undefined {
  return POSTS.find((p) => p.slug === slug);
}

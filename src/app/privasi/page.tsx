import type { Metadata } from "next";
import PageShell from "@/components/PageShell";

export const metadata: Metadata = {
  title: "Kebijakan Privasi — Free Convert",
  description:
    "Kebijakan privasi Free Convert: file diproses di browser dan tidak diunggah ke server. Penjelasan soal iklan dan cookie pihak ketiga.",
};

export default function Privasi() {
  return (
    <PageShell title="Kebijakan Privasi">
      <p>
        Halaman ini menjelaskan bagaimana Free Convert menangani data kamu.
        Terakhir diperbarui: Oktober 2026.
      </p>

      <h2>File yang kamu konversi</h2>
      <p>
        Semua konversi dan kompresi dilakukan di dalam browser kamu. File tidak
        diunggah ke server kami dan tidak kami simpan. Saat kamu menutup atau
        memuat ulang halaman, file hilang dari memori browser.
      </p>

      <h2>Data yang kami kumpulkan</h2>
      <p>
        Kami tidak meminta pendaftaran dan tidak mengumpulkan data pribadi
        secara langsung. Kami menggunakan analitik anonim untuk mengetahui
        jumlah kunjungan dan fitur yang dipakai.
      </p>

      <h2>Iklan dan cookie pihak ketiga</h2>
      <p>
        Situs ini menampilkan iklan dari penyedia pihak ketiga, termasuk Google.
        Penyedia iklan dapat menggunakan cookie untuk menayangkan iklan yang
        relevan berdasarkan kunjungan kamu ke situs ini dan situs lain.
      </p>
      <p>
        Kamu dapat mengatur atau menonaktifkan iklan yang dipersonalisasi melalui{" "}
        <a
          href="https://www.google.com/settings/ads"
          target="_blank"
          rel="noopener noreferrer"
        >
          Setelan Iklan Google
        </a>
        , atau mengelola cookie lewat pengaturan browser kamu.
      </p>

      <h2>Perubahan kebijakan</h2>
      <p>
        Kebijakan ini dapat diperbarui sewaktu-waktu. Perubahan akan ditampilkan
        di halaman ini.
      </p>

      <h2>Kontak</h2>
      <p>
        Pertanyaan soal privasi bisa dikirim ke halaman{" "}
        <a href="/kontak">Kontak</a>.
      </p>
    </PageShell>
  );
}

import type { Metadata } from "next";
import PageShell from "@/components/PageShell";

export const metadata: Metadata = {
  title: "Tentang — Free Convert",
  description:
    "Free Convert adalah alat konversi dan kompres file gratis yang berjalan di browser, tanpa mengunggah file ke server.",
};

export default function Tentang() {
  return (
    <PageShell title="Tentang Free Convert">
      <p>
        Free Convert adalah alat gratis untuk mengonversi dan mengompres file
        langsung di browser. Semua pemrosesan terjadi di perangkat kamu — file
        tidak dikirim ke server mana pun.
      </p>

      <h2>Apa yang bisa dilakukan</h2>
      <ul>
        <li>Konversi gambar antar format: JPG, PNG, dan WebP.</li>
        <li>Ubah ukuran (resize) dan atur kualitas gambar.</li>
        <li>Konversi data: CSV, Excel (XLSX), dan JSON.</li>
        <li>Gabungkan beberapa gambar menjadi satu file PDF.</li>
        <li>Perkecil ukuran file PDF.</li>
      </ul>

      <h2>Kenapa diproses di browser</h2>
      <p>
        Dengan memproses file di browser, konversi berjalan cepat dan file kamu
        tetap privat. Tidak ada unggahan, tidak perlu menunggu antrean server,
        dan tidak ada file yang tersimpan di tempat lain.
      </p>

      <h2>Pendanaan</h2>
      <p>
        Layanan ini gratis dan didanai oleh iklan. Tidak ada langganan dan tidak
        ada batas jumlah file.
      </p>
    </PageShell>
  );
}

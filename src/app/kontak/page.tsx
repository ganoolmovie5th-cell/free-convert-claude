import type { Metadata } from "next";
import PageShell from "@/components/PageShell";

export const metadata: Metadata = {
  title: "Kontak — Free Convert",
  description:
    "Hubungi Free Convert untuk pertanyaan, masukan, atau laporan masalah.",
};

export default function Kontak() {
  return (
    <PageShell title="Kontak">
      <p>
        Ada pertanyaan, masukan, atau menemukan masalah? Kami senang mendengar
        dari kamu.
      </p>

      <h2>Email</h2>
      <p>
        <a href="mailto:halo@free-convert.web.id">halo@free-convert.web.id</a>
      </p>

      <h2>Masukan</h2>
      <p>
        Punya ide format baru yang ingin didukung? Kirimkan lewat email di atas.
        Masukan kamu membantu menentukan fitur berikutnya.
      </p>
    </PageShell>
  );
}

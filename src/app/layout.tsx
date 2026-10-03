import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const SITE = "https://www.free-convert.web.id";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: "Free Convert — Konversi & Kompres File Online Gratis",
  description:
    "Konversi dan kompres file langsung di browser. Gambar (JPG/PNG/WebP), CSV ↔ Excel, gambar ke PDF. Cepat, privat, tanpa upload ke server.",
  keywords: [
    "konversi file",
    "convert file online",
    "kompres gambar",
    "csv ke excel",
    "jpg ke png",
    "gambar ke pdf",
    "gratis",
  ],
  openGraph: {
    title: "Free Convert — Konversi File Online Gratis",
    description:
      "Konversi & kompres file di browser. Privat, tanpa upload ke server.",
    url: SITE,
    siteName: "Free Convert",
    locale: "id_ID",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}

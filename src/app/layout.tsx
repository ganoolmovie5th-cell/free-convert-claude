import type { Metadata } from "next";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const SITE = "https://www.free-convert.web.id";
const GTM_ID = "GTM-PSZ6VX6D";
const ADSENSE_CLIENT = "ca-pub-7759392165776614";

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
  twitter: {
    card: "summary_large_image",
    title: "Free Convert — Konversi File Online Gratis",
    description:
      "Konversi & kompres file di browser. Privat, tanpa upload ke server.",
  },
  robots: { index: true, follow: true },
  verification: {
    google: "RHeBEPTWydGz-72sjuYNjHJqvph_RD3iw9mTjfF3ynA",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <head>
        <Script id="gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`}
        </Script>
        <Script
          id="adsbygoogle"
          strategy="afterInteractive"
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
          crossOrigin="anonymous"
        />
      </head>
      <body className="font-sans antialiased">
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            title="gtm"
          />
        </noscript>
        {children}
        <Analytics />
      </body>
    </html>
  );
}

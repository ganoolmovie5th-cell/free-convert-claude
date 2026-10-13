import { ImageResponse } from "next/og";

export const alt = "Free Convert — Konversi & kompres file online gratis";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #eef4ff 0%, #ffffff 60%)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <svg width="72" height="72" viewBox="0 0 64 64">
            <rect width="64" height="64" rx="16" fill="#2563eb" />
            <path d="M23 15h12l8 8v23a2 2 0 0 1-2 2H23a2 2 0 0 1-2-2V17a2 2 0 0 1 2-2z" fill="#ffffff" />
            <path d="M35 15v8h8" fill="none" stroke="#2563eb" strokeWidth="2.5" strokeLinejoin="round" />
            <path d="M27 33h10l-2.5-2.5" fill="none" stroke="#2563eb" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M37 41H27l2.5 2.5" fill="none" stroke="#2563eb" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <div style={{ fontSize: 34, fontWeight: 700, color: "#0b1020" }}>
            Free Convert
          </div>
        </div>
        <div
          style={{
            marginTop: 40,
            fontSize: 64,
            fontWeight: 800,
            color: "#0b1020",
            lineHeight: 1.1,
          }}
        >
          Konversi & kompres file,
        </div>
        <div
          style={{ fontSize: 64, fontWeight: 800, color: "#2563eb", lineHeight: 1.1 }}
        >
          langsung di browser.
        </div>
        <div style={{ marginTop: 32, fontSize: 30, color: "#5a647a" }}>
          Gambar · PDF · Excel · CSV — gratis, tanpa upload.
        </div>
      </div>
    ),
    size,
  );
}

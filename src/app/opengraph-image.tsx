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
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 18,
              background: "#3b6cff",
              color: "#fff",
              fontSize: 36,
              fontWeight: 800,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            FC
          </div>
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
          style={{ fontSize: 64, fontWeight: 800, color: "#3b6cff", lineHeight: 1.1 }}
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

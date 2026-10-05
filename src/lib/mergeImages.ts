import { ConvertResult } from "./types";

export type MergeLayout = "vertical" | "horizontal";

// Merge images into one by stacking them. Vertical = normalized to the widest
// image's width; horizontal = normalized to the tallest image's height.
export async function mergeImages(
  files: File[],
  layout: MergeLayout = "vertical",
  quality = 0.9,
): Promise<ConvertResult> {
  if (files.length < 2) throw new Error("Pilih minimal 2 gambar.");

  const bitmaps = await Promise.all(files.map((f) => createImageBitmap(f)));

  let canvasW: number;
  let canvasH: number;
  const placed: { bmp: ImageBitmap; x: number; y: number; w: number; h: number }[] =
    [];

  if (layout === "vertical") {
    canvasW = Math.max(...bitmaps.map((b) => b.width));
    let y = 0;
    for (const b of bitmaps) {
      const scale = canvasW / b.width;
      const w = canvasW;
      const h = Math.round(b.height * scale);
      placed.push({ bmp: b, x: 0, y, w, h });
      y += h;
    }
    canvasH = y;
  } else {
    canvasH = Math.max(...bitmaps.map((b) => b.height));
    let x = 0;
    for (const b of bitmaps) {
      const scale = canvasH / b.height;
      const h = canvasH;
      const w = Math.round(b.width * scale);
      placed.push({ bmp: b, x, y: 0, w, h });
      x += w;
    }
    canvasW = x;
  }

  const canvas = document.createElement("canvas");
  canvas.width = canvasW;
  canvas.height = canvasH;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas tidak tersedia di browser ini.");
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, canvasW, canvasH);

  for (const p of placed) {
    ctx.drawImage(p.bmp, p.x, p.y, p.w, p.h);
    p.bmp.close();
  }

  const blob = await new Promise<Blob | null>((resolve) =>
    canvas.toBlob(resolve, "image/jpeg", quality),
  );
  if (!blob) throw new Error("Gagal menggabungkan gambar.");

  return { blob, filename: "gabungan.jpg" };
}

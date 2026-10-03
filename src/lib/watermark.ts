import { baseName, ConvertResult } from "./types";

export interface WatermarkOptions {
  text: string;
  quality?: number;
}

// Draw repeated diagonal watermark text across the image, then export JPG.
export async function watermarkImage(
  file: File,
  opts: WatermarkOptions,
): Promise<ConvertResult> {
  const text = opts.text.trim();
  if (!text) throw new Error("Isi teks watermark dulu.");

  const bitmap = await createImageBitmap(file);
  const canvas = document.createElement("canvas");
  canvas.width = bitmap.width;
  canvas.height = bitmap.height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas tidak tersedia di browser ini.");

  ctx.drawImage(bitmap, 0, 0);
  bitmap.close();

  // Font size scales with image so it reads on both small and large images.
  const fontSize = Math.max(16, Math.round(canvas.width / 22));
  ctx.font = `bold ${fontSize}px Inter, system-ui, sans-serif`;
  ctx.fillStyle = "rgba(255,255,255,0.5)";
  ctx.strokeStyle = "rgba(0,0,0,0.25)";
  ctx.lineWidth = Math.max(1, fontSize / 20);
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  const step = fontSize * 8;
  ctx.save();
  ctx.rotate((-25 * Math.PI) / 180);
  // Over-cover the rotated plane so corners are filled.
  for (let y = -canvas.height; y < canvas.height * 2; y += step) {
    for (let x = -canvas.width; x < canvas.width * 2; x += step * 2) {
      ctx.strokeText(text, x, y);
      ctx.fillText(text, x, y);
    }
  }
  ctx.restore();

  const blob = await new Promise<Blob | null>((resolve) =>
    canvas.toBlob(resolve, "image/jpeg", opts.quality ?? 0.9),
  );
  if (!blob) throw new Error("Gagal menambahkan watermark.");

  return { blob, filename: `${baseName(file.name)}-watermark.jpg` };
}

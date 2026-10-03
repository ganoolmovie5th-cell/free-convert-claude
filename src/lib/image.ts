import { baseName, ConvertResult, TargetFormat } from "./types";

const MIME: Record<string, string> = {
  jpeg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
};

const EXT: Record<string, string> = {
  jpeg: "jpg",
  png: "png",
  webp: "webp",
};

async function loadBitmap(file: File): Promise<ImageBitmap> {
  // createImageBitmap decodes off the main thread; widely supported.
  return await createImageBitmap(file);
}

export interface ImageOptions {
  quality?: number;
  // Downscale so width does not exceed maxWidth (keeps aspect ratio).
  // 0 or undefined = keep original size.
  maxWidth?: number;
}

export async function convertImage(
  file: File,
  target: TargetFormat,
  opts: ImageOptions = {},
): Promise<ConvertResult> {
  const { quality = 0.85, maxWidth = 0 } = opts;
  const mime = MIME[target];
  if (!mime) throw new Error("Format gambar tidak didukung: " + target);

  const bitmap = await loadBitmap(file);

  let w = bitmap.width;
  let h = bitmap.height;
  if (maxWidth > 0 && w > maxWidth) {
    h = Math.round((h * maxWidth) / w);
    w = maxWidth;
  }

  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas tidak tersedia di browser ini.");

  // White background for JPEG (no alpha channel).
  if (target === "jpeg") {
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
  ctx.drawImage(bitmap, 0, 0, w, h);
  bitmap.close();

  const blob = await new Promise<Blob | null>((resolve) =>
    canvas.toBlob(resolve, mime, quality),
  );
  if (!blob) throw new Error("Gagal mengonversi gambar.");

  return { blob, filename: `${baseName(file.name)}.${EXT[target]}` };
}

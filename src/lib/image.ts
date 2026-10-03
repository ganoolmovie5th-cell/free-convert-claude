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

export async function convertImage(
  file: File,
  target: TargetFormat,
  quality = 0.85,
): Promise<ConvertResult> {
  const mime = MIME[target];
  if (!mime) throw new Error("Format gambar tidak didukung: " + target);

  const bitmap = await loadBitmap(file);
  const canvas = document.createElement("canvas");
  canvas.width = bitmap.width;
  canvas.height = bitmap.height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas tidak tersedia di browser ini.");

  // White background for JPEG (no alpha channel).
  if (target === "jpeg") {
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
  ctx.drawImage(bitmap, 0, 0);
  bitmap.close();

  const blob = await new Promise<Blob | null>((resolve) =>
    canvas.toBlob(resolve, mime, quality),
  );
  if (!blob) throw new Error("Gagal mengonversi gambar.");

  return { blob, filename: `${baseName(file.name)}.${EXT[target]}` };
}

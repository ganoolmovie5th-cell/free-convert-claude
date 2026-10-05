import { baseName, ConvertResult } from "./types";

// Crop an image to a target aspect ratio, centered. ratio = width/height.
// ratio <= 0 means keep the original (no crop).
export async function cropImage(
  file: File,
  ratio: number,
  quality = 0.9,
): Promise<ConvertResult> {
  const bitmap = await createImageBitmap(file);
  const iw = bitmap.width;
  const ih = bitmap.height;

  let sw = iw;
  let sh = ih;
  if (ratio > 0) {
    if (iw / ih > ratio) {
      // Image wider than target: trim the sides.
      sw = Math.round(ih * ratio);
      sh = ih;
    } else {
      // Image taller than target: trim top/bottom.
      sw = iw;
      sh = Math.round(iw / ratio);
    }
  }
  const sx = Math.round((iw - sw) / 2);
  const sy = Math.round((ih - sh) / 2);

  const canvas = document.createElement("canvas");
  canvas.width = sw;
  canvas.height = sh;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas tidak tersedia di browser ini.");

  ctx.drawImage(bitmap, sx, sy, sw, sh, 0, 0, sw, sh);
  bitmap.close();

  const blob = await new Promise<Blob | null>((resolve) =>
    canvas.toBlob(resolve, "image/jpeg", quality),
  );
  if (!blob) throw new Error("Gagal memotong gambar.");

  return { blob, filename: `${baseName(file.name)}-crop.jpg` };
}

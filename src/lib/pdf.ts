import { jsPDF } from "jspdf";
import { ConvertResult } from "./types";

async function toDataURL(file: File): Promise<{
  url: string;
  width: number;
  height: number;
}> {
  const url = await new Promise<string>((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(r.result as string);
    r.onerror = () => reject(new Error("Gagal membaca " + file.name));
    r.readAsDataURL(file);
  });
  const dim = await new Promise<{ width: number; height: number }>(
    (resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve({ width: img.width, height: img.height });
      img.onerror = () => reject(new Error("Gagal memuat " + file.name));
      img.src = url;
    },
  );
  return { url, ...dim };
}

// Merge multiple images into a single PDF, one image per page.
export async function imagesToPdf(files: File[]): Promise<ConvertResult> {
  if (files.length === 0) throw new Error("Tidak ada gambar.");

  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();
  const margin = 24;

  for (let i = 0; i < files.length; i++) {
    const { url, width, height } = await toDataURL(files[i]);
    const maxW = pageW - margin * 2;
    const maxH = pageH - margin * 2;
    const scale = Math.min(maxW / width, maxH / height);
    const w = width * scale;
    const h = height * scale;
    const x = (pageW - w) / 2;
    const y = (pageH - h) / 2;

    if (i > 0) doc.addPage();
    const fmt = url.includes("image/png") ? "PNG" : "JPEG";
    doc.addImage(url, fmt, x, y, w, h);
  }

  const blob = doc.output("blob");
  return { blob, filename: "gabungan.pdf" };
}

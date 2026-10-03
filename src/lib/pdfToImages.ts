import { baseName, ConvertResult } from "./types";

// Render each PDF page to a JPG image. Returns one result per page.
const RENDER_SCALE = 2; // higher = sharper output image

export async function pdfToImages(
  file: File,
  quality = 0.9,
): Promise<ConvertResult[]> {
  const pdfjs = await import("pdfjs-dist");
  pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.mjs`;

  const data = await file.arrayBuffer();
  const doc = await pdfjs.getDocument({ data }).promise;
  const name = baseName(file.name);
  const out: ConvertResult[] = [];

  for (let n = 1; n <= doc.numPages; n++) {
    const page = await doc.getPage(n);
    const viewport = page.getViewport({ scale: RENDER_SCALE });

    const canvas = document.createElement("canvas");
    canvas.width = Math.ceil(viewport.width);
    canvas.height = Math.ceil(viewport.height);
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas tidak tersedia di browser ini.");

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    await page.render({ canvasContext: ctx, viewport }).promise;

    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, "image/jpeg", quality),
    );
    if (!blob) throw new Error("Gagal membuat gambar dari halaman " + n);

    const num = String(n).padStart(2, "0");
    out.push({ blob, filename: `${name}-hal${num}.jpg` });
  }

  return out;
}

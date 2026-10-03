import { jsPDF } from "jspdf";
import { baseName, ConvertResult } from "./types";

// pdfjs-dist is dynamically imported (client-only) to keep it out of SSR.
// Rendering each page to a JPEG and rebuilding the PDF shrinks file size.
// Trade-off: text becomes an image (no longer selectable/searchable).

// Lower scale = smaller output. 1.5 keeps readable detail at reduced size.
const RENDER_SCALE = 1.5;

export interface PdfCompressOptions {
  // JPEG quality 0..1. Lower = smaller file. Default medium.
  quality?: number;
}

export async function compressPdf(
  file: File,
  opts: PdfCompressOptions = {},
): Promise<ConvertResult> {
  const { quality = 0.6 } = opts;

  const pdfjs = await import("pdfjs-dist");
  // Match worker to the installed version via CDN (no bundler worker config).
  pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.mjs`;

  const data = await file.arrayBuffer();
  const doc = await pdfjs.getDocument({ data }).promise;

  let out: jsPDF | null = null;

  for (let n = 1; n <= doc.numPages; n++) {
    const page = await doc.getPage(n);
    const viewport = page.getViewport({ scale: RENDER_SCALE });

    const canvas = document.createElement("canvas");
    canvas.width = Math.ceil(viewport.width);
    canvas.height = Math.ceil(viewport.height);
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas tidak tersedia di browser ini.");

    // White background so transparent areas render as white in JPEG.
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    await page.render({ canvasContext: ctx, viewport }).promise;

    const jpeg = canvas.toDataURL("image/jpeg", quality);

    // Page size in points based on the rendered pixels at 72 dpi equivalent.
    const ptW = viewport.width / RENDER_SCALE;
    const ptH = viewport.height / RENDER_SCALE;

    if (!out) {
      out = new jsPDF({
        unit: "pt",
        format: [ptW, ptH],
        orientation: ptW > ptH ? "landscape" : "portrait",
      });
    } else {
      out.addPage([ptW, ptH], ptW > ptH ? "landscape" : "portrait");
    }
    out.addImage(jpeg, "JPEG", 0, 0, ptW, ptH);
  }

  if (!out) throw new Error("PDF kosong atau gagal dibaca.");

  const blob = out.output("blob");
  return { blob, filename: `${baseName(file.name)}-kompres.pdf` };
}

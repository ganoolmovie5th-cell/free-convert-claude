import { PDFDocument } from "pdf-lib";
import { baseName, ConvertResult } from "./types";

// pdf-lib returns Uint8Array<ArrayBufferLike>; copy into a fresh ArrayBuffer
// so it satisfies the strict BlobPart type.
function toPdfBlob(bytes: Uint8Array): Blob {
  const copy = new Uint8Array(bytes);
  return new Blob([copy.buffer], { type: "application/pdf" });
}

// Merge multiple PDFs into one, preserving original content (not re-rendered).
export async function mergePdf(files: File[]): Promise<ConvertResult> {
  if (files.length < 2) throw new Error("Pilih minimal 2 PDF untuk digabung.");

  const out = await PDFDocument.create();
  for (const f of files) {
    const src = await PDFDocument.load(await f.arrayBuffer());
    const pages = await out.copyPages(src, src.getPageIndices());
    pages.forEach((p) => out.addPage(p));
  }

  const bytes = await out.save();
  return { blob: toPdfBlob(bytes), filename: "gabungan.pdf" };
}

// Parse "1-3,5,8" into zero-based page indices, bounded by pageCount.
export function parseRanges(input: string, pageCount: number): number[] {
  const result = new Set<number>();
  for (const part of input.split(",")) {
    const token = part.trim();
    if (!token) continue;
    const dash = token.split("-");
    if (dash.length === 2) {
      const a = parseInt(dash[0], 10);
      const b = parseInt(dash[1], 10);
      if (Number.isNaN(a) || Number.isNaN(b)) continue;
      for (let i = a; i <= b; i++) {
        if (i >= 1 && i <= pageCount) result.add(i - 1);
      }
    } else {
      const n = parseInt(token, 10);
      if (!Number.isNaN(n) && n >= 1 && n <= pageCount) result.add(n - 1);
    }
  }
  return [...result].sort((a, b) => a - b);
}

// Extract selected pages into a new PDF. Empty range = keep all pages.
export async function splitPdf(
  file: File,
  range: string,
): Promise<ConvertResult> {
  const src = await PDFDocument.load(await file.arrayBuffer());
  const total = src.getPageCount();

  const indices = range.trim()
    ? parseRanges(range, total)
    : src.getPageIndices();
  if (indices.length === 0)
    throw new Error("Rentang halaman tidak valid untuk PDF ini.");

  const out = await PDFDocument.create();
  const pages = await out.copyPages(src, indices);
  pages.forEach((p) => out.addPage(p));

  const bytes = await out.save();
  return {
    blob: toPdfBlob(bytes),
    filename: `${baseName(file.name)}-halaman.pdf`,
  };
}

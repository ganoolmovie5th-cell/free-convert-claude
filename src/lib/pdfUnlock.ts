import { PDFDocument } from "pdf-lib";
import { baseName, ConvertResult } from "./types";

// Remove usage restrictions (owner password: no-copy, no-print, no-edit) by
// loading with ignoreEncryption and saving a fresh unencrypted copy.
//
// This does NOT crack an open password (one needed to view the file). pdf-lib
// cannot decrypt that — the UI states this clearly.
export async function unlockPdf(file: File): Promise<ConvertResult> {
  let src: PDFDocument;
  try {
    src = await PDFDocument.load(await file.arrayBuffer(), {
      ignoreEncryption: true,
    });
  } catch {
    throw new Error(
      "PDF ini terkunci dengan password buka. Alat ini hanya bisa menghapus pembatasan (copy/print), bukan password buka.",
    );
  }

  // Copy into a new, unencrypted document.
  const out = await PDFDocument.create();
  const pages = await out.copyPages(src, src.getPageIndices());
  pages.forEach((p) => out.addPage(p));

  const bytes = await out.save();
  const copy = new Uint8Array(bytes);
  return {
    blob: new Blob([copy.buffer as ArrayBuffer], { type: "application/pdf" }),
    filename: `${baseName(file.name)}-tanpa-proteksi.pdf`,
  };
}

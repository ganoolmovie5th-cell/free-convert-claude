import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { baseName, ConvertResult } from "./types";

export type TextPosition = "top" | "center" | "bottom";

export interface PdfTextOptions {
  text: string;
  position?: TextPosition;
  // Apply to every page, or only the first.
  allPages?: boolean;
}

// Stamp a line of text onto a PDF at a preset position. This is a simple
// stamp, not a full drag-to-place editor.
export async function addTextToPdf(
  file: File,
  opts: PdfTextOptions,
): Promise<ConvertResult> {
  const text = opts.text.trim();
  if (!text) throw new Error("Isi teks dulu.");

  const doc = await PDFDocument.load(await file.arrayBuffer(), {
    ignoreEncryption: true,
  });
  const font = await doc.embedFont(StandardFonts.Helvetica);
  const size = 18;
  const pages = opts.allPages ? doc.getPages() : [doc.getPages()[0]];

  for (const page of pages) {
    const { width, height } = page.getSize();
    const textWidth = font.widthOfTextAtSize(text, size);
    const x = (width - textWidth) / 2;
    const margin = 36;
    const y =
      opts.position === "top"
        ? height - margin - size
        : opts.position === "bottom"
          ? margin
          : height / 2;

    page.drawText(text, { x, y, size, font, color: rgb(0.1, 0.1, 0.1) });
  }

  const bytes = await doc.save();
  const copy = new Uint8Array(bytes);
  return {
    blob: new Blob([copy.buffer as ArrayBuffer], { type: "application/pdf" }),
    filename: `${baseName(file.name)}-teks.pdf`,
  };
}

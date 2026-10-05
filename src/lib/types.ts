export type ConvertKind =
  | "image"
  | "data"
  | "pdf"
  | "pdfcompress"
  | "pdf2img"
  | "pdfmerge"
  | "pdfsplit"
  | "watermark"
  | "pdfunlock"
  | "crop"
  | "imgmerge"
  | "pdf2png"
  | "pdftext"
  | "ocr"
  | "qr"
  | "base64";

export type TargetFormat =
  | "jpeg"
  | "png"
  | "webp"
  | "xlsx"
  | "csv"
  | "json"
  | "pdf";

export interface ConvertResult {
  blob: Blob;
  filename: string;
}

export const ACCEPT_BY_KIND: Record<ConvertKind, string> = {
  image: "image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp",
  data: ".csv,.xlsx,.xls,text/csv",
  pdf: "image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp",
  pdfcompress: "application/pdf,.pdf",
  pdf2img: "application/pdf,.pdf",
  pdfmerge: "application/pdf,.pdf",
  pdfsplit: "application/pdf,.pdf",
  watermark: "image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp",
  pdfunlock: "application/pdf,.pdf",
  crop: "image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp",
  imgmerge: "image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp",
  pdf2png: "application/pdf,.pdf",
  pdftext: "application/pdf,.pdf",
  ocr: "image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp",
  qr: "",
  base64: "",
};

export const TARGETS_BY_KIND: Record<
  ConvertKind,
  { value: TargetFormat; label: string }[]
> = {
  image: [
    { value: "jpeg", label: "JPG" },
    { value: "png", label: "PNG" },
    { value: "webp", label: "WebP" },
  ],
  data: [
    { value: "xlsx", label: "Excel (XLSX)" },
    { value: "csv", label: "CSV" },
    { value: "json", label: "JSON" },
  ],
  pdf: [{ value: "pdf", label: "PDF (gabung)" }],
  pdfcompress: [{ value: "pdf", label: "PDF (kompres)" }],
  pdf2img: [{ value: "jpeg", label: "JPG" }],
  pdfmerge: [{ value: "pdf", label: "PDF" }],
  pdfsplit: [{ value: "pdf", label: "PDF" }],
  watermark: [{ value: "jpeg", label: "JPG" }],
  pdfunlock: [{ value: "pdf", label: "PDF" }],
  crop: [{ value: "jpeg", label: "JPG" }],
  imgmerge: [{ value: "jpeg", label: "JPG" }],
  pdf2png: [{ value: "png", label: "PNG" }],
  pdftext: [{ value: "pdf", label: "PDF" }],
  ocr: [{ value: "json", label: "Teks" }],
  qr: [{ value: "png", label: "PNG" }],
  base64: [{ value: "json", label: "Teks" }],
};

export function baseName(name: string): string {
  const i = name.lastIndexOf(".");
  return i === -1 ? name : name.slice(0, i);
}

// Match a file against the kind's accept list (MIME types + extensions).
export function fileMatchesKind(file: File, kind: ConvertKind): boolean {
  const accept = ACCEPT_BY_KIND[kind]
    .split(",")
    .map((s) => s.trim().toLowerCase());
  const name = file.name.toLowerCase();
  const type = file.type.toLowerCase();
  return accept.some((a) =>
    a.startsWith(".") ? name.endsWith(a) : type === a,
  );
}

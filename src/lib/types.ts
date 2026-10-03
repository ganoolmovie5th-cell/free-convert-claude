export type ConvertKind =
  | "image"
  | "data"
  | "pdf"
  | "pdfcompress"
  | "pdf2img"
  | "pdfmerge"
  | "pdfsplit";

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
  image: "image/jpeg,image/png,image/webp",
  data: ".csv,.xlsx,.xls,text/csv",
  pdf: "image/jpeg,image/png,image/webp",
  pdfcompress: "application/pdf,.pdf",
  pdf2img: "application/pdf,.pdf",
  pdfmerge: "application/pdf,.pdf",
  pdfsplit: "application/pdf,.pdf",
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
};

export function baseName(name: string): string {
  const i = name.lastIndexOf(".");
  return i === -1 ? name : name.slice(0, i);
}

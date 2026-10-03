export type ConvertKind = "image" | "data" | "pdf" | "pdfcompress";

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
};

export function baseName(name: string): string {
  const i = name.lastIndexOf(".");
  return i === -1 ? name : name.slice(0, i);
}

import { zipSync } from "fflate";
import { ConvertResult } from "./types";

export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

// One file downloads directly; multiple files are packed into a single ZIP.
export async function downloadAll(results: ConvertResult[]) {
  if (results.length === 0) return;
  if (results.length === 1) {
    downloadBlob(results[0].blob, results[0].filename);
    return;
  }

  const entries: Record<string, Uint8Array> = {};
  for (const r of results) {
    const buf = new Uint8Array(await r.blob.arrayBuffer());
    // Avoid overwriting duplicate names.
    let name = r.filename;
    let n = 1;
    while (entries[name]) {
      const dot = r.filename.lastIndexOf(".");
      name =
        dot === -1
          ? `${r.filename}-${n}`
          : `${r.filename.slice(0, dot)}-${n}${r.filename.slice(dot)}`;
      n++;
    }
    entries[name] = buf;
  }

  const zipped = zipSync(entries);
  downloadBlob(
    new Blob([zipped.buffer as ArrayBuffer], { type: "application/zip" }),
    "free-convert.zip",
  );
}

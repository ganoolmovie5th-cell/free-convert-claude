import { ConvertResult } from "./types";

export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  // Revoke after a tick so the download can start.
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function downloadAll(results: ConvertResult[]) {
  // No zip dependency: trigger sequential downloads. Lazy but works.
  results.forEach((r, i) =>
    setTimeout(() => downloadBlob(r.blob, r.filename), i * 300),
  );
}

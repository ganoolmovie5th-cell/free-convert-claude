// Background removal via @imgly/background-removal. Runs fully in the browser
// using a WASM/ONNX model; nothing is uploaded. The library + model are large
// (several MB, fetched on first run), so it is dynamically imported only when
// this tool runs — same pattern as ocr.ts.

export async function removeImageBackground(
  file: File,
  onProgress?: (pct: number) => void,
): Promise<Blob> {
  const { removeBackground } = await import("@imgly/background-removal");

  return removeBackground(file, {
    output: { format: "image/png" },
    progress: (_key: string, current: number, total: number) => {
      if (onProgress && total > 0) {
        onProgress(Math.round((current / total) * 100));
      }
    },
  });
}

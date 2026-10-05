// OCR via tesseract.js. The library is heavy (several MB + language data
// loaded from CDN), so it is dynamically imported only when OCR runs.

export async function imageToText(
  file: File,
  onProgress?: (pct: number) => void,
): Promise<string> {
  const { default: Tesseract } = await import("tesseract.js");

  const { data } = await Tesseract.recognize(file, "ind+eng", {
    logger: (m: { status: string; progress: number }) => {
      if (m.status === "recognizing text" && onProgress) {
        onProgress(Math.round(m.progress * 100));
      }
    },
  });

  return data.text.trim();
}

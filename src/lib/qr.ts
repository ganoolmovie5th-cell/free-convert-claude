import QRCode from "qrcode";

// Generate a QR code PNG data URL from text/URL.
export async function qrToDataUrl(text: string): Promise<string> {
  const value = text.trim();
  if (!value) throw new Error("Isi teks atau URL dulu.");
  return QRCode.toDataURL(value, {
    width: 512,
    margin: 2,
    errorCorrectionLevel: "M",
  });
}

export function dataUrlToBlob(dataUrl: string): Blob {
  const [head, b64] = dataUrl.split(",");
  const mime = head.match(/:(.*?);/)?.[1] ?? "image/png";
  const bin = atob(b64);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return new Blob([bytes], { type: mime });
}

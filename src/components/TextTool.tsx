"use client";

import { useState } from "react";
import { qrToDataUrl, dataUrlToBlob } from "@/lib/qr";
import { encodeBase64, decodeBase64 } from "@/lib/base64";
import { downloadBlob } from "@/lib/download";

type Mode = "qr" | "base64";

export default function TextTool({ mode }: { mode: Mode }) {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [qrUrl, setQrUrl] = useState<string | null>(null);
  const [dir, setDir] = useState<"encode" | "decode">("encode");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  async function runQr() {
    setError(null);
    setQrUrl(null);
    try {
      setQrUrl(await qrToDataUrl(input));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Gagal membuat QR.");
    }
  }

  function runBase64() {
    setError(null);
    try {
      setOutput(dir === "encode" ? encodeBase64(input) : decodeBase64(input));
    } catch {
      setError("Teks base64 tidak valid.");
    }
  }

  async function copyOut() {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="rounded-2xl border border-black/5 bg-white/80 p-5 shadow-xl shadow-brand-500/5 backdrop-blur sm:p-7 dark:border-white/10 dark:bg-slate-800/70">
      {mode === "base64" && (
        <div className="mb-4 flex gap-2">
          {(["encode", "decode"] as const).map((d) => (
            <button
              key={d}
              onClick={() => setDir(d)}
              className={`rounded-lg border px-4 py-2 text-sm font-medium transition ${
                dir === d
                  ? "border-brand-500 bg-brand-500 text-white"
                  : "border-black/10 bg-white text-ink-700 hover:border-brand-300 dark:border-white/10 dark:bg-slate-700 dark:text-slate-200"
              }`}
            >
              {d === "encode" ? "Encode" : "Decode"}
            </button>
          ))}
        </div>
      )}

      <label className="text-sm font-medium text-ink-700 dark:text-slate-300">
        {mode === "qr" ? "Teks atau URL" : "Teks"}
      </label>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        rows={5}
        placeholder={mode === "qr" ? "https://contoh.com" : "Ketik di sini…"}
        className="mt-2 w-full resize-y rounded-lg border border-black/10 bg-white px-4 py-3 text-sm text-ink-900 outline-none focus:border-brand-400 dark:border-white/10 dark:bg-slate-900 dark:text-slate-100"
      />

      <button
        onClick={mode === "qr" ? runQr : runBase64}
        disabled={!input.trim()}
        className="mt-4 w-full rounded-xl bg-brand-500 py-3.5 font-semibold text-white transition hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {mode === "qr" ? "Buat QR Code" : dir === "encode" ? "Encode" : "Decode"}
      </button>

      {error && (
        <p className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700 dark:bg-red-950/40 dark:text-red-300">
          {error}
        </p>
      )}

      {/* QR output */}
      {mode === "qr" && qrUrl && (
        <div className="mt-5 flex flex-col items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={qrUrl} alt="QR Code" className="h-56 w-56 rounded-lg" />
          <button
            onClick={() => downloadBlob(dataUrlToBlob(qrUrl), "qrcode.png")}
            className="rounded-lg border border-brand-500 px-4 py-2 text-sm font-medium text-brand-700 hover:bg-brand-50 dark:text-brand-100 dark:hover:bg-slate-700"
          >
            Unduh PNG
          </button>
        </div>
      )}

      {/* Base64 output */}
      {mode === "base64" && output && (
        <div className="mt-5">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-ink-700 dark:text-slate-300">
              Hasil
            </span>
            <button
              onClick={copyOut}
              className="text-xs text-brand-700 underline hover:text-brand-600 dark:text-brand-200"
            >
              {copied ? "Tersalin!" : "Salin"}
            </button>
          </div>
          <textarea
            readOnly
            value={output}
            rows={5}
            className="mt-2 w-full resize-y rounded-lg border border-black/10 bg-slate-50 px-4 py-3 text-sm text-ink-900 dark:border-white/10 dark:bg-slate-900 dark:text-slate-100"
          />
        </div>
      )}
    </div>
  );
}

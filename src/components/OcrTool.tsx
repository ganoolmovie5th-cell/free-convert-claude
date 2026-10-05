"use client";

import { useRef, useState } from "react";
import { imageToText } from "@/lib/ocr";

export default function OcrTool() {
  const [busy, setBusy] = useState(false);
  const [pct, setPct] = useState(0);
  const [text, setText] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  async function run(file: File) {
    setBusy(true);
    setError(null);
    setText("");
    setPct(0);
    try {
      setText(await imageToText(file, setPct));
    } catch {
      setError("Gagal membaca teks dari gambar.");
    } finally {
      setBusy(false);
    }
  }

  async function copyOut() {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="rounded-2xl border border-black/5 bg-white/80 p-5 shadow-xl shadow-brand-500/5 backdrop-blur sm:p-7 dark:border-white/10 dark:bg-slate-800/70">
      <div
        onClick={() => inputRef.current?.click()}
        className="cursor-pointer rounded-xl border-2 border-dashed border-black/15 bg-white/60 p-8 text-center transition hover:border-brand-300 dark:border-white/15 dark:bg-slate-900/50"
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) run(f);
          }}
        />
        <p className="text-sm font-medium text-ink-900 dark:text-slate-100">
          Pilih gambar untuk dibaca teksnya
        </p>
        <p className="mt-1 text-xs text-ink-500 dark:text-slate-400">
          Mendukung bahasa Indonesia dan Inggris. Diproses di browser.
        </p>
      </div>

      {busy && (
        <p className="mt-4 text-sm text-ink-500 dark:text-slate-400">
          Membaca teks… {pct}%
        </p>
      )}

      {error && (
        <p className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700 dark:bg-red-950/40 dark:text-red-300">
          {error}
        </p>
      )}

      {text && (
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
            value={text}
            rows={8}
            className="mt-2 w-full resize-y rounded-lg border border-black/10 bg-slate-50 px-4 py-3 text-sm text-ink-900 dark:border-white/10 dark:bg-slate-900 dark:text-slate-100"
          />
        </div>
      )}
    </div>
  );
}

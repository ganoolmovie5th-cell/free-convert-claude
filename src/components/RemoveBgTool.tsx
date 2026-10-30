"use client";

import { useRef, useState } from "react";
import { removeImageBackground } from "@/lib/removeBg";
import { downloadBlob } from "@/lib/download";
import { baseName } from "@/lib/types";

export default function RemoveBgTool() {
  const [busy, setBusy] = useState(false);
  const [pct, setPct] = useState(0);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [resultBlob, setResultBlob] = useState<Blob | null>(null);
  const [name, setName] = useState("gambar");
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  async function run(file: File) {
    setBusy(true);
    setError(null);
    setPct(0);
    if (resultUrl) URL.revokeObjectURL(resultUrl);
    setResultUrl(null);
    setResultBlob(null);
    setName(baseName(file.name));
    try {
      const blob = await removeImageBackground(file, setPct);
      setResultBlob(blob);
      setResultUrl(URL.createObjectURL(blob));
    } catch {
      setError("Gagal menghapus background. Coba gambar lain.");
    } finally {
      setBusy(false);
    }
  }

  function save() {
    if (resultBlob) downloadBlob(resultBlob, `${name}-tanpa-bg.png`);
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
          Pilih gambar untuk dihapus background-nya
        </p>
        <p className="mt-1 text-xs text-ink-500 dark:text-slate-400">
          Hasil berupa PNG transparan. Diproses di browser.
        </p>
      </div>

      {busy && (
        <p className="mt-4 text-sm text-ink-500 dark:text-slate-400">
          Menghapus background… {pct}%
        </p>
      )}

      {error && (
        <p className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700 dark:bg-red-950/40 dark:text-red-300">
          {error}
        </p>
      )}

      {resultUrl && (
        <div className="mt-5">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-ink-700 dark:text-slate-300">
              Hasil
            </span>
            <button
              onClick={save}
              className="text-xs text-brand-700 underline hover:text-brand-600 dark:text-brand-200"
            >
              Unduh PNG
            </button>
          </div>
          {/* Checkerboard bg so transparency is visible. */}
          <div
            className="mt-2 flex justify-center rounded-lg border border-black/10 p-4 dark:border-white/10"
            style={{
              backgroundImage:
                "linear-gradient(45deg,#ccc 25%,transparent 25%),linear-gradient(-45deg,#ccc 25%,transparent 25%),linear-gradient(45deg,transparent 75%,#ccc 75%),linear-gradient(-45deg,transparent 75%,#ccc 75%)",
              backgroundSize: "20px 20px",
              backgroundPosition: "0 0,0 10px,10px -10px,-10px 0",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={resultUrl}
              alt="Gambar tanpa background"
              className="max-h-80 w-auto"
            />
          </div>
        </div>
      )}
    </div>
  );
}

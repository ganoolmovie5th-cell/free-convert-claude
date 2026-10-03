"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import {
  ACCEPT_BY_KIND,
  ConvertKind,
  ConvertResult,
  TARGETS_BY_KIND,
  TargetFormat,
} from "@/lib/types";
import { convertImage } from "@/lib/image";
import { convertData } from "@/lib/data";
import { imagesToPdf } from "@/lib/pdf";
import { compressPdf } from "@/lib/pdfCompress";
import { downloadAll, downloadBlob } from "@/lib/download";

const KINDS: { value: ConvertKind; label: string; hint: string }[] = [
  { value: "image", label: "Gambar", hint: "JPG · PNG · WebP" },
  { value: "data", label: "Data", hint: "CSV · Excel · JSON" },
  { value: "pdf", label: "Gambar → PDF", hint: "Gabung jadi 1 PDF" },
  { value: "pdfcompress", label: "Kompres PDF", hint: "Perkecil ukuran" },
];

// Resize presets for the image tab. 0 = original size.
const RESIZE_PRESETS: { value: number; label: string }[] = [
  { value: 0, label: "Asli" },
  { value: 1920, label: "1920px" },
  { value: 1280, label: "1280px" },
  { value: 800, label: "800px" },
];

function fmtSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

export default function Converter() {
  const [kind, setKind] = useState<ConvertKind>("image");
  const [target, setTarget] = useState<TargetFormat>("png");
  const [files, setFiles] = useState<File[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [maxWidth, setMaxWidth] = useState(0);
  const [quality, setQuality] = useState(0.8);
  const inputRef = useRef<HTMLInputElement>(null);

  const targets = TARGETS_BY_KIND[kind];

  // PNG is lossless; quality has no effect. Show slider only where it matters.
  const showQuality =
    (kind === "image" && target !== "png") || kind === "pdfcompress";

  const selectKind = useCallback((k: ConvertKind) => {
    setKind(k);
    setTarget(TARGETS_BY_KIND[k][0].value);
    setFiles([]);
    setError(null);
  }, []);

  const addFiles = useCallback((list: FileList | null) => {
    if (!list) return;
    setError(null);
    setFiles((prev) => [...prev, ...Array.from(list)]);
  }, []);

  const removeFile = (i: number) =>
    setFiles((prev) => prev.filter((_, idx) => idx !== i));

  const run = useCallback(async () => {
    if (files.length === 0) {
      setError("Pilih file dulu.");
      return;
    }
    setBusy(true);
    setError(null);
    try {
      if (kind === "pdf") {
        const res = await imagesToPdf(files);
        downloadBlob(res.blob, res.filename);
      } else {
        const results: ConvertResult[] = [];
        for (const f of files) {
          let res: ConvertResult;
          if (kind === "image") {
            res = await convertImage(f, target, { maxWidth, quality });
          } else if (kind === "pdfcompress") {
            res = await compressPdf(f, { quality });
          } else {
            res = await convertData(f, target);
          }
          results.push(res);
        }
        downloadAll(results);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Terjadi kesalahan.");
    } finally {
      setBusy(false);
    }
  }, [files, kind, target, maxWidth, quality]);

  const totalSize = useMemo(
    () => files.reduce((s, f) => s + f.size, 0),
    [files],
  );

  return (
    <div className="rounded-2xl border border-black/5 bg-white/80 p-5 shadow-xl shadow-brand-500/5 backdrop-blur sm:p-7">
      {/* Kind tabs */}
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {KINDS.map((k) => {
          const active = k.value === kind;
          return (
            <button
              key={k.value}
              onClick={() => selectKind(k.value)}
              className={`rounded-xl border px-3 py-3 text-left transition ${
                active
                  ? "border-brand-500 bg-brand-50"
                  : "border-black/5 bg-white hover:border-brand-100"
              }`}
            >
              <div className="text-sm font-semibold text-ink-900">
                {k.label}
              </div>
              <div className="text-xs text-ink-500">{k.hint}</div>
            </button>
          );
        })}
      </div>

      {/* Target format */}
      {kind !== "pdf" && kind !== "pdfcompress" && (
        <div className="mt-5">
          <label className="text-sm font-medium text-ink-700">
            Konversi ke
          </label>
          <div className="mt-2 flex flex-wrap gap-2">
            {targets.map((t) => (
              <button
                key={t.value}
                onClick={() => setTarget(t.value)}
                className={`rounded-lg border px-4 py-2 text-sm font-medium transition ${
                  target === t.value
                    ? "border-brand-500 bg-brand-500 text-white"
                    : "border-black/10 bg-white text-ink-700 hover:border-brand-300"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Resize (image only) */}
      {kind === "image" && (
        <div className="mt-5">
          <label className="text-sm font-medium text-ink-700">
            Ubah ukuran (lebar maks)
          </label>
          <div className="mt-2 flex flex-wrap gap-2">
            {RESIZE_PRESETS.map((p) => (
              <button
                key={p.value}
                onClick={() => setMaxWidth(p.value)}
                className={`rounded-lg border px-4 py-2 text-sm font-medium transition ${
                  maxWidth === p.value
                    ? "border-brand-500 bg-brand-500 text-white"
                    : "border-black/10 bg-white text-ink-700 hover:border-brand-300"
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Quality slider */}
      {showQuality && (
        <div className="mt-5">
          <div className="flex items-center justify-between">
            <label htmlFor="quality" className="text-sm font-medium text-ink-700">
              Kualitas
            </label>
            <span className="text-sm font-semibold text-brand-700">
              {Math.round(quality * 100)}%
            </span>
          </div>
          <input
            id="quality"
            type="range"
            min={0.1}
            max={1}
            step={0.05}
            value={quality}
            onChange={(e) => setQuality(Number(e.target.value))}
            className="mt-2 w-full accent-brand-500"
          />
          <p className="mt-1 text-xs text-ink-500">
            Lebih rendah = ukuran file lebih kecil.
          </p>
        </div>
      )}

      {/* Compress PDF note */}
      {kind === "pdfcompress" && (
        <div className="mt-5 rounded-lg border border-black/10 bg-brand-50/60 px-4 py-3 text-sm text-ink-700">
          Perkecil ukuran PDF dengan render ulang halaman. Teks akan menjadi
          gambar (tidak bisa diseleksi). Cocok untuk hasil scan dan PDF berisi
          foto.
        </div>
      )}

      {/* Dropzone */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          addFiles(e.dataTransfer.files);
        }}
        onClick={() => inputRef.current?.click()}
        className={`mt-5 cursor-pointer rounded-xl border-2 border-dashed p-8 text-center transition ${
          dragOver
            ? "border-brand-500 bg-brand-50"
            : "border-black/15 bg-white/60 hover:border-brand-300"
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          multiple
          accept={ACCEPT_BY_KIND[kind]}
          className="hidden"
          onChange={(e) => addFiles(e.target.files)}
        />
        <p className="text-sm font-medium text-ink-900">
          Tarik file ke sini atau klik untuk memilih
        </p>
        <p className="mt-1 text-xs text-ink-500">
          Diproses di browser kamu. File tidak diunggah ke server.
        </p>
      </div>

      {/* File list */}
      {files.length > 0 && (
        <div className="mt-4 space-y-2">
          <div className="flex items-center justify-between text-xs text-ink-500">
            <span>
              {files.length} file · {fmtSize(totalSize)}
            </span>
            <button
              onClick={() => setFiles([])}
              className="text-ink-500 underline hover:text-ink-700"
            >
              Hapus semua
            </button>
          </div>
          <ul className="divide-y divide-black/5 overflow-hidden rounded-lg border border-black/5">
            {files.map((f, i) => (
              <li
                key={`${f.name}-${i}`}
                className="flex items-center justify-between gap-3 bg-white px-3 py-2 text-sm"
              >
                <span className="truncate text-ink-700">{f.name}</span>
                <div className="flex shrink-0 items-center gap-3">
                  <span className="text-xs text-ink-500">
                    {fmtSize(f.size)}
                  </span>
                  <button
                    onClick={() => removeFile(i)}
                    className="text-ink-500 hover:text-red-500"
                    aria-label={`Hapus ${f.name}`}
                  >
                    ✕
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {error && (
        <p className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      )}

      {/* Action */}
      <button
        onClick={run}
        disabled={busy || files.length === 0}
        className="mt-5 w-full rounded-xl bg-brand-500 py-3.5 font-semibold text-white transition hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {busy
          ? "Memproses…"
          : kind === "pdf"
            ? "Gabungkan jadi PDF"
            : kind === "pdfcompress"
              ? "Kompres & Unduh"
              : "Konversi & Unduh"}
      </button>
    </div>
  );
}

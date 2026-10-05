"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ACCEPT_BY_KIND,
  ConvertKind,
  ConvertResult,
  fileMatchesKind,
  TARGETS_BY_KIND,
  TargetFormat,
} from "@/lib/types";
import { convertImage } from "@/lib/image";
import { convertData } from "@/lib/data";
import { imagesToPdf } from "@/lib/pdf";
import { compressPdf } from "@/lib/pdfCompress";
import { pdfToImages } from "@/lib/pdfToImages";
import { mergePdf, splitPdf } from "@/lib/pdfOps";
import { watermarkImage } from "@/lib/watermark";
import { unlockPdf } from "@/lib/pdfUnlock";
import { cropImage } from "@/lib/cropImage";
import { mergeImages, MergeLayout } from "@/lib/mergeImages";
import { addTextToPdf, TextPosition } from "@/lib/pdfText";
import { downloadAll } from "@/lib/download";
import {
  addHistory,
  clearHistory,
  HistoryItem,
  loadHistory,
} from "@/lib/history";

const KINDS: { value: ConvertKind; label: string; hint: string }[] = [
  { value: "image", label: "Gambar", hint: "JPG · PNG · WebP" },
  { value: "data", label: "Data", hint: "CSV · Excel · JSON" },
  { value: "pdf", label: "Gambar → PDF", hint: "Gabung jadi 1 PDF" },
  { value: "pdfcompress", label: "Kompres PDF", hint: "Perkecil ukuran" },
  { value: "pdf2img", label: "PDF → JPG", hint: "Tiap halaman jadi gambar" },
  { value: "pdfmerge", label: "Gabung PDF", hint: "Banyak PDF jadi 1" },
  { value: "pdfsplit", label: "Pisah PDF", hint: "Ambil halaman tertentu" },
  { value: "watermark", label: "Watermark", hint: "Teks di atas gambar" },
  { value: "pdfunlock", label: "Buka Proteksi", hint: "Hapus pembatasan PDF" },
  { value: "crop", label: "Crop Gambar", hint: "Potong ke rasio" },
  { value: "imgmerge", label: "Gabung Gambar", hint: "Tumpuk jadi satu" },
  { value: "pdf2png", label: "PDF → PNG", hint: "Tiap halaman jadi PNG" },
  { value: "pdftext", label: "Teks ke PDF", hint: "Stempel teks" },
];

const CROP_RATIOS = [
  { value: 0, label: "Asli" },
  { value: 1, label: "1:1" },
  { value: 16 / 9, label: "16:9" },
  { value: 4 / 3, label: "4:3" },
];

// Warn (not block) above this total; huge files can hang the browser tab.
const SIZE_WARN = 100 * 1024 * 1024; // 100 MB

const RESIZE_PRESETS = [
  { value: 0, label: "Asli" },
  { value: 1920, label: "1920px" },
  { value: 1280, label: "1280px" },
  { value: 800, label: "800px" },
];

const ROTATE_PRESETS = [
  { value: 0, label: "0°" },
  { value: 90, label: "90°" },
  { value: 180, label: "180°" },
  { value: 270, label: "270°" },
];

function fmtSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

// Small preview for image files; shows a dot for non-images (PDF/CSV).
function FileThumb({ file }: { file: File }) {
  const [url, setUrl] = useState<string | null>(null);
  useEffect(() => {
    if (!file.type.startsWith("image/")) return;
    const u = URL.createObjectURL(file);
    setUrl(u);
    return () => URL.revokeObjectURL(u);
  }, [file]);

  if (!url)
    return (
      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-sm bg-brand-50 text-[10px] font-semibold text-brand-700">
        {file.name.split(".").pop()?.slice(0, 4).toUpperCase() || "FILE"}
      </span>
    );
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={url}
      alt=""
      className="h-8 w-8 shrink-0 rounded-sm object-cover"
    />
  );
}

export default function Converter({
  only,
  lockTarget,
}: {
  only?: ConvertKind;
  lockTarget?: string;
}) {
  const [kind, setKind] = useState<ConvertKind>(only ?? "image");
  const [target, setTarget] = useState<TargetFormat>(
    (lockTarget as TargetFormat) ?? "png",
  );
  const [files, setFiles] = useState<File[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [maxWidth, setMaxWidth] = useState(0);
  const [rotate, setRotate] = useState(0);
  const [quality, setQuality] = useState(0.8);
  const [range, setRange] = useState("");
  const [watermarkText, setWatermarkText] = useState("");
  const [cropRatio, setCropRatio] = useState(0);
  const [imgLayout, setImgLayout] = useState<MergeLayout>("vertical");
  const [pdfText, setPdfText] = useState("");
  const [pdfTextPos, setPdfTextPos] = useState<TextPosition>("bottom");
  const [progress, setProgress] = useState({ done: 0, total: 0 });
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [summary, setSummary] = useState<{
    count: number;
    before: number;
    after: number;
  } | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setHistory(loadHistory());
  }, []);

  const targets = TARGETS_BY_KIND[kind];
  const showTargets = !lockTarget && kind === "image";
  const showQuality =
    (kind === "image" && target !== "png") ||
    kind === "pdfcompress" ||
    kind === "pdf2img" ||
    kind === "pdf2png" ||
    kind === "watermark" ||
    kind === "crop" ||
    kind === "imgmerge";

  const selectKind = useCallback((k: ConvertKind) => {
    setKind(k);
    setTarget(TARGETS_BY_KIND[k][0].value);
    setFiles([]);
    setError(null);
  }, []);

  const addFiles = useCallback(
    (list: FileList | null) => {
      if (!list) return;
      const incoming = Array.from(list);
      const ok = incoming.filter((f) => fileMatchesKind(f, kind));
      const rejected = incoming.length - ok.length;
      setError(
        rejected > 0
          ? `${rejected} file dilewati karena formatnya tidak cocok untuk alat ini.`
          : null,
      );
      if (ok.length > 0) {
        setSummary(null);
        setFiles((prev) => [...prev, ...ok]);
      }
    },
    [kind],
  );

  const removeFile = (i: number) =>
    setFiles((prev) => prev.filter((_, idx) => idx !== i));

  const run = useCallback(async () => {
    if (files.length === 0) {
      setError("Pilih file dulu.");
      return;
    }
    setBusy(true);
    setError(null);
    setSummary(null);
    try {
      let results: ConvertResult[] = [];

      if (kind === "pdf") {
        setProgress({ done: 0, total: 1 });
        results = [await imagesToPdf(files)];
        setProgress({ done: 1, total: 1 });
      } else if (kind === "pdfmerge") {
        setProgress({ done: 0, total: 1 });
        results = [await mergePdf(files)];
        setProgress({ done: 1, total: 1 });
      } else if (kind === "imgmerge") {
        setProgress({ done: 0, total: 1 });
        results = [await mergeImages(files, imgLayout, quality)];
        setProgress({ done: 1, total: 1 });
      } else {
        setProgress({ done: 0, total: files.length });
        for (let i = 0; i < files.length; i++) {
          const f = files[i];
          if (kind === "image") {
            results.push(await convertImage(f, target, { maxWidth, quality, rotate }));
          } else if (kind === "watermark") {
            results.push(await watermarkImage(f, { text: watermarkText, quality }));
          } else if (kind === "pdfcompress") {
            results.push(await compressPdf(f, { quality }));
          } else if (kind === "pdfunlock") {
            results.push(await unlockPdf(f));
          } else if (kind === "pdf2img") {
            results.push(...(await pdfToImages(f, quality, "jpeg")));
          } else if (kind === "pdf2png") {
            results.push(...(await pdfToImages(f, quality, "png")));
          } else if (kind === "pdfsplit") {
            results.push(await splitPdf(f, range));
          } else if (kind === "pdftext") {
            results.push(
              await addTextToPdf(f, {
                text: pdfText,
                position: pdfTextPos,
                allPages: false,
              }),
            );
          } else if (kind === "crop") {
            results.push(await cropImage(f, cropRatio, quality));
          } else {
            results.push(await convertData(f, target));
          }
          setProgress({ done: i + 1, total: files.length });
        }
      }

      await downloadAll(results);
      setSummary({
        count: results.length,
        before: files.reduce((s, f) => s + f.size, 0),
        after: results.reduce((s, r) => s + r.blob.size, 0),
      });
      setHistory(
        addHistory(
          results.map((r) => ({
            id: `${Date.now()}-${r.filename}`,
            filename: r.filename,
            size: r.blob.size,
            at: Date.now(),
          })),
        ),
      );
    } catch (e) {
      setError(e instanceof Error ? e.message : "Terjadi kesalahan.");
    } finally {
      setBusy(false);
    }
  }, [
    files,
    kind,
    target,
    maxWidth,
    quality,
    rotate,
    range,
    watermarkText,
    cropRatio,
    imgLayout,
    pdfText,
    pdfTextPos,
  ]);

  const totalSize = useMemo(
    () => files.reduce((s, f) => s + f.size, 0),
    [files],
  );

  const actionLabel = busy
    ? progress.total > 1
      ? `Memproses ${progress.done}/${progress.total}…`
      : "Memproses…"
    : kind === "pdf"
      ? "Gabungkan jadi PDF"
      : kind === "pdfmerge"
        ? "Gabung PDF"
        : kind === "pdfsplit"
          ? "Pisah & Unduh"
          : kind === "pdfcompress"
            ? "Kompres & Unduh"
            : kind === "pdf2img"
              ? "Ubah ke JPG"
              : kind === "pdf2png"
                ? "Ubah ke PNG"
                : kind === "watermark"
                  ? "Tambah Watermark"
                  : kind === "pdfunlock"
                    ? "Hapus Proteksi"
                    : kind === "crop"
                      ? "Crop & Unduh"
                      : kind === "imgmerge"
                        ? "Gabung & Unduh"
                        : kind === "pdftext"
                          ? "Tambah Teks & Unduh"
                          : "Konversi & Unduh";

  const overSizeWarn = totalSize > SIZE_WARN;

  return (
    <div className="rounded-2xl border border-black/5 bg-white/80 p-5 shadow-xl shadow-brand-500/5 backdrop-blur-sm sm:p-7">
      {/* Kind tabs — hidden when locked to a single tool */}
      {!only && (
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
      )}

      {/* Target format (image only, unlocked) */}
      {showTargets && (
        <div className={only ? "" : "mt-5"}>
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

      {/* Resize + rotate (image only) */}
      {kind === "image" && (
        <>
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
          <div className="mt-5">
            <label className="text-sm font-medium text-ink-700">Putar</label>
            <div className="mt-2 flex flex-wrap gap-2">
              {ROTATE_PRESETS.map((p) => (
                <button
                  key={p.value}
                  onClick={() => setRotate(p.value)}
                  className={`rounded-lg border px-4 py-2 text-sm font-medium transition ${
                    rotate === p.value
                      ? "border-brand-500 bg-brand-500 text-white"
                      : "border-black/10 bg-white text-ink-700 hover:border-brand-300"
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Split range */}
      {kind === "pdfsplit" && (
        <div className="mt-5">
          <label htmlFor="range" className="text-sm font-medium text-ink-700">
            Halaman yang diambil
          </label>
          <input
            id="range"
            type="text"
            value={range}
            onChange={(e) => setRange(e.target.value)}
            placeholder="contoh: 1-3,5"
            className="mt-2 w-full rounded-lg border border-black/10 bg-white px-4 py-2 text-sm text-ink-900 outline-hidden focus:border-brand-400"
          />
          <p className="mt-1 text-xs text-ink-500">
            Kosongkan untuk mengambil semua halaman.
          </p>
        </div>
      )}

      {/* Watermark text */}
      {kind === "watermark" && (
        <div className="mt-5">
          <label
            htmlFor="watermark"
            className="text-sm font-medium text-ink-700"
          >
            Teks watermark
          </label>
          <input
            id="watermark"
            type="text"
            value={watermarkText}
            onChange={(e) => setWatermarkText(e.target.value)}
            placeholder="contoh: © Nama Kamu"
            className="mt-2 w-full rounded-lg border border-black/10 bg-white px-4 py-2 text-sm text-ink-900 outline-hidden focus:border-brand-400"
          />
        </div>
      )}

      {/* Crop ratio */}
      {kind === "crop" && (
        <div className="mt-5">
          <label className="text-sm font-medium text-ink-700">Rasio potong</label>
          <div className="mt-2 flex flex-wrap gap-2">
            {CROP_RATIOS.map((r) => (
              <button
                key={r.label}
                onClick={() => setCropRatio(r.value)}
                className={`rounded-lg border px-4 py-2 text-sm font-medium transition ${
                  cropRatio === r.value
                    ? "border-brand-500 bg-brand-500 text-white"
                    : "border-black/10 bg-white text-ink-700 hover:border-brand-300"
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>
          <p className="mt-1 text-xs text-ink-500">
            Dipotong dari tengah ke rasio yang dipilih.
          </p>
        </div>
      )}

      {/* Image merge layout */}
      {kind === "imgmerge" && (
        <div className="mt-5">
          <label className="text-sm font-medium text-ink-700">Susunan</label>
          <div className="mt-2 flex flex-wrap gap-2">
            {(
              [
                { v: "vertical", l: "Vertikal" },
                { v: "horizontal", l: "Horizontal" },
              ] as const
            ).map((o) => (
              <button
                key={o.v}
                onClick={() => setImgLayout(o.v)}
                className={`rounded-lg border px-4 py-2 text-sm font-medium transition ${
                  imgLayout === o.v
                    ? "border-brand-500 bg-brand-500 text-white"
                    : "border-black/10 bg-white text-ink-700 hover:border-brand-300"
                }`}
              >
                {o.l}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* PDF add-text */}
      {kind === "pdftext" && (
        <div className="mt-5 space-y-4">
          <div>
            <label htmlFor="pdftext" className="text-sm font-medium text-ink-700">
              Teks
            </label>
            <input
              id="pdftext"
              type="text"
              value={pdfText}
              onChange={(e) => setPdfText(e.target.value)}
              placeholder="contoh: RAHASIA"
              className="mt-2 w-full rounded-lg border border-black/10 bg-white px-4 py-2 text-sm text-ink-900 outline-hidden focus:border-brand-400"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-ink-700">Posisi</label>
            <div className="mt-2 flex flex-wrap gap-2">
              {(
                [
                  { v: "top", l: "Atas" },
                  { v: "center", l: "Tengah" },
                  { v: "bottom", l: "Bawah" },
                ] as const
              ).map((o) => (
                <button
                  key={o.v}
                  onClick={() => setPdfTextPos(o.v)}
                  className={`rounded-lg border px-4 py-2 text-sm font-medium transition ${
                    pdfTextPos === o.v
                      ? "border-brand-500 bg-brand-500 text-white"
                      : "border-black/10 bg-white text-ink-700 hover:border-brand-300"
                  }`}
                >
                  {o.l}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Unlock PDF note */}
      {kind === "pdfunlock" && (
        <div className="mt-5 rounded-lg border border-black/10 bg-brand-50/60 px-4 py-3 text-sm text-ink-700">
          Menghapus pembatasan salin, cetak, dan edit dari PDF yang bisa dibuka.
          Bukan untuk membuka PDF yang terkunci password buka. Gunakan hanya
          untuk file milik kamu sendiri.
        </div>
      )}

      {/* Quality slider */}
      {showQuality && (
        <div className="mt-5">
          <div className="flex items-center justify-between">
            <label
              htmlFor="quality"
              className="text-sm font-medium text-ink-700"
            >
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

      {/* Size warning */}
      {overSizeWarn && (
        <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          Total file cukup besar ({fmtSize(totalSize)}). Pemrosesan bisa lambat
          atau membebani browser di perangkat yang lebih lemah.
        </div>
      )}

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
                <div className="flex min-w-0 items-center gap-2">
                  <FileThumb file={f} />
                  <span className="truncate text-ink-700">{f.name}</span>
                </div>
                <div className="flex shrink-0 items-center gap-3">
                  <span className="text-xs text-ink-500">
                    {fmtSize(f.size)}
                  </span>
                  <button
                    onClick={() => removeFile(i)}
                    className="rounded-sm text-ink-500 hover:text-red-500 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-brand-400"
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

      {/* Success summary */}
      {summary && (
        <div className="mt-4 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
          <p className="font-medium">
            Selesai — {summary.count} file diunduh.
          </p>
          <p className="mt-0.5 text-green-700">
            {fmtSize(summary.before)} → {fmtSize(summary.after)}
            {summary.after < summary.before &&
              ` · hemat ${Math.round(
                (1 - summary.after / summary.before) * 100,
              )}%`}
          </p>
        </div>
      )}

      {/* Action */}
      <button
        onClick={run}
        disabled={busy || files.length === 0}
        className="mt-5 w-full rounded-xl bg-brand-500 py-3.5 font-semibold text-white transition hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {actionLabel}
      </button>

      {/* Recent history */}
      {history.length > 0 && (
        <div className="mt-6 border-t border-black/5 pt-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-ink-700">Riwayat</h3>
            <button
              onClick={() => {
                clearHistory();
                setHistory([]);
              }}
              className="text-xs text-ink-500 underline hover:text-ink-700"
            >
              Bersihkan
            </button>
          </div>
          <ul className="mt-2 space-y-1 text-xs text-ink-500">
            {history.slice(0, 6).map((h) => (
              <li key={h.id} className="flex justify-between gap-3">
                <span className="truncate">{h.filename}</span>
                <span className="shrink-0">{fmtSize(h.size)}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

import Converter from "@/components/Converter";
import { FREE_BATCH_LIMIT, PRO_PRICE_LABEL } from "@/lib/constants";

const FEATURES = [
  {
    title: "Diproses di browser",
    body: "File tidak diunggah ke server. Lebih cepat dan privat.",
  },
  {
    title: "Batch sekaligus",
    body: "Konversi banyak file dalam satu kali jalan.",
  },
  {
    title: "Tanpa instal",
    body: "Jalan langsung di browser, desktop maupun HP.",
  },
];

const SOON = ["Word → PDF", "Excel → PDF", "PDF → Word", "PowerPoint → PDF"];

export default function Home() {
  return (
    <main className="min-h-screen pb-24">
      {/* Nav */}
      <header className="container-tight flex items-center justify-between py-5">
        <div className="flex items-center gap-2">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand-500 text-sm font-bold text-white">
            FC
          </span>
          <span className="font-bold text-ink-900">Free Convert</span>
        </div>
        <a
          href="#pricing"
          className="rounded-lg border border-black/10 bg-white px-4 py-2 text-sm font-medium text-ink-700 hover:border-brand-300"
        >
          Harga
        </a>
      </header>

      {/* Hero + converter */}
      <section className="container-tight grid gap-10 pt-6 lg:grid-cols-2 lg:items-center lg:gap-12">
        <div>
          <span className="inline-flex rounded-full border border-brand-100 bg-white px-3 py-1 text-xs font-medium text-brand-700">
            Gratis · Tanpa upload ke server
          </span>
          <h1 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight text-ink-900 sm:text-5xl">
            Konversi & kompres file,
            <br />
            langsung di browser.
          </h1>
          <p className="mt-4 max-w-md text-lg text-ink-500">
            Gambar, CSV, Excel, dan gabung gambar jadi PDF. Cepat, privat, tanpa
            instal aplikasi.
          </p>
          <div className="mt-6 flex flex-wrap gap-2 text-sm text-ink-500">
            <span className="rounded-full bg-white px-3 py-1 shadow-sm">
              JPG ↔ PNG ↔ WebP
            </span>
            <span className="rounded-full bg-white px-3 py-1 shadow-sm">
              CSV ↔ Excel ↔ JSON
            </span>
            <span className="rounded-full bg-white px-3 py-1 shadow-sm">
              Gambar → PDF
            </span>
            <span className="rounded-full bg-white px-3 py-1 shadow-sm">
              Resize gambar
            </span>
            <span className="rounded-full bg-white px-3 py-1 shadow-sm">
              Kompres PDF
            </span>
          </div>
        </div>

        <Converter />
      </section>

      {/* Features */}
      <section className="container-tight mt-20 grid gap-4 sm:grid-cols-3">
        {FEATURES.map((f) => (
          <div
            key={f.title}
            className="rounded-xl border border-black/5 bg-white/70 p-5"
          >
            <h3 className="font-semibold text-ink-900">{f.title}</h3>
            <p className="mt-1 text-sm text-ink-500">{f.body}</p>
          </div>
        ))}
      </section>

      {/* Pricing */}
      <section id="pricing" className="container-tight mt-20">
        <h2 className="text-center text-2xl font-bold text-ink-900">
          Harga sederhana
        </h2>
        <div className="mx-auto mt-8 grid max-w-3xl gap-5 sm:grid-cols-2">
          <div className="rounded-2xl border border-black/5 bg-white/80 p-6">
            <h3 className="font-semibold text-ink-900">Gratis</h3>
            <p className="mt-1 text-3xl font-extrabold text-ink-900">Rp0</p>
            <ul className="mt-4 space-y-2 text-sm text-ink-700">
              <li>✓ Semua format konversi</li>
              <li>✓ Maksimal {FREE_BATCH_LIMIT} file per batch</li>
              <li>✓ Diproses di browser</li>
            </ul>
          </div>
          <div className="rounded-2xl border-2 border-brand-500 bg-white p-6">
            <h3 className="font-semibold text-brand-700">Pro</h3>
            <p className="mt-1 text-3xl font-extrabold text-ink-900">
              {PRO_PRICE_LABEL}
            </p>
            <ul className="mt-4 space-y-2 text-sm text-ink-700">
              <li>✓ Batch tanpa batas</li>
              <li>✓ Kualitas penuh</li>
              <li>✓ Prioritas fitur baru</li>
            </ul>
            <button className="mt-5 w-full cursor-not-allowed rounded-xl bg-brand-500 py-3 font-semibold text-white opacity-70">
              Segera hadir
            </button>
          </div>
        </div>
      </section>

      {/* Coming soon */}
      <section className="container-tight mt-20 rounded-2xl border border-black/5 bg-white/60 p-6 text-center">
        <h2 className="text-lg font-semibold text-ink-900">Segera hadir</h2>
        <p className="mt-1 text-sm text-ink-500">
          Konversi dokumen Office butuh pemrosesan di server. Sedang disiapkan.
        </p>
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          {SOON.map((s) => (
            <span
              key={s}
              className="rounded-full border border-dashed border-black/15 bg-white px-3 py-1 text-sm text-ink-500"
            >
              {s}
            </span>
          ))}
        </div>
      </section>

      <footer className="container-tight mt-20 text-center text-sm text-ink-500">
        <p>
          © {new Date().getFullYear()} Free Convert · free-convert.web.id
        </p>
      </footer>
    </main>
  );
}

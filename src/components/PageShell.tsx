import Link from "next/link";
import SiteFooter from "./SiteFooter";

export default function PageShell({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen pb-16">
      <header className="container-tight flex items-center justify-between py-5">
        <Link href="/" className="flex items-center gap-2">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand-500 text-sm font-bold text-white">
            FC
          </span>
          <span className="font-bold text-ink-900">Free Convert</span>
        </Link>
        <Link
          href="/"
          className="rounded-lg border border-black/10 bg-white px-4 py-2 text-sm font-medium text-ink-700 hover:border-brand-300"
        >
          Beranda
        </Link>
      </header>

      <article className="container-tight mt-6 max-w-2xl">
        <h1 className="text-3xl font-extrabold tracking-tight text-ink-900">
          {title}
        </h1>
        <div className="prose-page mt-6 space-y-4 text-ink-700">{children}</div>
      </article>

      <SiteFooter />
    </main>
  );
}

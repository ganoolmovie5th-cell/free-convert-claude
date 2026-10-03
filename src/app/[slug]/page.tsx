import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Converter from "@/components/Converter";
import SiteFooter from "@/components/SiteFooter";
import { TOOLS, toolBySlug } from "@/lib/tools";

export function generateStaticParams() {
  return TOOLS.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tool = toolBySlug(slug);
  if (!tool) return {};
  return {
    title: `${tool.title} — Free Convert`,
    description: tool.description,
    alternates: { canonical: `/${tool.slug}` },
  };
}

export default async function ToolPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tool = toolBySlug(slug);
  if (!tool) notFound();

  const others = TOOLS.filter((t) => t.slug !== tool.slug);

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
          Semua Alat
        </Link>
      </header>

      <section className="container-tight mt-6 grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-12">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-ink-900 sm:text-4xl">
            {tool.title}
          </h1>
          <p className="mt-4 max-w-md text-lg text-ink-500">
            {tool.description}
          </p>
          <p className="mt-3 text-sm text-ink-500">
            Gratis, tanpa batas, dan diproses langsung di browser kamu.
          </p>
        </div>

        <Converter only={tool.kind} lockTarget={tool.lockTarget} />
      </section>

      {/* Other tools */}
      <section className="container-tight mt-16">
        <h2 className="text-lg font-semibold text-ink-900">Alat lainnya</h2>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {others.map((t) => (
            <Link
              key={t.slug}
              href={`/${t.slug}`}
              className="rounded-xl border border-black/5 bg-white/70 px-4 py-3 text-sm font-medium text-ink-700 transition hover:border-brand-300"
            >
              {t.nav}
            </Link>
          ))}
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

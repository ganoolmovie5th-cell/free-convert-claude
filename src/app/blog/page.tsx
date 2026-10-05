import type { Metadata } from "next";
import Link from "next/link";
import SiteFooter from "@/components/SiteFooter";
import Breadcrumb from "@/components/Breadcrumb";
import { POSTS } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog & Panduan — Free Convert",
  description:
    "Panduan singkat seputar konversi dan kompres file: PDF, gambar, dan format umum lainnya.",
  alternates: { canonical: "/blog" },
};

export default function BlogIndex() {
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

      <section className="container-tight mt-6 max-w-2xl">
        <Breadcrumb
          items={[
            { name: "Beranda", href: "/" },
            { name: "Blog", href: "/blog" },
          ]}
        />
        <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-ink-900">
          Blog & Panduan
        </h1>
        <ul className="mt-8 space-y-5">
          {POSTS.map((p) => (
            <li
              key={p.slug}
              className="rounded-xl border border-black/5 bg-white/70 p-5 transition hover:border-brand-300"
            >
              <Link href={`/blog/${p.slug}`}>
                <h2 className="font-semibold text-ink-900">{p.title}</h2>
                <p className="mt-1 text-sm text-ink-500">{p.description}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <SiteFooter />
    </main>
  );
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import SiteFooter from "@/components/SiteFooter";
import Breadcrumb from "@/components/Breadcrumb";
import JsonLd from "@/components/JsonLd";
import { POSTS, postBySlug } from "@/lib/posts";

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = postBySlug(slug);
  if (!post) return {};
  return {
    title: `${post.title} — Free Convert`,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
  };
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = postBySlug(slug);
  if (!post) notFound();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: { "@type": "Organization", name: "Free Convert" },
  };

  return (
    <main className="min-h-screen pb-16">
      <JsonLd data={articleSchema} />
      <header className="container-tight flex items-center justify-between py-5">
        <Link href="/" className="flex items-center gap-2">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand-500 text-sm font-bold text-white">
            FC
          </span>
          <span className="font-bold text-ink-900">Free Convert</span>
        </Link>
        <Link
          href="/blog"
          className="rounded-lg border border-black/10 bg-white px-4 py-2 text-sm font-medium text-ink-700 hover:border-brand-300"
        >
          Semua Panduan
        </Link>
      </header>

      <article className="container-tight mt-6 max-w-2xl">
        <Breadcrumb
          items={[
            { name: "Beranda", href: "/" },
            { name: "Blog", href: "/blog" },
            { name: post.title, href: `/blog/${post.slug}` },
          ]}
        />
        <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-ink-900">
          {post.title}
        </h1>
        <div className="mt-6 space-y-4">
          {post.body.map((b, i) =>
            b.h ? (
              <h2 key={i} className="text-lg font-semibold text-ink-900">
                {b.h}
              </h2>
            ) : (
              <p key={i} className="leading-relaxed text-ink-700">
                {b.p}
              </p>
            ),
          )}
        </div>
      </article>

      <SiteFooter />
    </main>
  );
}

import Link from "next/link";
import JsonLd from "./JsonLd";

const BASE = "https://www.free-convert.web.id";

export interface Crumb {
  name: string;
  href: string;
}

export default function Breadcrumb({ items }: { items: Crumb[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: `${BASE}${c.href}`,
    })),
  };

  return (
    <nav aria-label="Breadcrumb" className="text-sm text-ink-500">
      <JsonLd data={schema} />
      <ol className="flex flex-wrap items-center gap-1">
        {items.map((c, i) => (
          <li key={c.href} className="flex items-center gap-1">
            {i < items.length - 1 ? (
              <>
                <Link href={c.href} className="hover:text-brand-700">
                  {c.name}
                </Link>
                <span aria-hidden>/</span>
              </>
            ) : (
              <span className="text-ink-700">{c.name}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

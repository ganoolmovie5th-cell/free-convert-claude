import Link from "next/link";

const LINKS = [
  { href: "/tentang", label: "Tentang" },
  { href: "/privasi", label: "Privasi" },
  { href: "/kontak", label: "Kontak" },
];

export default function SiteFooter() {
  return (
    <footer className="container-tight mt-20 border-t border-black/5 pt-8 text-center text-sm text-ink-500">
      <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
        {LINKS.map((l) => (
          <Link key={l.href} href={l.href} className="hover:text-ink-900">
            {l.label}
          </Link>
        ))}
      </nav>
      <p className="mt-4">
        © {new Date().getFullYear()} Free Convert · free-convert.web.id
      </p>
    </footer>
  );
}

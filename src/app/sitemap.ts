import type { MetadataRoute } from "next";
import { TOOLS } from "@/lib/tools";

const BASE = "https://www.free-convert.web.id";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticPaths = ["", "/tentang", "/privasi", "/kontak"];
  const toolPaths = TOOLS.map((t) => `/${t.slug}`);

  return [...staticPaths, ...toolPaths].map((p) => ({
    url: `${BASE}${p}`,
    lastModified: now,
    changeFrequency: p === "" ? "weekly" : "monthly",
    priority: p === "" ? 1 : 0.7,
  }));
}

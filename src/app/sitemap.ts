import type { MetadataRoute } from "next";
import { TOOLS } from "@/lib/tools";
import { POSTS } from "@/lib/posts";

const BASE = "https://www.free-convert.web.id";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticPaths = ["", "/blog", "/tentang", "/privasi", "/kontak"];
  const toolPaths = TOOLS.map((t) => `/${t.slug}`);
  const postPaths = POSTS.map((p) => `/blog/${p.slug}`);

  return [...staticPaths, ...toolPaths, ...postPaths].map((p) => ({
    url: `${BASE}${p}`,
    lastModified: now,
    changeFrequency: p === "" ? "weekly" : "monthly",
    priority: p === "" ? 1 : 0.7,
  }));
}

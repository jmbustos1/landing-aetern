import type { MetadataRoute } from "next";
import { CASES } from "./casos/data";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://aetern.dev";
  return [
    { url: `${base}/` },
    ...Object.keys(CASES).map((slug) => ({ url: `${base}/casos/${slug}/` })),
  ];
}

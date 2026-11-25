import type { MetadataRoute } from "next";
import { EDITIONS } from "@/data/editions";
import { NEWS_ARTICLES } from "@/data/news";
import { SITE_INFO } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE_INFO.domain;
  const staticRoutes = [
    "",
    "/a-propos",
    "/editions",
    "/participer",
    "/actualites",
    "/partenaires",
    "/mediatheque",
    "/contact",
  ].map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  const editionRoutes = EDITIONS.map((ed) => ({
    url: `${base}/editions/${ed.year}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: ed.isFeatured ? 0.9 : 0.7,
  }));

  const newsRoutes = NEWS_ARTICLES.map((art) => ({
    url: `${base}/actualites/${art.slug}`,
    lastModified: new Date(art.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...editionRoutes, ...newsRoutes];
}

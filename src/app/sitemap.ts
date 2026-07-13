import type { MetadataRoute } from "next";
import { getPublishedNews } from "@/lib/news-service";

const BASE = "https://iuce.usal.es";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/instituto`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/investigacion`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/transferencia`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/estadisticas`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/formacion`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/eventos`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE}/seminario-iuce`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/doctorado`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/noticias`, changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE}/contacto`, changeFrequency: "yearly", priority: 0.5 },
    { url: `${BASE}/politica-de-cookies`, changeFrequency: "yearly", priority: 0.1 },
    { url: `${BASE}/aviso-legal`, changeFrequency: "yearly", priority: 0.1 },
    { url: `${BASE}/accesibilidad`, changeFrequency: "yearly", priority: 0.1 },
  ];

  const news = await getPublishedNews();
  const newsRoutes: MetadataRoute.Sitemap = news.map((n) => ({
    url: `${BASE}/noticias/${n.slug}`,
    lastModified: new Date(n.publishedAt),
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...newsRoutes];
}

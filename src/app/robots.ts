import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // /miembros es el área privada del personal: fuera de los buscadores.
      disallow: ["/admin", "/api/", "/auth/", "/miembros"],
    },
    sitemap: "https://iuce.usal.es/sitemap.xml",
  };
}

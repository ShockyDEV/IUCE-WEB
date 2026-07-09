import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-guard";
import { slugify } from "@/lib/slugify";
import { NEWS_CATEGORIES } from "@/lib/content/news";

export const newsInputSchema = z.object({
  title: z.string().trim().min(3).max(300),
  slug: z.string().trim().max(300).optional(),
  excerpt: z.string().trim().max(1000).optional().nullable(),
  content: z.string().min(1),
  coverImage: z.string().trim().max(500).optional().nullable(),
  category: z.enum(NEWS_CATEGORIES),
  status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]),
  publishedAt: z.string().datetime().optional().nullable(),
});

/** Garantiza un slug único añadiendo -2, -3… si ya existe. */
async function uniqueSlug(base: string, excludeId?: string): Promise<string> {
  const slug = slugify(base) || "noticia";
  let candidate = slug;
  for (let i = 2; ; i++) {
    const existing = await prisma.news.findUnique({
      where: { slug: candidate },
    });
    if (!existing || existing.id === excludeId) return candidate;
    candidate = `${slug}-${i}`;
  }
}

export async function GET() {
  const guard = await requireAdmin();
  if (guard.response) return guard.response;

  const items = await prisma.news.findMany({
    orderBy: [{ publishedAt: { sort: "desc", nulls: "last" } }, { createdAt: "desc" }],
    select: {
      id: true,
      title: true,
      slug: true,
      category: true,
      status: true,
      publishedAt: true,
    },
  });
  return NextResponse.json({ items });
}

export async function POST(request: Request) {
  const guard = await requireAdmin();
  if (guard.response) return guard.response;

  const body = await request.json().catch(() => null);
  const parsed = newsInputSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.errors[0]?.message ?? "Datos no válidos" },
      { status: 400 },
    );
  }

  const data = parsed.data;
  const slug = await uniqueSlug(data.slug || data.title);

  const created = await prisma.news.create({
    data: {
      title: data.title,
      slug,
      excerpt: data.excerpt ?? null,
      content: data.content,
      coverImage: data.coverImage ?? null,
      category: data.category,
      status: data.status,
      publishedAt: data.publishedAt ? new Date(data.publishedAt) : null,
    },
  });
  return NextResponse.json({ item: created }, { status: 201 });
}

import type { Metadata } from "next";
import { Download, FileText, Lock } from "lucide-react";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { Reveal } from "@/components/ui/reveal";
import { RequestAccessForm } from "@/components/intranet/request-access-form";
import { IntranetSignOut } from "@/components/intranet/intranet-signout";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getBlock } from "@/lib/content-blocks-service";

export const metadata: Metadata = {
  title: "Intranet",
  description: "Intranet del IUCE: documentación interna para el personal autorizado.",
  robots: { index: false },
};

export const dynamic = "force-dynamic";

const INTRANET_ROLES = new Set(["INTRANET", "ADMIN", "SUPER_ADMIN"]);

function formatSize(bytes: number) {
  if (bytes >= 1024 * 1024)
    return `${(bytes / (1024 * 1024)).toFixed(1).replace(".", ",")} MB`;
  return `${Math.max(1, Math.round(bytes / 1024))} KB`;
}

export default async function IntranetPage() {
  const session = await auth();
  const role = session?.user?.role as string | undefined;
  const authorized = Boolean(session?.user && role && INTRANET_ROLES.has(role));

  // ── Sin sesión: formulario de acceso por magic link ────────────────────
  if (!authorized) {
    return (
      <section>
        <div className="mx-auto flex min-h-[60vh] max-w-6xl items-center justify-center px-6 py-16">
          <Reveal className="w-full max-w-[440px]">
            <div className="rounded-xl border border-gray-200 border-t-[3px] border-t-usal-red bg-surface-card p-8 shadow-sm">
              <div className="mb-6 flex flex-col items-center text-center">
                <span className="mb-3.5 flex h-12 w-12 items-center justify-center rounded-full bg-iuce-blue-pale text-ink">
                  <Lock className="h-5 w-5" aria-hidden="true" />
                </span>
                <h1 className="mb-1 text-2xl font-bold tracking-tight text-ink">
                  Intranet del IUCE
                </h1>
                <p className="text-sm text-gray-500">
                  Documentación interna para el personal autorizado
                </p>
              </div>
              <RequestAccessForm />
            </div>
          </Reveal>
        </div>
      </section>
    );
  }

  // ── Con sesión: contenido de la intranet ────────────────────────────────
  const [intro, documentos] = await Promise.all([
    getBlock("intranet", "intro"),
    prisma.intranetDocument.findMany({ orderBy: { createdAt: "desc" } }),
  ]);

  return (
    <>
      <section className="border-b border-gray-200 bg-surface-card">
        <div className="mx-auto max-w-6xl px-6 pb-10 pt-12">
          <div className="mb-3.5">
            <Breadcrumb
              items={[{ label: "Inicio", href: "/" }, { label: "Intranet" }]}
            />
          </div>
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="mb-2.5 text-xs font-bold uppercase tracking-wider text-usal-red">
                Intranet
              </p>
              <h1 className="mb-3.5 text-4xl font-bold leading-tight tracking-tight text-ink">
                Documentación interna
              </h1>
              <div
                className="page-block max-w-[70ch] text-base leading-relaxed text-gray-600"
                dangerouslySetInnerHTML={{ __html: intro }}
              />
            </div>
            <div className="flex flex-col items-end gap-2 pt-1">
              <p className="text-xs text-gray-400">{session?.user?.email}</p>
              <IntranetSignOut />
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-6xl px-6 pb-16 pt-12">
          <h2 className="mb-5 text-xl font-bold text-gray-900">
            Documentos ({documentos.length})
          </h2>
          {documentos.length === 0 ? (
            <p className="rounded-xl border border-dashed border-gray-300 px-6 py-10 text-center text-sm text-gray-400">
              Todavía no hay documentos publicados.
            </p>
          ) : (
            <div className="flex flex-col gap-3">
              {documentos.map((d, i) => (
                <Reveal key={d.id} delay={Math.min(i, 5) * 60}>
                  <article className="card-lift flex flex-col items-start gap-4 rounded-xl border border-gray-200 bg-surface-card px-[22px] py-[18px] shadow-sm hover:shadow-md sm:flex-row sm:items-center">
                    <span className="flex h-11 w-11 flex-none items-center justify-center rounded-md bg-iuce-blue-pale text-ink">
                      <FileText className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-base font-semibold text-gray-900">
                        {d.title}
                      </h3>
                      {d.description ? (
                        <p className="mt-0.5 text-sm leading-normal text-gray-600">
                          {d.description}
                        </p>
                      ) : null}
                      <p className="mt-1 text-xs text-gray-400">
                        {d.filename} · {formatSize(d.size)} ·{" "}
                        {new Intl.DateTimeFormat("es-ES", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        }).format(d.createdAt)}
                      </p>
                    </div>
                    <a
                      href={`/api/intranet/files/${d.id}`}
                      className="inline-flex h-10 flex-none items-center gap-2 rounded-md border border-gray-300 bg-surface-card px-4 text-sm font-medium text-gray-700 transition-colors hover:border-brand-400 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2"
                    >
                      <Download className="h-4 w-4" aria-hidden="true" />
                      Descargar
                    </a>
                  </article>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

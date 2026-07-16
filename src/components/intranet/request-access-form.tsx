"use client";

import { useState } from "react";
import Link from "next/link";
import { KeyRound, MailCheck, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";

const inputClass =
  "h-11 w-full rounded-md border border-gray-300 bg-surface-card px-3 text-sm text-gray-900 outline-none transition-colors focus:border-iuce-blue focus:ring-2 focus:ring-iuce-blue/25";

type Status =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "sent"; devLink?: string }
  | { kind: "unauthorized"; message: string }
  | { kind: "error"; message: string };

/**
 * Formulario de acceso al área de miembros: pide el correo y solicita el magic
 * link. Si el correo no está en la lista blanca, muestra el aviso con el
 * contacto de iuce.tecnico@usal.es.
 */
export function RequestAccessForm() {
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const email = new FormData(e.currentTarget).get("email");
    setStatus({ kind: "sending" });
    try {
      const res = await fetch("/api/intranet/request-link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const json = await res.json().catch(() => ({}));
      if (res.status === 403) {
        setStatus({
          kind: "unauthorized",
          message: json.error ?? "No estás autorizado aún.",
        });
        return;
      }
      if (!res.ok) {
        throw new Error(json.error ?? "No se pudo enviar el enlace");
      }
      setStatus({ kind: "sent", devLink: json.devLink });
    } catch (err) {
      setStatus({
        kind: "error",
        message:
          err instanceof Error ? err.message : "No se pudo enviar el enlace",
      });
    }
  }

  if (status.kind === "sent") {
    return (
      <div className="flex flex-col items-start gap-3" role="status">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-success-50 text-success-700">
          <MailCheck className="h-5 w-5" aria-hidden="true" />
        </span>
        <h2 className="text-lg font-bold text-gray-900">
          Revisa tu correo
        </h2>
        <p className="text-sm leading-relaxed text-gray-600">
          Te hemos enviado un enlace de acceso. Caduca en 30 minutos y solo
          funciona una vez. Si no lo encuentras, mira en la carpeta de spam.
        </p>
        {status.devLink ? (
          <p className="rounded-md border border-dashed border-gray-300 px-3 py-2 text-xs text-gray-500">
            <span className="font-bold">MODO DESARROLLO</span> — enlace:{" "}
            <Link
              href={status.devLink}
              className="break-all text-iuce-blue hover:underline"
            >
              {status.devLink}
            </Link>
          </p>
        ) : null}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setStatus({ kind: "idle" })}
        >
          Enviar de nuevo
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <label
          htmlFor="intranet-email"
          className="text-[13px] font-medium text-gray-700"
        >
          Correo electrónico
        </label>
        <input
          id="intranet-email"
          name="email"
          type="email"
          required
          placeholder="tu@usal.es"
          autoComplete="email"
          className={inputClass}
        />
      </div>

      {status.kind === "unauthorized" ? (
        <div
          role="alert"
          className="flex items-start gap-2.5 rounded-md border border-warning-500/40 bg-warning-50 px-3.5 py-3"
        >
          <ShieldAlert
            className="mt-0.5 h-4 w-4 flex-none text-warning-700"
            aria-hidden="true"
          />
          <p className="text-sm leading-relaxed text-warning-700">
            {status.message.includes("iuce.tecnico") ? (
              <>
                No estás autorizado aún. Para solicitar acceso al área de miembros,
                escribe a{" "}
                <a
                  href="mailto:iuce.tecnico@usal.es"
                  className="font-semibold underline"
                >
                  iuce.tecnico@usal.es
                </a>
                .
              </>
            ) : (
              status.message
            )}
          </p>
        </div>
      ) : null}

      {status.kind === "error" ? (
        <p
          role="alert"
          className="rounded-md border border-danger-500/30 bg-danger-50 px-3.5 py-2.5 text-sm text-danger-700"
        >
          {status.message}
        </p>
      ) : null}

      <Button
        type="submit"
        size="lg"
        className="w-full gap-2"
        disabled={status.kind === "sending"}
      >
        <KeyRound className="h-4 w-4" aria-hidden="true" />
        {status.kind === "sending"
          ? "Enviando enlace…"
          : "Enviarme el enlace de acceso"}
      </Button>

      <p className="text-xs leading-relaxed text-gray-500">
        El acceso está restringido al personal autorizado por el IUCE.
        Recibirás un enlace de un solo uso, válido durante 30 minutos.
      </p>
    </form>
  );
}

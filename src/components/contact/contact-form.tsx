"use client";

import { useState } from "react";
import { MailCheck } from "lucide-react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { CONTACT_SUBJECTS } from "@/lib/validations";

const inputClass =
  "h-[42px] rounded-md border border-gray-300 bg-surface-card px-3 text-sm text-gray-900 outline-none transition-colors focus:border-iuce-blue focus:ring-2 focus:ring-iuce-blue/25";

const labelClass = "text-sm font-medium text-gray-700";

function Required() {
  return (
    <span className="text-usal-red" aria-hidden="true">
      {" "}
      *
    </span>
  );
}

/**
 * Formulario «Escríbenos» de la página de contacto. Envía a /api/contact,
 * que registra el mensaje y lo remite a la Secretaría por email.
 */
export function ContactForm() {
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    setSending(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          subject: data.get("subject"),
          message: data.get("message"),
          gdpr: data.get("gdpr") === "on",
        }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(json.error ?? "No se pudo enviar el mensaje");
      }
      setSent(true);
      form.reset();
      toast.success("Mensaje enviado. Te responderemos en 2–3 días hábiles.");
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "No se pudo enviar el mensaje",
      );
    } finally {
      setSending(false);
    }
  }

  if (sent) {
    return (
      <div
        className="flex flex-col items-start gap-3 rounded-xl border border-gray-200 bg-surface-card p-8 shadow-sm"
        role="status"
      >
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-success-50 text-success-700">
          <MailCheck className="h-5 w-5" aria-hidden="true" />
        </span>
        <h2 className="text-xl font-bold text-gray-900">Mensaje enviado</h2>
        <p className="text-sm leading-relaxed text-gray-600">
          Gracias por escribirnos. La Secretaría del IUCE te responderá en un
          plazo de 2–3 días hábiles. Recibirás una copia en tu correo.
        </p>
        <Button variant="outline" size="sm" onClick={() => setSent(false)}>
          Enviar otro mensaje
        </Button>
      </div>
    );
  }

  return (
    <form
      aria-label="Formulario de contacto"
      onSubmit={handleSubmit}
      className="flex flex-col gap-[18px] rounded-xl border border-gray-200 bg-surface-card p-8 shadow-sm"
    >
      <div>
        <h2 className="mb-1 text-xl font-bold text-gray-900">Escríbenos</h2>
        <p className="text-sm text-gray-500">
          Te responderemos en un plazo de 2–3 días hábiles.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="c-nombre" className={labelClass}>
            Nombre y apellidos
            <Required />
          </label>
          <input
            id="c-nombre"
            name="name"
            type="text"
            required
            autoComplete="name"
            className={inputClass}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="c-email" className={labelClass}>
            Correo electrónico
            <Required />
          </label>
          <input
            id="c-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className={inputClass}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="c-asunto" className={labelClass}>
          Asunto
          <Required />
        </label>
        <select id="c-asunto" name="subject" required className={inputClass}>
          {CONTACT_SUBJECTS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="c-mensaje" className={labelClass}>
          Mensaje
          <Required />
        </label>
        <textarea
          id="c-mensaje"
          name="message"
          rows={6}
          required
          minLength={10}
          className="resize-y rounded-md border border-gray-300 bg-surface-card p-3 text-sm text-gray-900 outline-none transition-colors focus:border-iuce-blue focus:ring-2 focus:ring-iuce-blue/25"
        />
      </div>

      <div className="flex items-start gap-2.5">
        <input
          id="c-rgpd"
          name="gdpr"
          type="checkbox"
          required
          className="mt-[3px] h-4 w-4 accent-iuce-blue-dark"
        />
        <label
          htmlFor="c-rgpd"
          className="text-xs leading-relaxed text-gray-500"
        >
          He leído y acepto la{" "}
          <a href="#" className="text-iuce-blue hover:underline">
            política de privacidad
          </a>
          . Los datos se tratarán únicamente para responder a esta consulta,
          conforme al RGPD y a la normativa de protección de datos de la
          Universidad de Salamanca.
          <Required />
        </label>
      </div>

      <div className="flex items-center gap-3.5 pt-1.5">
        <Button type="submit" size="lg" disabled={sending}>
          {sending ? "Enviando…" : "Enviar mensaje"}
        </Button>
        <span className="inline-flex items-center gap-1.5 text-xs text-gray-400">
          <MailCheck className="h-3.5 w-3.5" aria-hidden="true" />
          Recibirás copia en tu correo
        </span>
      </div>
    </form>
  );
}

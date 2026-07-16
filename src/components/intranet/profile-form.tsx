"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Camera, UserRound } from "lucide-react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";

const inputClass =
  "h-10 w-full rounded-md border border-gray-300 bg-surface-card px-3 text-sm text-gray-900 outline-none transition-colors focus:border-iuce-blue focus:ring-2 focus:ring-iuce-blue/25";

const labelClass = "text-[13px] font-medium text-gray-700";

interface AccountData {
  email: string;
  name: string;
  lastLogin: string | null; // ISO
}

interface MemberData {
  name: string;
  role: string | null;
  group: string | null;
  area: string;
  photo: string | null;
  orcid: string;
  portalUrl: string;
}

/**
 * Formulario del perfil de intranet: nombre de la cuenta y, si el usuario
 * es miembro del IUCE, su ficha pública (foto, área, ORCID, portal). Los
 * cambios se reflejan al momento en la web pública (Instituto → Miembros).
 */
export function ProfileForm({
  account,
  member,
}: Readonly<{ account: AccountData; member: MemberData | null }>) {
  const router = useRouter();
  const fileInput = useRef<HTMLInputElement>(null);
  const [accountName, setAccountName] = useState(account.name);
  const [area, setArea] = useState(member?.area ?? "");
  const [orcid, setOrcid] = useState(member?.orcid ?? "");
  const [portalUrl, setPortalUrl] = useState(member?.portalUrl ?? "");
  const [photo, setPhoto] = useState(member?.photo ?? null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  async function handleSave(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch("/api/intranet/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          accountName: accountName.trim() || null,
          area,
          orcid: orcid.trim(),
          portalUrl: portalUrl.trim(),
        }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error ?? "No se pudo guardar");
      toast.success("Perfil guardado");
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "No se pudo guardar");
    } finally {
      setSaving(false);
    }
  }

  async function handlePhoto(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const form = new FormData();
      form.append("file", file);
      const res = await fetch("/api/intranet/profile/photo", {
        method: "POST",
        body: form,
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error ?? "No se pudo subir la foto");
      setPhoto(json.photo);
      toast.success("Foto actualizada");
      router.refresh();
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "No se pudo subir la foto",
      );
    } finally {
      setUploading(false);
      if (fileInput.current) fileInput.current.value = "";
    }
  }

  return (
    <form
      onSubmit={handleSave}
      className="mx-auto flex max-w-[720px] flex-col gap-6"
    >
      {/* Cuenta */}
      <section className="rounded-xl border border-gray-200 bg-surface-card p-6 shadow-sm">
        <h2 className="mb-4 text-base font-bold text-gray-900">Mi cuenta</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-2">
            <label htmlFor="p-email" className={labelClass}>
              Correo electrónico
            </label>
            <input
              id="p-email"
              type="email"
              value={account.email}
              disabled
              className={inputClass + " cursor-not-allowed opacity-60"}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="p-name" className={labelClass}>
              Nombre para mostrar
            </label>
            <input
              id="p-name"
              type="text"
              value={accountName}
              onChange={(e) => setAccountName(e.target.value)}
              placeholder="Tu nombre"
              className={inputClass}
            />
          </div>
        </div>
        {account.lastLogin ? (
          <p className="mt-3 text-xs text-gray-500">
            Último acceso:{" "}
            {new Intl.DateTimeFormat("es-ES", {
              day: "numeric",
              month: "long",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            }).format(new Date(account.lastLogin))}
          </p>
        ) : null}
      </section>

      {/* Ficha pública del miembro */}
      {member ? (
        <section className="rounded-xl border border-gray-200 bg-surface-card p-6 shadow-sm">
          <h2 className="mb-1 text-base font-bold text-gray-900">
            Mi ficha pública
          </h2>
          <p className="mb-5 text-[13px] leading-relaxed text-gray-500">
            Es la ficha que aparece en la web pública (Instituto → Miembros).
            Los cambios se publican al guardar.
          </p>

          <div className="mb-5 flex items-center gap-5">
            <div className="relative h-24 w-24 flex-none overflow-hidden rounded-full border border-gray-200 bg-iuce-blue-pale">
              {photo ? (
                <Image
                  src={photo}
                  alt={`Foto de ${member.name}`}
                  fill
                  sizes="96px"
                  className="object-cover"
                />
              ) : (
                <span className="flex h-full w-full items-center justify-center text-ink">
                  <UserRound className="h-10 w-10" aria-hidden="true" />
                </span>
              )}
            </div>
            <div>
              <p className="text-base font-semibold text-gray-900">
                {member.name}
              </p>
              <p className="mb-2 text-xs text-gray-500">
                {[member.role, member.group].filter(Boolean).join(" · ") ||
                  "Miembro del IUCE"}
              </p>
              <input
                ref={fileInput}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handlePhoto}
                className="hidden"
                id="p-photo"
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="gap-1.5"
                disabled={uploading}
                onClick={() => fileInput.current?.click()}
              >
                <Camera className="h-3.5 w-3.5" aria-hidden="true" />
                {uploading ? "Subiendo…" : "Cambiar foto"}
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="p-area" className={labelClass}>
                Área / departamento
              </label>
              <input
                id="p-area"
                type="text"
                value={area}
                onChange={(e) => setArea(e.target.value)}
                placeholder="P. ej. Didáctica, Organización y Métodos de Investigación"
                className={inputClass}
              />
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <label htmlFor="p-orcid" className={labelClass}>
                  ORCID (URL)
                </label>
                <input
                  id="p-orcid"
                  type="url"
                  value={orcid}
                  onChange={(e) => setOrcid(e.target.value)}
                  placeholder="https://orcid.org/0000-0000-0000-0000"
                  className={inputClass}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="p-portal" className={labelClass}>
                  Producción científica (URL)
                </label>
                <input
                  id="p-portal"
                  type="url"
                  value={portalUrl}
                  onChange={(e) => setPortalUrl(e.target.value)}
                  placeholder="https://produccioncientifica.usal.es/investigadores/…"
                  className={inputClass}
                />
              </div>
            </div>
          </div>

          <p className="mt-4 text-xs leading-relaxed text-gray-500">
            Para corregir tu nombre público o tu grupo de investigación,
            escribe a{" "}
            <a
              href="mailto:iuce.tecnico@usal.es"
              className="text-iuce-blue hover:underline"
            >
              iuce.tecnico@usal.es
            </a>
            .
          </p>
        </section>
      ) : (
        <section className="rounded-xl border border-dashed border-gray-300 p-6 text-sm text-gray-500">
          Tu correo no corresponde a ninguna ficha de miembro del IUCE, así
          que no hay ficha pública que editar. Si crees que es un error,
          escribe a{" "}
          <a
            href="mailto:iuce.tecnico@usal.es"
            className="text-iuce-blue hover:underline"
          >
            iuce.tecnico@usal.es
          </a>
          .
        </section>
      )}

      <div>
        <Button type="submit" size="lg" disabled={saving}>
          {saving ? "Guardando…" : "Guardar cambios"}
        </Button>
      </div>
    </form>
  );
}

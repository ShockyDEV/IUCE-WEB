"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { KeyRound, Loader2, ShieldAlert } from "lucide-react";
import { buttonClassName } from "@/components/ui/button";

/**
 * Canjea el token del magic link: inicia la sesión de intranet y redirige.
 * Si el enlace caducó o ya se usó, ofrece pedir uno nuevo.
 */
function AccesoInner() {
  const router = useRouter();
  const params = useSearchParams();
  const [error, setError] = useState(false);
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;

    const token = params.get("token");
    const email = params.get("email");
    if (!token || !email) {
      setError(true);
      return;
    }
    signIn("intranet", { email, token, redirect: false }).then((res) => {
      if (res?.error) {
        setError(true);
        return;
      }
      router.replace("/intranet");
      router.refresh();
    });
  }, [params, router]);

  return (
    <section>
      <div className="mx-auto flex min-h-[60vh] max-w-6xl items-center justify-center px-6 py-16">
        <div className="w-full max-w-[440px] rounded-xl border border-gray-200 border-t-[3px] border-t-usal-red bg-surface-card p-8 text-center shadow-sm">
          {error ? (
            <>
              <span className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-danger-50 text-danger-700">
                <ShieldAlert className="h-5 w-5" aria-hidden="true" />
              </span>
              <h1 className="mb-2 text-xl font-bold text-ink">
                Enlace no válido
              </h1>
              <p className="mb-6 text-sm leading-relaxed text-gray-600">
                El enlace de acceso ha caducado o ya se ha utilizado (cada
                enlace funciona una sola vez y durante 30 minutos). Solicita
                uno nuevo con tu correo autorizado.
              </p>
              <Link
                href="/intranet"
                className={buttonClassName({ size: "lg" }) + " gap-2"}
              >
                <KeyRound className="h-4 w-4" aria-hidden="true" />
                Pedir un enlace nuevo
              </Link>
            </>
          ) : (
            <>
              <Loader2
                className="mx-auto mb-4 h-8 w-8 animate-spin text-iuce-blue"
                aria-hidden="true"
              />
              <h1 className="mb-2 text-xl font-bold text-ink">
                Comprobando tu acceso…
              </h1>
              <p className="text-sm text-gray-500">
                Un momento, estamos validando tu enlace.
              </p>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

export default function AccesoPage() {
  return (
    <Suspense>
      <AccesoInner />
    </Suspense>
  );
}

"use client";

import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

/** Cierre de sesión del área de miembros (vuelve a la portada de acceso). */
export function IntranetSignOut() {
  return (
    <Button
      variant="outline"
      size="sm"
      className="gap-1.5"
      onClick={() => signOut({ callbackUrl: "/miembros" })}
    >
      <LogOut className="h-3.5 w-3.5" aria-hidden="true" />
      Cerrar sesión
    </Button>
  );
}

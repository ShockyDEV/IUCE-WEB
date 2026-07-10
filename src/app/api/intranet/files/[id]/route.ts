import { NextResponse } from "next/server";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const INTRANET_ROLES = new Set(["INTRANET", "ADMIN", "SUPER_ADMIN"]);

/**
 * Descarga de documentos de la intranet. Los archivos viven FUERA de
 * public/ (storage/intranet), así que solo se sirven por aquí y únicamente
 * con sesión (el middleware ya lo exige; se re-verifica por defensa en
 * profundidad).
 */
export async function GET(
  _request: Request,
  { params }: { params: { id: string } },
) {
  const session = await auth();
  const role = session?.user?.role as string | undefined;
  if (!session?.user || !role || !INTRANET_ROLES.has(role)) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const doc = await prisma.intranetDocument.findUnique({
    where: { id: params.id },
  });
  if (!doc) {
    return NextResponse.json(
      { error: "Documento no encontrado" },
      { status: 404 },
    );
  }

  // storedName lo genera el servidor (nunca el cliente); basename como
  // salvaguarda adicional contra path traversal.
  const filePath = path.join(
    process.cwd(),
    "storage",
    "intranet",
    path.basename(doc.storedName),
  );

  try {
    const buffer = await readFile(filePath);
    return new NextResponse(new Uint8Array(buffer), {
      headers: {
        "Content-Type": doc.mimeType,
        "Content-Length": String(buffer.byteLength),
        "Content-Disposition": `attachment; filename*=UTF-8''${encodeURIComponent(doc.filename)}`,
        "Cache-Control": "private, no-store",
      },
    });
  } catch {
    return NextResponse.json(
      { error: "El archivo no está disponible" },
      { status: 404 },
    );
  }
}

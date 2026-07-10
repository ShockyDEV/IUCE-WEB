import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import * as bcrypt from "bcryptjs";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { authConfig } from "@/auth.config";

const credentialsSchema = z.object({
  email: z.string().trim().toLowerCase().email(),
  password: z.string().min(1),
});

const intranetSchema = z.object({
  email: z.string().trim().toLowerCase().email(),
  token: z.string().min(16),
});

/**
 * NextAuth v5 con provider Credentials (email + contraseña).
 *
 * Decisión del proyecto (ver docs/design/HANDOFF.md): NO hay magic link ni
 * auto-registro. Solo pueden entrar las cuentas dadas de alta por el rol
 * SUPER_ADMIN desde Configuración. Hash de contraseñas con bcrypt.
 */
export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      name: "IUCE",
      credentials: {
        email: { label: "Correo electrónico", type: "email" },
        password: { label: "Contraseña", type: "password" },
      },
      async authorize(credentials) {
        const parsed = credentialsSchema.safeParse(credentials);
        if (!parsed.success) return null;

        const { email, password } = parsed.data;
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) return null;

        const valid = await bcrypt.compare(password, user.passwordHash);
        if (!valid) return null;

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        };
      },
    }),

    // Intranet: verificación del token del magic link (un solo uso, 30 min).
    // El token lo emite POST /api/intranet/request-link para los correos de
    // la lista blanca (IntranetUser). La sesión resultante lleva rol
    // INTRANET, sin acceso al panel de administración.
    Credentials({
      id: "intranet",
      name: "Intranet IUCE",
      credentials: {
        email: { label: "Correo electrónico", type: "email" },
        token: { label: "Token", type: "text" },
      },
      async authorize(credentials) {
        const parsed = intranetSchema.safeParse(credentials);
        if (!parsed.success) return null;

        const { email, token } = parsed.data;
        const record = await prisma.intranetToken.findUnique({
          where: { token },
        });
        if (
          !record ||
          record.identifier !== email ||
          record.expires < new Date()
        ) {
          return null;
        }
        // Un solo uso: se elimina al canjearlo.
        await prisma.intranetToken.delete({ where: { token } });

        const user = await prisma.intranetUser.findUnique({
          where: { email },
        });
        if (!user || !user.active) return null;

        await prisma.intranetUser.update({
          where: { id: user.id },
          data: { lastLogin: new Date() },
        });

        return {
          id: user.id,
          email: user.email,
          name: user.name ?? user.email,
          role: "INTRANET",
        };
      },
    }),
  ],
});

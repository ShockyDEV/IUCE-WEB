import type { Metadata } from "next";
import "./globals.css";
import { ThemeScript } from "@/components/theme-script";
import { getLocale } from "@/lib/locale-server";
import { ToastProvider } from "@/components/toast-provider";

export const metadata: Metadata = {
  metadataBase: new URL("https://iuce.usal.es"),
  title: {
    default: "IUCE - Instituto Universitario de Ciencias de la Educación",
    template: "%s | IUCE",
  },
  description:
    "Instituto Universitario de Ciencias de la Educación (IUCE) de la Universidad de Salamanca: investigación e innovación en Educación Superior, formación del profesorado, doctorado y publicaciones.",
};

// Datos estructurados de la organización (Google, agregadores académicos).
const ORGANIZATION_JSONLD = {
  "@context": "https://schema.org",
  "@type": "ResearchOrganization",
  name: "Instituto Universitario de Ciencias de la Educación",
  alternateName: "IUCE",
  url: "https://iuce.usal.es",
  logo: "https://iuce.usal.es/images/iuce-logo.png",
  email: "iuce@usal.es",
  telephone: "+34923294634",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Paseo de Canalejas, 169. Edificio Solís, 1.ª planta",
    addressLocality: "Salamanca",
    postalCode: "37008",
    addressCountry: "ES",
  },
  parentOrganization: {
    "@type": "CollegeOrUniversity",
    name: "Universidad de Salamanca",
    url: "https://www.usal.es",
  },
  sameAs: ["https://ror.org/00xnj6419", "https://twitter.com/IUCE_USAL"],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang={getLocale()} suppressHydrationWarning>
      <body className="min-h-screen bg-surface-page text-gray-600 antialiased">
        <ThemeScript />
        {children}
        <ToastProvider />
        <script
          type="application/ld+json"
          // Contenido estático definido arriba; no incluye datos de usuario.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANIZATION_JSONLD) }}
        />
      </body>
    </html>
  );
}

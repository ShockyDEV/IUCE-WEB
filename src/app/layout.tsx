import type { Metadata } from "next";
import "./globals.css";
import { ThemeScript } from "@/components/theme-script";
import { ToastProvider } from "@/components/toast-provider";

export const metadata: Metadata = {
  metadataBase: new URL("https://iuce.usal.es"),
  title: {
    default: "IUCE — Instituto Universitario de Ciencias de la Educación",
    template: "%s | IUCE",
  },
  description:
    "Instituto Universitario de Ciencias de la Educación (IUCE) de la Universidad de Salamanca: investigación e innovación en Educación Superior, formación del profesorado, doctorado y publicaciones.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className="min-h-screen bg-surface-page text-gray-600 antialiased">
        <ThemeScript />
        {children}
        <ToastProvider />
      </body>
    </html>
  );
}

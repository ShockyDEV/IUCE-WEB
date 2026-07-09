import { SiteHeader } from "@/components/layout/site-header";
import { InstitutionalFooter } from "@/components/layout/institutional-footer";

export default function PublicLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <a
        href="#contenido"
        className="sr-only rounded-br-lg bg-ink px-[18px] py-2.5 text-sm text-white focus:not-sr-only focus:absolute focus:left-0 focus:top-0 focus:z-[100]"
      >
        Saltar al contenido principal
      </a>
      <SiteHeader />
      <main id="contenido">{children}</main>
      <InstitutionalFooter />
    </>
  );
}

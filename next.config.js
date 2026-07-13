/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Las imágenes migradas ya están acotadas a ≤1600px (sharp en la
    // migración); sin esto, next/image genera variantes de hasta 3840px
    // que solo desperdician CPU y disco.
    deviceSizes: [640, 750, 828, 1080, 1200, 1600],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          // El navegador no debe adivinar tipos MIME (previene sniffing).
          { key: "X-Content-Type-Options", value: "nosniff" },
          // La web no se puede embeber en iframes de otros sitios
          // (clickjacking); los embeds PROPIOS (PDF) son same-origin.
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          // No filtrar la URL completa a sitios externos.
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          // La web no usa cámara, micrófono ni geolocalización.
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      // La «intranet» pasó a llamarse área de miembros (/miembros). La
      // redirección conserva la query, así que los magic links antiguos
      // (/intranet/acceso?token=…) siguen funcionando.
      {
        source: "/intranet/:path*",
        destination: "/miembros/:path*",
        permanent: true,
      },
      { source: "/intranet", destination: "/miembros", permanent: true },

      // ── Redirecciones de la web antigua (WordPress, 2010-2026) ─────────
      // Las 212 noticias vivían en /blog/AAAA/MM/DD/slug/ y conservan el
      // mismo slug en /noticias/slug: una regla las cubre todas.
      {
        source: "/blog/:year(\\d{4})/:month(\\d{2})/:day(\\d{2})/:slug",
        destination: "/noticias/:slug",
        permanent: true,
      },
      { source: "/blog", destination: "/noticias", permanent: true },
      { source: "/category/:cat*", destination: "/noticias", permanent: true },
      { source: "/tag/:tag*", destination: "/noticias", permanent: true },
      // El feed RSS de WordPress ahora es /feed.xml
      { source: "/feed", destination: "/feed.xml", permanent: true },
      { source: "/feed/:path*", destination: "/feed.xml", permanent: true },
      // Páginas antiguas → su nueva ubicación
      { source: "/perfil", destination: "/instituto", permanent: true },
      { source: "/equipo", destination: "/instituto#equipo", permanent: true },
      { source: "/como-llegar", destination: "/contacto", permanent: true },
      { source: "/espacios", destination: "/instituto#instalaciones", permanent: true },
      { source: "/edificio-historico", destination: "/instituto#edificio", permanent: true },
      { source: "/revista-eks", destination: "/investigacion#publicaciones", permanent: true },
      { source: "/publicaciones", destination: "/investigacion#publicaciones", permanent: true },
      {
        source: "/formacion-inicial-castilla-y-leon",
        destination: "/formacion#inicial",
        permanent: true,
      },
      // Microsite del I Encuentro BPD-IA (evento de sept-2025) → su crónica
      {
        source: "/:bpd(i-encuentro-bpd-ia|que-es-el-i-encuentro-bpd-ia|programa-del-i-encuentro-bpd-ia|inscripcion-al-encuentro|normas-para-autores)",
        destination: "/noticias/i-encuentro-de-buenas-practicas-docentes-con-ia",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;

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
    ];
  },
};

module.exports = nextConfig;

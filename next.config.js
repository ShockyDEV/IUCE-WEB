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

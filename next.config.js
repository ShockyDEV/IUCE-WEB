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
};

module.exports = nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
  },
  async redirects() {
    return [
      { source: "/teenused/", destination: "/teenused", permanent: true },
      { source: "/tehtud-tood/", destination: "/tehtud-tood", permanent: true },
      { source: "/kontakt/", destination: "/kontakt", permanent: true },
      { source: "/jarelmaks", destination: "/remondilaen", permanent: true },
      { source: "/jarelmaks/", destination: "/remondilaen", permanent: true },
      { source: "/hinnad", destination: "/pur-vahu-hind", permanent: true },
      { source: "/hinnad/", destination: "/pur-vahu-hind", permanent: true },
      { source: "/materjalid/", destination: "/materjalid", permanent: true },
      { source: "/remondilaen/", destination: "/remondilaen", permanent: true },
    ];
  },
};

export default nextConfig;

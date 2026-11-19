import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.brand,
    short_name: "Manjula Bridal",
    description: site.description,
    start_url: "/",
    display: "standalone",
    background_color: "#fffdf9",
    theme_color: "#1f1c18",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}

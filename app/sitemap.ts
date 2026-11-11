import type { MetadataRoute } from "next";
import { services, site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/about", "/services", "/pricing", "/gallery", "/experience", "/contact"];
  return [
    ...pages.map((path) => ({
      url: `${site.url}${path}`,
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.8,
    })),
    ...services.map((s) => ({
      url: `${site.url}/services/${s.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}

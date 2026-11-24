import type { MetadataRoute } from "next";

const BASE_URL = process.env.SITE_URL ?? "https://nursultan-nurgali.onrender.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}

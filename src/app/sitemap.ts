import type { MetadataRoute } from "next";

const BASE_URL = process.env.SITE_URL ?? "https://nursultan-nurgali.onrender.com";
const ROUTES = ["/", "/about", "/interests", "/future-plans", "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: route === "/" ? 1 : 0.7,
  }));
}

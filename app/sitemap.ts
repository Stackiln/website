import type { MetadataRoute } from "next";
import { docs } from "@/lib/docs";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://stackiln.com", changeFrequency: "weekly", priority: 1 },
    {
      url: "https://stackiln.com/docs",
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...docs.map((doc) => ({
      url: `https://stackiln.com/docs/${doc.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}

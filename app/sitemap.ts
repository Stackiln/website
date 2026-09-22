import type { MetadataRoute } from "next";
import { docs } from "@/lib/docs";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://stackiln.com", changeFrequency: "weekly", priority: 1 },
    {
      url: "https://docs.stackiln.com",
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...docs.map((doc) => ({
      url: `https://docs.stackiln.com/${doc.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}

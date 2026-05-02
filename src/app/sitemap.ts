import type { MetadataRoute } from "next";
import { fetchBlogs } from "../lib/fetchBlogs";
import { absoluteUrl } from "../lib/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blogs = await fetchBlogs();

  return [
    {
      url: absoluteUrl("/blog"),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...blogs.map((blog) => ({
      url: absoluteUrl(`/blog/${blog.slug}`),
      lastModified: blog.publishDate ? new Date(blog.publishDate) : new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.6,
    })),
  ];
}
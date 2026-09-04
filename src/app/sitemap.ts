import type { MetadataRoute } from "next";
import { fetchBlogs } from "../lib/fetchBlogs";
import { fetchProjects } from "../lib/fetchProjects";
import { fetchCaseStudies } from "../lib/fetchCaseStudies";
import { absoluteUrl } from "../lib/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [blogs, projects, caseStudies] = await Promise.all([
    fetchBlogs(),
    fetchProjects(),
    fetchCaseStudies(),
  ]);

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl("/"),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: absoluteUrl("/about"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: absoluteUrl("/team"),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: absoluteUrl("/services-details"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: absoluteUrl("/healthcare-automation"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: absoluteUrl("/case-studies"),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: absoluteUrl("/projects"),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: absoluteUrl("/contact"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: absoluteUrl("/blog"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];

  return [
    ...staticRoutes,
    ...blogs.map((blog) => ({
      url: absoluteUrl(`/blog/${blog.slug}`),
      lastModified: blog.updatedAt || blog.publishDate ? new Date(blog.updatedAt || blog.publishDate) : undefined,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    })),
    ...projects.filter((project) => Boolean(project.slug)).map((project) => ({
      url: absoluteUrl(`/projects/${project.slug}`),
      lastModified: project.updated ? new Date(project.updated) : undefined,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...caseStudies.filter((study) => Boolean(study.slug)).map((study) => ({
      url: absoluteUrl(`/case-studies/${study.slug}`),
      lastModified: study.updatedAt ? new Date(study.updatedAt) : undefined,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}

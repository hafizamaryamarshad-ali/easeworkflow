import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProjectDetailClient from "./ProjectDetailClient";
import { fetchProjectBySlug } from "../../../lib/fetchProjects";
import { absoluteUrl, buildPageMetadata } from "../../../lib/seo";

type PageProps = { params: Promise<{ projectId: string }> };

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { projectId } = await params;
  const project = await fetchProjectBySlug(projectId);
  if (!project) return { title: "Project Not Found | EaseWorkflow", robots: { index: false, follow: true } };

  return buildPageMetadata({
    title: project.metaTitle || `${project.title} | EaseWorkflow`,
    description: project.metaDescription || project.shortDesc || project.title,
    path: `/projects/${project.slug}`,
    imageUrl: project.thumbnailUrl,
    imageAlt: project.title,
    type: "article",
  });
}

export default async function ProjectPage({ params }: PageProps) {
  const { projectId } = await params;
  const project = await fetchProjectBySlug(projectId);
  if (!project) notFound();

  const canonicalUrl = absoluteUrl(`/projects/${project.slug}`);
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
          { "@type": "ListItem", position: 2, name: "Projects", item: absoluteUrl("/projects") },
          { "@type": "ListItem", position: 3, name: project.title, item: canonicalUrl },
        ],
      },
      {
        "@type": "CreativeWork",
        name: project.title,
        headline: project.metaTitle || project.title,
        description: project.metaDescription || project.shortDesc,
        url: canonicalUrl,
        image: project.thumbnailUrl || undefined,
        dateModified: project.updated || undefined,
        keywords: project.tags?.join(", ") || undefined,
        creator: { "@type": "Organization", name: "EaseWorkflow", url: absoluteUrl("/") },
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ProjectDetailClient initialProject={project} />
    </>
  );
}

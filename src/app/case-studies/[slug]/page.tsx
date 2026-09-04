import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CaseStudyDetailClient from "./CaseStudyDetailClient";
import { fetchCaseStudies } from "../../../lib/fetchCaseStudies";
import { absoluteUrl, buildPageMetadata } from "../../../lib/seo";

type PageProps = { params: Promise<{ slug: string }> };

export const dynamic = "force-dynamic";

const toPlainText = (blocks: unknown): string =>
  Array.isArray(blocks)
    ? blocks
        .flatMap((block) =>
          block && Array.isArray(block.children)
            ? block.children.map((child: { text?: string }) => child.text || "")
            : [],
        )
        .join(" ")
        .trim()
    : "";

const getStudy = async (slug: string) => {
  const studies = await fetchCaseStudies();
  return studies.find((study) => study.slug === slug) ?? null;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const study = await getStudy(slug);
  if (!study) return { title: "Case Study Not Found | EaseWorkflow", robots: { index: false, follow: true } };

  return buildPageMetadata({
    title: study.metaTitle || `${study.title} | Case Study`,
    description: study.metaDescription || toPlainText(study.summary) || study.title,
    path: `/case-studies/${study.slug}`,
    imageUrl: study.featuredImageUrl,
    imageAlt: study.title,
    type: "article",
  });
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const study = await getStudy(slug);
  if (!study) notFound();

  const canonicalUrl = absoluteUrl(`/case-studies/${study.slug}`);
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
          { "@type": "ListItem", position: 2, name: "Case Studies", item: absoluteUrl("/case-studies") },
          { "@type": "ListItem", position: 3, name: study.title, item: canonicalUrl },
        ],
      },
      {
        "@type": "Article",
        headline: study.metaTitle || study.title,
        name: study.title,
        description: study.metaDescription || toPlainText(study.summary),
        url: canonicalUrl,
        mainEntityOfPage: canonicalUrl,
        image: study.featuredImageUrl || undefined,
        dateModified: study.updatedAt || undefined,
        keywords: study.tags?.join(", ") || undefined,
        author: { "@type": "Organization", name: "EaseWorkflow", url: absoluteUrl("/") },
        publisher: {
          "@type": "Organization",
          name: "EaseWorkflow",
          url: absoluteUrl("/"),
          logo: { "@type": "ImageObject", url: absoluteUrl("/favicon-512.png") },
        },
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <CaseStudyDetailClient initialStudy={study} />
    </>
  );
}

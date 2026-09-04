import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogDetailClient from "./BlogDetailClient";
import { fetchBlogBySlug } from "../../../lib/fetchBlogs";
import { buildBlogDetailMetadata, buildBlogPostingJsonLd } from "../../../lib/seo";
import { absoluteUrl } from "../../../lib/seo";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const blog = await fetchBlogBySlug(slug);

  return buildBlogDetailMetadata(blog, slug);
}

export default async function BlogDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const blog = await fetchBlogBySlug(slug);
  if (!blog) notFound();
  const jsonLd = buildBlogPostingJsonLd(blog, slug);
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Blog", item: absoluteUrl("/blog") },
      { "@type": "ListItem", position: 3, name: blog.title, item: absoluteUrl(`/blog/${slug}`) },
    ],
  };

  return (
    <>
      {jsonLd ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      ) : null}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <BlogDetailClient initialBlog={blog} />
    </>
  );
}

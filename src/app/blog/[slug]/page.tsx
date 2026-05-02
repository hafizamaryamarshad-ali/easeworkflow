import type { Metadata } from "next";
import BlogDetailClient from "./BlogDetailClient";
import { fetchBlogBySlug } from "../../../lib/fetchBlogs";
import { buildBlogDetailMetadata, buildBlogPostingJsonLd } from "../../../lib/seo";

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
  const jsonLd = buildBlogPostingJsonLd(blog, slug);

  return (
    <>
      {jsonLd ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      ) : null}
      <BlogDetailClient initialBlog={blog} />
    </>
  );
}

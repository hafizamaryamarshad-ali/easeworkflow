import type { Metadata } from "next";
import BlogPageClient from "./BlogPageClient";
import { buildBlogListMetadata } from "../../lib/seo";

export const metadata: Metadata = buildBlogListMetadata();

export default function BlogPage() {
  return <BlogPageClient />;
}

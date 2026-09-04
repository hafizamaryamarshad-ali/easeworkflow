import type { Metadata } from "next";
import BlogPageClient from "./BlogPageClient";
import { buildBlogListMetadata } from "../../lib/seo";
import { fetchBlogs } from "../../lib/fetchBlogs";

export const metadata: Metadata = buildBlogListMetadata();

export default async function BlogPage() {
  const blogs = await fetchBlogs();
  return <BlogPageClient initialBlogs={blogs} />;
}

import { groq } from "next-sanity";
import { sanityFetch, sanityRuntimeConfig } from "./sanity";

type SanitySlug =
  | string
  | {
      current?: string;
    };

type BlogQueryResult = {
  _id: string;
  title: string;
  slug: SanitySlug;
  excerpt: string;
  content: string;
  category: string;
  tags: string[] | string | null;
  authorName: string;
  authorBio: string;
  publishDate: string;
  metaTitle: string;
  metaDescription: string;
  focusKeyword: string;
  canonicalUrl: string;
  featured: boolean;
  published: boolean;
  allowComments: boolean;
};

export type BlogPost = {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  authorName: string;
  authorBio: string;
  publishDate: string;
  metaTitle: string;
  metaDescription: string;
  focusKeyword: string;
  canonicalUrl: string;
  featured: boolean;
  published: boolean;
  allowComments: boolean;
};

const blogFieldsProjection = `
  _id,
  title,
  slug,
  excerpt,
  content,
  category,
  tags,
  authorName,
  authorBio,
  publishDate,
  metaTitle,
  metaDescription,
  focusKeyword,
  canonicalUrl,
  featured,
  published,
  allowComments
`;

const blogsQuery = groq`
  *[_type == "blog" && published == true] | order(publishDate desc, _createdAt desc){
    ${blogFieldsProjection}
  }
`;

const blogBySlugQuery = groq`
  *[_type == "blog" && published == true && (slug.current == $slug || slug == $slug)][0]{
    ${blogFieldsProjection}
  }
`;

const normalizeSlug = (slug: SanitySlug): string => {
  if (typeof slug === "string") {
    return slug;
  }

  return slug?.current ?? "";
};

const normalizeTags = (tags: BlogQueryResult["tags"]): string[] => {
  if (Array.isArray(tags)) {
    return tags.map((tag) => String(tag).trim()).filter(Boolean);
  }

  if (typeof tags === "string") {
    return tags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);
  }

  return [];
};

const mapBlog = (blog: BlogQueryResult): BlogPost => ({
  _id: blog._id,
  title: blog.title,
  slug: normalizeSlug(blog.slug),
  excerpt: blog.excerpt,
  content: blog.content,
  category: blog.category,
  tags: normalizeTags(blog.tags),
  authorName: blog.authorName,
  authorBio: blog.authorBio,
  publishDate: blog.publishDate,
  metaTitle: blog.metaTitle,
  metaDescription: blog.metaDescription,
  focusKeyword: blog.focusKeyword,
  canonicalUrl: blog.canonicalUrl,
  featured: Boolean(blog.featured),
  published: Boolean(blog.published),
  allowComments: Boolean(blog.allowComments),
});

export const fetchBlogs = async (): Promise<BlogPost[]> => {
  try {
    const data = (await sanityFetch(blogsQuery, {}, "fetchBlogs")) as BlogQueryResult[] | null;

    if (!Array.isArray(data)) {
      return [];
    }

    const mapped = data.map(mapBlog).filter((blog) => Boolean(blog.slug));

    if (process.env.NODE_ENV === "production") {
      console.info("[Sanity] fetchBlogs mapped results", {
        count: mapped.length,
        projectId: sanityRuntimeConfig.projectId,
        dataset: sanityRuntimeConfig.dataset,
        useCdn: sanityRuntimeConfig.useCdn,
        hasReadToken: sanityRuntimeConfig.hasReadToken,
      });
    }

    return mapped;
  } catch (error) {
    console.error("[Sanity] fetchBlogs failed", error);
    throw error;
  }
};

export const fetchBlogBySlug = async (slug: string): Promise<BlogPost | null> => {
  if (!slug) {
    return null;
  }

  try {
    const blog = (await sanityFetch(blogBySlugQuery, { slug }, "fetchBlogBySlug")) as
      | BlogQueryResult
      | null;

    if (!blog) {
      if (process.env.NODE_ENV === "production") {
        console.info("[Sanity] fetchBlogBySlug returned no result", {
          slug,
          projectId: sanityRuntimeConfig.projectId,
          dataset: sanityRuntimeConfig.dataset,
        });
      }

      return null;
    }

    const mapped = mapBlog(blog);

    if (process.env.NODE_ENV === "production") {
      console.info("[Sanity] fetchBlogBySlug mapped result", {
        slug,
        id: mapped._id,
        projectId: sanityRuntimeConfig.projectId,
        dataset: sanityRuntimeConfig.dataset,
      });
    }

    return mapped;
  } catch (error) {
    console.error("[Sanity] fetchBlogBySlug failed", { slug, error });
    throw error;
  }
};

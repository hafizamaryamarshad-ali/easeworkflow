import { groq } from "next-sanity";
import { sanityFetch, sanityRuntimeConfig, urlFor } from "./sanity";

type SanityImage = {
  asset?: {
    _ref?: string;
    _id?: string;
  };
};

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
  thumbnail: SanityImage | string | null;
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
  videoUrl?: string | null;
  videoUrls?: string[] | null;
  galleryImageUrls?: string[] | null;
};

export type BlogPost = {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
   thumbnail: SanityImage | string | null;
   thumbnailUrl: string | null;
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
   videoUrl: string | null;
  videoUrls: string[];
  galleryImageUrls: string[];
};

const blogFieldsProjection = `
  _id,
  title,
  slug,
  excerpt,
  content,
  thumbnail,
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
  allowComments,
  "videoUrl": video.asset->url,
  "videoUrls": videos[].asset->url,
  "galleryImageUrls": galleryImages[].asset->url
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

const resolveThumbnailUrl = (
  thumbnail: BlogQueryResult["thumbnail"]
): string | null => {
  if (typeof thumbnail === "string") {
    return thumbnail || null;
  }

  if (thumbnail?.asset) {
    return urlFor(thumbnail).width(1200).height(800).fit("crop").auto("format").url();
  }

  return null;
};

const mapBlog = (blog: BlogQueryResult): BlogPost => ({
  _id: blog._id,
  title: blog.title,
  slug: normalizeSlug(blog.slug),
  excerpt: blog.excerpt,
  content: blog.content,
   thumbnail: blog.thumbnail,
   thumbnailUrl: resolveThumbnailUrl(blog.thumbnail),
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
   videoUrl: blog.videoUrl || null,
  videoUrls: Array.isArray(blog.videoUrls) ? blog.videoUrls.filter(Boolean) : [],
  galleryImageUrls: Array.isArray(blog.galleryImageUrls)
    ? blog.galleryImageUrls.filter(Boolean)
    : [],
});

const BLOGS_CACHE_TTL_MS = 60_000;
const BLOG_BY_SLUG_CACHE_TTL_MS = 60_000;

let blogsCache: BlogPost[] | null = null;
let blogsCacheTimestamp = 0;
let blogsInFlight: Promise<BlogPost[]> | null = null;

const blogBySlugCache = new Map<string, { value: BlogPost | null; timestamp: number }>();
const blogBySlugInFlight = new Map<string, Promise<BlogPost | null>>();

export const fetchBlogs = async (): Promise<BlogPost[]> => {
  if (blogsCache && Date.now() - blogsCacheTimestamp < BLOGS_CACHE_TTL_MS) {
    return blogsCache;
  }

  if (blogsInFlight) {
    return blogsInFlight;
  }

  blogsInFlight = (async () => {
    try {
      const data = (await sanityFetch(blogsQuery, {}, "fetchBlogs")) as BlogQueryResult[] | null;

      if (!Array.isArray(data)) {
        blogsCache = [];
        blogsCacheTimestamp = Date.now();
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

      blogsCache = mapped;
      blogsCacheTimestamp = Date.now();

      return mapped;
    } catch (error) {
      console.error("[Sanity] fetchBlogs failed", error);
      throw error;
    } finally {
      blogsInFlight = null;
    }
  })();

  return blogsInFlight;
};

export const fetchBlogBySlug = async (slug: string): Promise<BlogPost | null> => {
  if (!slug) {
    return null;
  }

  const normalizedSlug = slug.trim();
  const cachedBlog = blogBySlugCache.get(normalizedSlug);
  if (cachedBlog && Date.now() - cachedBlog.timestamp < BLOG_BY_SLUG_CACHE_TTL_MS) {
    return cachedBlog.value;
  }

  const inFlightBlog = blogBySlugInFlight.get(normalizedSlug);
  if (inFlightBlog) {
    return inFlightBlog;
  }

  const request = (async () => {
    try {
      const blog = (await sanityFetch(blogBySlugQuery, { slug: normalizedSlug }, "fetchBlogBySlug")) as
        | BlogQueryResult
        | null;

      if (!blog) {
        if (process.env.NODE_ENV === "production") {
          console.info("[Sanity] fetchBlogBySlug returned no result", {
            slug: normalizedSlug,
            projectId: sanityRuntimeConfig.projectId,
            dataset: sanityRuntimeConfig.dataset,
          });
        }

        blogBySlugCache.set(normalizedSlug, { value: null, timestamp: Date.now() });
        return null;
      }

      const mapped = mapBlog(blog);

      if (process.env.NODE_ENV === "production") {
        console.info("[Sanity] fetchBlogBySlug mapped result", {
          slug: normalizedSlug,
          id: mapped._id,
          projectId: sanityRuntimeConfig.projectId,
          dataset: sanityRuntimeConfig.dataset,
        });
      }

      blogBySlugCache.set(normalizedSlug, { value: mapped, timestamp: Date.now() });
      return mapped;
    } catch (error) {
      console.error("[Sanity] fetchBlogBySlug failed", { slug: normalizedSlug, error });
      throw error;
    } finally {
      blogBySlugInFlight.delete(normalizedSlug);
    }
  })();

  blogBySlugInFlight.set(normalizedSlug, request);

  return request;
};

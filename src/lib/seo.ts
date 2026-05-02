import type { Metadata } from "next";
import type { BlogPost } from "../lib/fetchBlogs";

const DEFAULT_SITE_URL = "https://easeworkflow.com";
const DEFAULT_OG_IMAGE_PATH = "/images/telemedicine.jpg";

export const siteUrl = (() => {
  return DEFAULT_SITE_URL;
})();

export const absoluteUrl = (path: string): string => {
  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  return new URL(path.startsWith("/") ? path : `/${path}`, siteUrl).toString();
};

const cleanText = (value?: string | null): string => value?.trim() ?? "";

export const getBlogSeoData = (blog: BlogPost, slug: string) => {
  const title = cleanText(blog.metaTitle) || blog.title;
  const description = cleanText(blog.metaDescription) || cleanText(blog.excerpt) || blog.title;
  const canonicalUrl = absoluteUrl(`/blog/${slug}`);
  const imageUrl = blog.thumbnailUrl || absoluteUrl(DEFAULT_OG_IMAGE_PATH);

  return {
    title,
    description,
    canonicalUrl,
    imageUrl,
    imageAlt: blog.title,
    authorName: cleanText(blog.authorName),
    publishDate: cleanText(blog.publishDate),
  };
};

export const buildBlogListMetadata = (): Metadata => {
  const title = "Blog | EaseWorkflow";
  const description =
    "Insights on healthcare automation, clinic workflows, and practical technology guidance from EaseWorkflow.";
  const canonicalUrl = absoluteUrl("/blog");
  const imageUrl = absoluteUrl(DEFAULT_OG_IMAGE_PATH);

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: "website",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
};

export const buildBlogDetailMetadata = (blog: BlogPost | null, slug: string): Metadata => {
  if (!blog) {
    const title = "Blog | EaseWorkflow";
    const description =
      "Insights on healthcare automation, clinic workflows, and practical technology guidance from EaseWorkflow.";
    const canonicalUrl = absoluteUrl(`/blog/${slug}`);
    const imageUrl = absoluteUrl(DEFAULT_OG_IMAGE_PATH);

    return {
      title,
      description,
      alternates: {
        canonical: canonicalUrl,
      },
      openGraph: {
        title,
        description,
        url: canonicalUrl,
        type: "article",
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: title,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: [imageUrl],
      },
    };
  }

  const seo = getBlogSeoData(blog, slug);

  return {
    title: seo.title,
    description: seo.description,
    alternates: {
      canonical: seo.canonicalUrl,
    },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: seo.canonicalUrl,
      type: "article",
      publishedTime: seo.publishDate || undefined,
      authors: seo.authorName ? [seo.authorName] : undefined,
      images: [
        {
          url: seo.imageUrl,
          width: 1200,
          height: 630,
          alt: seo.imageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
      images: [seo.imageUrl],
    },
  };
};

export const buildBlogPostingJsonLd = (blog: BlogPost | null, slug: string) => {
  if (!blog) {
    return null;
  }

  const seo = getBlogSeoData(blog, slug);

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: seo.title,
    description: seo.description,
    author: seo.authorName
      ? {
          "@type": "Person",
          name: seo.authorName,
        }
      : undefined,
    datePublished: seo.publishDate || undefined,
    dateModified: seo.publishDate || undefined,
    image: [seo.imageUrl],
    mainEntityOfPage: seo.canonicalUrl,
    url: seo.canonicalUrl,
    publisher: {
      "@type": "Organization",
      name: "EaseWorkflow",
      url: siteUrl,
    },
  };
};
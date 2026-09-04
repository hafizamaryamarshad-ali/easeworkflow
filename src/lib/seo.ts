import type { Metadata } from "next";
import type { BlogPost } from "../lib/fetchBlogs";

const DEFAULT_SITE_URL = "https://www.easeworkflow.com";
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

type PageMetadataOptions = {
  title: string;
  description: string;
  path: string;
  imageUrl?: string | null;
  imageAlt?: string;
  type?: "website" | "article";
  noIndex?: boolean;
};

export const buildPageMetadata = ({
  title,
  description,
  path,
  imageUrl,
  imageAlt,
  type = "website",
  noIndex = false,
}: PageMetadataOptions): Metadata => {
  const canonicalUrl = absoluteUrl(path);
  const socialImage = imageUrl || absoluteUrl(DEFAULT_OG_IMAGE_PATH);

  return {
    title,
    description,
    alternates: { canonical: canonicalUrl },
    robots: noIndex ? { index: false, follow: true } : undefined,
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type,
      images: [
        {
          url: socialImage,
          width: 1200,
          height: 630,
          alt: imageAlt || title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [socialImage],
    },
  };
};

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
    modifiedDate: cleanText(blog.updatedAt) || cleanText(blog.publishDate),
  };
};

export const buildBlogListMetadata = (): Metadata => {
  const title = "Healthcare Automation & Clinic Workflow Blog | EaseWorkflow";
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

    return {
      title,
      description,
      robots: { index: false, follow: true },
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
      modifiedTime: seo.modifiedDate || undefined,
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
    dateModified: seo.modifiedDate || undefined,
    image: [seo.imageUrl],
    mainEntityOfPage: seo.canonicalUrl,
    url: seo.canonicalUrl,
    publisher: {
      "@type": "Organization",
      name: "EaseWorkflow",
      url: siteUrl,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/favicon-512.png"),
      },
    },
  };
};

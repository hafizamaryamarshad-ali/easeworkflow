"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { client } from "../../../lib/sanity";
import { fetchBlogBySlug, type BlogPost } from "../../../lib/fetchBlogs";
import { useTheme } from "../../../theme/ThemeProvider";

export default function BlogDetail() {
  const params = useParams();
  const router = useRouter();
  const { theme } = useTheme();
  const slugParam = params?.slug;
  const slug = useMemo(() => {
    if (Array.isArray(slugParam)) {
      return slugParam[0];
    }

    return slugParam;
  }, [slugParam]);

  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const pageBg = {
    dark: "var(--color-page-gradient-dark)",
    light: "var(--color-bg-light)",
  };
  const textColor = { dark: "var(--color-text-primary)", light: "var(--color-text-dark)" };
  const subTextColor = { dark: "var(--color-text-muted)", light: "var(--color-text-muted-light)" };
  const accentColor = { dark: "var(--color-primary)", light: "var(--color-secondary)" };

  useEffect(() => {
    let isMounted = true;

    const loadBlog = async () => {
      if (!slug) {
        if (isMounted) {
          setBlog(null);
          setLoading(false);
        }
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const found = await fetchBlogBySlug(slug);

        if (isMounted) {
          setBlog(found);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : "Failed to load blog.");
          setBlog(null);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadBlog();

    return () => {
      isMounted = false;
    };
  }, [slug]);

  const handleDelete = async () => {
    if (!blog?._id) {
      return;
    }

    try {
      await client.delete(blog._id);
      router.push("/blog");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete blog.");
    }
  };

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          padding: "60px",
          backgroundColor: theme === "dark" ? "var(--color-bg)" : pageBg.light,
          backgroundImage: theme === "dark" ? pageBg.dark : "none",
          backgroundSize: "400% 400%",
          animation: theme === "dark" ? "gradientBG 35s ease infinite" : "none",
          color: textColor[theme],
        }}
      >
        <p style={{ padding: "50px" }}>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          minHeight: "100vh",
          padding: "60px",
          backgroundColor: theme === "dark" ? "var(--color-bg)" : pageBg.light,
          backgroundImage: theme === "dark" ? pageBg.dark : "none",
          backgroundSize: "400% 400%",
          animation: theme === "dark" ? "gradientBG 35s ease infinite" : "none",
          color: textColor[theme],
        }}
      >
        <p style={{ padding: "50px" }}>{error}</p>
      </div>
    );
  }

  if (!blog) {
    return (
      <div
        style={{
          minHeight: "100vh",
          padding: "60px",
          backgroundColor: theme === "dark" ? "var(--color-bg)" : pageBg.light,
          backgroundImage: theme === "dark" ? pageBg.dark : "none",
          backgroundSize: "400% 400%",
          animation: theme === "dark" ? "gradientBG 35s ease infinite" : "none",
          color: textColor[theme],
        }}
      >
        <p style={{ padding: "50px" }}>Blog not found.</p>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "60px",
        backgroundColor: theme === "dark" ? "var(--color-bg)" : pageBg.light,
        backgroundImage: theme === "dark" ? pageBg.dark : "none",
        backgroundSize: "400% 400%",
        animation: theme === "dark" ? "gradientBG 35s ease infinite" : "none",
        color: textColor[theme],
      }}
    >
      <Link href="/blog">
        <button
          style={{
            padding: "8px 16px",
            borderRadius: "20px",
            border: `1px solid ${accentColor[theme]}`,
            background: "transparent",
            color: accentColor[theme],
            cursor: "pointer",
          }}
        >
          ← Back
        </button>
      </Link>

      <h1 style={{ marginTop: "30px", fontSize: "2.5rem" }}>
        {blog.title}
      </h1>

      <p style={{ marginTop: "20px", color: subTextColor[theme] }}>
        {blog.content}
      </p>

      <div style={{ marginTop: "40px" }}>
       

        
      </div>

      <style jsx>{`
        @keyframes gradientBG {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </div>
  );
}
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
    dark: "linear-gradient(135deg,#0f172a,#1e293b)",
    light: "#f8fafc",
  };
  const textColor = { dark: "#f8fafc", light: "#0f172a" };
  const subTextColor = { dark: "#cbd5e1", light: "#334155" };
  const accentColor = { dark: "#00c6ff", light: "#2563eb" };

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

  if (loading) return <p style={{ color: textColor[theme], padding: "50px" }}>Loading...</p>;

  if (error) return <p style={{ color: textColor[theme], padding: "50px" }}>{error}</p>;

  if (!blog) return <p style={{ color: textColor[theme], padding: "50px" }}>Blog not found.</p>;

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "60px",
        background: pageBg[theme],
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
        <button
          onClick={() => router.push(`/blog/edit/${slug}`)}
          style={{
            padding: "10px 18px",
            marginRight: "10px",
            background: "#0072ff",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Edit
        </button>

        <button
          onClick={handleDelete}
          style={{
            padding: "10px 18px",
            background: "#ef4444",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
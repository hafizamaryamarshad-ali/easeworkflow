"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

export default function BlogDetail() {
  const { slug } = useParams();
  const router = useRouter();
  const [blog, setBlog] = useState<any>(null);

  useEffect(() => {
    const stored = localStorage.getItem("blogs");
    if (stored) {
      const blogs = JSON.parse(stored);
      const found = blogs.find((b: any) => b.slug === slug);
      setBlog(found);
    }
  }, [slug]);

  const handleDelete = () => {
    const stored = localStorage.getItem("blogs");
    if (stored) {
      let blogs = JSON.parse(stored);
      blogs = blogs.filter((b: any) => b.slug !== slug);
      localStorage.setItem("blogs", JSON.stringify(blogs));
      router.push("/blog");
    }
  };

  if (!blog) return <p style={{ color: "#fff", padding: "50px" }}>Loading...</p>;

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "60px",
        background: "linear-gradient(135deg,#0f172a,#1e293b)",
        color: "#fff",
      }}
    >
      <Link href="/blog">
        <button
          style={{
            padding: "8px 16px",
            borderRadius: "20px",
            border: "1px solid #00c6ff",
            background: "transparent",
            color: "#00c6ff",
            cursor: "pointer",
          }}
        >
          ← Back
        </button>
      </Link>

      <h1 style={{ marginTop: "30px", fontSize: "2.5rem" }}>
        {blog.title}
      </h1>

      <p style={{ marginTop: "20px", color: "#cbd5e1" }}>
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
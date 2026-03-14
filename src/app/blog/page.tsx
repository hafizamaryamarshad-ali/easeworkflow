"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiFileText } from "react-icons/fi";

export default function BlogPage() {
  const [blogs, setBlogs] = useState<any[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("blogs");
    if (stored) {
      setBlogs(JSON.parse(stored));
    }
  }, []);

  return (
    <div
      style={{
        padding: "50px 20px 80px",
        minHeight: "100vh",
        background: "linear-gradient(135deg,#0f172a,#1e293b)",
        color: "#fff",
        position: "relative",
      }}
    >
      {/* 🔙 BACK BUTTON (TOP LEFT) */}
      <div style={{ position: "absolute", top: "20px", left: "20px" }}>
        <Link href="/">
          <button
            style={{
              padding: "8px 16px",
              borderRadius: "20px",
              border: "1px solid #00c6ff",
              background: "transparent",
              color: "#00c6ff",
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            ← Back
          </button>
        </Link>
      </div>

      <h1 style={{ textAlign: "center", fontSize: "3rem", fontWeight: 900 }}>
        Our Blog
      </h1>

      <div style={{ textAlign: "center", marginTop: "30px" }}>
        <Link href="/blog/create">
          <button
            style={{
              padding: "14px 28px",
              borderRadius: "30px",
              background: "linear-gradient(90deg,#0072ff,#00c6ff)",
              color: "#fff",
              border: "none",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            + Create New Blog
          </button>
        </Link>
      </div>

      <div
        style={{
          marginTop: "50px",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "30px",
        }}
      >
        {blogs.length === 0 ? (
          <p>No blogs yet.</p>
        ) : (
          blogs.map((blog: any, i: number) => (
            <Link
              key={i}
              href={`/blog/${blog.slug}`}
              style={{ textDecoration: "none" }}
            >
              <motion.div
                whileHover={{ scale: 1.07 }}
                style={{
                  width: "300px",
                  padding: "30px",
                  borderRadius: "20px",
                  background: "rgba(255,255,255,0.08)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(0,198,255,0.2)",
                  cursor: "pointer",
                  color: "#fff",
                }}
              >
                <FiFileText size={26} color="#00c6ff" />

                <h3 style={{ marginTop: "15px", fontWeight: 800 }}>
                  {blog.title}
                </h3>

                <p style={{ marginTop: "10px", color: "#cbd5e1" }}>
                  {blog.excerpt}
                </p>
              </motion.div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
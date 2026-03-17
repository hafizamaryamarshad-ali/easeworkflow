"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiFileText } from "react-icons/fi";
import { fetchBlogs, type BlogPost } from "../../lib/fetchBlogs";
import { useTheme } from "../../theme/ThemeProvider";

export default function BlogPage() {
  const { theme } = useTheme();
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const pageBg = {
    dark: "linear-gradient(135deg,#0f172a,#1e293b)",
    light: "#f8fafc",
  };
  const textColor = { dark: "#f8fafc", light: "#0f172a" };
  const subTextColor = { dark: "#cbd5e1", light: "#334155" };
  const accentColor = { dark: "#00c6ff", light: "#2563eb" };
  const cardBg = { dark: "rgba(255,255,255,0.08)", light: "#ffffff" };
  const cardBorder = {
    dark: "1px solid rgba(0,198,255,0.2)",
    light: "1px solid rgba(37,99,235,0.15)",
  };

  useEffect(() => {
    let isMounted = true;

    const loadBlogs = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchBlogs();

        if (isMounted) {
          setBlogs(data);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : "Failed to load blogs.");
          setBlogs([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadBlogs();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div
      style={{
        padding: "50px 20px 80px",
        minHeight: "100vh",
        background: pageBg[theme],
        color: textColor[theme],
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
              border: `1px solid ${accentColor[theme]}`,
              background: "transparent",
              color: accentColor[theme],
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

      <div
        style={{
          marginTop: "50px",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "30px",
        }}
      >
        {loading ? (
          <p>Loading blogs...</p>
        ) : error ? (
          <p>{error}</p>
        ) : blogs.length === 0 ? (
          <p>No blogs yet.</p>
        ) : (
          blogs.map((blog) => (
            <Link
              key={blog._id}
              href={`/blog/${blog.slug}`}
              style={{ textDecoration: "none" }}
            >
              <motion.div
                whileHover={{ scale: 1.07 }}
                style={{
                  width: "300px",
                  padding: "30px",
                  borderRadius: "20px",
                  background: cardBg[theme],
                  backdropFilter: theme === "dark" ? "blur(20px)" : "none",
                  border: cardBorder[theme],
                  cursor: "pointer",
                  color: textColor[theme],
                }}
              >
                  <FiFileText size={26} color={accentColor[theme]} />

                <h3 style={{ marginTop: "15px", fontWeight: 800 }}>
                  {blog.title}
                </h3>

                <p style={{ marginTop: "10px", color: subTextColor[theme] }}>
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
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
    dark: "var(--color-page-gradient-dark)",
    light: "var(--color-bg-light)",
  };
  const textColor = { dark: "var(--color-text-primary)", light: "var(--color-text-dark)" };
  const subText = { dark: "var(--color-text-muted)", light: "var(--color-text-muted-light)" };
  const accent = { dark: "var(--color-primary)", light: "var(--color-secondary)" };
  const cardBg = { dark: "var(--color-card-dark)", light: "var(--color-card-light)" };
  const cardBorder = {
    dark: "1px solid var(--color-border-dark)",
    light: "1px solid var(--color-border-light)",
  };
  const cardShadow = {
    dark: "var(--shadow-soft-dark)",
    light: "var(--shadow-soft-light)",
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
        backgroundColor: theme === "dark" ? "var(--color-bg)" : pageBg.light,
        backgroundImage: theme === "dark" ? pageBg.dark : "none",
        backgroundSize: "400% 400%",
        animation: theme === "dark" ? "gradientBG 35s ease infinite" : "none",
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
              borderRadius: "10px",
              border:
                theme === "dark"
                  ? "1px solid var(--color-border-dark)"
                  : "1px solid var(--color-border-light)",
              background: theme === "dark" ? "var(--color-card-dark)" : "var(--color-card-light)",
              color: accent[theme],
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            ← Back
          </button>
        </Link>
      </div>

      <h1
        style={{
          textAlign: "center",
          fontSize: "3rem",
          fontWeight: 900,
          color: textColor[theme],
        }}
      >
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
          <p style={{ color: subText[theme] }}>Loading blogs...</p>
        ) : error ? (
          <p style={{ color: subText[theme] }}>{error}</p>
        ) : blogs.length === 0 ? (
          <p style={{ color: subText[theme] }}>No blogs yet.</p>
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
                  width: "18.75rem",
                  padding: "30px",
                  borderRadius: "20px",
                  background: cardBg[theme],
                  backdropFilter: theme === "dark" ? "blur(20px)" : "none",
                  border: cardBorder[theme],
                  boxShadow: cardShadow[theme],
                  cursor: "pointer",
                  color: textColor[theme],
                }}
              >
                  <FiFileText size={26} color={accent[theme]} />

                <h3 style={{ marginTop: "15px", fontWeight: 800 }}>
                  {blog.title}
                </h3>

                <p style={{ marginTop: "10px", color: subText[theme] }}>
                  {blog.excerpt}
                </p>
              </motion.div>
            </Link>
          ))
        )}
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
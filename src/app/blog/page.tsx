"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiFileText, FiArrowLeft } from "react-icons/fi";
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

  const textColor = {
    dark: "var(--color-text-primary)",
    light: "var(--color-text-dark)",
  };

  const subText = {
    dark: "var(--color-text-muted)",
    light: "var(--color-text-muted-light)",
  };

  const cardBg = {
    dark: "linear-gradient(145deg, rgba(14,165,233,0.12), rgba(255,255,255,0.03))",
    light: "linear-gradient(145deg, #ffffff, #e0f2fe)",
  };

  const cardBorder = {
    dark: "1px solid rgba(14,165,233,0.25)",
    light: "1px solid rgba(14,165,233,0.25)",
  };

  const cardShadow = {
    dark: "0 25px 50px rgba(14,165,233,0.20)",
    light: "0 10px 25px rgba(2,132,199,0.18)",
  };

  const cardTextColor = {
    dark: "#ffffff",
    light: "#0f172a", // blackish for light theme
  };

  const cardIconColor = {
    dark: "#ffffff",
    light: "#0f172a",
  };

  useEffect(() => {
    let isMounted = true;

    const loadBlogs = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchBlogs();
        if (isMounted) setBlogs(data);
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : "Failed to load blogs.");
          setBlogs([]);
        }
      } finally {
        if (isMounted) setLoading(false);
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
        padding: "80px 20px 80px",
        minHeight: "100vh",
        backgroundColor: theme === "dark" ? "var(--color-bg)" : pageBg.light,
        backgroundImage: theme === "dark" ? pageBg.dark : "none",
        backgroundSize: "400% 400%",
        animation: theme === "dark" ? "gradientBG 35s ease infinite" : "none",
        color: textColor[theme],
        position: "relative",
      }}
    >
      {/* 🔙 Back Button */}
      <div style={{ position: "absolute", top: "20px", left: "20px" }}>
        <Link href="/">
          <button
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "8px 14px",
              borderRadius: "10px",
              border:
                theme === "dark"
                  ? "1px solid rgba(255,255,255,0.15)"
                  : "1px solid rgba(2,132,199,0.25)",
              background:
                theme === "dark"
                  ? "rgba(255,255,255,0.06)"
                  : "rgba(255,255,255,0.9)",
              backdropFilter: "blur(10px)",
              color: theme === "dark" ? "#fff" : "#0f172a",
              boxShadow:
                theme === "dark"
                  ? "0 10px 25px rgba(0,0,0,0.3)"
                  : "0 6px 15px rgba(2,132,199,0.15)",
              cursor: "pointer",
              fontWeight: 600,
              transition: "all 0.25s ease",
            }}
          >
            <FiArrowLeft size={16} />
            Back
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
                whileHover={{
                  scale: 1.05,
                  y: -5,
                  boxShadow: cardShadow[theme],
                }}
                transition={{ duration: 0.3 }}
                style={{
                  width: "18.75rem",
                  padding: "30px",
                  borderRadius: "20px",
                  background: cardBg[theme],
                  backdropFilter: theme === "dark" ? "blur(20px)" : "none",
                  border: cardBorder[theme],
                  boxShadow: cardShadow[theme],
                  cursor: "pointer",
                  color: cardTextColor[theme],
                  textAlign: "left",
                }}
              >
                <FiFileText size={26} color={cardIconColor[theme]} />

                <h3 style={{ marginTop: "15px", fontWeight: 800, color: cardTextColor[theme] }}>
                  {blog.title}
                </h3>

                <p style={{ marginTop: "10px", opacity: 0.9, color: cardTextColor[theme] }}>
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
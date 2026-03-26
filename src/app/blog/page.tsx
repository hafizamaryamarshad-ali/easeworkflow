"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiFileText, FiArrowLeft, FiCpu, FiGlobe, FiShield } from "react-icons/fi";
import { fetchBlogs, type BlogPost } from "../../lib/fetchBlogs";
import { useTheme } from "../../theme/ThemeProvider";

export default function BlogPage() {
  const { theme } = useTheme();
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const pageBg = {
    dark: "var(--bg-gradient-dark)",
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

  const floatingIcons = [
    { Icon: FiCpu, top: "18%", left: "12%", duration: 18 },
    { Icon: FiGlobe, top: "72%", left: "82%", duration: 24 },
    { Icon: FiShield, top: "40%", left: "88%", duration: 26 },
  ];

  return (
    <div
      style={{
        padding: "60px 20px 80px",
        minHeight: "100vh",
        backgroundColor: theme === "dark" ? "#0f172a" : pageBg.light,
        backgroundImage: theme === "dark" ? pageBg.dark : "none",
        backgroundSize: theme === "dark" ? "600% 600%" : "auto",
        animation: theme === "dark" ? "gradientBG 35s ease infinite" : "none",
        color: textColor[theme],
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Floating decorative icons */}
      {floatingIcons.map(({ Icon, top, left, duration }, index) => (
        <motion.div
          key={index}
          initial={{ y: -8, opacity: theme === "dark" ? 0.22 : 0.1 }}
          animate={{ y: 8 }}
          transition={{ duration, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
          style={{
            position: "absolute",
            top,
            left,
            zIndex: 0,
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              width: "120px",
              height: "120px",
              borderRadius: "999px",
              border:
                theme === "dark"
                  ? "1px solid rgba(148, 163, 184, 0.3)"
                  : "1px solid rgba(148, 163, 184, 0.25)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background:
                theme === "dark"
                  ? "radial-gradient(circle at top, rgba(56,189,248,0.18), rgba(15,23,42,0.1))"
                  : "radial-gradient(circle at top, rgba(59,130,246,0.12), rgba(248,250,252,0.1))",
              boxShadow:
                theme === "dark"
                  ? "0 20px 45px rgba(15,23,42,0.85)"
                  : "0 16px 40px rgba(15,23,42,0.12)",
            }}
          >
            <Icon
              style={{
                width: "54px",
                height: "54px",
                color: theme === "dark" ? "rgba(226, 232, 240, 0.85)" : "rgba(30, 64, 175, 0.9)",
              }}
            />
          </div>
        </motion.div>
      ))}

      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* 🔙 Back Button */}
        <div style={{ position: "absolute", top: "15px", left: "20px" }}>
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
            marginTop: "28px",
          }}
        >
          Our Blog
        </h1>

        <div
          style={{
            marginTop: "40px",
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
                  padding: "24px 24px 28px",
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
                <div
                  style={{
                    width: "100%",
                    height: "180px",
                    borderRadius: "16px",
                    overflow: "hidden",
                    marginBottom: "18px",
                    background:
                      theme === "dark"
                        ? "linear-gradient(135deg, rgba(15,23,42,1), rgba(56,189,248,0.45))"
                        : "linear-gradient(135deg, #e0f2fe, #bae6fd)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {blog.thumbnailUrl ? (
                    <Image
                      src={blog.thumbnailUrl}
                      alt={blog.title || "Blog thumbnail"}
                      width={320}
                      height={180}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block",
                      }}
                    />
                  ) : (
                    <FiFileText size={32} color={cardIconColor[theme]} />
                  )}
                </div>

                <h3 style={{ fontWeight: 800, color: cardTextColor[theme] }}>
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
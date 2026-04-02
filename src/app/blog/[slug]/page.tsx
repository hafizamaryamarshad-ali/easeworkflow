"use client";

import { useEffect, useMemo, useState, type CSSProperties } from "react";
import { motion } from "framer-motion";
import { useParams, useRouter } from "next/navigation";
import Head from "next/head";
import { fetchBlogBySlug, type BlogPost } from "../../../lib/fetchBlogs";
import { useTheme } from "../../../theme/ThemeProvider";
import { FaStethoscope, FaPills, FaHeart } from "react-icons/fa";
import MediaCarousel, { type MediaItem } from "../../../MediaCarousel";
import { PortableText } from '@portabletext/react';

type ThemeMode = "dark" | "light";

type Palette = {
  dark: string;
  light: string;
};

function BlogMediaSection({ blog }: { blog: BlogPost }) {
  const items: MediaItem[] = [];

  if (blog.thumbnailUrl) {
    items.push({ type: "image", src: blog.thumbnailUrl, alt: blog.title });
  }

  if (Array.isArray(blog.galleryImageUrls)) {
    blog.galleryImageUrls.forEach((url) => {
      if (url) items.push({ type: "image", src: url, alt: blog.title });
    });
  }

  if (blog.videoUrl) {
    items.push({ type: "video", src: blog.videoUrl });
  }

  if (Array.isArray(blog.videoUrls)) {
    blog.videoUrls.forEach((url) => {
      if (url) items.push({ type: "video", src: url });
    });
  }

  if (!items.length) return null;

  return (
    <div style={{ marginBottom: "24px" }}>
      <MediaCarousel items={items} aspectRatio="16 / 9" />
    </div>
  );
}

export default function BlogDetail() {
  const params = useParams() as { slug?: string | string[] };
  const router = useRouter();
  const { theme } = useTheme();

  const slug = useMemo(() => {
    const value = params?.slug;
    if (Array.isArray(value)) return value[0];
    return value as string | undefined;
  }, [params]);

  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  const pageBg: Palette = {
    dark: "var(--bg-gradient-dark)",
    light: "var(--color-bg-light)",
  };

  const textColor: Palette = {
    dark: "var(--color-text-primary)",
    light: "var(--color-text-dark)",
  };

  const subTextColor: Palette = {
    dark: "var(--color-text-muted)",
    light: "var(--color-text-muted-light)",
  };

  useEffect(() => {
    const load = async () => {
      if (!slug) return;
      const data = await fetchBlogBySlug(slug);
      // Debug: verify all fields coming from Sanity
      console.log("[BlogDetail] fetched blog", data);
      setBlog(data);
      setLoading(false);
    };
    load();
  }, [slug]);

  const floatingIcons = [
    { Icon: FaStethoscope, top: "16%", left: "10%", duration: 18 },
    { Icon: FaPills, top: "72%", left: "82%", duration: 24 },
    { Icon: FaHeart, top: "44%", left: "88%", duration: 26 },
  ];

  if (loading) {
    return (
      <Wrapper theme={theme} pageBg={pageBg} textColor={textColor} floatingIcons={floatingIcons}>
        Loading...
      </Wrapper>
    );
  }

  if (!blog) {
    return (
      <Wrapper theme={theme} pageBg={pageBg} textColor={textColor} floatingIcons={floatingIcons}>
        Blog not found
      </Wrapper>
    );
  }

  return (
    <>
      <Head>
        <title>{blog.metaTitle || blog.title}</title>
        {blog.metaDescription && (
          <meta name="description" content={blog.metaDescription} />
        )}
      </Head>

      <Wrapper theme={theme} pageBg={pageBg} textColor={textColor} floatingIcons={floatingIcons}>
        <div style={outerContainer}>
          <div style={card(theme)}>
            <h1 style={title}>{blog.title}</h1>

            {/* Category + publish date row */}
            {(blog.category || blog.publishDate) && (
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  gap: "10px",
                  marginBottom: "16px",
                }}
              >
                {blog.category && (
                  <span
                    style={{
                      fontSize: "0.8rem",
                      padding: "4px 10px",
                      borderRadius: "999px",
                      backgroundColor:
                        theme === "dark" ? "rgba(56,189,248,0.15)" : "rgba(59,130,246,0.1)",
                      border:
                        theme === "dark"
                          ? "1px solid rgba(56,189,248,0.6)"
                          : "1px solid rgba(59,130,246,0.4)",
                    }}
                  >
                    {blog.category}
                  </span>
                )}

                {blog.publishDate && (
                  <span
                    style={{
                      fontSize: "0.86rem",
                      color: subTextColor[theme],
                    }}
                  >
                    {new Date(blog.publishDate).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "short",
                      day: "2-digit",
                    })}
                  </span>
                )}
              </div>
            )}

            {/* Excerpt */}
            {blog.excerpt && blog.excerpt.trim().length > 0 && (
              <p
                style={{
                  fontSize: "1.02rem",
                  lineHeight: 1.7,
                  color: subTextColor[theme],
                  marginBottom: "24px",
                }}
              >
                {blog.excerpt}
              </p>
            )}

            <div style={divider(theme)} />

            {/* Media slider inside the main card, below the header */}
            <BlogMediaSection blog={blog} />

            {/* Main rich text content */}
            {Array.isArray(blog.content) && blog.content.length > 0 && (
              <div style={content(subTextColor, theme)}>
                <PortableText value={blog.content} />
              </div>
            )}

            {/* Tags */}
            {Array.isArray(blog.tags) && blog.tags.length > 0 && (
              <div
                style={{
                  marginTop: "24px",
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "8px",
                }}
              >
                {blog.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      fontSize: "0.78rem",
                      padding: "4px 10px",
                      borderRadius: "999px",
                      backgroundColor:
                        theme === "dark"
                          ? "rgba(15,23,42,0.9)"
                          : "rgba(226,232,240,0.9)",
                      border:
                        theme === "dark"
                          ? "1px solid rgba(148,163,184,0.6)"
                          : "1px solid rgba(148,163,184,0.7)",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Author info */}
            {(blog.authorName || blog.authorBio) && (
              <div
                style={{
                  marginTop: "32px",
                  paddingTop: "18px",
                  borderTop:
                    theme === "dark"
                      ? "1px solid rgba(148,163,184,0.4)"
                      : "1px solid rgba(148,163,184,0.3)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "4px",
                }}
              >
                {blog.authorName && (
                  <span
                    style={{
                      fontWeight: 600,
                      fontSize: "0.98rem",
                    }}
                  >
                    By {blog.authorName}
                  </span>
                )}
                {blog.authorBio && (
                  <span
                    style={{
                      fontSize: "0.9rem",
                      color: subTextColor[theme],
                    }}
                  >
                    {blog.authorBio}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </Wrapper>
    </>
  );
}

/* ---------- Wrapper ---------- */
function Wrapper({ children, theme, pageBg, textColor, floatingIcons }: any) {
  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "60px 20px",
        backgroundColor: theme === "dark" ? "#0f172a" : pageBg.light,
        backgroundImage: theme === "dark" ? pageBg.dark : "none",
        backgroundSize: theme === "dark" ? "600% 600%" : "auto",
        animation: theme === "dark" ? "gradientBG 35s ease infinite" : "none",
        color: textColor[theme],
        position: "relative",
        overflow: "hidden",
      }}
    >
      {Array.isArray(floatingIcons) &&
        floatingIcons.map(({ Icon, top, left, duration }: any, index: number) => (
          <motion.div
            key={index}
            initial={{ y: 0, opacity: theme === "dark" ? 0.22 : 0.1 }}
            animate={{ y: ["0%", "-18%", "0%"] }}
            transition={{ duration, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
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
                  color:
                    theme === "dark"
                      ? "#0ea5e9"
                      : "#3b82f6",
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
        {children}
      </div>
    </div>
  );
}

/* ---------- Back Button (unused helper) ---------- */
const backButtonStyle = (theme: ThemeMode): CSSProperties => ({
  position: "fixed",
  top: "20px",
  left: "20px",
  zIndex: 9999,
  padding: "10px 16px",
  borderRadius: "999px",
  border:
    theme === "dark"
      ? "1px solid rgba(255,255,255,0.15)"
      : "1px solid rgba(0,0,0,0.12)",
  background:
    theme === "dark"
      ? "rgba(255,255,255,0.05)"
      : "rgba(255,255,255,0.85)",
  backdropFilter: "blur(12px)",
  color: theme === "dark" ? "#ffffff" : "#111827",
  cursor: "pointer",
  fontWeight: 600,
  fontSize: "0.9rem",
  boxShadow:
    theme === "dark"
      ? "0 10px 30px rgba(0,0,0,0.5)"
      : "0 8px 25px rgba(0,0,0,0.12)",
});

/* ---------- Styles ---------- */

const outerContainer: CSSProperties = {
  maxWidth: "1100px",
  margin: "0 auto",
  position: "relative",
};

const card = (theme: ThemeMode): CSSProperties => ({
  marginTop: "20px",
  padding: "40px 35px",
  borderRadius: "22px",
  background:
    theme === "dark"
      ? "rgba(255,255,255,0.03)"
      : "rgba(255,255,255,0.92)",
  backdropFilter: "blur(12px)",
  border:
    theme === "dark"
      ? "1px solid rgba(255,255,255,0.08)"
      : "1px solid rgba(0,0,0,0.08)",
  boxShadow:
    theme === "dark"
      ? "0 30px 80px rgba(0,0,0,0.7)"
      : "0 25px 60px rgba(0,0,0,0.12)",
});

const title: CSSProperties = {
  fontSize: "2.6rem",
  fontWeight: 800,
  lineHeight: 1.2,
  marginBottom: "18px",
  letterSpacing: "-1px",
};

const divider = (theme: ThemeMode): CSSProperties => ({
  width: "70px",
  height: "4px",
  borderRadius: "10px",
  background:
    theme === "dark"
      ? "rgba(255,255,255,0.25)"
      : "rgba(0,0,0,0.2)",
  marginBottom: "25px",
});

const content = (subTextColor: Palette, theme: ThemeMode): CSSProperties => ({
  color: subTextColor[theme],
  fontSize: "1.1rem",
  lineHeight: 1.9,
  whiteSpace: "pre-line",
});

// legacy helpers kept for compatibility (unused in new layout)
const mediaGrid = (blog: BlogPost): CSSProperties => ({
  marginTop: "36px",
  display: "grid",
  gridTemplateColumns:
    blog.videoUrl && blog.thumbnailUrl ? "1fr 1fr" : "1fr",
  gap: "28px",
});

const mediaCard = (theme: ThemeMode): CSSProperties => ({
  borderRadius: "16px",
  overflow: "hidden",
  border:
    theme === "dark"
      ? "1px solid rgba(255,255,255,0.08)"
      : "1px solid rgba(0,0,0,0.08)",
  boxShadow:
    theme === "dark"
      ? "0 20px 50px rgba(0,0,0,0.6)"
      : "0 15px 40px rgba(0,0,0,0.1)",
});

const mediaWrapper: CSSProperties = {
  position: "relative",
  width: "100%",
  paddingBottom: "56.25%",
};

const mediaContent: CSSProperties = {
  position: "absolute",
  width: "100%",
  height: "100%",
  top: 0,
  left: 0,
  objectFit: "cover",
};

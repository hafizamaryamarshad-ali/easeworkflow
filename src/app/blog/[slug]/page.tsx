"use client";

import { useEffect, useMemo, useState, type CSSProperties } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { fetchBlogBySlug, type BlogPost } from "../../../lib/fetchBlogs";
import { useTheme } from "../../../theme/ThemeProvider";

type ThemeMode = "dark" | "light";

type Palette = {
  dark: string;
  light: string;
};

export default function BlogDetail() {
  const params = useParams();
  const router = useRouter();
  const { theme } = useTheme();

  const slugParam = params?.slug;
  const slug = useMemo(() => {
    if (Array.isArray(slugParam)) return slugParam[0];
    return slugParam;
  }, [slugParam]);

  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  const pageBg: Palette = {
    dark: "var(--color-page-gradient-dark)",
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
      setBlog(data);
      setLoading(false);
    };
    load();
  }, [slug]);

  if (loading) {
    return (
      <Wrapper theme={theme} pageBg={pageBg} textColor={textColor}>
        Loading...
      </Wrapper>
    );
  }

  if (!blog) {
    return (
      <Wrapper theme={theme} pageBg={pageBg} textColor={textColor}>
        Blog not found
      </Wrapper>
    );
  }

  return (
    <Wrapper theme={theme} pageBg={pageBg} textColor={textColor}>

     {/* Back Button */}
      <button
        onClick={() => router.back()}
        style={{
          position: "absolute",
          top: "80px",
          left: "20px",
          padding: "8px 14px",
          borderRadius: "10px",
          border:
            theme === "dark"
              ? "1px solid rgba(255,255,255,0.2)"
              : "1px solid rgba(0,0,0,0.15)",
          background:
            theme === "dark"
              ? "rgba(255,255,255,0.06)"
              : "rgba(0,0,0,0.04)",
          backdropFilter: theme === "dark" ? "blur(10px)" : "none",
          color: theme === "dark" ? "#ffffff" : "#111827",
          cursor: "pointer",
          fontWeight: 600,
          boxShadow:
            theme === "dark"
              ? "0 4px 20px rgba(0,0,0,0.4)"
              : "0 4px 15px rgba(0,0,0,0.1)",
        }}
      >
        ← Back
      </button>

      <div style={outerContainer}>

        {/* Main Card */}
        <div style={card(theme)}>

          <h1 style={title}>{blog.title}</h1>

          <div style={divider(theme)} />

          <p style={content(subTextColor, theme)}>
            {blog.content}
          </p>

          {/* Media Section */}
          {(blog.videoUrl || blog.thumbnailUrl) && (
            <div style={mediaGrid(blog)}>

              {blog.videoUrl && (
                <div style={mediaCard(theme)}>
                  <div style={mediaWrapper}>
                    <video src={blog.videoUrl} controls style={mediaContent} />
                  </div>
                </div>
              )}

              {blog.thumbnailUrl && (
                <div style={mediaCard(theme)}>
                  <div style={mediaWrapper}>
                    <Image
                      src={blog.thumbnailUrl}
                      alt={blog.title}
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                </div>
              )}

            </div>
          )}

        </div>

      </div>
    </Wrapper>
  );
}

/* ---------- Wrapper ---------- */
function Wrapper({ children, theme, pageBg, textColor }: any) {
  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "80px 20px",
        background:
          theme === "dark"
            ? "var(--color-bg)"
            : pageBg.light,
        backgroundImage:
          theme === "dark" ? pageBg.dark : "none",
        color: textColor[theme],
      }}
    >
      {children}
    </div>
  );
}

/* ---------- Back Button ---------- */
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
  marginTop: "40px",
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

const mediaGrid = (blog: BlogPost): CSSProperties => ({
  marginTop: "50px",
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
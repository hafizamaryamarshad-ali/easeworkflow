"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FiArrowLeft } from "react-icons/fi";
import { FaStethoscope, FaPills, FaHeart } from "react-icons/fa";
import { PortableText } from "@portabletext/react";
import { fetchCaseStudies, type CaseStudy } from "../../../lib/fetchCaseStudies";
import { useTheme } from "../../../theme/ThemeProvider";
import MediaCarousel, { type MediaItem } from "../../../MediaCarousel";

export default function CaseStudyDetail() {
  const params = useParams();
  const router = useRouter();
  const { theme } = useTheme();

  const routeSlug = params?.slug;
  const slug = useMemo(() => {
    if (Array.isArray(routeSlug)) return routeSlug[0];
    return routeSlug;
  }, [routeSlug]);

  const [study, setStudy] = useState<CaseStudy | null>(null);
  const [loading, setLoading] = useState(true);

  const textColor = {
    dark: "var(--color-text-primary)",
    light: "var(--color-text-dark)",
  };

  const subTextColor = {
    dark: "var(--color-text-muted)",
    light: "var(--color-text-muted-light)",
  };

  const accentColor = {
    dark: "var(--color-primary)",
    light: "var(--color-secondary)",
  };

  const cardBg = {
    dark: "var(--color-card-dark)",
    light: "var(--color-card-light)",
  };

  useEffect(() => {
    let isMounted = true;

    const loadCaseStudy = async () => {
      if (!slug) {
        setLoading(false);
        return;
      }

      try {
        const allStudies = await fetchCaseStudies();
        const foundStudy = allStudies.find((item) => item.slug === slug);

        if (isMounted) setStudy(foundStudy ?? null);
      } catch {
        if (isMounted) setStudy(null);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadCaseStudy();

    return () => {
      isMounted = false;
    };
  }, [slug]);

  const baseCard = {
    background: cardBg[theme],
    border:
      theme === "dark"
        ? "1px solid rgba(255,255,255,0.06)"
        : "1px solid rgba(0,0,0,0.06)",
    boxShadow:
      theme === "dark"
        ? "0 14px 40px rgba(0,0,0,0.45)"
        : "0 14px 40px rgba(0,0,0,0.08)",
  };

  if (loading) {
    return (
      <section style={{ padding: "80px 20px", textAlign: "center", color: textColor[theme] }}>
        Loading case study...
      </section>
    );
  }

  if (!study) {
    return (
      <section style={{ padding: "80px 20px", textAlign: "center", color: textColor[theme] }}>
        Case study not found.
      </section>
    );
  }

  const mediaItems: MediaItem[] = [];
  if (study.featuredImageUrl) {
    mediaItems.push({ type: "image", src: study.featuredImageUrl, alt: study.title });
  }
  if (Array.isArray(study.galleryImageUrls)) {
    study.galleryImageUrls.forEach((url) => {
      if (url) mediaItems.push({ type: "image", src: url, alt: study.title });
    });
  }
  if (Array.isArray(study.videoUrls)) {
    study.videoUrls.forEach((url) => {
      if (url) mediaItems.push({ type: "video", src: url });
    });
  }

  return (
    <section
      style={{
        padding: "100px 20px 60px",
        minHeight: "100vh",
        backgroundColor: theme === "dark" ? "#0f172a" : "var(--color-bg-light)",
        backgroundImage:
          theme === "dark"
            ? "var(--bg-gradient-dark)"
            : "none",
        backgroundSize: theme === "dark" ? "600% 600%" : "auto",
        backgroundPosition: "center",
        animation: theme === "dark" ? "gradientBG 35s ease infinite" : "none",
        color: textColor[theme],
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          maxWidth: "1120px",
          margin: "0 auto",
          paddingTop: "10px",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* HERO SECTION */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "40px",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "80px",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: -18 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              flex: "1 1 360px",
              ...baseCard,
              padding: "32px 34px",
              borderRadius: "26px",
              background:
                theme === "dark"
                  ? "linear-gradient(145deg, rgba(15,23,42,0.98), rgba(15,23,42,0.92))"
                  : "linear-gradient(145deg,#f1f5f9,#ffffff)",
            }}
          >
            <p
              style={{
                fontSize: "0.8rem",
                textTransform: "uppercase",
                letterSpacing: "0.18em",
                margin: 0,
                marginBottom: "10px",
                color: subTextColor[theme],
              }}
            >
              Case Study · {study.client}
            </p>
            <h1
              style={{
                fontSize: "3.1rem",
                fontWeight: 900,
                lineHeight: 1.1,
                letterSpacing: "-0.04em",
                margin: 0,
                marginBottom: "14px",
              }}
            >
              {study.title}
            </h1>
            <p
              style={{
                color: subTextColor[theme],
                lineHeight: 1.7,
                fontSize: "1.02rem",
                maxWidth: "520px",
                margin: 0,
              }}
            >
              {study.summary}
            </p>

            {/* Meta pills inside hero */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "10px",
                marginTop: "18px",
              }}
            >
              {[study.industry].map((item, i) => (
                <div
                  key={i}
                  style={{
                    padding: "8px 14px",
                    borderRadius: "999px",
                    backgroundColor:
                      theme === "dark"
                        ? "rgba(15,23,42,0.9)"
                        : "rgba(219,234,254,0.95)",
                    color: theme === "dark" ? "#e5e7eb" : "#1e293b",
                    border:
                      theme === "dark"
                        ? "1px solid rgba(148,163,184,0.7)"
                        : "1px solid rgba(59,130,246,0.7)",
                    fontSize: "0.8rem",
                    fontWeight: 600,
                  }}
                >
                  {item}
                </div>
              ))}

              {study.tags && study.tags.length > 0 &&
                study.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      fontSize: "0.8rem",
                      padding: "8px 14px",
                      borderRadius: "999px",
                      backgroundColor:
                        theme === "dark"
                          ? "rgba(15,23,42,0.9)"
                          : "rgba(219,234,254,0.95)",
                      color: theme === "dark" ? "#e5e7eb" : "#1e293b",
                      border:
                        theme === "dark"
                          ? "1px solid rgba(148,163,184,0.7)"
                          : "1px solid rgba(59,130,246,0.7)",
                      lineHeight: 1.3,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {tag}
                  </span>
                ))}
            </div>
          </motion.div>

          {mediaItems.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                flex: "1 1 360px",
                ...baseCard,
                borderRadius: "26px",
                padding: "18px 18px 14px",
                background:
                  theme === "dark"
                    ? "linear-gradient(145deg, rgba(15,23,42,0.98), rgba(15,23,42,0.92))"
                    : "#ffffff",
              }}
            >
              <MediaCarousel items={mediaItems} aspectRatio="16 / 9" />
            </motion.div>
          )}
        </div>

        {/* BODY SECTIONS */}
        <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
          {/* Problem & Solution cards */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2
              style={{
                fontSize: "1.6rem",
                fontWeight: 800,
                marginBottom: "18px",
              }}
            >
              Problem & Solution
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                gap: "28px",
              }}
            >
              {[
                { title: "Problem", content: study.problem },
                { title: "Solution", content: study.solution },
              ].map((block, i) => (
                <div
                  key={i}
                  style={{
                    ...baseCard,
                    padding: "24px 24px 22px",
                    borderRadius: "22px",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-6px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  <h3 style={{ marginBottom: "10px", fontSize: "1.18rem" }}>
                    {block.title}
                  </h3>
                  <p style={{ lineHeight: 1.75, color: subTextColor[theme] }}>
                    {block.content}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Explanation section */}
          {Array.isArray(study.explanation) && study.explanation.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div
                style={{
                  ...baseCard,
                  padding: "26px 26px 24px",
                  borderRadius: "24px",
                }}
              >
                <h2
                  style={{
                    marginBottom: "14px",
                    fontSize: "1.5rem",
                    fontWeight: 800,
                  }}
                >
                  Explanation
                </h2>
                <div
                  style={{
                    lineHeight: 1.8,
                    color: subTextColor[theme],
                  }}
                >
                  <PortableText
                    value={study.explanation}
                    components={{
                      block: {
                        h1: ({ children }) => (
                          <h1
                            style={{
                              fontSize: "2rem",
                              fontWeight: 800,
                              margin: "1.4rem 0 0.8rem",
                            }}
                          >
                            {children}
                          </h1>
                        ),
                        h2: ({ children }) => (
                          <h2
                            style={{
                              fontSize: "1.6rem",
                              fontWeight: 800,
                              margin: "1.2rem 0 0.75rem",
                            }}
                          >
                            {children}
                          </h2>
                        ),
                        h3: ({ children }) => (
                          <h3
                            style={{
                              fontSize: "1.3rem",
                              fontWeight: 700,
                              margin: "1rem 0 0.6rem",
                            }}
                          >
                            {children}
                          </h3>
                        ),
                        h4: ({ children }) => (
                          <h4
                            style={{
                              fontSize: "1.1rem",
                              fontWeight: 600,
                              margin: "0.9rem 0 0.5rem",
                            }}
                          >
                            {children}
                          </h4>
                        ),
                        normal: ({ children }) => (
                          <p style={{ margin: "0 0 0.9rem" }}>{children}</p>
                        ),
                      },
                      marks: {
                        strong: ({ children }) => <strong>{children}</strong>,
                        em: ({ children }) => <em>{children}</em>,
                      },
                      list: {
                        bullet: ({ children }) => (
                          <ul
                            style={{
                              paddingLeft: "1.4rem",
                              margin: "0 0 0.9rem",
                            }}
                          >
                            {children}
                          </ul>
                        ),
                      },
                      listItem: {
                        bullet: ({ children }) => (
                          <li style={{ marginBottom: "0.3rem" }}>{children}</li>
                        ),
                      },
                    }}
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* Meta */}
          <div
            style={{
              display: "flex",
              gap: "12px",
              flexWrap: "wrap",
            }}
          >
            {[study.client].map((item, i) => (
              <div
                key={i}
                style={{
                  padding: "10px 16px",
                  borderRadius: "999px",
                  ...baseCard,
                  display: "flex",
                  alignItems: "center",
                  fontSize: "0.85rem",
                  backdropFilter: "blur(8px)",
                }}
              >
                <span style={{ opacity: 0.75 }}>{item}</span>
              </div>
            ))}
          </div>

          {/* Results / Outcomes */}
          {study.results && study.results.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ marginBottom: "10px" }}
            >
              <div
                style={{
                  ...baseCard,
                  padding: "26px 26px 24px",
                  borderRadius: "24px",
                  border:
                    theme === "dark"
                      ? "1px solid rgba(34,197,94,0.6)"
                      : "1px solid rgba(34,197,94,0.5)",
                  boxShadow:
                    theme === "dark"
                      ? "0 20px 45px rgba(15,23,42,0.9)"
                      : "0 16px 35px rgba(15,23,42,0.16)",
                  background:
                    theme === "dark"
                      ? "linear-gradient(145deg, rgba(22,163,74,0.2), rgba(15,23,42,0.9))"
                      : "linear-gradient(145deg, #ecfdf3, #dcfce7)",
                }}
              >
                <h3
                  style={{
                    margin: 0,
                    marginBottom: "10px",
                    fontSize: "1.3rem",
                    fontWeight: 800,
                  }}
                >
                  Results & Outcomes
                </h3>

                <ul
                  style={{
                    margin: 0,
                    marginTop: "8px",
                    paddingLeft: "1.2rem",
                    lineHeight: 1.8,
                    color: subTextColor[theme],
                  }}
                >
                  {study.results.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}

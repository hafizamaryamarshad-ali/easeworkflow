"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FiArrowLeft } from "react-icons/fi";
import { FaStethoscope, FaPills, FaHeart } from "react-icons/fa";
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

  const floatingIcons = [
    { Icon: FaStethoscope, top: "15%", left: "10%", duration: 18 },
    { Icon: FaPills, top: "70%", left: "80%", duration: 24 },
    { Icon: FaHeart, top: "40%", left: "85%", duration: 26 },
  ];

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

     {/* Floating decorative icons */}
      {floatingIcons.map(({ Icon, top, left, duration }, index) => (
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
              border: theme === "dark" ? "1px solid rgba(148, 163, 184, 0.3)" : "1px solid rgba(148, 163, 184, 0.25)",
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
                color: theme === "dark" ? "#0ea5e9" : "#3b82f6",
              }}
            />
          </div>
        </motion.div>
      ))}

     {/* Back Button */}
      <button
        onClick={() => router.back()}
        style={{
          position: "absolute",
          top: "20px",
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

      <div style={{ maxWidth: "1050px", margin: "0 auto", paddingTop: "20px", position: "relative", zIndex: 1 }}>

        {mediaItems.length > 0 && (
          <MediaCarousel items={mediaItems} aspectRatio="16 / 9" />
        )}

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -18 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            ...baseCard,
            padding: "48px 42px",
            marginBottom: "24px",
            borderRadius: "22px",
            background:
              theme === "dark"
                ? "linear-gradient(145deg, rgba(255,255,255,0.05), rgba(255,255,255,0.01))"
                : "#ffffff",
          }}
        >
          <h1
            style={{
              fontSize: "3.4rem",
              fontWeight: 900,
              lineHeight: 1.1,
              letterSpacing: "-0.04em",
              marginBottom: "14px",
            }}
          >
            {study.title}
          </h1>

          <p
            style={{
              color: subTextColor[theme],
              lineHeight: 1.75,
              fontSize: "1.05rem",
              maxWidth: "850px",
            }}
          >
            {study.summary}
          </p>
        </motion.div>

        {/* Meta */}
        <div
          style={{
            display: "flex",
            gap: "12px",
            flexWrap: "wrap",
            marginBottom: "28px",
          }}
        >
          {[study.client, study.industry].map((item, i) => (
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

          {study.tags && study.tags.length > 0 && (
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "8px",
              }}
            >
              {study.tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontSize: "0.8rem",
                    padding: "6px 12px",
                    borderRadius: "999px",
                    backgroundColor:
                      theme === "dark"
                        ? "rgba(15,23,42,0.95)"
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
          )}
        </div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ marginBottom: "32px" }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
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
                  padding: "28px",
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
                <h3 style={{ marginBottom: "12px", fontSize: "1.25rem" }}>
                  {block.title}
                </h3>
                <p style={{ lineHeight: 1.75, color: subTextColor[theme] }}>
                  {block.content}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Results / Outcomes */}
        {study.results && study.results.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ marginBottom: "40px" }}
          >
            <div
              style={{
                ...baseCard,
                padding: "28px",
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
    </section>
  );
}
"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FiArrowLeft } from "react-icons/fi";
import { fetchCaseStudies, type CaseStudy } from "../../../lib/fetchCaseStudies";
import { useTheme } from "../../../theme/ThemeProvider";

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

  return (
    <section
      style={{
        padding: "100px 20px 60px",
        minHeight: "100vh",
        backgroundColor: theme === "dark" ? "var(--color-bg)" : "var(--color-bg-light)",
        color: textColor[theme],
      }}
    >

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

      <div style={{ maxWidth: "1050px", margin: "0 auto", paddingTop: "20px" }}>

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

        {/* Image */}
        {study.featuredImageUrl && (
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              maxWidth: "820px",
              margin: "0 auto",
              borderRadius: "26px",
              overflow: "hidden",
              ...baseCard,
              padding: "12px",
            }}
          >
            <Image
              src={study.featuredImageUrl}
              alt={study.title}
              width={1200}
              height={800}
              style={{
                width: "100%",
                height: "auto",
                display: "block",
                borderRadius: "18px",
              }}
            />
          </motion.div>
        )}

      </div>
    </section>
  );
}
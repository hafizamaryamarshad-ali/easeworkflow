"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiArrowRight, FiArrowLeft } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { fetchCaseStudies, type CaseStudy } from "../../lib/fetchCaseStudies";
import { useTheme } from "../../theme/ThemeProvider";

export default function CaseStudiesPage() {
  const router = useRouter();
  const { theme } = useTheme();
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);

  const sectionBg = {
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

    const loadCaseStudies = async () => {
      try {
        const data = await fetchCaseStudies();

        if (isMounted) {
          setCaseStudies(data.filter((study) => Boolean(study.slug)));
        }
      } catch {
        if (isMounted) {
          setCaseStudies([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadCaseStudies();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section
      style={{
        padding: "80px 20px",
        minHeight: "100vh",
        backgroundColor: theme === "dark" ? "var(--color-bg)" : "var(--color-bg-light)",
        backgroundImage: theme === "dark" ? sectionBg.dark : "none",
        backgroundSize: "400% 400%",
        animation: theme === "dark" ? "gradientBG 35s ease infinite" : "none",
        textAlign: "center",
        position: "relative",
      }}
    >
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          display: "flex",
          alignItems: "center",
          gap: "6px",
          padding: "6px 12px",
          fontSize: "0.85rem",
          borderRadius: "8px",
          border:
            theme === "dark"
              ? "1px solid var(--color-border-dark)"
              : "1px solid var(--color-border-light)",
          background: theme === "dark" ? "var(--color-card-dark)" : "var(--color-card-light)",
          backdropFilter: theme === "dark" ? "blur(10px)" : "none",
          color: accent[theme],
          cursor: "pointer",
          fontWeight: 600,
          transition: "0.3s ease",
        }}
      >
        <FiArrowLeft size={14} />
        Back
      </button>

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        style={{
          fontSize: "3rem",
          fontWeight: 900,
          marginBottom: "60px",
          color: textColor[theme],
          background: "none",
          WebkitBackgroundClip: "unset",
        }}
      >
        Case Studies
      </motion.h1>

      {/* Cards */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "30px",
        }}
      >
        {loading && (
          <p style={{ color: subText[theme], fontSize: "1rem", opacity: 0.9 }}>
            Loading case studies...
          </p>
        )}

        {!loading && caseStudies.length === 0 && (
          <p style={{ color: subText[theme], fontSize: "1rem", opacity: 0.9 }}>
            No case studies found.
          </p>
        )}

        {!loading &&
          caseStudies.map((study, i) => (
          <motion.div
            key={study.slug}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{
              scale: 1.05,
              boxShadow: cardShadow[theme],
            }}
            transition={{ duration: 0.5, delay: i * 0.2 }}
            style={{
              width: "320px",
              borderRadius: "20px",
              background: cardBg[theme],
              backdropFilter: theme === "dark" ? "blur(20px)" : "none",
              border: cardBorder[theme],
              color: textColor[theme],
              overflow: "hidden",
              textAlign: "left",
            }}
          >
            {study.featuredImageUrl && (
              <img
                src={study.featuredImageUrl}
                alt={study.title}
                style={{
                  width: "100%",
                  height: "180px",
                  objectFit: "cover",
                }}
              />
            )}

            <div style={{ padding: "25px" }}>
              <h2
                style={{
                  fontSize: "1.3rem",
                  fontWeight: 800,
                  marginBottom: "10px",
                }}
              >
                {study.title}
              </h2>

              <p
                style={{
                  fontSize: "0.95rem",
                  lineHeight: 1.6,
                  opacity: 0.9,
                  marginBottom: "15px",
                  color: subText[theme],
                }}
              >
                {study.summary}
              </p>

              <Link
                href={`/case-studies/${study.slug}`}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                    color: accent[theme],
                  fontWeight: 600,
                  textDecoration: "none",
                }}
              >
                View Case Study <FiArrowRight />
              </Link>
            </div>
          </motion.div>
        ))}
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
    </section>
  );
} 
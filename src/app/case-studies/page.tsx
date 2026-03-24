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

  // ✅ Card styling fixed for light + dark themes (visible shadow)
  const cardBg = {
    dark: "linear-gradient(145deg, rgba(255,255,255,0.05), rgba(14,165,233,0.08))", // stronger gradient
    light: "linear-gradient(145deg, #ffffff, #e0f2fe)",
  };
  const cardBorder = {
    dark: "1px solid rgba(255,255,255,0.15)",
    light: "1px solid rgba(14,165,233,0.25)",
  };
  const cardShadow = {
    dark: "0 8px 25px rgba(0,0,0,0.25)", // subtle dark shadow
    light: "0 6px 20px rgba(0,0,0,0.12)", // subtle light shadow
  };

  useEffect(() => {
    let isMounted = true;

    const loadCaseStudies = async () => {
      try {
        const data = await fetchCaseStudies();
        if (isMounted) setCaseStudies(data.filter((study) => Boolean(study.slug)));
      } catch {
        if (isMounted) setCaseStudies([]);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadCaseStudies();
    return () => { isMounted = false; };
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
          gap: "8px",
          padding: "8px 14px",
          fontSize: "0.9rem",
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
        <FiArrowLeft size={16} /> Back
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
                boxShadow: cardShadow[theme], // subtle hover shadow
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
                boxShadow: cardShadow[theme], // subtle shadow to pop
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
                    marginBottom: "15px",
                    color: subText[theme],
                    opacity: theme === "light" ? 1 : 0.9,
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
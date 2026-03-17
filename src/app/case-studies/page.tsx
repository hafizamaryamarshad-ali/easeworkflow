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

  const pageBg = {
    dark: "linear-gradient(135deg, #0f1c2c, #1f2a48, #2a3a6e, #00c6ff)",
    light: "#f8fafc",
  };
  const textColor = { dark: "#f8fafc", light: "#0f172a" };
  const subTextColor = { dark: "#e2e8f0", light: "#334155" };
  const accentColor = { dark: "#00c6ff", light: "#2563eb" };
  const cardBg = { dark: "rgba(255,255,255,0.08)", light: "#ffffff" };
  const cardBorder = {
    dark: "2px solid rgba(0,198,255,0.2)",
    light: "2px solid rgba(37,99,235,0.15)",
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
        backgroundColor: theme === "dark" ? "#0f1c2c" : pageBg.light,
        backgroundImage: theme === "dark" ? pageBg.dark : "none",
        backgroundSize: "400% 400%",
        animation: theme === "dark" ? "gradientBG 30s ease infinite" : "none",
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
              ? "1px solid rgba(0,198,255,0.5)"
              : "1px solid rgba(37,99,235,0.2)",
          background: theme === "dark" ? "rgba(255,255,255,0.08)" : "#ffffff",
          backdropFilter: theme === "dark" ? "blur(10px)" : "none",
          color: accentColor[theme],
          cursor: "pointer",
          fontWeight: 600,
          transition: "0.3s ease",
        }}
        onMouseOver={(e) =>
          (e.currentTarget.style.background =
            theme === "dark" ? "rgba(0,198,255,0.2)" : "#eff6ff")
        }
        onMouseOut={(e) =>
          (e.currentTarget.style.background =
            theme === "dark" ? "rgba(255,255,255,0.08)" : "#ffffff")
        }
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
          <p style={{ color: subTextColor[theme], fontSize: "1rem", opacity: 0.9 }}>
            Loading case studies...
          </p>
        )}

        {!loading && caseStudies.length === 0 && (
          <p style={{ color: subTextColor[theme], fontSize: "1rem", opacity: 0.9 }}>
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
              boxShadow:
                theme === "dark"
                  ? "0 25px 60px rgba(0,198,255,0.45)"
                  : "0 20px 40px rgba(37,99,235,0.2)",
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
                  color: subTextColor[theme],
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
                  color: accentColor[theme],
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
"use client";

import { useEffect, useMemo, useState } from "react";
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
    if (Array.isArray(routeSlug)) {
      return routeSlug[0];
    }

    return routeSlug;
  }, [routeSlug]);

  const [study, setStudy] = useState<CaseStudy | null>(null);
  const [loading, setLoading] = useState(true);

  const pageBg = {
    dark: "var(--color-page-gradient-dark)",
    light: "var(--color-bg-light)",
  };
  const textColor = { dark: "var(--color-text-primary)", light: "var(--color-text-dark)" };
  const subTextColor = { dark: "var(--color-text-muted)", light: "var(--color-text-muted-light)" };
  const accentColor = { dark: "var(--color-primary)", light: "var(--color-secondary)" };
  const cardBg = { dark: "var(--color-card-dark)", light: "var(--color-card-light)" };
  const cardBorder = {
    dark: "1px solid var(--color-border-dark)",
    light: "1px solid var(--color-border-light)",
  };

  useEffect(() => {
    let isMounted = true;

    const loadCaseStudy = async () => {
      if (!slug) {
        if (isMounted) {
          setStudy(null);
          setLoading(false);
        }
        return;
      }

      try {
        const allStudies = await fetchCaseStudies();
        const foundStudy = allStudies.find((item) => item.slug === slug);

        if (isMounted) {
          setStudy(foundStudy ?? null);
        }
      } catch {
        if (isMounted) {
          setStudy(null);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadCaseStudy();

    return () => {
      isMounted = false;
    };
  }, [slug]);

  if (loading) {
    return (
      <section
        style={{
          padding: "100px 20px",
          minHeight: "100vh",
          backgroundColor: theme === "dark" ? "var(--color-bg)" : pageBg.light,
          backgroundImage: theme === "dark" ? pageBg.dark : "none",
          backgroundSize: "400% 400%",
          animation: theme === "dark" ? "gradientBG 35s ease infinite" : "none",
          color: textColor[theme],
          position: "relative",
          textAlign: "center",
        }}
      >
        <p style={{ fontSize: "1.1rem" }}>Loading case study...</p>
      </section>
    );
  }

  if (!study) {
    return (
      <section
        style={{
          padding: "100px 20px",
          minHeight: "100vh",
          backgroundColor: theme === "dark" ? "var(--color-bg)" : pageBg.light,
          backgroundImage: theme === "dark" ? pageBg.dark : "none",
          backgroundSize: "400% 400%",
          animation: theme === "dark" ? "gradientBG 35s ease infinite" : "none",
          color: textColor[theme],
          position: "relative",
          textAlign: "center",
        }}
      >
        <p style={{ fontSize: "1.1rem" }}>Case study not found.</p>
      </section>
    );
  }

  return (
    <section
      style={{
        padding: "100px 20px",
        minHeight: "100vh",
        backgroundColor: theme === "dark" ? "var(--color-bg)" : pageBg.light,
        backgroundImage: theme === "dark" ? pageBg.dark : "none",
        backgroundSize: "400% 400%",
        animation: theme === "dark" ? "gradientBG 35s ease infinite" : "none",
        color: textColor[theme],
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
          padding: "8px 14px",
          borderRadius: "10px",
          border:
            theme === "dark"
              ? "1px solid var(--color-border-dark)"
              : "1px solid var(--color-border-light)",
          background: theme === "dark" ? "var(--color-card-dark)" : "var(--color-card-light)",
          backdropFilter: theme === "dark" ? "blur(10px)" : "none",
          color: accentColor[theme],
          cursor: "pointer",
          fontWeight: 600,
          transition: "0.3s ease",
        }}
        onMouseOver={(e) =>
          (e.currentTarget.style.background =
            theme === "dark" ? "var(--color-hover-dark)" : "var(--color-hover-light)")
        }
        onMouseOut={(e) =>
          (e.currentTarget.style.background =
            theme === "dark" ? "var(--color-card-dark)" : "var(--color-card-light)")
        }
      >
        <FiArrowLeft />
        Back
      </button>

      <div style={{ maxWidth: "900px", margin: "auto" }}>
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{
            fontSize: "2.8rem",
            fontWeight: 900,
            marginBottom: "40px",
            textAlign: "center",
            color: textColor[theme],
            background: "none",
            WebkitBackgroundClip: "unset",
          }}
        >
          {study.title}
        </motion.h1>

        {/* Glass Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{
            background: cardBg[theme],
            backdropFilter: theme === "dark" ? "blur(20px)" : "none",
            padding: "40px",
            borderRadius: "20px",
            border: cardBorder[theme],
            boxShadow:
              theme === "dark"
                ? "var(--shadow-detail-dark)"
                : "var(--shadow-detail-light)",
          }}
        >
          <p
            style={{
              fontSize: "1.1rem",
              lineHeight: 1.7,
              marginBottom: "30px",
              color: subTextColor[theme],
            }}
          >
            {study.summary}
          </p>

          <h3 style={{ fontSize: "1.4rem", marginTop: "20px" }}>Client</h3>
          <p style={{ color: subTextColor[theme] }}>{study.client}</p>

          <h3 style={{ fontSize: "1.4rem", marginTop: "20px" }}>Industry</h3>
          <p style={{ color: subTextColor[theme] }}>{study.industry}</p>

          <h3 style={{ fontSize: "1.4rem", marginTop: "30px" }}>
            Problem
          </h3>
          <p style={{ lineHeight: 1.6, color: subTextColor[theme] }}>{study.problem}</p>

          <h3 style={{ fontSize: "1.4rem", marginTop: "30px" }}>
            Solution
          </h3>
          <p style={{ lineHeight: 1.6, color: subTextColor[theme] }}>{study.solution}</p>
        </motion.div>
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
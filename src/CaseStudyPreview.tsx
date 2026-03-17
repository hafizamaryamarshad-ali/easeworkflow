"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { fetchCaseStudies, type CaseStudy } from "./lib/fetchCaseStudies";
import { useTheme } from "./theme/ThemeProvider";

export default function CaseStudy() {
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme();

  useEffect(() => {
    let isMounted = true;

    const loadCaseStudies = async () => {
      try {
        const data = await fetchCaseStudies();

        if (isMounted) {
          setCaseStudies(data);
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

  const bgColors = { dark: "#020617", light: "#f8fafc" };
  const textColors = { dark: "#f8fafc", light: "#0f172a" };
  const cardBg = { dark: "rgba(30,41,59,0.85)", light: "#e0f2fe" };
  const cardTitleColor = { dark: "#0ea5e9", light: "#2563eb" };
  const cardMetricColor = { dark: "#f8fafc", light: "#0f172a" };
  const cardDescColor = { dark: "#cbd5e1", light: "#1e293b" };
  const boxShadow = {
    dark: "0 25px 50px rgba(0,0,0,0.45)",
    light: "0 12px 28px rgba(59,130,246,0.15)",
  };

  return (
    <section
      style={{
        position: "relative",
        padding: "130px 20px",
        background: bgColors[theme],
        color: textColors[theme],
        textAlign: "center",
        overflow: "hidden",
      }}
    >
      {/* Light animated background blobs */}
      <motion.div
        animate={{ x: [0, 50, 0], y: [0, -50, 0] }}
        transition={{ duration: 25, repeat: Infinity }}
        style={{
          position: "absolute",
          width: "500px",
          height: "500px",
          background: "radial-gradient(circle,#0ea5e955,transparent)",
          filter: "blur(120px)",
          top: "-150px",
          left: "-150px",
        }}
      />
      <motion.div
        animate={{ x: [0, -50, 0], y: [0, 50, 0] }}
        transition={{ duration: 28, repeat: Infinity }}
        style={{
          position: "absolute",
          width: "400px",
          height: "400px",
          background: "radial-gradient(circle,#2563eb55,transparent)",
          filter: "blur(120px)",
          bottom: "-150px",
          right: "-150px",
        }}
      />

      {/* Section Title */}
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        style={{
          fontSize: "2.8rem",
          fontWeight: 900,
          marginBottom: "100px",
          position: "relative",
          zIndex: 2,
        }}
      >
        Success Stories
      </motion.h2>

      {/* Case Study Cards */}
      <div
        style={{
          maxWidth: "1050px",
          margin: "auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "50px",
          position: "relative",
          zIndex: 2,
        }}
      >
        {loading && (
          <p style={{ color: cardDescColor[theme], fontSize: "1rem" }}>Loading case studies...</p>
        )}

        {!loading && caseStudies.length === 0 && (
          <p style={{ color: cardDescColor[theme], fontSize: "1rem" }}>No case studies found.</p>
        )}

        {!loading && caseStudies.map((caseStudy, i) => (
          <motion.div
            key={caseStudy._id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: i * 0.2 }}
            whileHover={{ y: -6, scale: 1.02 }}
            style={{
              background: cardBg[theme],
              padding: "40px",
              borderRadius: "22px",
              backdropFilter: "blur(14px)",
              border: "1px solid rgba(255,255,255,0.08)",
              boxShadow: boxShadow[theme],
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "16px",
              position: "relative",
              transition: "all 0.35s ease",
            }}
          >
            <h3
              style={{
                fontSize: "1.5rem",
                fontWeight: 700,
                color: cardTitleColor[theme],
              }}
            >
              {caseStudy.title}
            </h3>
            <p
              style={{
                fontSize: "1.25rem",
                fontWeight: 800,
                color: cardMetricColor[theme],
              }}
            >
              {caseStudy.results[0] || caseStudy.industry}
            </p>
            <p
              style={{
                fontSize: "1rem",
                color: cardDescColor[theme],
                lineHeight: "1.6",
              }}
            >
              {caseStudy.summary}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const caseStudies = [
  {
    title: "CityCare Clinic",
    metric: "35% Increase in Patient Flow",
    description:
      "By automating appointment scheduling and follow-ups, CityCare Clinic reduced patient wait times and increased daily consultations.",
  },
  {
    title: "HealthyLife Center",
    metric: "40% Reduction in Billing Errors",
    description:
      "Integration with EMR and automated invoicing helped HealthyLife Center minimize manual errors and speed up claim processing.",
  },
  {
    title: "Wellness Plus",
    metric: "50% Faster Patient Follow-ups",
    description:
      "Automated reminders and notifications improved patient engagement and retention significantly for Wellness Plus.",
  },
];

export default function CaseStudy() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    const observer = new MutationObserver(() => {
      const bg = getComputedStyle(document.body).background;
      if (bg.includes("linear-gradient(145deg")) setTheme("dark");
      else setTheme("light");
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ["style"] });
    return () => observer.disconnect();
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
        {caseStudies.map((caseStudy, i) => (
          <motion.div
            key={i}
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
              {caseStudy.metric}
            </p>
            <p
              style={{
                fontSize: "1rem",
                color: cardDescColor[theme],
                lineHeight: "1.6",
              }}
            >
              {caseStudy.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
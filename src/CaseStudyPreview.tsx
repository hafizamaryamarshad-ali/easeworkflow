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

  // Listen for body theme from Navbar
  useEffect(() => {
    const observer = new MutationObserver(() => {
      const bg = getComputedStyle(document.body).background;
      if (bg.includes("linear-gradient(145deg")) setTheme("dark");
      else setTheme("light");
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ["style"] });
    return () => observer.disconnect();
  }, []);

  const bgColors = { dark: "#0f172a", light: "#f5f7fa" };
  const textColors = { dark: "#f8fafc", light: "#0f172a" };
  const cardBg = { dark: "#1e293b", light: "#e0f2fe" };
  const cardTitleColor = { dark: "#0ea5e9", light: "#2563eb" };
  const cardMetricColor = { dark: "#f8fafc", light: "#0f172a" };
  const cardDescColor = { dark: "#cbd5e1", light: "#1e293b" };

  return (
    <section
      style={{
        minHeight: "80vh",
        padding: "80px 20px",
        background: bgColors[theme],
        color: textColors[theme],
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        transition: "all 0.5s ease",
      }}
    >
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        style={{ fontSize: "2.5rem", fontWeight: 900, marginBottom: "60px" }}
      >
        Success Stories
      </motion.h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "40px",
          width: "100%",
          maxWidth: "1200px",
        }}
      >
        {caseStudies.map((caseStudy, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: i * 0.2 }}
            style={{
              background: cardBg[theme],
              padding: "30px",
              borderRadius: "24px",
              boxShadow: theme === "dark" ? "0 12px 28px rgba(0,0,0,0.35)" : "0 12px 28px rgba(59,130,246,0.2)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "16px",
              transition: "all 0.5s ease",
            }}
          >
            <h3 style={{ fontSize: "1.5rem", fontWeight: 700, color: cardTitleColor[theme] }}>
              {caseStudy.title}
            </h3>
            <p style={{ fontSize: "1.25rem", fontWeight: 800, color: cardMetricColor[theme] }}>
              {caseStudy.metric}
            </p>
            <p style={{ fontSize: "1rem", color: cardDescColor[theme], lineHeight: "1.5" }}>
              {caseStudy.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
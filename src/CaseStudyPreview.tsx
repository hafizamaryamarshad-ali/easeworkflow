"use client";

import { motion } from "framer-motion";

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
  return (
    <section
      style={{
        minHeight: "80vh",
        padding: "80px 20px",
        background: "#0f172a",
        color: "#f8fafc",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
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
              background: "#1e293b",
              padding: "30px",
              borderRadius: "24px",
              boxShadow: "0 12px 28px rgba(0,0,0,0.35)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "16px",
            }}
          >
            <h3 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#0ea5e9" }}>
              {caseStudy.title}
            </h3>
            <p
              style={{
                fontSize: "1.25rem",
                fontWeight: 800,
                color: "#f8fafc",
              }}
            >
              {caseStudy.metric}
            </p>
            <p style={{ fontSize: "1rem", color: "#cbd5e1", lineHeight: "1.5" }}>
              {caseStudy.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}